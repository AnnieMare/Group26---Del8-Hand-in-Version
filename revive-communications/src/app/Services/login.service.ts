import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/app/model/person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': "token",
    'Access-Control-Allow-Origin': "*"
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(person)
  {
    return this.http.post('https://localhost:44390/api/Login/Login', person, httpOptions)
  }

  RegisterPerson(person)
  {
    console.log(person)
    return this.http.post('https://localhost:44390/api/Login/RegisterPerson', person)
    
  }
  getUserDetails(session:any){
    console.log(session)
    return this.http.post('https://localhost:44390/api/Login/PersonDetails', session, httpOptions)
  }
 
}

