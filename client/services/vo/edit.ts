/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/edit.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/edit.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './practice'; // client/services/vo/edit.ts to client/services/vo/practice.ts
// github.com/janhalfar/vocablion/services/edit.EditState
export interface EditState {
	WordType:string;
	Word?:github_com_janhalfar_vocablion_services.Word;
	Valid:boolean;
}
// constants from github.com/janhalfar/vocablion/services/edit
export const GoConst = {
	EventTypeWordCreate : "WordCreate",
	EventTypeWordDelete : "WordDelete",
	EventTypeWordUpdate : "WordUpdate",
	StoreKey : "edit",
}
// end of common js