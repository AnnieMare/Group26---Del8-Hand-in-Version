import { Component, OnInit } from '@angular/core';
import {LoginService} from 'src/app/Services/login.service';
import {Router} from '@angular/router';

import {FormsModule} from '@angular/forms';
import {Person} from 'src/app/model/person';
//import { Child } from 'src/app/model/child';

//import { NbToastrService, NbSidebarService,NbMenuItem } from '@nebular/theme';
//import { FormBuilder,  } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private loginService: LoginService,private router : Router, public toastController: ToastController
   ) { }

  ngOnInit() { this.consentConfirm = true;
  }
  Person:any;
  session:any;
  PersonalInformation: boolean;
  messageReturn: any;
  consentConfirm: boolean;
//Add method that will send the form data to the service


  openSecurity() {
    document.getElementById("Security").style.display = "block";
    document.getElementById("Personal").style.display = "none";
  }
  openDone() {
    document.getElementById("Done").style.display = "block";
    document.getElementById("Security").style.display = "none";
  }
  checked : boolean = false;
  openForm(): void {
    document.getElementById("ChildForm").style.display = "block";
    console.log(this.checked);//it is working !!!

  }

  
  onSubmitPerson(form){
    console.log(form);
    this.loginService.RegisterPerson(form).subscribe(x => {
      
      this.router.navigate(['/'])
    });
    //this.showToast('top-right', 'success');
   
      //this.router.navigateByUrl("staff")
    
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
