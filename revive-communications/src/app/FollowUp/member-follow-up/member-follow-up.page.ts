import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FollowUpMemberService} from 'src/app/Services/follow-up-member.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-follow-up',
  templateUrl: './member-follow-up.page.html',
  styleUrls: ['./member-follow-up.page.scss'],
})
export class MemberFollowUpPage implements OnInit {
  MemberView : any;
  Person:any;
  session:any;
  
  constructor(private service: FollowUpMemberService, private router: Router, private loginService: LoginService,private callNumber: CallNumber) { }

  ngOnInit() {
    this.service.getMembers().subscribe(x => {

      console.log(x);
      this.MemberView = x;
    });

    if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;
        console.log(this.Person)
      })
    }
  }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }
  popOff(Member)
  {
    if(confirm('Is this follow-up Completed??'))
    {
      this.service.MoveToBack(Member).subscribe(res=>
        {
          this.service.getMembers();
    
        });
    }
    location.reload();
  }
  callPerson(number)
  {
    console.log(number);
    //using call Number native
    this.callNumber.callNumber(number, true)
    //.then(res => console.log('Launched dialer!', res))
    //.catch(err => console.log('Error launching dialer', err));
  }

}
