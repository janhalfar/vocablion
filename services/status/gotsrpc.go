// Code generated by gotsrpc https://github.com/foomo/gotsrpc  - DO NOT EDIT.

package status

import (
	http "net/http"
	time "time"

	gotsrpc "github.com/foomo/gotsrpc"
)

type ServiceGoTSRPCProxy struct {
	EndPoint    string
	allowOrigin []string
	service     *Service
}

func NewDefaultServiceGoTSRPCProxy(service *Service, allowOrigin []string) *ServiceGoTSRPCProxy {
	return &ServiceGoTSRPCProxy{
		EndPoint:    "/service/words",
		allowOrigin: allowOrigin,
		service:     service,
	}
}

func NewServiceGoTSRPCProxy(service *Service, endpoint string, allowOrigin []string) *ServiceGoTSRPCProxy {
	return &ServiceGoTSRPCProxy{
		EndPoint:    endpoint,
		allowOrigin: allowOrigin,
		service:     service,
	}
}

// ServeHTTP exposes your service
func (p *ServiceGoTSRPCProxy) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	for _, origin := range p.allowOrigin {
		// todo we have to compare this with the referer ... and only send one
		w.Header().Add("Access-Control-Allow-Origin", origin)
	}
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	if r.Method != http.MethodPost {
		if r.Method == http.MethodOptions {
			return
		}
		gotsrpc.ErrorMethodNotAllowed(w)
		return
	}

	var args []interface{}
	funcName := gotsrpc.GetCalledFunc(r, p.EndPoint)
	callStats := gotsrpc.GetStatsForRequest(r)
	if callStats != nil {
		callStats.Func = funcName
		callStats.Package = "github.com/janhalfar/vocablion/services/status"
		callStats.Service = "Service"
	}
	switch funcName {
	case "GetStatus":
		var ()
		args = []interface{}{}
		err := gotsrpc.LoadArgs(&args, callStats, r)
		if err != nil {
			gotsrpc.ErrorCouldNotLoadArgs(w)
			return
		}
		executionStart := time.Now()
		getStatusState, getStatusErr := p.service.GetStatus(w, r)
		if callStats != nil {
			callStats.Execution = time.Now().Sub(executionStart)
		}
		gotsrpc.Reply([]interface{}{getStatusState, getStatusErr}, callStats, r, w)
		return
	case "Status":
		var ()
		args = []interface{}{}
		err := gotsrpc.LoadArgs(&args, callStats, r)
		if err != nil {
			gotsrpc.ErrorCouldNotLoadArgs(w)
			return
		}
		executionStart := time.Now()
		statusState, statusErr := p.service.Status(w, r)
		if callStats != nil {
			callStats.Execution = time.Now().Sub(executionStart)
		}
		gotsrpc.Reply([]interface{}{statusState, statusErr}, callStats, r, w)
		return
	default:
		gotsrpc.ClearStats(r)
		http.Error(w, "404 - not found "+r.URL.Path, http.StatusNotFound)
	}
}
