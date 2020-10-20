import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-view-invitation',
  templateUrl: './view-invitation.page.html',
  styleUrls: ['./view-invitation.page.scss'],
})
export class ViewInvitationPage implements OnInit {
  Person:any;
  session:any;
  Invitation;

  constructor(
    private service: MessageService,    
     private router : Router,
      private loginService:LoginService,
     
  ) { }

  ngOnInit() {

    if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;
        this.service.getInvitations(this.Person.PersonID).subscribe(x => {
          this.Invitation= x;
          console.log(x)
        })
        console.log(this.Person)
      })
    }


  }

  
  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

  onDismiss(a){
    console.log(a);
    if(confirm('Are you sure you want to dismiss this Invitation?'))
    {
      this.service.dismissInvitation(a).subscribe(x =>{
        location.reload();
      })
    }
  }

}
