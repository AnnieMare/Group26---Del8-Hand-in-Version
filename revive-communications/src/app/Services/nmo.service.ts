import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NMOService {

  constructor( private http: HttpClient) {}

  getNMO(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getNMO');
  }

  getNMOProgress(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getNMOProgress');
  }


  FollowUpCompleted(NMOInfo)
  {
    console.log(NMOInfo);
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateNMOFollowUP', NMOInfo)
  }

  FollowUpNoAnswer(NMOInfo)
  {
    return this.http.post('https://localhost:44390/api/FollowUp/UpdateNMOFollowUPNoAnswer', NMOInfo)
  }
}
