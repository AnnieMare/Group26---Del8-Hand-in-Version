import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbMenuItem, NbSidebarService, NbToastrService } from '@nebular/theme';
import { DiscipleshipService } from '../Services/discipleship.service';
import { LoginService } from '../Services/login.service';
import { NbDateService } from '@nebular/theme';
import { MembersService } from '../Services/members.service';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {

  Person:any;
  session:any;
  AuditTail;
  max;
  min;
  ErrorMessage;
  constructor(
    private DiscService :DiscipleshipService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private sidebarService: NbSidebarService,
    private loginService: LoginService,
    private http: HttpClient,
    private memberService: MembersService,
    protected dateService: NbDateService<Date>
  ) {

    this.max = this.dateService.today();
  }

  private SERVER_URL = 'https://localhost:44390';
  items: any[]

  People;

  ngOnInit(): void {
    console.log(this.AuditTail);
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


toggle() {
  this.sidebarService.toggle(true);
  return false;
}

Logout()
{
  localStorage.removeItem("accessToken");
  this.router.navigate([""]);
}

rangepicker;
SelectedDate
selectedResponsiblePerson;
StartDate :any;
EndDate :any;
PersonID;

filterSearch(x){
  var data = {StartDate : this.StartDate, EndDate: this.EndDate, selectedResponsiblePerson : this.selectedResponsiblePerson}
  console.log(data)
  this.AuditTail = "";
  this.AuditTail = this.http.post('https://localhost:44390/api/Admin/filterAuditTrail', data)


}

setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }

}
