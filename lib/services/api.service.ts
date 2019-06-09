import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Rxios } from 'rxios'
import axios, { AxiosPromise } from 'axios';
import { User } from '../models/user.model';
import { Globals } from '../globals'
import { Event } from '../models/events.model';
import { ApprovalApprover } from '../models/approval.model'
import { StatusMessage, PendingApprovalCount } from '../models/misc.model'

export class ApiService
{

    constructor(private globals:Globals) { }

    me(accessToken:string) : AxiosPromise<User> //Observable<User>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } });
        return http.get<User>(`${this.globals.baseUrl}/user/me`);
    }

    events(accessToken:string) : AxiosPromise<Event[]> //Observable<Event[]>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } });
        return http.get<Event[]>(`${this.globals.baseUrl}/events`);
    }

    approvals(accessToken:string) : AxiosPromise<ApprovalApprover[]>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } });
        return http.get<ApprovalApprover[]>(`${this.globals.baseUrl}/user/approvals`);
    }

    submit_approval(accessToken:string, approval_id:number, approval_type_id:number) : AxiosPromise<StatusMessage>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } });
        return http.get<StatusMessage>(`${this.globals.baseUrl}/approvals/${approval_id}/${approval_type_id}`);
    }

    pending_approval_count(accessToken: string) : AxiosPromise<PendingApprovalCount>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } });
        return http.get<PendingApprovalCount>(`${this.globals.baseUrl}/approvals/pending`);
    }

    override_all_approvals(accessToken: string, code: number) : AxiosPromise<StatusMessage>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } });
        return http.post<StatusMessage>(`${this.globals.baseUrl}/approvals/override`, { code });
    }

    override_approval(accessToken: string, code: number, approval_id: number, approval_type_id: number) : AxiosPromise<StatusMessage>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } });
        return http.post<StatusMessage>(`${this.globals.baseUrl}/approvals/override/${approval_id}`, { code, approval_type_id });
    }
}