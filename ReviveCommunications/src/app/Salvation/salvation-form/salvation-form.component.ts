import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SalvationServiceService } from '../salvation-service.service';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-salvation-form',
  templateUrl: './salvation-form.component.html',
  styleUrls: ['./salvation-form.component.scss']
})
export class SalvationFormComponent implements OnInit {
  salvation;

  today: number = Date.now();

  //variables to enable education
  School: boolean;
  University: boolean;

   //variables to enable invitee information
   Invite: boolean;
  Invited: number;

  constructor(private SalvationService: SalvationServiceService, private formBuilder: FormBuilder, private sidebarService: NbSidebarService) {
    this.salvation = this.formBuilder.group({Date:'',
    AlterWorker: '',
    Title: '',
    Name: '',
    Surname: '',
    Age: '',
    EmploymentStatus: '',
    MaritualStatus: '',
    ResidentialAddress: '',
    Suburb: '',
    City: '',
    HomeTelNo: '',
    WorkTelNo: '',
    Cellphone: '',
    Email: '',
    Invited: '',
    NameSurnameInvite: '',
    ZonePastor: '',
    StudyAddress: '',
    ParentGuardianCell: '',
    PrayerRequest: '',
    SchoolLevel: '',
    NameofSchool: '',
    Grade: '',
    StudyYear: '',
    Institution: ''});
  }



  ngOnInit(): void {
    this.School = false;
    this.University = false;
    this.Invite = false;
  }
  //Add method that will send the form data to the service
  addSalvationForm(form) {

    //form.Date = Date.now();
    form.Invited = this.Invited;
    console.log(form);
    this.SalvationService.addNewSalvation(form);
  }

  //aMethods that will enable education sections
  enableUniversity()
  {
    this.University = true;
    this.School = false;
  }
  enableSchool()
  {
    this.School = true;
    this.University = false;
  }
  enableInvite()
  {
    this.Invite = true;
    this.Invited = 1;
  }
  disableInvite()
  {
    this.Invite = false;
    this.Invited = 0;
  }


}
