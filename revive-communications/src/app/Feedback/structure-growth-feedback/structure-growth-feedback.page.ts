import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/Services/login.service';
import { ReportStructureGrowthService } from 'src/app/Services/report-structure-growth.service';

@Component({
  selector: 'app-structure-growth-feedback',
  templateUrl: './structure-growth-feedback.page.html',
  styleUrls: ['./structure-growth-feedback.page.scss'],
})
export class StructureGrowthFeedbackPage implements OnInit {

  ReportStructureGrowth;
  StructureGrowth;

  Person:any;
	  session:any;
  constructor(
    private toastrService: ToastController,
    private router:Router,
    private service: ReportStructureGrowthService,
    private loginService: LoginService
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

  
  AddStructureGrowthform(form)
  {
    console.log(form);
    var Person = { Name : "Ndlali", PersonID: 18}
    console.log(form);
    var data ={form : form, Person: Person}
    this.service.AddStructureGrowth(data).subscribe(x =>{
      this.presentToast();
      location.reload();
      });
  }
  async presentToast() {
    const toast = await this.toastrService.create({
      message: 'Structure Growth feedback saved.',
      duration: 2000
    });
    toast.present();
  }


}
