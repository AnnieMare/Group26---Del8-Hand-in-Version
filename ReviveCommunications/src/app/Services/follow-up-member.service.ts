import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FollowUpMemberService {

  readonly rootURL = "https://localhost:44390/api"

  constructor(private http: HttpClient, private router: Router) { }


  getMembers()
  {
    return this.http.get(this.rootURL+'/FollowUp/GetMembers')
  }

  MoveToBack(PopList)
  {
    return this.http.post(this.rootURL+'/FollowUp/PopMember', PopList);
  }


}
