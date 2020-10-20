import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { LeaderFollowupService } from 'src/app/Services/leader-followup.service';

@Component({
  selector: 'app-leader-follow-up',
  templateUrl: './leader-follow-up.page.html',
  styleUrls: ['./leader-follow-up.page.scss'],
})
export class LeaderFollowUpPage implements OnInit {

  ProgressCheck: boolean;
  groups: boolean;
  Leaders: any;
  LeaderProgress: any;
  NoFollowUpsLeft: string;
  TotalFollowUps: any;
  session: { SessionID: string; };
  Person: any;
  NMOProgress: any;
  Progress: any;
  
  constructor(private leaderService: LeaderFollowupService, private loginService: LoginService, public toastController: ToastController, private callNumber: CallNumber, private router: Router) { }

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
       this.leaderService.getLeaders().subscribe(data=> {
        console.log(data)
        //if no NMO's are returned
        // if(this.Leaders == null)
        // {
        //   this.NoFollowUpsLeft = 'No follow-ups remaining.';
        // }

        this.leaderService.getLeaderProgress().subscribe(x=> {this.LeaderProgress = x;
          this.TotalFollowUps = this.LeaderProgress.Remaining + this.LeaderProgress.Completed;
          //if no leaders are remaining on form load
          if(this.LeaderProgress.Remaining == 0)
          {
            this.NoFollowUpsLeft = 'No follow-ups remaining.';
          }
          else{
            this.Leaders = data;
          }
          console.log(this.LeaderProgress);
        });
      });

       
  }

  FollowedUp(selectedMember)
  {
    var data = { LeaderID : selectedMember, PersonID: 18};
    console.log(selectedMember);
    this.leaderService.FollowUpCompleted(data).subscribe(x=> {
    //present message that follow-up was completed
    this.presentToast('Follow-up was completed successfully');
    //update table based on new data
    this.Leaders = x;
    //update progress based on updated data
    this.getProgress();
    this.leaderService.getLeaders().subscribe(data=> {this.Leaders = data;
    });
    console.log(this.Leaders);
  }); 
}

NoAnswer(selectedMember)
{
  var data = { LeaderID: selectedMember, PersonID: 18 }
  this.leaderService.FollowUpNoAnswer(data).subscribe(x=> {
     //present message that follow-up was not completed
    this.presentToast('Follow-up was not completed. Please try again later.');
    //update table based on new data
    this.Leaders = x;
    //update progress based on updated data
    this.getProgress();
  });
}

getProgress()
{
  this.leaderService.getLeaderProgress().subscribe(data=> {this.LeaderProgress = data
    this.TotalFollowUps = this.LeaderProgress.Remaining + this.LeaderProgress.Completed;
    //if no salvations are remaining
    if(this.LeaderProgress.Remaining == 0)
    {
      this.NoFollowUpsLeft = 'No follow-ups remaining.';
    }
    console.log(this.LeaderProgress);});
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

}

