import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoalsServiceService } from 'src/app/Services/goals.service';
import { NbToastrService, NbDialogService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { DiscipleshipService } from 'src/app/Services/discipleship.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-update-discipleship-goal',
  templateUrl: './update-discipleship-goal.component.html',
  styleUrls: ['./update-discipleship-goal.component.scss']
})
export class UpdateDiscipleshipGoalComponent implements OnInit {
  Discipleship: any;
  UpdateDiscipleship = false;
  DiscipleshipGoal: any;
  discipleshipTypes: any;

  Person:any;
	  session:any;
  Message: any;
  OverseerList: Object;




  constructor(private GoalsService: GoalsServiceService,private formBuilder: FormBuilder,private router: Router,
      private toastrService: NbToastrService, private memberService: MembersService ,private dialogService: NbDialogService, private DiscService :DiscipleshipService,private sidebarService: NbSidebarService, private loginService:LoginService) {
        this.Discipleship = this.formBuilder.group({Date:'',
    Description: '',
    DiscipleshipType: '',
    Attendance: '',
    Overseer: '',
    DiscipleshipGoalID: ''});
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

    //Discipleship
    this.DiscipleshipGoal = this.GoalsService.getData();
    console.log(this.DiscipleshipGoal);

      this.Discipleship.controls.Date.setValue(this.DiscipleshipGoal.Date);
      this.Discipleship.controls.DiscipleshipGoalID.setValue(this.DiscipleshipGoal.DiscipleshipGoalID);
      this.Discipleship.controls.Attendance.setValue(this.DiscipleshipGoal.Attendance);
      this.Discipleship.controls.DiscipleshipType.setValue(this.DiscipleshipGoal.DiscipleshipType);
      this.Discipleship.controls.Description.setValue(this.DiscipleshipGoal.Description);
      this.Discipleship.controls.Overseer.setValue(this.DiscipleshipGoal.Overseer);

      this.discipleshipTypes = this.DiscService.getAllDiscipleships();
      console.log(this.discipleshipTypes);
      this.GoalsService.getDiscOverseer().subscribe(data=>{
        this.OverseerList = data;
      })
    }

    updateDiscipleshipGoalForm(form) {
      var data = {form: form, PersonID: this.Person.PersonID}

      console.log(form);
      this.GoalsService.updateDiscipleshipGoal(data).subscribe(x =>{
        if(x == "Discipleship Goal was updated successfully.")
        {
          this.Message = x;
          this.displayMessage('top-right', 'success');
          this.Discipleship.reset();
        }
        else
        {
          this.Message = x;
          this.displayMessage('top-right', 'danger');
        }
      });;
    }

    //toaster message
    displayMessage(position, status) {

      this.toastrService.show(
        status || 'Success',
        this.Message,
        { position, status});
    }
    close()
  {
    if(confirm("Are you sure you want to go back?"))
    this.router.navigate(["/SearchWeeklyGoal"]);
  }

  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }
  
  }


