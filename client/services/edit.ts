/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './vo/services'; // client/services/edit.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './vo/edit'; // client/services/edit.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './vo/practice'; // client/services/edit.ts to client/services/vo/practice.ts
import * as github_com_janhalfar_vocablion_services_words from './vo/words'; // client/services/edit.ts to client/services/vo/words.ts

export class ServiceClient {
	public static defaultEndpoint = "/service/edit";
	constructor(
		public transport:<T>(method: string, data?: any[]) => Promise<T>
	) {}
	async addTranslation(translation:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("AddTranslation", [translation])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async deleteTranslation(translation:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("DeleteTranslation", [translation])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async newWord(unit:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("NewWord", [unit])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async saveWord():Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SaveWord", [])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setDeclination(declination:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetDeclination", [declination])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setGender(gender:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetGender", [gender])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setGenitive(genitive:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetGenitive", [genitive])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setType(wordType:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetType", [wordType])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setUnit(unit:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetUnit", [unit])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setVerbConjugation(conjugation:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetVerbConjugation", [conjugation])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setVerbExcpetions(praeteritum:string, perfect:string, ppp:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetVerbExcpetions", [praeteritum, perfect, ppp])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async setWord(word:string):Promise<github_com_janhalfar_vocablion_services_edit.EditState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_edit.EditState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("SetWord", [word])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
}