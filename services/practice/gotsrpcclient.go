// Code generated by gotsrpc https://github.com/foomo/gotsrpc  - DO NOT EDIT.

package practice

import (
	http "net/http"

	gotsrpc "github.com/foomo/gotsrpc"
	github_com_janhalfar_vocablion_services "github.com/janhalfar/vocablion/services"
)

type ServiceGoTSRPCClient interface {
	Foo() (state PracticeState, err *github_com_janhalfar_vocablion_services.ServiceError, clientErr error)
	SetClientEncoding(encoding gotsrpc.ClientEncoding)
	SetTransportHttpClient(client *http.Client)
}

type tsrpcServiceGoTSRPCClient struct {
	URL      string
	EndPoint string
	Client   gotsrpc.Client
}

func NewDefaultServiceGoTSRPCClient(url string) ServiceGoTSRPCClient {
	return NewServiceGoTSRPCClient(url, "/service/practice")
}

func NewServiceGoTSRPCClient(url string, endpoint string) ServiceGoTSRPCClient {
	return NewServiceGoTSRPCClientWithClient(url, "/service/practice", nil)
}

func NewServiceGoTSRPCClientWithClient(url string, endpoint string, client *http.Client) ServiceGoTSRPCClient {
	return &tsrpcServiceGoTSRPCClient{
		URL:      url,
		EndPoint: endpoint,
		Client:   gotsrpc.NewClientWithHttpClient(client),
	}
}

func (tsc *tsrpcServiceGoTSRPCClient) SetClientEncoding(encoding gotsrpc.ClientEncoding) {
	tsc.Client.SetClientEncoding(encoding)
}

func (tsc *tsrpcServiceGoTSRPCClient) SetTransportHttpClient(client *http.Client) {
	tsc.Client.SetTransportHttpClient(client)
}
func (tsc *tsrpcServiceGoTSRPCClient) Foo() (state PracticeState, err *github_com_janhalfar_vocablion_services.ServiceError, clientErr error) {
	args := []interface{}{}
	reply := []interface{}{&state, &err}
	clientErr = tsc.Client.Call(tsc.URL, tsc.EndPoint, "Foo", args, reply)
	return
}
