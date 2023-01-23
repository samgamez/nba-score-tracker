import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface NbaApiRequest {
	headers?: HttpHeaders;
	params?: HttpParams;
}