package status

import (
	"time"

	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/services"
	"github.com/janhalfar/vocablion/services/practice"
)

const ()

type eventsSeries []*events.Event
type userEventSeries map[string]eventsSeries

type Event struct {
	Time       time.Time
	Timestamp  int64
	Feedback   *practice.Feedback `json:",omitempty"`
	CreateWord *services.Word     `json:",omitempty"`
	UpdateWord *services.Word     `json:",omitempty"`
}
type Stats struct {
	PracticeRight int
	PracticeWrong int
	WordCreate    int
	WordUpdate    int
}
type StatusState struct {
	Stats      Stats
	StatsToday Stats
	Stats7     Stats
	Events     []Event
}
