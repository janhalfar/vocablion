/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/services.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/services.ts to client/services/vo/edit.ts
// github.com/janhalfar/vocablion/services.Adjective
export interface Adjective {
	Declination:string;
	Gender:string;
}
// github.com/janhalfar/vocablion/services.Noun
export interface Noun {
	PluralWord:boolean;
	Genitive:string;
	Gender:string;
	Declination:string;
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
	WordTypeNoun : "WordTypeNoun",
	WordTypePronoun : "WordTypePronoun",
	WordTypeVerb : "WordTypeVerb",
}
// end of common js