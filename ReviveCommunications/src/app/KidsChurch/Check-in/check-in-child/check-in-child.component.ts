import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbToastrService, NbMenuItem } from '@nebular/theme';
import { KidsChurchService } from '../../../Services/kids-church.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-check-in-child',
  templateUrl: './check-in-child.component.html',
  styleUrls: ['./check-in-child.component.scss']
})
export class CheckInChildComponent implements OnInit {
  ChildInfo: any;
  PersonID : any;
  childForm: any;
  Person:any;
  session:any;
  children: any;

  today: number = Date.now();
  Person_Child = [];
  Message: string;
  showList: boolean;

  constructor(
    private sidebarService: NbSidebarService,private formBuilder: FormBuilder,
    private toastrService: NbToastrService, private memberService: MembersService, private kidsChurchhService : KidsChurchService, private router: Router, private loginService: LoginService ) {
      this.childForm = this.formBuilder.group({

        ChildID: '',
        Name: '',
        Surname:'',
        KidsChurchName: ''
       });
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

          this.kidsChurchhService.getChildByParentID().subscribe(data => {
            this.children = data;
   
            if(this.children == null)
            {
              this.Message = "No Check-ins available for KidsChurch."
              this.showList = false;
            }
            else
            {
              this.showList = true;
            }
          }
          );
      })
    }




  }

  onClick(){
    var data = {child: this.Person_Child, PersonID : this.Person.PersonID}
    if(this.Person_Child.length == 0)
      {
        this.showErrorToast('top-right', 'danger');
      }
      else
      {
        
    this.kidsChurchhService.ChildCheckIn(data).subscribe(x =>{;
      this.children = x;
      console.log(this.children)
      if(this.children == null)
      {
        this.Message = "No Check-ins available for KidsChurch."
        this.showList = false;
      }
      else
      {
       this.showToast('top-right', 'success') ;
       if(this.children.length == 0)
       {
        this.Message = "No Check-ins available for KidsChurch."
        this.showList = false;
       }
      }
    }
    );
  }
}
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  checked = false;

  select(checked: boolean) {
    this.checked = checked;
  }

  showToast(position, status) {

    this.toastrService.show(
      status || 'Success',
      `Child was checked-in successfully.`,
      { position, status});
  }

  showErrorToast(position, status) {
    this.toastrService.show(
      status || 'Success',
      `No child has been selected please select a child and try again. `,
      { position, status});
  }

  changeSelection(uc, index) {

    if(this.Person_Child.includes(uc))
    {
      this.Person_Child.splice(index, 1);
    }
    else{
      this.Person_Child.push(uc);
    }
    console.log(this.Person_Child);
  }

  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }

}

