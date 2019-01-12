/* tslint:disable */
// hello commonjs - we need some imports - sorted in alphabetical order, by go package
import * as github_com_janhalfar_vocablion_services from './services'; // client/services/vo/time.ts to client/services/vo/services.ts
import * as github_com_janhalfar_vocablion_services_edit from './edit'; // client/services/vo/time.ts to client/services/vo/edit.ts
import * as github_com_janhalfar_vocablion_services_practice from './practice'; // client/services/vo/time.ts to client/services/vo/practice.ts
import * as github_com_janhalfar_vocablion_services_status from './status'; // client/services/vo/time.ts to client/services/vo/status.ts
import * as github_com_janhalfar_vocablion_services_words from './words'; // client/services/vo/time.ts to client/services/vo/words.ts
import * as time from './time'; // client/services/vo/time.ts to client/services/vo/time.ts
// time.Time
export interface Time {
}
// constants from time
export const GoConst = {
	ANSIC : "Mon Jan _2 15:04:05 2006",
	Kitchen : "3:04PM",
	Nanosecond : 1,
	RFC1123 : "Mon, 02 Jan 2006 15:04:05 MST",
	RFC1123Z : "Mon, 02 Jan 2006 15:04:05 -0700",
	RFC3339 : "2006-01-02T15:04:05Z07:00",
	RFC3339Nano : "2006-01-02T15:04:05.999999999Z07:00",
	RFC822 : "02 Jan 06 15:04 MST",
	RFC822Z : "02 Jan 06 15:04 -0700",
	RFC850 : "Monday, 02-Jan-06 15:04:05 MST",
	RubyDate : "Mon Jan 02 15:04:05 -0700 2006",
	Stamp : "Jan _2 15:04:05",
	StampMicro : "Jan _2 15:04:05.000000",
	StampMilli : "Jan _2 15:04:05.000",
	StampNano : "Jan _2 15:04:05.000000000",
	UnixDate : "Mon Jan _2 15:04:05 MST 2006",
}
// end of common js