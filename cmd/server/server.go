package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/janhalfar/selbstcert"
	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/redux"
	"github.com/janhalfar/vocablion/services"
	"github.com/janhalfar/vocablion/services/edit"
)

type Server struct {
	handlers map[string]http.Handler
	proxy    *httputil.ReverseProxy
}

func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	for prefix, h := range s.handlers {
		if strings.HasPrefix(r.URL.Path, prefix) {
			h.ServeHTTP(w, r)
			return
		}
	}
	s.proxy.ServeHTTP(w, r)
}

func must(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	p, errP := persistence.NewP("localhost")
	must(errP)
	eventsStore, errEventsStore := events.NewStore(p.GetCollEvents())
	must(errEventsStore)

	sessionStore, errSessionStore := services.NewSessionStore(func() (*redux.Store, error) {
		return redux.NewStore(map[string]redux.Reducer{
			edit.StoreKeyEdit: edit.Reducer,
		}, edit.Middleware(eventsStore.Publish))
	})
	must(errSessionStore)

	e, errEdit := edit.NewService(p, eventsStore, sessionStore)
	must(errEdit)
	serviceProxy := edit.NewDefaultServiceGoTSRPCProxy(e, []string{})
	u, errU := url.Parse("http://localhost:3000")
	must(errU)

	s := &Server{
		handlers: map[string]http.Handler{
			serviceProxy.EndPoint: serviceProxy,
		},
		proxy: httputil.NewSingleHostReverseProxy(u),
	}
	selbstcert.ListenAndServeTLS(":8443", []string{"localhost"}, s)
}
