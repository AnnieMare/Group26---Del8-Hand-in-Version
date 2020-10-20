import { Component, OnInit } from '@angular/core';
import { OrgData } from 'angular-org-chart/src/app/modules/org-chart/orgData';
import { OrganisationalStructurePositionService } from 'src/app/Services/organisational-struture-position.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbMenuItem, NbSidebarService,  NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { LoginService } from 'src/app/Services/login.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-organisational-structure-position-assign',
  templateUrl: './organisational-structure-position-assign.component.html',
  styleUrls: ['./organisational-structure-position-assign.component.scss']
})
export class OrganisationalStructurePositionAssignComponent implements OnInit {
  [x: string]: any;
  session: { SessionID: string; };
  Person: any;
  members: any
  Message: any;
  MemberAssignedInfo: any;
  PositionStatus: any;

  constructor(private OrgStructPosService: OrganisationalStructurePositionService,
    private router: Router,  private sidebarService: NbSidebarService,
    private loginService: LoginService,
    private toastrService: NbToastrService ,
    private formBuilder: FormBuilder, public route : ActivatedRoute) {
      this.PersonForm = this.formBuilder.group({
        PersonToAssign: '',
        OrgStructID: ''
      });
     }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;
       // console.log(this.Person)
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
     });
    }
    this.PositionStatus = "Current Position";
    this.OrgStructPosService.memberByID(this.id).subscribe(z => {
      this.members = z;
      this.PersonForm.controls.OrgStructID.setValue(z[0].OrgStructID)
    });

    this.OrgStructPosService.OrgStructPos().subscribe(data=> {this.OrgStructPos = data;
    
      });
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

  items: any[];

  AssignPosition(form)
  {
    if(form.OrgStructID)
    {
    form.PersonToAssign = this.id;
    var data ={form: form, PersonID: this.Person.PersonID}
    this.OrgStructPosService.AssignOrganisationalStructurePosition(data).subscribe(z=>{
      
      if(data != null)
      {
        this.PositionStatus = "Updated Position";
        this.MemberAssignedInfo = z[0].Name + ' ' + z[0].Surname;
        this.Message = 'Organizational structure position assigned succesfully to ' + this.MemberAssignedInfo;
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
    this.Message = 'Please provide a Position and try again.'
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
      this.router.navigate(["/AssignOrganisationalStructurePosition"]);
    }
  }

  onOptionsSelected(mySelect)
  {
    console.log(mySelect);
  }
  
  public sendEmail(e: Event) {
    console.log(e);
   
  }
}

