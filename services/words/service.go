package words

import "github.com/janhalfar/vocablion/services"

type Service struct {
}

func (s *Service) Find(term string) (words []*services.Word, err *services.ServiceError) {
	return
}
