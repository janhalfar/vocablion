package dict

import (
	"fmt"
	"strings"
	"testing"

	"github.com/janhalfar/vocablion/services"
	"github.com/stretchr/testify/assert"
)

func TestLateinme(t *testing.T) {
	words, err := Lateinme("parere")
	expectations := []*services.Word{
		&services.Word{
			Word: "parare",
			Translations: []string{
				"vorbereiten",
				"bereiten",
				"zubereiten",
			},
			Verb: &services.Verb{},
		},
		&services.Word{
			Word: "parere",
			Translations: []string{
				"gehorchen",
				"gebären",
				"befolgen",
				"sich verschaffen",
			},
			Verb: &services.Verb{},
		},
	}
	assert.NoError(t, err)
	assert.Equal(t, expectations, words)
	for _, w := range words {
		fmt.Println(w.Word, ":", strings.Join(w.Translations, ","))
	}
}
