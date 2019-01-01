package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/persistence"
	"github.com/janhalfar/vocablion/redux"
	"github.com/janhalfar/vocablion/services"
	"github.com/janhalfar/vocablion/services/edit"
	"github.com/janhalfar/vocablion/services/practice"
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
			edit.StoreKey:     edit.Reducer,
			practice.StoreKey: practice.Reducer,
		},
			edit.Middleware(eventsStore.Publish),
			practice.Middleware(eventsStore.Publish),
		)
	})

	must(errSessionStore)

	u, errU := url.Parse("http://localhost:3000")
	must(errU)

	// edit
	e, errEdit := edit.NewService(p, eventsStore, sessionStore)
	must(errEdit)
	serviceProxy := edit.NewDefaultServiceGoTSRPCProxy(e, []string{})

	// practice
	ps, errPractice := practice.NewService(p, eventsStore, sessionStore)
	must(errPractice)
	practiceProxy := practice.NewDefaultServiceGoTSRPCProxy(ps, []string{})

	s := &Server{
		handlers: map[string]http.Handler{
			serviceProxy.EndPoint:  serviceProxy,
			practiceProxy.EndPoint: practiceProxy,
		},
		proxy: httputil.NewSingleHostReverseProxy(u),
	}
	//selbstcert.ListenAndServeTLS(":8443", []string{"localhost"}, s)
	http.ListenAndServe(":3001", s)
}
