/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/practice.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/practice.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './practice'; // client/services/vo/practice.ts to client/services/vo/practice.ts
import * as github_com_janhalfar_vocablion_services_words from './words'; // client/services/vo/practice.ts to client/services/vo/words.ts
// github.com/janhalfar/vocablion/services/practice.Feedback
export interface Feedback {
	Complete:boolean;
	ProgessTranslations:github_com_janhalfar_vocablion_services_practice.Progress;
}
// github.com/janhalfar/vocablion/services/practice.PracticeState
export interface PracticeState {
	Question:string;
	WordType:string;
	Translations:string[];
	Feedback:github_com_janhalfar_vocablion_services_practice.Feedback;
	Word?:github_com_janhalfar_vocablion_services.Word;
}
// github.com/janhalfar/vocablion/services/practice.Progress
export interface Progress {
	Complete:boolean;
	Total:number;
	Correct:string[];
	Wrong:string[];
}
// constants from github.com/janhalfar/vocablion/services/practice
export const GoConst = {
	StoreKey : "practice",
}
// end of common js