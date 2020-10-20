import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { LeaderFollowupService } from 'src/app/Services/leader-followup.service';

@Component({
  selector: 'app-overseer-follow-up',
  templateUrl: './overseer-follow-up.page.html',
  styleUrls: ['./overseer-follow-up.page.scss'],
})
export class OverseerFollowUpPage implements OnInit {

  ProgressCheck: boolean;
  groups: boolean;
  Overseers: any;
  OverseerProgress: any;
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
       this.leaderService.getOverseers().subscribe(data=> {
        console.log(data)

        this.leaderService.getOverseerProgress().subscribe(x=> {this.OverseerProgress = x;
          this.TotalFollowUps = this.OverseerProgress.Remaining + this.OverseerProgress.Completed;
          //if no leaders are remaining on form load
          if(this.OverseerProgress.Remaining == 0)
          {
            this.NoFollowUpsLeft = 'No follow-ups remaining.';
          }
          else{
            this.Overseers = data;
          }
          console.log(this.OverseerProgress);
        });
      });
  }


  FollowedUp(selectedMember)
  {
    var data = { OverseerID : selectedMember, PersonID: 18};
    console.log(selectedMember);
    this.leaderService.FollowUpOVCompleted(data).subscribe(x=> {
    //present message that follow-up was completed
    this.presentToast('Follow-up was completed successfully');
    //update table based on new data
    this.Overseers = x;
    //update progress based on updated data
    this.getProgress();
    this.leaderService.getOverseers().subscribe(data=> {this.Overseers = data;
    });
    console.log(this.Overseers);
  }); 
}

NoAnswer(selectedMember)
{
  var data = { OverseerID: selectedMember, PersonID: 18 }
  this.leaderService.FollowUpOVNoAnswer(data).subscribe(x=> {
     //present message that follow-up was not completed
    this.presentToast('Follow-up was not completed. Please try again later.');
    //update table based on new data
    this.Overseers = x;
    //update progress based on updated data
    this.getProgress();
  });
}

getProgress()
{
  this.leaderService.getOverseerProgress().subscribe(data=> {this.OverseerProgress = data
    this.TotalFollowUps = this.OverseerProgress.Remaining + this.OverseerProgress.Completed;
    //if no salvations are remaining
    if(this.OverseerProgress.Remaining == 0)
    {
      this.NoFollowUpsLeft = 'No follow-ups remaining.';
    }
    console.log(this.OverseerProgress);});
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
