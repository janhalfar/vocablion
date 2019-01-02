package words

import (
	"github.com/janhalfar/vocablion/services"
)

const ()

type WordsState struct {
	Query string
	Page  int
	Total int
	Words []*services.Word
}
