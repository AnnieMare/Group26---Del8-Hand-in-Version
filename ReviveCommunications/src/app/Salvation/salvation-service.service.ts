import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalvationServiceService {
  constructor( private http: HttpClient) {}

  addNewSalvation(newSalvation)
  {
    this.http.post('https://localhost:44390/api/Salvation/addSalvationInformation', newSalvation).subscribe(x => {
      console.log(x)
    })
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



