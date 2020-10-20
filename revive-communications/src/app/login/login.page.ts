import { Component, NgModule, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/person';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    private loginService: LoginService,
    private router: Router,
   
  ) 
  {
    // this.loginperson = this.formBuilder.group(
    //   {
    //     Username: ['', Validators.required],
    //     Password: ['', Validators.required]
    //   }
    // );
  }
   

    ngOnInit(): void 
  {
    this.login = false;
    this.card = false;
    this.showError = false;

    if (localStorage.getItem("accessToken")) {
      this.router.navigateByUrl("/home")
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

    console.log(form)    


    this.loginService.Login(form).subscribe((res: any) => {
      console.log(res);
      if (res.Error){
        this.errorMessage = res.Error;
        this.showError = true;
      }
      else{
        localStorage.setItem("accessToken", res.SessionID);
        this.router.navigateByUrl("/home");
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

}