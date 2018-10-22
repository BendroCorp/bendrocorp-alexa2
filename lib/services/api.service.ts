import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Rxios } from 'rxios'
import axios, { AxiosPromise } from 'axios';
import { User } from '../models/user.model';
import { Globals } from '../globals'
import { Event } from '../models/events.model';
import { ApprovalApprover } from '../models/approval.model'
import { StatusMessage } from '../models/misc.model'

export class ApiService
{

    constructor(private globals:Globals) { }

    me(accessToken:string) : AxiosPromise<User> //Observable<User>
    {
        // let http = new Rxios({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        // return http.get<User>(`${this.globals.baseUrl}/api/user/me`).pipe(
        //     tap(results => console.log())
        // )
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        return http.get<User>(`${this.globals.baseUrl}/user/me`)
    }

    events(accessToken:string) : AxiosPromise<Event[]> //Observable<Event[]>
    {
        // let http = new Rxios({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        // return http.get<Event[]>(`${this.globals.baseUrl}/events`).pipe(
        //     tap(results => console.log())
        // )
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        return http.get<Event[]>(`${this.globals.baseUrl}/events`)
    }

    approvals(accessToken:string) : AxiosPromise<ApprovalApprover[]>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        return http.get<ApprovalApprover[]>(`${this.globals.baseUrl}/user/approvals`)
        // let http = new Rxios({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        // return http.get<ApprovalApprover[]>(`${this.globals.baseUrl}/user/approvals`).pipe(
        //     tap(results => console.log())
        // )
    }

    submit_approval(accessToken:string, approval_id:number, approval_type_id:number) : AxiosPromise<StatusMessage>
    {
        const http = axios.create({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        return http.get<StatusMessage>(`${this.globals.baseUrl}/approvals/${approval_id}/${approval_type_id}`)

        // let http = new Rxios({ headers: { 'Authorization': 'Basic ' + accessToken, 'Accept': 'application/json' } })
        // return http.get<StatusMessage>(`${this.globals.baseUrl}/approvals/${approval_id}/${approval_type_id}`).pipe(
        //     tap(results => console.log(`Submitted approval change for approval #${approval_id}`))
        // )
        
    }
}