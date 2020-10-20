import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersWantingToServeFollowUpService {

  constructor( private http: HttpClient) {}

  FollowUpCompletedMember(MemberInfo: any)
  {
    console.log(MemberInfo);
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateMembersServeFollowUp', MemberInfo)
  }

  FollowUpNoAnswerMember(MemberInfo)
  {
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateMembersServeNoAnswer', MemberInfo)
  }

  getMembersServe(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getMembersWantingToServe');
  }


  getMemberServeProgress(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getMemberServeProgress');
  }
  getDiscProgress(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getDiscProgress');
  }
}
