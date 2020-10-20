import { Component, OnInit } from '@angular/core';
import { OrganisationalStructurePositionService } from 'src/app/Services/organisational-struture-position.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { OrgIndivPosService } from 'src/app/Services/org-indiv-pos.service';
import { NbToastrService, NbSidebarService, NbDialogService, NbMenuItem } from '@nebular/theme';
import { GroupsService } from 'src/app/Services/groups.service';
import { LoginService } from 'src/app/Services/login.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-assign-leader',
  templateUrl: './assign-leader.component.html',
  styleUrls: ['./assign-leader.component.scss']
})
export class AssignLeaderComponent implements OnInit {
  OrgStructPos: Object;
  Member: any;
  OrgIndivPos: any;
  OrgPosition: any;
  OrgStructPos1: any;
  search: any;
  MemberFound: any;
  ShowAssign: boolean;
  groups: any;

  Person:any;
  session:any;
  structpos: any;
  members: any;
  enableUndo: boolean;
  ErrorMessage: any;

  constructor(private OrgStructPosService: OrganisationalStructurePositionService, private memberService: MembersService,
    private formBuilder: FormBuilder,private router: Router,
    private toastrService: NbToastrService ,
    private dialogService: NbDialogService,
    private groupService: GroupsService ,
    private sidebarService: NbSidebarService,
    private loginService: LoginService)
    {
      this.OrgStructPos1 = this.formBuilder.group
      ({

          OrgStructID: '',
          OrgGroupID: '',
          OrgGroupID1: '',
          OrgGroupID2: '',
          OrgGroupID3: '',

          PersonID: ''
 });

        this.search = this.formBuilder.group({
          Name:''});
        }
items: any[]
  ngOnInit(): void {
    this.OrgStructPosService.OrgStructPos().subscribe(data=> {this.OrgStructPos = data;
    console.log(data)});
    this.ShowAssign = false;
    this.enableUndo = false;

    this.memberService.UnassignedMembers()
         .subscribe(
           memberdata =>
           {
             this.members = memberdata;
             console.log(memberdata);
           }
         );


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
                 link: 'http://localhost:8080/User%20Manual.html'
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
  }


  MemberSearch(form)
  {
    if(form.Name == "")
    {
      this.ErrorMessage = "You did not provide a name for your search. Please provide a name and try again.";
      this.errorMessage('top-right', 'danger');
    }
    else{

    this.memberService.MemberSearchInfo(form).subscribe(response => {

      if(response != null)
      {
      this.members = response;
      this.enableUndo = true;
      }
      else
      {
        this.enableUndo = true;
        this.ErrorMessage = "No member was found based on the name provided or the member does not exist. Please check the spelling and try again."
        this.errorMessage('top-right', 'danger');
      }
    });
  }
  }

  undoSearch()
  {
    if(confirm("Are you sure you want to undo your search?"))
    this.memberService.UnassignedMembers().subscribe(data => {
        this.members = data;
        this.search.reset();
        this.enableUndo = false;
      });
  }

  SuccessMessage(position, status) {

    this.toastrService.show(
      status || 'Success',
      `Organisational structure position was assigned successfully`,
      { position, status});
  }

errorMessage(position, status) {

    this.toastrService.show(
      status || 'Success',
      this.ErrorMessage,
      { position, status});
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


  back()
  {
    if(confirm('Are you sure you want to go back?'))
    {
      this.router.navigate(["/Members"]);
    }
  }

  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }


}

