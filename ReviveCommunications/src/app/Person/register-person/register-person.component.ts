import { Component, OnInit } from '@angular/core';
import {LoginService} from 'src/app/Services/login.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Person} from 'src/app/model/person';
//import { Child } from 'src/app/model/child';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbSidebarService,NbMenuItem } from '@nebular/theme';
import { Observable } from 'rxjs'; 
import { ISuburb } from 'src/app/model/suburb';
import { ICity } from 'src/app/model/city';
import { GroupsService } from 'src/app/Services/groups.service';

@Component({
  selector: 'app-register-person',
  templateUrl: './register-person.component.html',
  styleUrls: ['./register-person.component.scss']
})
export class RegisterPersonComponent implements OnInit {


  person : Person = new Person();

  duration = 3000;
  createdChild;
  dataSaved = false;  
  childForm: any;  
  ChildID = null;
  registerMember;

  suburb: ISuburb[];
  cities: ICity[];

  constructor(private loginService: LoginService,private router : Router,
              private formBuilder : FormBuilder,
              private toastrService: NbToastrService,
              private groupService: GroupsService, private sidebarService: NbSidebarService,
              )
              {
                this.registerMember = this.formBuilder.group(
                  {
                    PersonID: '',
                    Name: ['', Validators.required],
                    Surname: ['', Validators.required],
                    DateOfBirth: ['', Validators.required],
                    Username: ['', Validators.required],
                    Password: ['', Validators.required],
                    Number: ['', Validators.required],
                    Email: ['', Validators.required],
                    OTP: '',
                    AcitvationStatus: '',
                    SessionID: '',
                    Address: ['', Validators.required],
                    Suburb: ['', Validators.required],
                    City: ['', Validators.required],
                  }
                )
              }


  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

  items: any[]
Person:any;
	  session:any;
  ngOnInit(): void {

  }

  ViewChildren(){

    document.getElementById("ChildDiv").style.display = "block";

}

onSubmitPerson(value){
    console.log(value);
    this.loginService.RegisterPerson(value)
    // .subscribe(x => {

    //   this.router.navigate(['/'])
    // });
    // this.showToast('top-right', 'success');

      //this.router.navigateByUrl("staff")

  }

  showToast(position, status) {


      this.toastrService.show(
        status || 'Success',
        `You have been registered successfully`,
        { position, status});
      }

  /*
  onSubmitChild(c:Child) 
  {  
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


