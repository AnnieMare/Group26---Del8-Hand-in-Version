import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalvationService {
  constructor( private http: HttpClient) {}

  addNewSalvation(newSalvation)
  {
    return this.http.post('https://localhost:44390/api/Salvation/addSalvationInformation', newSalvation)
  }

  getSalvation(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getSalvation');
  }

  getSalvationProgress(): Observable<any>{
    return this.http.get('https://localhost:44390/api/FollowUp/getSalvationProgress');
  }

  FollowUpCompleted(SalInfo: any)
  {
    console.log(SalInfo);
    return this.http.post('https://localhost:44390/api/FollowUp/CompletedSalvationFollowUp', SalInfo)
  }

  FollowUpNoAnswer(Salinfo)
  {
    return this.http.post('https://localhost:44390/api/FollowUp/SalvationFollowUpNoAnswer', Salinfo)
  }
}
