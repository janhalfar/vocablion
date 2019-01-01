/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './vo/services'; // client/services/practice.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './vo/edit'; // client/services/practice.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './vo/practice'; // client/services/practice.ts to client/services/vo/practice.ts

export class ServiceClient {
	public static defaultEndpoint = "/service/practice";
	constructor(
		public transport:<T>(method: string, data?: any[]) => Promise<T>
	) {}
	async answer(wordType:string, translations:string[]):Promise<github_com_janhalfar_vocablion_services_practice.PracticeState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_practice.PracticeState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("Answer", [wordType, translations])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
	async next(unit:string):Promise<github_com_janhalfar_vocablion_services_practice.PracticeState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_practice.PracticeState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("Next", [unit])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
}