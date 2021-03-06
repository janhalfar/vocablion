/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/services.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/services.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './practice'; // client/services/vo/services.ts to client/services/vo/practice.ts
import * as github_com_janhalfar_vocablion_services_status from './status'; // client/services/vo/services.ts to client/services/vo/status.ts
import * as github_com_janhalfar_vocablion_services_words from './words'; // client/services/vo/services.ts to client/services/vo/words.ts
import * as time from './time'; // client/services/vo/services.ts to client/services/vo/time.ts
// github.com/janhalfar/vocablion/services.Adjective
export interface Adjective {
	Declinations:string[];
	Gender:string;
}
// github.com/janhalfar/vocablion/services.Adverb
export interface Adverb {
}
// github.com/janhalfar/vocablion/services.Noun
export interface Noun {
	PluralWord:boolean;
	Genitive:string;
	Gender:string;
	Declination:string;
}
// github.com/janhalfar/vocablion/services.Phrase
export interface Phrase {
	Info:string;
}
// github.com/janhalfar/vocablion/services.Pronoun
export interface Pronoun {
}
// github.com/janhalfar/vocablion/services.ServiceError
export interface ServiceError {
	Message:string;
	Code:number;
}
// github.com/janhalfar/vocablion/services.Verb
export interface Verb {
	Praeteritum:string;
	Perfect:string;
	PPP:string;
	Conjugation:string;
}
// github.com/janhalfar/vocablion/services.Word
export interface Word {
	ID:string;
	Unit:string;
	Word:string;
	Translations:string[];
	Noun?:github_com_janhalfar_vocablion_services.Noun;
	Verb?:github_com_janhalfar_vocablion_services.Verb;
	Adjective?:github_com_janhalfar_vocablion_services.Adjective;
	Pronoun?:github_com_janhalfar_vocablion_services.Pronoun;
	Adverb?:github_com_janhalfar_vocablion_services.Adverb;
	Phrase?:github_com_janhalfar_vocablion_services.Phrase;
}
// constants from github.com/janhalfar/vocablion/services
export const GoConst = {
	ConjugationA : "A",
	ConjugationE : "E",
	ConjugationI : "I",
	ConjugationKons : "Kons",
	ConjugationKonsExtI : "KonsExtI",
	DeclinationA : "a",
	DeclinationE : "e",
	DeclinationKons : "kons",
	DeclinationO : "o",
	DeclinationONeuter : "oneuter",
	DeclinationThird : "third",
	DeclinationThirdNeuter : "thirdNeuter",
	DeclinationU : "u",
	GenderFemale : "female",
	GenderMale : "male",
	GenderNeuter : "neuter",
	ServiceErrorCodeInternalError : 1,
	ServiceErrorCodeNotImplemented : 999,
	WordTypeAdjective : "WordTypeAdjective",
	WordTypeAdverb : "WordTypeAdverb",
	WordTypeNoun : "WordTypeNoun",
	WordTypePhrase : "WordTypePhrase",
	WordTypePronoun : "WordTypePronoun",
	WordTypeVerb : "WordTypeVerb",
}
// end of common js