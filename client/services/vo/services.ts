/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/services.ts to client/services/vo/services.ts
// github.com/janhalfar/vocablion/services.Adjective
export interface Adjective {
	Translations:string[];
}
// github.com/janhalfar/vocablion/services.EventUpsertWord
export interface EventUpsertWord {
	Type:string;
	Word?:github_com_janhalfar_vocablion_services.Word;
}
// github.com/janhalfar/vocablion/services.Noun
export interface Noun {
	Word:string;
	PluralWord:boolean;
	Genitive:string;
	Translations:string[];
	Sex:string;
	Declination:string;
}
// github.com/janhalfar/vocablion/services.Pronoun
export interface Pronoun {
	Translations:string[];
}
// github.com/janhalfar/vocablion/services.ServiceError
export interface ServiceError {
	Message:string;
	Code:number;
}
// github.com/janhalfar/vocablion/services.Verb
export interface Verb {
	Translations:string[];
}
// github.com/janhalfar/vocablion/services.Word
export interface Word {
	Unit:string;
	Noun?:github_com_janhalfar_vocablion_services.Noun;
	Verb?:github_com_janhalfar_vocablion_services.Verb;
	Adjective?:github_com_janhalfar_vocablion_services.Adjective;
	Pronoun?:github_com_janhalfar_vocablion_services.Pronoun;
}
// constants from github.com/janhalfar/vocablion/services
export const GoConst = {
	DeclinationA : "a",
	DeclinationE : "e",
	DeclinationKons : "kons",
	DeclinationO : "o",
	DeclinationONeuter : "oneuter",
	DeclinationThird : "third",
	DeclinationThirdNeuter : "thirdNeuter",
	DeclinationU : "u",
	EventTypeRemoveWord : "EventRemoveWord",
	EventTypeUpsertWord : "EventUpsertWord",
	SericeErrorCodeInternalError : 1,
	SexFemale : "female",
	SexMale : "male",
	SexNeuter : "neuter",
}
// end of common js