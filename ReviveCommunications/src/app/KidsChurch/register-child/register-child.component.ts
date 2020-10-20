import { KidsChurchService } from 'src/app/Services/kids-church.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbMenuItem, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit {

  constructor( private toastrService: NbToastrService,
    private service : KidsChurchService,
    private router: Router,private sidebarService: NbSidebarService,
    private loginService: LoginService,
    private memberService: MembersService) { }


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
  ngOnInit() {


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


        console.log(this.Person)
        this.service.getMyChildren(this.Person).subscribe(x =>{
          console.log(x)
          this.myChildren = x;
        })


    this.service.getKidsChurchClasses().subscribe(x => {
      console.log(x);
      this.KidsChurchClasses = x;
    })
      })
    }



  }

myChildren: any[];
radioSelected;
selectedClass;
selected
class
KidsChurchClasses: any[];
checkbox1;
radioSelectedString
SelectedClassString
ChildSel
ClassSel

onClassChange(k){
  this.class= k;
  this.getSelectedclass();

}
getSelectedclass(){
  this.class = this.KidsChurchClasses.find(Item => Item.value === this.selectedClass);
  console.log(this.class)
  this.SelectedClassString = JSON.stringify(this.ClassSel);
}

onItemChange(c){
  this.selected = c;
  this.getSelecteditem();

}
getSelecteditem(){
  this.selected = this.myChildren.find(Item => Item.value === this.radioSelected);
  console.log(this.selected)
  this.radioSelectedString = JSON.stringify(this.ChildSel);
}

  checked = false;

  select(checked: boolean) {
    this.checked = checked;
  }

  onSubmit(registerInfo){
    console.log(registerInfo)

    this.service.register(registerInfo).subscribe(x =>{
      this.showToast('top-right', 'success')
      this.router.navigate(['/KidsChurch']);
    })

  }

  showToast(position, status) {

    this.toastrService.show(
      status || 'Success',
      `Registration Successful`,
      { position, status});
  }

  onClick(){

  }

  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }
}
