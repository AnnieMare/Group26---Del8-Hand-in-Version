import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  thisPerson;
  errorMessage: string;
  showError = false;
  withoutOTP;

  constructor(private loginService: LoginService,private toastrService: NbToastrService,private restpassService: ResetPasswordService, private sidebarService: NbSidebarService, private router: Router) { }


  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

   Person:any;
	  session:any;
  ngOnInit()
  {

  }

  reset(OTP, pass){
    var data = {OTP: OTP, Password: pass}
    console.log(data);
    this.restpassService.ResetPassword(data).subscribe(x => {
      console.log(x)
      });
      this.router.navigate(["/"]).then(() => {
        this.SuccessMessage('top-right', 'success');
      });

  }

 openForm() {
    document.getElementById("myForm").style.display = "block";
  }

 closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  openOTP() {
    document.getElementById("OTP").style.display = "block";
    document.getElementById("NewPassword").style.display = "block";

  }
  openConfirm() {
    document.getElementById("Confirm").style.display = "block";
  }

  callOTP(username , dob)
  {
    
    
   var person ={Username : username, DateOfBirth: dob}
    console.log(person);
    this.restpassService.sendOTP(person).subscribe((x:any) => {
      console.log(x);
      if (x != "OTP Send"){
        this.errorMessage = x.Error;
        this.showError = true;
      
      }
      else{
        document.getElementById("OTP").style.display = "block";
        document.getElementById("NewPassword").style.display = "block";
        document.getElementById("Confirm").style.display = "block";
        this.showError = false;

      }
     
      });
  }

  SuccessMessage(position, status) {

    this.toastrService.show(
      status || 'Success',
      `Your password has been updated successfully.`,
      { position, status});
  }

}
