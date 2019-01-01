/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/edit.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/edit.ts to client/services/vo/edit.ts
// github.com/janhalfar/vocablion/services/edit.EditState
export interface EditState {
	WordType:string;
	Word?:github_com_janhalfar_vocablion_services.Word;
	Valid:boolean;
}
// end of common js