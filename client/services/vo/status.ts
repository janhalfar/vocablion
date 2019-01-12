/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/status.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/status.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './practice'; // client/services/vo/status.ts to client/services/vo/practice.ts
import * as github_com_janhalfar_vocablion_services_status from './status'; // client/services/vo/status.ts to client/services/vo/status.ts
import * as github_com_janhalfar_vocablion_services_words from './words'; // client/services/vo/status.ts to client/services/vo/words.ts
import * as time from './time'; // client/services/vo/status.ts to client/services/vo/time.ts
// github.com/janhalfar/vocablion/services/status.Event
export interface Event {
	Time:time.Time;
	Timestamp:number;
	Feedback?:github_com_janhalfar_vocablion_services_practice.Feedback;
	CreateWord?:github_com_janhalfar_vocablion_services.Word;
	UpdateWord?:github_com_janhalfar_vocablion_services.Word;
}
// github.com/janhalfar/vocablion/services/status.Stats
export interface Stats {
	PracticeRight:number;
	PracticeWrong:number;
	WordCreate:number;
	WordUpdate:number;
}
// github.com/janhalfar/vocablion/services/status.StatusState
export interface StatusState {
	Stats:github_com_janhalfar_vocablion_services_status.Stats;
	StatsToday:github_com_janhalfar_vocablion_services_status.Stats;
	Stats7:github_com_janhalfar_vocablion_services_status.Stats;
	Events:github_com_janhalfar_vocablion_services_status.Event[];
}
// constants from github.com/janhalfar/vocablion/services/status
export const GoConst = {
	StoreKey : "status",
}
// end of common js