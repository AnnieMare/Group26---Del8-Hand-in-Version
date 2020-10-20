import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SalvationService } from 'src/app/Services/salvation.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-salvation-followup',
  templateUrl: './salvation-followup.page.html',
  styleUrls: ['./salvation-followup.page.scss'],
})
export class SalvationFollowupPage implements OnInit {

  ProgressCheck: boolean;
  Salvations: any;
  SalvationsProgress: any;
  NoFollowUpsLeft: any;
  TotalFollowUps: any;
  Person:any;
  session:any;

  constructor(private SalvationService: SalvationService,private loginService: LoginService, public toastController: ToastController, private callNumber: CallNumber) { }

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

    this.SalvationService.getSalvation().subscribe(data=> {this.Salvations = data;
      console.log(this.Salvations);

      //if no salvations are returned
      if(this.Salvations == null)
      {
        this.NoFollowUpsLeft = 'No follow-ups remaining.';
      }
    });

      this.SalvationService.getSalvationProgress().subscribe(data=> {this.SalvationsProgress = data;
        this.TotalFollowUps = this.SalvationsProgress.Remaining + this.SalvationsProgress.Completed;
        //if no salvations are remaining on form load
        if(this.SalvationsProgress.Remaining == 0)
        {
          this.NoFollowUpsLeft = 'No follow-ups remaining.';
        }
        console.log(this.Salvations);
      });
  }
    
    FollowedUp(selectedSalvation)
    {
      var data = { SalID : selectedSalvation, PersonID: 18};
      this.SalvationService.FollowUpCompleted(data).subscribe(x=> {
      //present message that follow-up was completed
      this.presentToast('Follow-up was completed successfully');
      //update table based on new data
      this.Salvations = x;
      //update progress based on updated data
      this.getProgress();
    }); 
  }

  NoAnswer(selectedSalvation)
  {    
    var data = { SalID : selectedSalvation, PersonID: 18};
    this.SalvationService.FollowUpNoAnswer(data).subscribe(x=> {
       //present message that follow-up was not completed
      this.presentToast('Follow-up was not completed. Please try again later.');
      //update table based on new data
      this.Salvations = x;
      //update progress based on updated data
      this.getProgress();
    });
  }

  getProgress()
  {
    this.SalvationService.getSalvationProgress().subscribe(data=> {this.SalvationsProgress = data
      this.TotalFollowUps = this.SalvationsProgress.Remaining + this.SalvationsProgress.Completed;
      //if no salvations are remaining
      if(this.SalvationsProgress.Remaining == 0)
      {
        this.NoFollowUpsLeft = 'No follow-ups remaining.';
      }
      console.log(this.SalvationsProgress);});
  }

  //shows and hide progress on button click
  enableProgress()
  {
    if(this.ProgressCheck == false)
    {
      this.ProgressCheck = true;
    }
    else
    {
      this.ProgressCheck = false;
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
