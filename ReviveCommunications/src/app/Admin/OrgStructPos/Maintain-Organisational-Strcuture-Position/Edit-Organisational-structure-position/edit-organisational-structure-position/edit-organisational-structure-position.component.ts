import { Component, OnInit } from '@angular/core';
import { OrganisationalStructurePositionService } from 'src/app/Services/organisational-struture-position.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbMenuItem, NbSidebarService,  NbComponentStatus, NbIconConfig } from '@nebular/theme';
import { OrgIndivPosService } from '../../../../../Services/org-indiv-pos.service';
import { LoginService } from 'src/app/Services/login.service';

import { ActivatedRoute } from '@angular/router'
import { MaintainOrganisationalStrcuturePositionComponent } from '../../maintain-organisational-strcuture-position/maintain-organisational-strcuture-position.component';

import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-edit-organisational-structure-position',
  templateUrl: './edit-organisational-structure-position.component.html',
  styleUrls: ['./edit-organisational-structure-position.component.scss']
})
export class EditOrganisationalStructurePositionComponent implements OnInit {
  OrgStructPos: any;
  OrgPosition: any;
  OrgStructPos1: any;
  OrgStructType: any;
  OrgIndivPosList: any[];

  Person:any;
	  session:any;
  Message: Object;
  sub: any;
  id: any;

  constructor(private OrgStructPosService: OrganisationalStructurePositionService,
    private formBuilder: FormBuilder,private router: Router,
    private toastrService: NbToastrService ,
    private OIPService: OrgIndivPosService,
    private dialogService: NbDialogService,
    private sidebarService: NbSidebarService,
    private loginService: LoginService,
    private memberService: MembersService,
    public route : ActivatedRoute) {

  this.OrgStructPos = this.formBuilder.group({OrgStructLevel:'',
  OrgStructTypeID: '',
  OrgIndivPosID: '',
  OrgStructIDReportsTo: '',
  Description: '',
  OrgStructID: ''
 });
}

    items: any[]
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.OrgStructPosService.OrgStructPos().subscribe(x =>{
      this.OrgStructPos1 = x
      console.log(this.OrgStructPos1)});

      this.OrgStructPosService.OrgStructType().subscribe(x =>{
        this.OrgStructType = x
        console.log(this.OrgStructType)});
        this.OIPService.getAllOrgIndivPos().subscribe(x =>{
          this.OrgIndivPosList = x
          console.log(this.OrgIndivPosList)}
          );

    this.OrgStructPosService.getPositionByID(this.id).subscribe(data => {

      this.OrgStructPos.controls.OrgStructLevel.setValue(data['OrgStructLevel']);
      this.OrgStructPos.controls.OrgStructID.setValue(data['OrgStructID']);
      this.OrgStructPos.controls.OrgStructTypeID.setValue(data['OrgStructType']);
      this.OrgStructPos.controls.OrgIndivPosID.setValue(data['OrgIndivPos']);
      this.OrgStructPos.controls.OrgStructIDReportsTo.setValue(data['OrgSTructReportTo']);
      this.OrgStructPos.controls.Description.setValue(data['Description']);});

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

  }
  open() {
    this.dialogService.open(MaintainOrganisationalStrcuturePositionComponent, {
      context: {
      },
    });}

  updateHomecellAttGoalForm(form) {
    var data ={form: form, PersonID: this.Person.PersonID}
    this.OrgStructPosService.UpdateOrganisationalStructurePosition(data).subscribe(x=>{

      if(x == "Organisational structure position was updated successfully.")
      {
         this.Message = x;
         this.router.navigate(["/MaintainOrganisationalStructurePosition"]).then(() => {
          this.displayMessage('top-right', 'success');
         });;
      }
      else
      {
       this.Message = x;
       this.displayMessage('top-right', 'danger');
       return;
      }  
    });
  }

  //toaster message
  async displayMessage(position, status) {
    this.toastrService.show(
      status || 'Success',
      this.Message,
      { position, status});
  }

  close()
  {
    if(confirm("Are you sure you want to go back?"))
    this.router.navigate(["MaintainOrganisationalStructurePosition"]);
  }

  title = 'ReviveCommunications';

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }


  setData(updatePers)
   {
     this.memberService.setData(updatePers);

   }



}




