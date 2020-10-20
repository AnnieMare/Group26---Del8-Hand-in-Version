import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SalvationService } from 'src/app/Services/salvation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salvation-form',
  templateUrl: './salvation-form.page.html',
  styleUrls: ['./salvation-form.page.scss'],
})
export class SalvationFormPage implements OnInit {
PersonalInformation: boolean;
Education: boolean;
PrayerRequest: boolean;

  
today: number = Date.now();

//variables to enable education
School: boolean;
University: boolean;

 //variables to enable invitee information
 Invite: boolean;
Invited: number;
  salvation: any;
  messageReturn: any;
  consentConfirm: boolean;
  yourSelectedRadioValue:any;
  checkEducationSelection: boolean;
  checkInviteSelection: boolean;

constructor(private SalvationService: SalvationService, public toastController: ToastController, private router: Router) {
}

ngOnInit(): void {
  this.School = false;
  this.University = false;
  this.Invite = false;
  this.consentConfirm = true;
  this.checkEducationSelection = false;
  this.checkInviteSelection = false;
}

//Add method that will send the form data to the service
addSalvationForm(form) {
  console.log(form);  

  if(!this.checkEducationSelection)
  {
    this.messageReturn = 'Please select your level of education.';
    console.log(this.messageReturn)
    this.presentToast(this.messageReturn)
  }
  else if(!this.checkInviteSelection)
  {
    this.messageReturn = 'Please indicate if you have been invited.';
    console.log(this.messageReturn)
    this.presentToast(this.messageReturn)
  }
  else{
    this.SalvationService.addNewSalvation(form.value).subscribe(message => {
      this.messageReturn = message;
      console.log(this.messageReturn)
      this.presentToast(this.messageReturn).then(()=>{
        this.router.navigate(["/"]);
      })
    });  
  }
}

//Methods that will enable education sections
enableUniversity()
{
  this.University = true;
  this.School = false;
  this.checkEducationSelection = true;
}
enableSchool()
{
  this.School = true;
  this.University = false;
  this.checkEducationSelection = true;
}
enableInvite()
{
  this.Invite = true;
  this.Invited = 1;
  this.checkInviteSelection = true;
}
disableInvite()
{
  this.Invite = false;
  this.Invited = 0;
  this.checkInviteSelection = true;
}

neither(){
  this.School = false;
  this.University = false;
  this.checkEducationSelection = true;
}

consent(){
  this.consentConfirm = false;
}

  async presentToast(displayMessage) {
  const toast = await this.toastController.create({
  message: displayMessage,
  duration: 5000
  });
   toast.present();
  }
}

