import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private SERVER_URL = 'https://localhost:44390/';
  constructor(private http: HttpClient,
    private router: Router) { }

    getPeople(){
      return this.http.get<any>(this.SERVER_URL + 'api/Messages/GetPeople');
    }

    postAnnouncement( ann){
      return this.http.post<any>(this.SERVER_URL + "api/Messages/PostAnnouncement", ann);
    }

    sendInvitation(inv){
     return this.http.post<any>(this.SERVER_URL + "api/Messages/SendInvitation", inv)
    }

    getAnnouncements(PersonID){
      console.log(PersonID)
      return this.http.post(this.SERVER_URL + "api/Messages/retrieveAnnouncements" , PersonID)
    }

    getInvitations(p){
      console.log(p)
      return this.http.post(this.SERVER_URL + "api/Messages/retrieveInvitations" , p)
    }

    retrieveAllAnnouncements(personID){
      console.log()
      return this.http.post(this.SERVER_URL + "api/Messages/retrieveAllAnnouncements", personID)
    }

    DeleteAnnouncement(a){
      return this.http.post<any>(this.SERVER_URL + "api/Messages/delAnnouncement", a)
    }

    dismissAnnouncement(a){
      return this.http.post<any>(this.SERVER_URL + "api/Messages/dismissAnnouncement", a)
    }
    dismissInvitation(a){
      return this.http.post<any>(this.SERVER_URL + "api/Messages/dismissInvitation ", a)
    }
}
