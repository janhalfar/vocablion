package practice

import (
	"fmt"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/globalsign/mgo"
	"github.com/janhalfar/vocablion/events"
	"github.com/janhalfar/vocablion/services"
)

type stats struct {
	chanEventIncoming chan *events.Event
	chanStats         chan *StatsWord
	chanGetStats      chan string
}

func newStats(vocabColl *mgo.Collection) (s *stats, err error) {
	s = &stats{
		chanEventIncoming: make(chan *events.Event),
		chanStats:         make(chan *StatsWord),
		chanGetStats:      make(chan string),
	}
	go s.run(vocabColl)
	return
}

func (s *stats) run(vocabColl *mgo.Collection) {
	type wordID string
	wordStatsDict := map[wordID]*StatsWord{}
	getWordStats := func(id string) (wordStats *StatsWord, err error) {
		wordStats, ok := wordStatsDict[wordID(id)]
		if ok {
			return
		}
		// w := &services.Word{}
		// errFind := vocabColl.FindId(bson.ObjectIdHex(id)).One(&w)
		// if errFind != nil {
		// 	err = errFind
		// 	return
		// }
		wordStats = &StatsWord{
			Next:         time.Now(),
			Phase:        0,
			PhaseHistory: []time.Time{},
			LearnHistory: []time.Time{},
		}
		wordStatsDict[wordID(id)] = wordStats
		return
	}
MainLoop:
	for {
		select {
		case id := <-s.chanGetStats:
			wordStats, errFind := getWordStats(id)
			if errFind != nil {
				s.chanStats <- nil
				continue MainLoop
			}
			s.chanStats <- wordStats
		case incomingEvent := <-s.chanEventIncoming:
			switch incomingEvent.Type {
			case EventTypeLearn:
				w := &services.Word{}
				errAsWord := incomingEvent.Data.As(&w)
				if errAsWord == nil {
					wordStats, errWordStats := getWordStats(w.ID.Hex())
					if errWordStats == nil {
						wordStats.LearnHistory = append(wordStats.LearnHistory, incomingEvent.Time)
					}
				}
			case EventTypeAnswer:
				feedback := &Feedback{}
				errAs := incomingEvent.Data.As(&feedback)
				if errAs == nil {
					wordStats, errWordStats := getWordStats(feedback.WordID)
					if errWordStats == nil {
						if feedback.Success {
							wordStats.SuccessHistory = append(wordStats.SuccessHistory, incomingEvent.Time)
						} else {
							wordStats.FailHistory = append(wordStats.FailHistory, incomingEvent.Time)

						}
					}
				}
			default:
				fmt.Println("practice subscriber: häääää", incomingEvent.Type)
			}
		}
		spew.Dump(wordStatsDict)
	}
}

func (s *stats) getStats(id string) *StatsWord {
	s.chanGetStats <- id
	return <-s.chanStats
}

func (s *stats) eventsSubscriber(event *events.Event) (err error) {
	s.chanEventIncoming <- event
	return
}
