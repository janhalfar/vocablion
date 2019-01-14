package practice

import "github.com/janhalfar/vocablion/services"

type ActionNext struct {
	Unit string
}

type ActionLoadWord struct {
	Word *services.Word
}

type ActionAnswer struct {
	Translations []string
}
type ActionLearn struct {
}

type actionFeedback struct {
	feedback *Feedback
}

type actionUpdateStats struct {
	stats *StatsWord
}
