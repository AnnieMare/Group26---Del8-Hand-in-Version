import { Component, OnInit } from '@angular/core';
import { CounsellingService } from 'src/app/Services/counselling.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-add-counselling-request',
  templateUrl: './add-counselling-request.page.html',
  styleUrls: ['./add-counselling-request.page.scss'],
})
export class AddCounsellingRequestPage implements OnInit {

  CounsellingRequest;
  Person:any;
  session:any;
  constructor(private router:Router, private service: CounsellingService, private loginService: LoginService) { }

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
  AddCounsellingForm(form){
    console.log(form);
    form.PersonID = this.Person.PersonID;
    this.service.AddCounselling(form);
  }

}
