/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './vo/services'; // client/services/edit.ts to client/services/vo/services.ts

export class ServiceClient {
	public static defaultEndpoint = "/service/edit";
	constructor(
		public transport:<T>(method: string, data?: any[]) => Promise<T>
	) {}
	async upsertWord(word:github_com_janhalfar_vocablion_services.EventUpsertWord):Promise<void> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services.ServiceError}>("UpsertWord", [word])
		let err = response[0];
		if(err) { throw err }
	}
}