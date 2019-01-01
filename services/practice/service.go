package practice

import (
	"github.com/janhalfar/vocablion/services"
)

type Service struct {
}

func NewService() (s *Service, err error) {
	s = &Service{}
	return
}

func (s *Service) Test(user string) (word *services.Word, err *services.ServiceError) {
	return
}

func (s *Service) Check(question *services.Word, answer *services.Word) (testResult *services.TestResult, err *services.ServiceError) {
	testResult = &services.TestResult{}
	switch true {
	case question.Noun != nil:

	default:
		err = services.Err("not implemented", services.ServiceErrorCodeNotImplemented)
		return
	}
	return
}
