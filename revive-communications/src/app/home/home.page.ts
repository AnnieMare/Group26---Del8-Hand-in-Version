import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private service : MessageService,
    private router: Router,
    private loginService: LoginService
  ) { }
  Announcement;
 
  Person:any;
  session:any;


  ngOnInit() {
    this.session ={"SessionID": localStorage.getItem("accessToken")}
    this.loginService.getUserDetails(this.session).subscribe(res =>{
      this.Person = res;
      this.service.getAnnouncements(this.Person.PersonID).subscribe(x =>{
        this.Announcement = x; })
      });
      
  }

}
