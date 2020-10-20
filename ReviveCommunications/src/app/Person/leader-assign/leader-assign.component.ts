import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { ViewMemberDialogComponent } from 'src/app/Person/view-member-dialog/view-member-dialog.component';
import { IMembers } from 'src/app/model/members';
import { MembersService } from 'src/app/Services/members.service';
import { OrgIndivPos } from 'src/app/model/OrgIndivPos';
import { OrgIndivPosService } from 'src/app/Services/org-indiv-pos.service';
import { FormBuilder } from '@angular/forms';
import { IOrgStructPos } from 'src/app/model/OrgStructPos';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { OrganisationalStructurePositionService } from 'src/app/Services/organisational-struture-position.service';
import { OrgData } from 'angular-org-chart/src/app/modules/org-chart/orgData';
import { ActivatedRoute } from '@angular/router';
import {   NbComponentStatus, NbIconConfig } from '@nebular/theme';


@Component({
  selector: 'app-leader-assign',
  templateUrl: './leader-assign.component.html',
  styleUrls: ['./leader-assign.component.scss']
})
export class LeaderAssignComponent implements OnInit {

  checked = false;
  //members: IMembers[];
  positions: OrgIndivPos[];
  orgstructpos: IOrgStructPos[];
  //structpos: IOrgStructPos[];
  PersonForm

  [x: string]: any;
  session: { SessionID: string; };
  Person: any;
  members: any
  Message: any;
  MemberAssignedInfo: any;
  PositionStatus: any;

  constructor(private sidebarService: NbSidebarService, private toastrService: NbToastrService,
              private dialogService: NbDialogService, private memberService: MembersService,
              private orgIndivPosService: OrgIndivPosService, private formBuilder: FormBuilder, private router: Router,
              private loginService: LoginService,
              private OrgStructPosService: OrganisationalStructurePositionService,public route : ActivatedRoute)
              {
                this.PersonForm = this.formBuilder.group(
                  {
                    PersonToAssign:'',
                    PersonID: ''
                  }
                );
              }



  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }
  items: any[]
    open() {
      this.dialogService.open(ViewMemberDialogComponent, {
        context: {

        },
      });
    }

    Person:any;

    ngOnInit()
    {

     this.id = this.route.snapshot.paramMap.get('id');

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
        this.memberService.getUnassignedLeaders()
        .subscribe(
          leaderdata =>
          {
            this.structpos = leaderdata;
            console.log(leaderdata);
          }
        );

        this.PositionStatus = "Current Leader";
      this.memberService.memberByID(this.id).subscribe(z => {
        this.members = z;
        this.PersonForm.controls.PersonID.setValue(z[0].PersonID)
      });

      this.OrgStructPosService.OrgStructPos().subscribe(data=> {this.OrgStructPos = data;

        });

    }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  showToast(position, status) {

    // if (this.checked = true)
    // {
      this.toastrService.show(
        status || 'Success',
        `Leader successfully assigned.`,
        { position, status});
    // }
    // else
    // {
      // this.toastrService.show(
      //   status || 'Danger',
      //   `No Leader was assigned`,
      //   { position, status});
    // }


  }

  showErrorToast(position, status) {

    this.toastrService.show(
      status || 'Danger',
      `No Leader was assigned`,
      { position, status});
  }


  AssignPosition(form)
  {
    console.log(form.PersonID);
    if(form.PersonID)
    {
      form.PersonToAssign = this.id;
      var data ={form: form, PersonID: this.Person.PersonID}
      this.memberService.AssignLeader(data).subscribe(z=>
      {

        if(data != null)
        {
          this.PositionStatus = "Updated Position";
          this.MemberAssignedInfo = z[0].Name + ' ' + z[0].Surname;
          this.Message = 'Leader assigned succesfully to ' + this.MemberAssignedInfo;
          this.displayMessage('top-right', 'success')
          this.members = z;
        }
        else
        {
          this.Message = 'Something went wrong. Please try again.'
            this.displayMessage('top-right', 'danger');
        }
      });
  }
  else
  {
    this.Message = 'Please provide a Leader and try again.'
    this.displayMessage('top-right', 'danger');
  }
  }

  async displayMessage(position, status) {
    this.toastrService.show(
      status || 'Success',
      this.Message,
      { position, status});
  }

  back()
  {
    if(confirm('Are you sure you want to go back?'))
    {
      this.router.navigate(["/AssignLeader"]);
    }
  }

  onOptionsSelected(mySelect)
  {
    console.log(mySelect);
  }

  public sendEmail(e: Event) {
    console.log(e);

  }

  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }

}

