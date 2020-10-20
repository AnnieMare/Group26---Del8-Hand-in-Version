import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoalsServiceService } from 'src/app/Services/goals.service';
import { CancelConfirmationDialogComponent } from '../../Admin/OrgStructPos/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { NbToastrService, NbDialogService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { DiscipleshipService } from '../../Services/discipleship.service';
import { Discipleship } from '../../model/Discipleship';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MembersService } from 'src/app/Services/members.service';
//import { CancelDialogComponent } from '../cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-update-weekly-goals',
  templateUrl: './update-weekly-goals.component.html',
  styleUrls: ['./update-weekly-goals.component.scss']
})
export class UpdateWeeklyGoalsComponent implements OnInit {
  ZoneChurchAttendance: any;
  ChurchAttendance: any;
  ZoneHomecellAttendance: any;
  NewMemberOrientation: any;
  Discipleship: any;
  StructureGrowth: any;
  ZoneGrowth: any;

  UpdateHomecellAttendance = true;
  UpdateZoneChurchAttendance = false;
  UpdateChurchAttendance = false;
  UpdateZoneHomecellAttendance = false;
  UpdateNewMemberOrientation = false;
  UpdateDiscipleship = false;
  UpdateStructureGrowth = false;
  UpdateZoneGrowth = false;
  HomecellAttendance: any;
  HomecellAtt: any;
  LeaderData: any;
  ChurchAtt: any;
  ZoneHomecellAtt: any;
  ZoneChurchAtt: any;
  DiscipleshipGoal: any;
  NewMember: any;
  Structure: any;
  Zone: any;
  discipleshipTypes: any;
  goalDisplay: any;
  HCAtt: boolean;
  CAtt: boolean;
  ZHCAtt: boolean;
  Person:any;
	  session:any;




  constructor(private GoalsService: GoalsServiceService,private formBuilder: FormBuilder,private router: Router,
      private toastrService: NbToastrService, private memberService: MembersService ,private dialogService: NbDialogService, private DiscService :DiscipleshipService,private sidebarService: NbSidebarService, private loginService:LoginService) {
    this.HomecellAttendance = this.formBuilder.group({Date:'',
    Description: '',
    Members: '',
    Leaders: '',
    Visitors: '',
    FirstTimeVisitors: '',
    Salvations: '',
    Overseer: '',
    HomecellAttendanceGoalID: ''});

    this.ZoneChurchAttendance = this.formBuilder.group({Date:'',
    Description: '',
    Member: '',
    Leader: '',
    Visitors: '',
    FirstTimeVisitors: '',
    Salvations: '',
    Overseer: '',
    ZoneChurchAttGoalID: ''});

    this.ChurchAttendance = this.formBuilder.group({Date:'',
    Description: '',
    Member: '',
    Leader: '',
    Visitors: '',
    FirstTimeVisitors: '',
    Salvations: '',
    Overseer: '',
    ChurchAttGoalID: ''});

    this.ZoneHomecellAttendance = this.formBuilder.group({Date:'',
    Description: '',
    Members: '',
    Leaders: '',
    Visitors: '',
    FirstTimeVisitors: '',
    Salvations: '',
    MaritualStatus: '',
    Overseer: '',
    ZoneHomecellAttGoalID: ''});

    this.NewMemberOrientation = this.formBuilder.group({Date:'',
    MonthTotal: '',
    Members: '',
    Overseer: '',
    NMOGoalID: '',
  });

    this.Discipleship = this.formBuilder.group({Date:'',
    Description: '',
    DiscipleshipType: '',
    Attendance: '',
    Overseer: '',
    DiscipleshipGoalID: ''});

    this.StructureGrowth = this.formBuilder.group({Date:'',
    Description: '',
    MonthlyTotal: '',
    Members: '',
    Overseer: '',
    StructureGrowthGoalID: ''});

    this.ZoneGrowth = this.formBuilder.group({Date:'',
    Description: '',
    MonthlyTotal: '',
    Members: '',
    Overseer: '',
    ZoneGrowthGoalID: ''});
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

  //Add method that will send the form data to the service
  addHomecellAttGoalForm(form) {

    var data = {form: form, PersonID: this.Person.PersonID}
    console.log(form);
    this.GoalsService.setHomecellAttGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  addZoneChruchAttGoalForm(form) {
    var data = {form: form, PersonID: this.Person.PersonID}

    console.log(form);
    this.GoalsService.setZoneChurchAttGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  addChurchAttGoalForm(form) {
    var data = {form: form, PersonID: this.Person.PersonID}

    console.log(form);
    this.GoalsService.setChurchAttGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  addZoneHomecellAttendanceGoalForm(form) {
    var data = {form: form, PersonID: this.Person.PersonID}

    console.log(form);
    this.GoalsService.setZoneHomecellAttGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  addNewMemberOrientationGoalForm(form) {
    var data = {form: form, PersonID: this.Person.PersonID}

    console.log(form);
    this.GoalsService.setNMOGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  addDiscipleshipGoalForm(form) {
    var data = {form: form, PersonID: this.Person.PersonID}

    console.log(form);
    this.GoalsService.setDiscipleshipGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  addStructureGrowthGoalForm(form) {
    var data = {form: form, PersonID: this.Person.PersonID}

    console.log(form);
    this.GoalsService.setStructureGrowthGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  addZoneGrowthGoalForm(form) {
    var data = {form: form, PersonID: this.Person.PersonID}

    console.log(form);
    this.GoalsService.setZoneGrowthGoal(data).subscribe(x =>{
      console.log(x);
      this.SuccessMessage('top-right', 'success')
    });
  }

  //toaster message


  SuccessMessage(position, status) {

    this.toastrService.show(
      status || 'Success',
      `Weekly goal was set successfully`,
      { position, status});

      this.router.navigate(["SearchWeeklyGoal"]);
  }


  ngOnInit(): void {

  if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
        this.loginService.getUserDetails(this.session).subscribe(res =>{
          this.Person = res;
          if(this.Person.OrgIndivPos == "Senior Pastor")
          {
            this.items =  NbMenuItem[20] = [
            {
              title: 'Profile',
              icon: 'person-outline',
              children: [
                {
                  title: 'Update Profile',
                  icon: 'edit-outline',
                   link: '/UpdatePerson'
                },
                {
                  title: 'Financial Contribution',
                  icon: 'credit-card-outline',
                   link: '/FinancialContribution'
                },
              ],
            },
            {
              title: 'Manage Members',
              icon: 'people-outline',
              children: [
                {
                  title: 'View Members',
                  icon: 'eye-outline',
                   link: '/Members'
                },
                {
                  title: 'Activate Members',
                  icon: 'person-done-outline',
                   link: '/RequestReactivate'
                },
                {
                  title: 'Deactivate Members',
                  icon: 'person-remove-outline',
                   link: '/RequestDeActivate'
                },
                {
                  title: 'Transfer Groups',
                  icon: 'swap-outline',
                   link: '/GroupTransfer'
                },

              ],

            },
            {
              title: 'Message Members',
              icon: 'email-outline',
              children: [
                {
                  title: 'Send Invitation',
                  icon: 'arrow-right-outline',
                   link: '/SendInvitation'

                },
                {
                  title: 'Send Announcement',
                  icon: 'arrow-right-outline',
                   link: '/PostAnnouncement'
                },
                {
                  title: 'Remove Announcement',
                  icon: 'arrow-right-outline',
                   link: '/RemoveAnnouncement'
                },
              ],

            },
             {
              title: 'Groups',
              icon: 'plus-circle-outline',
               link: '/Groups'
            },
             {
              title: 'Homecell notes',
              icon: 'file-add-outline',
               link: '/HomecellNotes'
            },
             {
              title: 'Kids Church',
              icon: 'home-outline',
               link: '/KidsChurch'

            },
            {
              title: 'Goals',
              icon: 'award-outline',
               link: '/SearchWeeklyGoal'
            },
            {
              title: 'Reports',
              icon: 'trending-up-outline',
              children: [
                {
                  title: 'Zone Growth',
                  icon: 'arrow-right-outline',
                   link: '/ZoneGrowthReport'

                },
                {
                  title: 'Overview Of Structure',
                  icon: 'arrow-right-outline',
                   link: '/OverviewStructureReport'
                },
                {
                  title: 'Discipleship Progress',
                  icon: 'arrow-right-outline',
                   link: '/StructureDiscipleshipReport'
                },
              ],

            },
            {
              title: 'Admin',
              icon: 'settings-2-outline',
              children: [
                  {
                  title: 'Discipleships',
                  icon: 'arrow-right-outline',
                   link: '/SearchDiscipleship'
                },
                {
                  title: 'Structure Positions',
                  icon: 'arrow-right-outline',
                   link: '/MaintainOrganisationalStructurePosition'
                },
                {
                  title: 'Individual Positions',
                  icon: 'arrow-right-outline',
                   link: '/ViewOrgIndivPos'
                },
              ],
            },
            {
              title: 'Audit Trail',
              icon: 'lock-outline',
               link: '/AuditTrail'
            },
            {
              title: 'Help Doc',
              icon: 'question-mark-outline',
               link: '#'
            },
          ];
          }
          else if(this.Person.OrgIndivPos == "District Pastor")
          {
            this.items =  NbMenuItem[20] = [
              {
                title: 'Profile',
                icon: 'person-outline',
                children: [
                  {
                    title: 'Update Profile',
                    icon: 'edit-outline',
                     link: '/UpdatePerson'
                  },
                  {
                    title: 'Financial Contribution',
                    icon: 'credit-card-outline',
                     link: '/FinancialContribution'
                  },
                ],
              },
              {
                title: 'Manage Members',
                icon: 'people-outline',
                children: [
                  {
                    title: 'View Members',
                    icon: 'eye-outline',
                     link: '/Members'
                  },
                  {
                    title: 'Transfer Groups',
                    icon: 'swap-outline',
                     link: '/Groups'
                  },
                ],
              },
              {
                title: 'Message Members',
                icon: 'email-outline',
                children: [
                  {
                    title: 'Send Invitation',
                    icon: 'arrow-right-outline',
                     link: '/SendInvitation'

                  },
                  {
                    title: 'Send Announcement',
                    icon: 'arrow-right-outline',
                     link: '/PostAnnouncement'
                  },
                  {
                    title: 'Remove Announcement',
                    icon: 'arrow-right-outline',
                     link: '/RemoveAnnouncement'
                  },
                ],

              },
               {
                title: 'Groups',
                icon: 'plus-circle-outline',
                 link: '/Groups'
              },
               {
                title: 'Homecell notes',
                icon: 'file-add-outline',
                 link: '/HomecellNotes'
              },
               {
                title: 'Kids Church',
                icon: 'home-outline',
                 link: '/KidsChurch'
              },
              {
                title: 'Goals',
                icon: 'award-outline',
                 link: '/SearchWeeklyGoal'
              },
              {
                title: 'Admin',
                icon: 'settings-2-outline',
                children: [
                  {
                    title: 'Group Types',
                    icon: 'arrow-right-outline',
                    link: '#',
                    children: [
                      {
                        title: 'Add Group Type',
                        icon: 'arrow-right-outline',
                        link: '/AddGroupType',
                      },
                      {
                        title: 'Update Group Type',
                        icon: 'arrow-right-outline',
                        link: '/UpdateGroupType',
                      }
                    ],
                  },
                  {
                    title: 'Discipleships',
                    icon: 'arrow-right-outline',
                     link: '/SearchDiscipleship'
                  },
                ],
              },
        {
                title: 'Help Doc',
                icon: 'question-mark-outline',
                 link: 'http://localhost:8080/User%20Manual.html'
              },
            ];
          }
          else if(this.Person.OrgIndivPos == "Zone Pastor")
          {
            this.items =  NbMenuItem[20] = [
              {
                title: 'Profile',
                icon: 'person-outline',
                children: [
                  {
                    title: 'Update Profile',
                    icon: 'edit-outline',
                     link: '/UpdatePerson'
                  },
                  {
                    title: 'Financial Contribution',
                    icon: 'credit-card-outline',
                     link: '/FinancialContribution'
                  },
                ],
              },
              {
                title: 'Manage Members',
                icon: 'people-outline',
                children: [
                  {
                    title: 'View Members',
                    icon: 'eye-outline',
                     link: '/Members'
                  },
                  {
                    title: 'Activate Members',
                    icon: 'person-done-outline',
                     link: '/RequestReactivate'
                  },
                  {
                    title: 'Deactivate Members',
                    icon: 'person-remove-outline',
                     link: '/RequestDeActivate'
                  },
                  {
                    title: 'Transfer Groups',
                    icon: 'swap-outline',
                     link: '/GroupTransfer'
                  },

                ],

              },
              {
                title: 'Message Members',
                icon: 'email-outline',
                children: [
                  {
                    title: 'Send Invitation',
                    icon: 'arrow-right-outline',
                     link: '/SendInvitation'

                  },
                  {
                    title: 'Send Announcement',
                    icon: 'arrow-right-outline',
                     link: '/PostAnnouncement'
                  },
                  {
                    title: 'Remove Announcement',
                    icon: 'arrow-right-outline',
                     link: '/RemoveAnnouncement'
                  },
                ],

              },
               {
                title: 'Groups',
                icon: 'plus-circle-outline',
                 link: '/Groups'
              },
               {
                title: 'Homecell notes',
                icon: 'file-add-outline',
                 link: '/HomecellNotes'
              },
               {
                title: 'Kids Church',
                icon: 'home-outline',
                 link: '/KidsChurch'
              },
              {
                title: 'Follow-up',
                icon: 'phone-outline',
                children: [
                  {
                    title: 'Overseers',
                    icon: 'arrow-right-outline',
                     link: 'overseer-follow-up'
                  },
                ],
              },
              {
                title: 'Goals',
                icon: 'award-outline',
                 link: '/SearchWeeklyGoal'
              },
              {
                title: 'Reports',
                icon: 'trending-up-outline',
                children: [
                  {
                    title: 'Zone Growth',
                    icon: 'arrow-right-outline',
                     link: '/ZoneGrowthReport'

                  },
                ],
              },
              {
                title: 'Admin',
                icon: 'settings-2-outline',
                children: [
                  {
                    title: 'Group Types',
                    icon: 'arrow-right-outline',
                    link: '#',
                    children: [
                      {
                        title: 'Add Group Type',
                        icon: 'arrow-right-outline',
                        link: '/AddGroupType',
                      },
                      {
                        title: 'Update Group Type',
                        icon: 'arrow-right-outline',
                        link: '/UpdateGroupType',
                      }
                    ],
                  },
                  {
                    title: 'Discipleships',
                    icon: 'arrow-right-outline',
                     link: '/SearchDiscipleship'
                  },
                ],
              },
        {
                title: 'Help Doc',
                icon: 'question-mark-outline',
                 link: 'http://localhost:8080/User%20Manual.html'
              },
            ];
          }
          else if(this.Person.OrgIndivPos == "Overseer")
          {
            this.items =  NbMenuItem[20] = [
              {
                title: 'Profile',
                icon: 'person-outline',
                children: [
                  {
                    title: 'Update Profile',
                    icon: 'edit-outline',
                     link: '/UpdatePerson'
                  },
                  {
                    title: 'Financial Contribution',
                    icon: 'credit-card-outline',
                     link: '/FinancialContribution'
                  },
                ],
              },
              {
                title: 'Manage Members',
                icon: 'people-outline',
                children: [
                  {
                    title: 'View Members',
                    icon: 'eye-outline',
                     link: '/Members'
                  },
                  {
                    title: 'Activate Members',
                    icon: 'person-done-outline',
                     link: '/RequestReactivate'
                  },
                  {
                    title: 'Deactivate Members',
                    icon: 'person-remove-outline',
                     link: '/RequestDeActivate'
                  },
                  {
                    title: 'Transfer Groups',
                    icon: 'swap-outline',
                     link: '/GroupTransfer'
                  },

                ],

              },
              {
                title: 'Message Members',
                icon: 'email-outline',
                children: [
                  {
                    title: 'Send Invitation',
                    icon: 'arrow-right-outline',
                     link: '/SendInvitation'

                  },
                  {
                    title: 'Send Announcement',
                    icon: 'arrow-right-outline',
                     link: '/PostAnnouncement'
                  },
                  {
                    title: 'Remove Announcement',
                    icon: 'arrow-right-outline',
                     link: '/RemoveAnnouncement'
                  },
                ],

              },
               {
                title: 'Groups',
                icon: 'plus-circle-outline',
                 link: '/Groups'
              },
               {
                title: 'Homecell notes',
                icon: 'file-add-outline',
                 link: '/HomecellNotes'
              },
               {
                title: 'Kids Church',
                icon: 'home-outline',
                 link: '/KidsChurch'

              },

              {
                title: 'Follow-up',
                icon: 'phone-outline',
                children: [
                  {
                    title: 'Leaders',
                    icon: 'arrow-right-outline',
                     link: '/LeaderFollowUp'
                  },
                ],

              },
              {
                title: 'Goals',
                icon: 'award-outline',
                 link: '/SearchWeeklyGoal'
              },
              {
                title: 'Reports',
                icon: 'trending-up-outline',
                children: [
                  {
                    title: 'Overview Of Structure',
                    icon: 'arrow-right-outline',
                     link: '/OverviewStructureReport'
                  },
                  {
                    title: 'Discipleship Progress',
                    icon: 'arrow-right-outline',
                     link: '/StructureDiscipleshipReport'
                  },
                ],

              },
        {
                title: 'Help Doc',
                icon: 'question-mark-outline',
                 link: 'http://localhost:8080/User%20Manual.html'
              },
            ];
          }
          else if(this.Person.OrgIndivPos == "Supervisor")
          {
            this.items =  NbMenuItem[20] = [
              {
                title: 'Profile',
                icon: 'person-outline',
                children: [
                  {
                    title: 'Update Profile',
                    icon: 'edit-outline',
                     link: '/UpdatePerson'
                  },
                  {
                    title: 'Financial Contribution',
                    icon: 'credit-card-outline',
                     link: '/FinancialContribution'
                  },
                ],
              },
              {
                title: 'Manage Members',
                icon: 'people-outline',
                children: [
                  {
                    title: 'View Members',
                    icon: 'eye-outline',
                     link: '/Members'
                  },
                  {
                    title: 'Transfer Groups',
                    icon: 'swap-outline',
                     link: '/GroupTransfer'
                  },

                ],

              },
              {
                title: 'Message Members',
                icon: 'email-outline',
                children: [
                  {
                    title: 'Send Invitation',
                    icon: 'arrow-right-outline',
                     link: '/SendInvitation'

                  },
                  {
                    title: 'Send Announcement',
                    icon: 'arrow-right-outline',
                     link: '/PostAnnouncement'
                  },
                  {
                    title: 'Remove Announcement',
                    icon: 'arrow-right-outline',
                     link: '/RemoveAnnouncement'
                  },
                ],

              },
               {
                title: 'Groups',
                icon: 'plus-circle-outline',
                 link: '/Groups'
              },
               {
                title: 'Homecell notes',
                icon: 'file-add-outline',
                 link: '/HomecellNotes'
              },
               {
                title: 'Kids Church',
                icon: 'home-outline',
                 link: '/KidsChurch'
              },

              {
                title: 'Follow-up',
                icon: 'phone-outline',
                children: [
                  {
                    title: 'Requests to Serve',
                    icon: 'arrow-right-outline',
                     link: '/FollowUpMembersWantingToServe'
                  },
                ],
              },
        {
                title: 'Help Doc',
                icon: 'question-mark-outline',
                 link: 'http://localhost:8080/User%20Manual.html'
              },
            ];
          }
          else if(this.Person.OrgIndivPos == "Coordinator")
          {
            this.items =  NbMenuItem[20] = [
              {
                title: 'Profile',
                icon: 'person-outline',
                children: [
                  {
                    title: 'Update Profile',
                    icon: 'edit-outline',
                     link: '/UpdatePerson'
                  },
                  {
                    title: 'Financial Contribution',
                    icon: 'credit-card-outline',
                     link: '/FinancialContribution'
                  },
                ],
              },
              {
                title: 'Manage Members',
                icon: 'people-outline',
                children: [
                  {
                    title: 'View Members',
                    icon: 'eye-outline',
                     link: '/Members'
                  },
                  {
                    title: 'Transfer Groups',
                    icon: 'swap-outline',
                     link: '/GroupTransfer'
                  },
                ],
              },
              {
                title: 'Message Members',
                icon: 'email-outline',
                children: [
                  {
                    title: 'Send Invitation',
                    icon: 'arrow-right-outline',
                     link: '/SendInvitation'

                  },
                  {
                    title: 'Send Announcement',
                    icon: 'arrow-right-outline',
                     link: '/PostAnnouncement'
                  },
                  {
                    title: 'Remove Announcement',
                    icon: 'arrow-right-outline',
                     link: '/RemoveAnnouncement'
                  },
                ],

              },
               {
                title: 'Groups',
                icon: 'plus-circle-outline',
                 link: '/Groups'
              },
               {
                title: 'Homecell notes',
                icon: 'file-add-outline',
                 link: '/HomecellNotes'
              },
               {
                title: 'Kids Church',
                icon: 'home-outline',
                 link: '/KidsChurch'
              },

              {
                title: 'Follow-up',
                icon: 'phone-outline',
                children: [
                  {
                    title: 'Salvation',
                    icon: 'arrow-right-outline',
                     link: '/FollowUpSalvation'

                  },
                  {
                    title: 'NMO',
                    icon: 'arrow-right-outline',
                     link: '/NMOFollowUp'
                  },
                  {
                    title: 'Discipleship',
                    icon: 'arrow-right-outline',
                     link: '/FollowUpDiscipleship'
                  },
                ],
              },
              {
                title: 'Goals',
                icon: 'award-outline',
                 link: '/SearchWeeklyGoal'
              },
              {
                title: 'Reports',
                icon: 'trending-up-outline',
                children: [
                  {
                    title: 'Overview Of Structure',
                    icon: 'arrow-right-outline',
                     link: '/OverviewStructureReport'
                  },
                  {
                    title: 'Discipleship Progress',
                    icon: 'arrow-right-outline',
                     link: '/StructureDiscipleshipReport'
                  },
                ],
              },
        {
                title: 'Help Doc',
                icon: 'question-mark-outline',
                 link: 'http://localhost:8080/User%20Manual.html'
              },
            ];
          }
          else if(this.Person.OrgIndivPos == "Homecell Leader")
          {
            this.items =  NbMenuItem[20] = [
              {
                title: 'Profile',
                icon: 'person-outline',
                children: [
                  {
                    title: 'Update Profile',
                    icon: 'edit-outline',
                     link: '/UpdatePerson'
                  },
                  {
                    title: 'Financial Contribution',
                    icon: 'credit-card-outline',
                     link: '/FinancialContribution'
                  },
                ],
              },
              {
                title: 'Manage Members',
                icon: 'people-outline',
                children: [
                  {
                    title: 'View Members',
                    icon: 'eye-outline',
                     link: '/Members'
                  },
                  {
                    title: 'Transfer Groups',
                    icon: 'swap-outline',
                     link: '/GroupTransfer'
                  },

                ],

              },
              {
                title: 'Message Members',
                icon: 'email-outline',
                children: [
                  {
                    title: 'Send Invitation',
                    icon: 'arrow-right-outline',
                     link: '/SendInvitation'

                  },
                  {
                    title: 'Send Announcement',
                    icon: 'arrow-right-outline',
                     link: '/PostAnnouncement'
                  },
                  {
                    title: 'Remove Announcement',
                    icon: 'arrow-right-outline',
                     link: '/RemoveAnnouncement'
                  },
                ],

              },
               {
                title: 'Groups',
                icon: 'plus-circle-outline',
                 link: '/Groups'
              },
               {
                title: 'Homecell notes',
                icon: 'file-add-outline',
                 link: '/HomecellNotes'
              },
               {
                title: 'Kids Church',
                icon: 'home-outline',
                 link: '/KidsChurch'

              },
              {
                title: 'Follow-up',
                icon: 'phone-outline',
                children: [
                 {
                    title: 'Members',
                    icon: 'arrow-right-outline',
                     link: '/MemberFollowUp'
                  },
                  {
                    title: 'Discipleship',
                    icon: 'arrow-right-outline',
                     link: '/FollowUpDiscipleship'
                  },
                ],

              },
              {
                title: 'Goals',
                icon: 'award-outline',
                 link: '/SearchWeeklyGoal'
              },
        {
                title: 'Help Doc',
                icon: 'question-mark-outline',
                 link: 'http://localhost:8080/User%20Manual.html'
              },
            ];
          }
          else if(this.Person.OrgIndivPos == "Member")
          {
            this.items =  NbMenuItem[20] = [
              {
                title: 'Profile',
                icon: 'person-outline',
                children: [
                  {
                    title: 'Update Profile',
                    icon: 'edit-outline',
                     link: '/UpdatePerson'
                  },
                  {
                    title: 'Financial Contribution',
                    icon: 'credit-card-outline',
                     link: '/FinancialContribution'
                  },
                ],
              },
              {
                title: 'Manage Members',
                icon: 'people-outline',
                children: [
                  {
                    title: 'Transfer Groups',
                    icon: 'swap-outline',
                     link: '/GroupTransfer'
                  },
                ],
              },
               {
                title: 'Groups',
                icon: 'plus-circle-outline',
                 link: '/Groups'
              },
               {
                title: 'Homecell notes',
                icon: 'file-add-outline',
                 link: '/HomecellNotes'
              },
               {
                title: 'Kids Church',
                icon: 'home-outline',
                 link: '/KidsChurch'
              },
              {
                title: 'Help Doc',
                icon: 'question-mark-outline',
                 link: 'http://localhost:8080/User%20Manual.html'
              },
            ];
          }
          console.log(this.Person)
        });
    }


    //Homecell Attendance
    this.HomecellAtt = this.GoalsService.getData();
    console.log(this.HomecellAtt);

      this.HomecellAttendance.controls.Date.setValue(this.HomecellAtt.Date);
      this.HomecellAttendance.controls.HomecellAttendanceGoalID.setValue(this.HomecellAtt.HomecellAttendanceGoalID);
      this.HomecellAttendance.controls.Description.setValue(this.HomecellAtt.Description);
      this.HomecellAttendance.controls.Members.setValue(this.HomecellAtt.Members);
      this.HomecellAttendance.controls.Leaders.setValue(this.HomecellAtt.Leaders);
      this.HomecellAttendance.controls.Visitors.setValue(this.HomecellAtt.Visitors);
      this.HomecellAttendance.controls.FirstTimeVisitors.setValue(this.HomecellAtt.FirstTimeVisitors);
      this.HomecellAttendance.controls.Overseer.setValue(this.HomecellAtt.Overseer);
      this.HomecellAttendance.controls.Salvations.setValue(this.HomecellAtt.Salvations);
      this.HomecellAttendance.controls.Description.setValue(this.HomecellAtt.Description);

    //Church Attendance
    this.ChurchAtt = this.GoalsService.getData();
    console.log(this.ChurchAtt);

      this.ChurchAttendance.controls.Date.setValue(this.ChurchAtt.Date);
      this.ChurchAttendance.controls.ChurchAttGoalID.setValue(this.ChurchAtt.ChurchAttGoalID);
      this.ChurchAttendance.controls.Description.setValue(this.ChurchAtt.Description);
      this.ChurchAttendance.controls.Member.setValue(this.ChurchAtt.Member);
      this.ChurchAttendance.controls.Leader.setValue(this.ChurchAtt.Leader);
      this.ChurchAttendance.controls.Visitors.setValue(this.ChurchAtt.Visitors);
      this.ChurchAttendance.controls.FirstTimeVisitors.setValue(this.ChurchAtt.FirstTimeVisitors);
      this.ChurchAttendance.controls.Overseer.setValue(this.ChurchAtt.Overseer);
      this.ChurchAttendance.controls.Salvations.setValue(this.ChurchAtt.Salvations);
      this.ChurchAttendance.controls.Description.setValue(this.ChurchAtt.Description);

    //Zone Homecell Attendance
    this.ZoneHomecellAtt = this.GoalsService.getData();
    console.log(this.ZoneHomecellAtt);

      this.ZoneHomecellAttendance.controls.Date.setValue(this.ZoneHomecellAtt.Date);
      this.ZoneHomecellAttendance.controls.ZoneHomecellAttGoalID.setValue(this.ZoneHomecellAtt.ZoneHomecellAttGoalID);
      this.ZoneHomecellAttendance.controls.Description.setValue(this.ZoneHomecellAtt.Description);
      this.ZoneHomecellAttendance.controls.Members.setValue(this.ZoneHomecellAtt.Members);
      this.ZoneHomecellAttendance.controls.Leaders.setValue(this.ZoneHomecellAtt.Leaders);
      this.ZoneHomecellAttendance.controls.Visitors.setValue(this.ZoneHomecellAtt.Visitors);
      this.ZoneHomecellAttendance.controls.FirstTimeVisitors.setValue(this.ZoneHomecellAtt.FirstTimeVisitors);
      this.ZoneHomecellAttendance.controls.Overseer.setValue(this.ZoneHomecellAtt.Overseer);
      this.ZoneHomecellAttendance.controls.Salvations.setValue(this.ZoneHomecellAtt.Salvations);
      this.ZoneHomecellAttendance.controls.Description.setValue(this.ZoneHomecellAtt.Description);

    //Zone Church Attendance
    this.ZoneChurchAtt = this.GoalsService.getData();
    console.log(this.ZoneChurchAtt);

      this.ZoneChurchAttendance.controls.Date.setValue(this.ZoneChurchAtt.Date);
      this.ZoneChurchAttendance.controls.ZoneChurchAttGoalID.setValue(this.ZoneChurchAtt.ZoneChurchAttGoalID);
      this.ZoneChurchAttendance.controls.Description.setValue(this.ZoneChurchAtt.Description);
      this.ZoneChurchAttendance.controls.Member.setValue(this.ZoneChurchAtt.Member);
      this.ZoneChurchAttendance.controls.Leader.setValue(this.ZoneChurchAtt.Leader);
      this.ZoneChurchAttendance.controls.Visitors.setValue(this.ZoneChurchAtt.Visitors);
      this.ZoneChurchAttendance.controls.FirstTimeVisitors.setValue(this.ZoneChurchAtt.FirstTimeVisitors);
      this.ZoneChurchAttendance.controls.Overseer.setValue(this.ZoneChurchAtt.Overseer);
      this.ZoneChurchAttendance.controls.Salvations.setValue(this.ZoneChurchAtt.Salvations);
      this.ZoneChurchAttendance.controls.Description.setValue(this.ZoneChurchAtt.Description);

    //NMO
    this.NewMember = this.GoalsService.getData();
    console.log(this.NewMember);

      this.NewMemberOrientation.controls.Date.setValue(this.NewMember.Date);
      this.NewMemberOrientation.controls.NMOGoalID.setValue(this.NewMember.NMOGoalID);
      this.NewMemberOrientation.controls.Members.setValue(this.NewMember.Members);
      this.NewMemberOrientation.controls.Overseer.setValue(this.NewMember.Overseer);

    //Discipleship
    this.DiscipleshipGoal = this.GoalsService.getData();
    console.log(this.DiscipleshipGoal);

      this.Discipleship.controls.Date.setValue(this.DiscipleshipGoal.Date);
      this.Discipleship.controls.DiscipleshipGoalID.setValue(this.DiscipleshipGoal.DiscipleshipGoalID);
      this.Discipleship.controls.Attendance.setValue(this.DiscipleshipGoal.Attendance);
      this.Discipleship.controls.DiscipleshipType.setValue(this.DiscipleshipGoal.DiscipleshipType);
      this.Discipleship.controls.Description.setValue(this.DiscipleshipGoal.Description);
      this.Discipleship.controls.Overseer.setValue(this.DiscipleshipGoal.Overseer);

    //Structure Growth
    this.Structure = this.GoalsService.getData();
    console.log(this.Structure);

      this.StructureGrowth.controls.Date.setValue(this.Structure.Date);
      this.StructureGrowth.controls.StructureGrowthGoalID.setValue(this.Structure.StructureGrowthGoalID);
      this.StructureGrowth.controls.MonthlyTotal.setValue(this.Structure.MonthlyTotal);
      this.StructureGrowth.controls.Members.setValue(this.Structure.Members);
      this.StructureGrowth.controls.Description.setValue(this.Structure.Description);
      this.StructureGrowth.controls.Overseer.setValue(this.Structure.Overseer);

    //Zone Growth
    this.Zone = this.GoalsService.getData();
    console.log(this.Structure);

      this.ZoneGrowth.controls.Date.setValue(this.Zone.Date);
      this.ZoneGrowth.controls.ZoneGrowthGoalID.setValue(this.Zone.ZoneGrowthGoalID);
      this.ZoneGrowth.controls.MonthlyTotal.setValue(this.Zone.MonthlyTotal);
      this.ZoneGrowth.controls.Members.setValue(this.Zone.Members);
      this.ZoneGrowth.controls.Description.setValue(this.Zone.Description);
      this.ZoneGrowth.controls.Overseer.setValue(this.Zone.Overseer);


      this.discipleshipTypes = this.DiscService.getAllDiscipleships();
      console.log(this.discipleshipTypes);
      // this.ZHCAtt = false;
      // this.HCAtt = false;
      // this.CAtt = false;

    this.goalDisplay = this.GoalsService.getData1();
    // if(this.goalDisplay == 1)
    // {
    //   this.HCAtt = true;

    //   this.CAtt = false;

    //   this.ZHCAtt = false;
    // }
    // else if(this.goalDisplay == 2)
    // {
    //   this.CAtt = true;
    //   this.HCAtt = false;

    //   this.ZHCAtt = false;
    // }
    // else if(this.goalDisplay == 3)
    // {
    //   this.ZHCAtt = true;
    //   this.HCAtt = false;
    //   this.CAtt = false;

    // }

    }

    updateHomecellAttGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateHomecellAttGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }

    updateZoneChruchAttGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateZoneChurchAttGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }

    updateChurchAttGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateChurchAttGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }

    updateZoneHomecellAttendanceGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateZoneHomecellAttGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }

    updateNewMemberOrientationGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateNMOGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }

    updateDiscipleshipGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateDiscipleshipGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }

    updateStructureGrowthGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateStructureGrowthGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }

    updateZoneGrowthGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateZoneGrowthGoal(data).subscribe(x =>{
        console.log(x);
        this.SuccessMessage('top-right', 'success')
      });
    }


  }


