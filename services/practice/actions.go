package practice

import "github.com/janhalfar/vocablion/services"

type ActionNext struct {
	Unit string
}

type ActionLoadWord struct {
	Word *services.Word
}

type ActionAnswer struct {
	Unit         string
	WordType     services.WordType
	Translations []string
}
