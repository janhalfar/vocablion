/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './vo/services'; // client/services/status.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './vo/edit'; // client/services/status.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './vo/practice'; // client/services/status.ts to client/services/vo/practice.ts
import * as github_com_janhalfar_vocablion_services_status from './vo/status'; // client/services/status.ts to client/services/vo/status.ts
import * as github_com_janhalfar_vocablion_services_words from './vo/words'; // client/services/status.ts to client/services/vo/words.ts

export class ServiceClient {
	public static defaultEndpoint = "/service/words";
	constructor(
		public transport:<T>(method: string, data?: any[]) => Promise<T>
	) {}
	async status():Promise<github_com_janhalfar_vocablion_services_status.StatusState> {
		let response = await this.transport<{0:github_com_janhalfar_vocablion_services_status.StatusState; 1:github_com_janhalfar_vocablion_services.ServiceError}>("Status", [])
		let err = response[1];
		if(err) { throw err }
		return response[0]
	}
}