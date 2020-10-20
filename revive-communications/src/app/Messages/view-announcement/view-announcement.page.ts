import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.page.html',
  styleUrls: ['./view-announcement.page.scss'],
})
export class ViewAnnouncementPage implements OnInit {

  constructor(
    private service : MessageService,
    private router: Router,
    private loginService: LoginService
  ) { }
  Announcement;
 
  Person:any;
  session:any;
  
  ngOnInit() {


    if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
      console.log('Empty session')
    }
    else{
      console.log("Session not empty")
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;
        this.service.getAnnouncements(this.Person.PersonID).subscribe(x =>{
          this.Announcement = x; })
        
        console.log(this.Person)
        console.log(res)
      })
    }

    
  }

  onDismiss(a){
    console.log(a);
    if(confirm('Are you sure you want to dismiss this Announcement?'))
    {
      this.service.dismissAnnouncement(a).subscribe(x =>{
        location.reload();
      })
    }
  }
  
  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

}
