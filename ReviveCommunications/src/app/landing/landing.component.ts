import { Component, NgModule, OnInit } from '@angular/core';
import { NbSidebarService, NbToastrService, NbMenuItem } from '@nebular/theme';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { FormsModule } from '@angular/forms';
//import { FormBuilder } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  login: boolean;
  card : boolean;
  startCard: boolean;
  register: boolean;

  person: Person = new Person();
  errorMessage: string;
  showError = false;

  loginperson;

  duration = 3000;
  createdChild;
  dataSaved = false;  
  childForm: any;  
  ChildID = null; 

  


  constructor(
    private sidebarService: NbSidebarService,
    private toastrService: NbToastrService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder : FormBuilder,
   
  ) 
  {
    this.loginperson = this.formBuilder.group(
      {
        Username: ['', Validators.required],
        Password: ['', Validators.required]
      }
    );
  }
  

 // Creates the sidebar menue items


  ngOnInit(): void 
  {
    this.login = false;
    this.card = false;
    this.showError = false;

    if (localStorage.getItem("accessToken")) {
      this.router.navigateByUrl("/Home")
    }
  
      this.startCard = true;
  }

  getStarted()
  {
    this.startCard = false;
    this.card = true;
    this.login = false;
 
  }

  Login()
  {
    this.login = true;
    this.card = false;
    this.startCard = false;
  }

  LoginPerson(form)
  {
    /*
    this.loginService.Login(form).subscribe( (res: any) => {
      console.log(res);
      if (res.Error) {
        this.errorMessage = res.Error;
        this.showError = true;
      }
      else {
        localStorage.setItem("accessToken", res.SessionID);
        this.router.navigateByUrl("/Home")
        this.showError = false;
      }
    })
    */

    console.log(form)
    /*
    this.loginService.Login(form);
    if (form.Error)
    {
      this.showError = true;
      this.errorMessage = form.Error;      
    }
    else
    {
      localStorage.setItem("accessToken", form.SessionID);
        this.router.navigateByUrl("/Home");
        this.showError = false;
    }*/
    
    
    this.loginService.Login(form).subscribe((res: any) => {
      console.log(res);
      if (res.Error){
        this.errorMessage = res.Error;
        this.showError = true;
      }
      else{
        localStorage.setItem("accessToken", res.SessionID);
        this.router.navigateByUrl("/Home");
        this.showError = false;
      }
    })
  }

  resetPassword()
  {
    this.router.navigateByUrl("/ResetPassword")
  }

  Register()
  {
    this.register = true;
    this.card = false;
    this.startCard = false;
  }

  ViewChildren(){
  
    document.getElementById("ChildDiv").style.display = "block";
  
}
  /*
  onSubmitPerson(){
    this.loginService.RegisterPerson(this.person).subscribe((res: Person) => {
      localStorage.setItem("accessToken" , res.SessionID);
      //this.router.navigateByUrl("staff")
    })
  }*/

  /*
  onSubmitChild(c:Child) {  
        if (this.ChildID== null) {  
          this.register.RegisterChild(c).subscribe(  
            () => {  
              this.dataSaved = true;  
              //this.massage = 'Record saved Successfully';  
              //this.loadAllCustomers();  
              this.ChildID= null;  
              this.childForm.reset();  
            }  
          );
  
  }
}*/

}

