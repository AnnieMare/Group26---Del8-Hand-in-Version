import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendOTP(person)
  {
    return this.http.post('https://localhost:44390/api/Login/loginSendOTP', person, httpOptions).subscribe(a => {
      console.log(a);
    })
  }
  getThisPerson(){
    return this.http.get('https://localhost:44390/api/Login/getPersonByID');
  }

  callOTP(person)
  {
     return this.http.post('https://localhost:44390/api/Login/SendOTP', person, httpOptions).subscribe(a => {
      console.log(a);
    })
  }
  ResetPassword(person)
  {
   
    return this.http.put('https://localhost:44390/api/Login/ResetPassword', person).subscribe(x => {
    console.log(x)
    })
    
  }

}
