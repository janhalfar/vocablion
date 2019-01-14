package practice

import (
	"time"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/services"
)

const (
	EventTypeAnswer events.Type = "PracticeAnswer"
	EventTypeLearn  events.Type = "PracticeLearn"
)

type Feedback struct {
	WordID   string
	Correct  []string
	Wrong    []string
	Success  bool
	Solution *services.Word
}
type PracticeState struct {
	Question     string
	WordType     services.WordType
	Translations []string
	Feedback     *Feedback
	Word         *services.Word `json:"-"`
	LearnWord    *services.Word
	Stats        *StatsWord
}

type StatsWord struct {
	Phase          int
	PhaseHistory   []time.Time
	SuccessHistory []time.Time
	FailHistory    []time.Time
	LearnHistory   []time.Time
	Next           time.Time
}
