package dict

import (
	"net/url"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/janhalfar/vocablion/services"
)

func Lateinme(word string) (words []*services.Word, err error) {
	words = []*services.Word{}
	doc, errDoc := goquery.NewDocument("https://www.latein.me/latein/" + url.PathEscape(word))
	if errDoc != nil {
		err = errDoc
		return
	}
	var currentWord *services.Word
	addWord := func() {
		if currentWord != nil {
			words = append(words, currentWord)
		}
	}
	const (
		suffixVerb      = " (Verb)"
		suffixNoun      = " (Substantiv)"
		suffixAdjective = " (Adjektiv)"
	)
	doc.Find(".translationEntryBox, .translationEntry").Each(func(i int, s *goquery.Selection) {
		classAttr, _ := s.Attr("class")
		if classAttr == "translationEntryBox" {
			addWord()
			word := s.Text()
			currentWord = &services.Word{}
			switch true {
			case strings.HasSuffix(word, suffixVerb):
				word = strings.TrimSuffix(word, suffixVerb)
				currentWord.Verb = &services.Verb{}
			case strings.HasSuffix(word, suffixNoun):
				word = strings.TrimSuffix(word, suffixNoun)
				currentWord.Noun = &services.Noun{}
			case strings.HasSuffix(word, suffixAdjective):
				word = strings.TrimSuffix(word, suffixAdjective)
				currentWord.Adjective = &services.Adjective{}
			}
			currentWord.Word = word
		}
		if classAttr == "translationEntry" {
			currentWord.Translations = append(currentWord.Translations, s.Text())
		}
	})
	addWord()
	return
}
