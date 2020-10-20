import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MemberServeFollowUpService } from 'src/app/Services/member-serve-follow-up.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-members-wanting-to-serve-follow-up',
  templateUrl: './members-wanting-to-serve-follow-up.page.html',
  styleUrls: ['./members-wanting-to-serve-follow-up.page.scss'],
})
export class MembersWantingToServeFollowUpPage implements OnInit {
  
  ProgressCheck: boolean;
  groups: boolean;
  MemberServe: any;
  MembersProgress: any;
  NoFollowUpsLeft: string;
  TotalFollowUps: any;
  session: { SessionID: string; };
  Person: any;
  
  constructor(private memberServeFUService: MemberServeFollowUpService, private loginService: LoginService, public toastController: ToastController, private callNumber: CallNumber) { }

  ngOnInit() {
    if(!localStorage.getItem("accessToken")){
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;
        console.log(this.Person)
      })
    }
    this.ProgressCheck = false; //disable progress on form load

       //retrieving data for follow-up from service
       this.memberServeFUService.getMembersServe().subscribe(data=> {this.MemberServe = data;
       });
       console.log(this.MemberServe);

       this.memberServeFUService.getMemberServeProgress().subscribe(data=> {this.MembersProgress = data;
        this.TotalFollowUps = this.MembersProgress.Remaining + this.MembersProgress.Completed;
        //if no salvations are remaining on form load
        if(this.MembersProgress.Remaining == 0)
        {
          this.NoFollowUpsLeft = 'No follow-ups remaining.';
        }
        console.log(this.MembersProgress);
      });
  }

  //shows and hide progress on button click
  Check(){
    if(this.ProgressCheck == false)
    {
      this.ProgressCheck = true;
    }
    else{
      this.ProgressCheck = false;
    }
  }

  FollowedUp(selectedMember)
  {
    var data = { MemberID: selectedMember, PersonID: 18 }
    this.memberServeFUService.FollowUpCompletedMember(data).subscribe(x=> {
    //present message that follow-up was completed
    this.presentToast('Follow-up was completed successfully');
    //update table based on new data
    this.MemberServe = x;
    //update progress based on updated data
    this.getProgress();
  }); 
}

NoAnswer(selectedMember)
{
  var data = { MemberID: selectedMember, PersonID: 18 }
  this.memberServeFUService.FollowUpNoAnswerMember(data).subscribe(x=> {
     //present message that follow-up was not completed
    this.presentToast('Follow-up was not completed. Please try again later.');
    //update table based on new data
    this.MemberServe = x;
    //update progress based on updated data
    this.getProgress();
  });
}

getProgress()
{
  this.memberServeFUService.getMemberServeProgress().subscribe(data=> {this.MembersProgress = data
    this.TotalFollowUps = this.MembersProgress.Remaining + this.MembersProgress.Completed;
    //if no salvations are remaining
    if(this.MembersProgress.Remaining == 0)
    {
      this.NoFollowUpsLeft = 'No follow-ups remaining.';
    }
    console.log(this.MembersProgress);});
}

  CheckGroups(){
      
    if(this.groups == false)
    {
      this.groups = true;
    }
    else{
      this.groups = false;
    }
  }
     //messagbox to display
  async presentToast(displayMessage) {
    const toast = await this.toastController.create({
    message: displayMessage,
    duration: 5000
    });
     toast.present();
    }

    //Call a number directly from your Cordova/Ionic application
  callPerson(number)
  {
    console.log(number);
    //using call Number native
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  }
