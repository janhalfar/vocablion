package practice

import "github.com/janhalfar/vocablion/services"

const ()

type Progress struct {
	Complete bool
	Total    int
	Correct  int
	Wrong    int
}

type Feedback struct {
	Complete            bool
	ProgessTranslations Progress
}
type PracticeState struct {
	Question     string
	WordType     services.WordType
	Translations []string
	Feedback     Feedback
	Word         *services.Word `json:"-"`
}
