package words

import (
	"github.com/janhalfar/vocablion/services"
)

type ActionSearch struct {
	Query string
}

type ActionLoadWords struct {
	Total int
	Words []*services.Word
}

type ActionPage struct {
	Page int
}
