/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/words.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/words.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './practice'; // client/services/vo/words.ts to client/services/vo/practice.ts
import * as github_com_janhalfar_vocablion_services_status from './status'; // client/services/vo/words.ts to client/services/vo/status.ts
import * as github_com_janhalfar_vocablion_services_words from './words'; // client/services/vo/words.ts to client/services/vo/words.ts
// github.com/janhalfar/vocablion/services/words.WordsState
export interface WordsState {
	Query:string;
	Page:number;
	Total:number;
	Words:github_com_janhalfar_vocablion_services.Word[];
}
// constants from github.com/janhalfar/vocablion/services/words
export const GoConst = {
	PageSize : 100,
	StoreKey : "words",
}
// end of common js