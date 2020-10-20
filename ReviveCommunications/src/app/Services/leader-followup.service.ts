import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderFollowupService {

  constructor( private http: HttpClient) {}

  getLeaders(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getLeaders');
  }

  getLeaderProgress(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getLeaderProgress');
  }


  FollowUpCompleted(LeaderInfo)
  {
    console.log(LeaderInfo);
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateLeaderFollowUP', LeaderInfo)
  }

  FollowUpNoAnswer(LeaderInfo)
  {
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateLeaderFollowUPNoAnswer', LeaderInfo)
  }

  LeaderFollowUp(LeaderList)
  {
    return this.http.post('https://localhost:44390/api/FollowUp/LeaderFollowUp', LeaderList);
  }

  getOverseers(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getOverseers');
  }

  getOverseerProgress(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getOverseerProgress');
  }


  FollowUpOVCompleted(LeaderInfo)
  {
    console.log(LeaderInfo);
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateOverseerFollowUP', LeaderInfo)
  }

  FollowUpOVNoAnswer(LeaderInfo)
  {
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateOverseerFollowUPNoAnswer', LeaderInfo)
  }
  
}
