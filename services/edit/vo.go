package edit

import (
	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/services"
)

type EditState struct {
	WordType services.WordType
	Word     *services.Word
	Valid    bool
}

const (
	EventTypeWordCreate events.Type = "WordCreate"
	EventTypeWordUpdate events.Type = "WordUpdate"
	EventTypeWordDelete events.Type = "WordDelete"
)
