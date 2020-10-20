import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/person';

@Injectable({
  providedIn: 'root'
})
export class ActivationstatusService {

  member;
  constructor(private http: HttpClient) { }

  RequestReactivate(person)
  {
    console.log(person)
    return this.http.post('https://localhost:44390/api/Activation/Reactivate', person)
  }
  RequestDeactivate(person)
  {
    return this.http.post('https://localhost:44390/api/Activation/DeActivate', person)
  }
  
  getRequests(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Activation/getAllRequests');
  }


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  updateActivationStatus(activationStatus)
  {
    this.http.post('https://localhost:44390/api/Activation/updateActivation', activationStatus, this.httpOptions).subscribe(d => {
      console.log(d)
    });
  }
}
