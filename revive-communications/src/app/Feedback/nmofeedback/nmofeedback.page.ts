import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/Services/login.service';
import { ReportNMOService } from 'src/app/Services/report-nmo.service';

@Component({
  selector: 'app-nmofeedback',
  templateUrl: './nmofeedback.page.html',
  styleUrls: ['./nmofeedback.page.scss'],
})
export class NMOFeedbackPage implements OnInit {
  show: boolean;
  ReportOnNMO;

  Person:any;
    session:any;
  constructor(
    private toastrService: ToastController,
    private router: Router,
    private service: ReportNMOService,
    private loginService: LoginService,

  ) { }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

  ngOnInit() {
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

  
  
  AddNMOform(form)
  {
    var Person = { Name : "Ndlali", PersonID: 18}
    console.log(form);
    var data ={form : form, Person: Person}
    this.service.AddNMO(data).subscribe(x =>{
      this.presentToast();
      location.reload()
    });
  }

  async presentToast() {
    const toast = await this.toastrService.create({
      message: 'NMO feedback saved.',
      duration: 2000
    });
    toast.present();
  }


}
