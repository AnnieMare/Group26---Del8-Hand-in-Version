import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowUpDiscService {

  private SERVER_URL = 'https://localhost:44390/';
  constructor(private http: HttpClient,
    private router: Router) { }


     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })

    };
    completeFollowUp(data){
      return this.http.post<any[]>(this.SERVER_URL + "api/FollowUp/UpdateDiscipleshipFollowUp", data)
  }

    getFollowUpList(){

      return this.http.get<any[]>(this.SERVER_URL + "api/FollowUp/getPersonDiscInfo" )
    }
  }






    // getMemberDiscData(){
    //   return this.http.get<any[]>(this.SERVER_URL + "api/FollowUp/getMemberDiscData");
    // }



