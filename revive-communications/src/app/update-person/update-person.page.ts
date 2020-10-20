import { Component, OnInit, TemplateRef } from '@angular/core';
//import { NbDialogService, NbMenuItem, NbSidebarService, } from '@nebular/theme';
import { MembersService} from 'src/app/Services/members.service';
import { Person } from 'src/app/model/person';
import { Form, FormBuilder } from '@angular/forms';
import { ISuburb } from 'src/app/model/suburb';
import { GroupsService } from 'src/app/Services/groups.service';
import { ICity } from 'src/app/model/city';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.page.html',
  styleUrls: ['./update-person.page.scss'],
})
export class UpdatePersonPage implements OnInit {

  person: any;
  updatePerson;
  suburbs: ISuburb[];
  cities: ICity[];
  FormSubmit: Form;
  constructor(
    private loginService:LoginService, private router: Router, private personService: MembersService,  private groupService: GroupsService) 
  { 
    // this.updatePerson = this.FormSubmit.getFormGroup(
    //   {
    //     PersonID: " ",
    //     Name: '',
    //     Surname: '',
    //     Address: '',
    //     Suburb: '',
    //     City: '',
    //     Number: '',
    //     Email: ''
    //   }
    //);

  }

  Person:any;
	  session:any;
  ngOnInit(): void
  {
   
  
  if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;
        this.person = this.personService.getData();
        console.log(this.Person)
      })
    }
    
    //console.log(this.person);
    // if (this.person != null)
    // {
    //   this.FormSubmit.(this.person.PersonID);
    //   this.updatePerson.controls.Name.setValue(this.person.Name);
    //   this.updatePerson.controls.Surname.setValue(this.person.Surname);
    //   this.updatePerson.controls.Address.setValue(this.person.Address);
    //   this.updatePerson.controls.Suburb.setValue(this.person.Suburb);
    //   this.updatePerson.controls.City.setValue(this.person.City);
    //   this.updatePerson.controls.Number.setValue(this.person.Number);
    //   this.updatePerson.controls.Email.setValue(this.person.Email);      
    // }
  }

  

  onSubmit(value)
  {
    console.log(value);
    this.personService.updatePerson(value);
  }

}
