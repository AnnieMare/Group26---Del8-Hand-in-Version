import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NMOService } from 'src/app/Services/nmo.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nmo-followup',
  templateUrl: './nmo-followup.page.html',
  styleUrls: ['./nmo-followup.page.scss'],
})
export class NmoFollowupPage implements OnInit {
  
  ProgressCheck: boolean;
  groups: boolean;
  NMO: any;
  MembersProgress: any;
  NoFollowUpsLeft: string;
  TotalFollowUps: any;
  session: { SessionID: string; };
  Person: any;
  NMOProgress: any;
  Progress: any;
  
  constructor(private NMOService: NMOService, private loginService: LoginService, public toastController: ToastController, private callNumber: CallNumber, private router: Router) { }

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
       this.NMOService.getNMO().subscribe(data=> {this.NMO = data;
        console.log(data)
        //if no NMO's are returned
        if(this.NMO == null)
        {
          this.NoFollowUpsLeft = 'No follow-ups remaining.';
        }
      });

       this.NMOService.getNMOProgress().subscribe(data=> {this.MembersProgress = data;
        this.TotalFollowUps = this.MembersProgress.Remaining + this.MembersProgress.Completed;
        //if no salvations are remaining on form load
        if(this.MembersProgress.Remaining == 0)
        {
          this.NoFollowUpsLeft = 'No follow-ups remaining.';
        }
        console.log(this.MembersProgress);
      });
  }

  FollowedUp(selectedMember)
  {
    var data = { NMOID : selectedMember, PersonID: 18};
    console.log(selectedMember);
    this.NMOService.FollowUpCompleted(data).subscribe(x=> {
    //present message that follow-up was completed
    this.presentToast('Follow-up was completed successfully');
    //update table based on new data
    this.NMO = x;
    //update progress based on updated data
    this.getProgress();
    this.NMOService.getNMO().subscribe(data=> {this.NMO = data;
    });
    console.log(this.NMO);
  }); 
}

NoAnswer(selectedMember)
{
  var data = { MemberID: selectedMember, PersonID: 18 }
  this.NMOService.FollowUpNoAnswer(data).subscribe(x=> {
     //present message that follow-up was not completed
    this.presentToast('Follow-up was not completed. Please try again later.');
    //update table based on new data
    this.NMO = x;
    //update progress based on updated data
    this.getProgress();
  });
}

getProgress()
{
  this.NMOService.getNMOProgress().subscribe(data=> {this.NMOProgress = data
    this.TotalFollowUps = this.NMOProgress.Remaining + this.NMOProgress.Completed;
    //if no salvations are remaining
    if(this.NMOProgress.Remaining == 0)
    {
      this.NoFollowUpsLeft = 'No follow-ups remaining.';
    }
    console.log(this.NMOProgress);});
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
