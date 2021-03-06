import { Component, OnInit } from '@angular/core';
import { OrgData } from 'angular-org-chart/src/app/modules/org-chart/orgData';
import { OrganisationalStructurePositionService } from 'src/app/Services/organisational-struture-position.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbMenuItem, NbSidebarService,  NbComponentStatus, NbIconConfig, NbToastrService } from '@nebular/theme';
import { LoginService } from 'src/app/Services/login.service';
import { FormBuilder } from '@angular/forms';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-assign-organisational-groups',
  templateUrl: './assign-organisational-groups.component.html',
  styleUrls: ['./assign-organisational-groups.component.scss']
})
export class AssignOrganisationalGroupsComponent implements OnInit {
  [x: string]: any;
  session: { SessionID: string; };
  Person: any;
  members: any
  Message: any;
  MemberAssignedInfo: any;
  PositionStatus: any;
  Groups: any;
  MemberGroups: any;
  Group1: boolean;
  Group2: boolean;
  Group3: boolean;
  enableServe: any;
  GroupMessageStatus: any;
  GroupMessageenable: any;


  constructor(private OrgStructPosService: OrganisationalStructurePositionService,
    private router: Router,  private sidebarService: NbSidebarService,
    private loginService: LoginService,
    private toastrService: NbToastrService ,
    private formBuilder: FormBuilder, public route : ActivatedRoute, private memberService: MembersService) {
      this.PersonForm = this.formBuilder.group({
        PersonToAssign: '',
        group1: '',
        group2: '',
        group3: ''
      });
     }

     contex =  [{ title: 'Profile',
     icon: 'person-outline' }, { title: 'Log out',
     icon: 'person-outline' }];

  ngOnInit(): void {

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
        // console.log(this.Person)
      });
    }
    this.PositionStatus = "Current Position";
    this.OrgStructPosService.memberByID(this.id).subscribe(z => {
      this.members = z;
    });

this.checkGroups();

    this.OrgStructPosService.GetGroups(this.id).subscribe(data=> {this.Groups = data;});

  }
  checkGroups()
  {
    this.OrgStructPosService.membersGroups(this.id).subscribe(data=> {this.MemberGroups = data;
      console.log(this.MemberGroups[2]);
      if(data[0].Group)
      {
        this.PersonForm.controls.group1.setValue(data[0].Group);
        this.PersonForm.controls.group1.disable();

      }
      if(data[1].Group)
      {
        this.PersonForm.controls.group2.setValue(data[1].Group);
        this.PersonForm.controls.group2.disable();
      }
      if(data[2].Group)
      {
        this.PersonForm.controls.group3.setValue(data[2].Group);
        this.PersonForm.controls.group3.disable();
      }

      if(data[0].Group && data[1].Group && data[2].Group )
      {
          this.enableServe = true;
          this.Message = "Member has reach maximum group to serve in. Member needs to transfer groups by adding a transfer reqeust."
          this.displayMessage('top-right', 'danger');
      }
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
    if(form)
    {
    form.PersonToAssign = this.id;
    var data ={form: form, PersonID: this.id}
    this.OrgStructPosService.AssignOrganisationalGroups(data).subscribe(z=>{
      
      if(z == "Member is now serving in the selected Organisational groups.")
      {
        this.checkGroups();
        this.Message = z;
        this.displayMessage('top-right', 'success')

      }
      else
      {
         this.Message = z;
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
      this.router.navigate(["/FollowUpMembersWantingToServe"]);
    }

  }
  
  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }
}
