import { Component, OnInit } from '@angular/core';
import { GoalsServiceService } from 'src/app/Services/goals.service';
import { NbToastrService, NbDialogService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login/login.component';
import { LoginService } from 'src/app/Services/login.service';
import { analytics } from 'firebase';
import { TextAttribute } from '@angular/compiler/src/render3/r3_ast';
import { FormBuilder } from '@angular/forms';
import { MembersService } from 'src/app/Services/members.service';

//import { HomecellAttendance } from '../../model/Goals';
//import { DeleteConfirmationDialogComponent } from './Goals/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-search-weekly-goals',
  templateUrl: './search-weekly-goals.component.html',
  styleUrls: ['./search-weekly-goals.component.scss']
})
export class SearchWeeklyGoalsComponent implements OnInit {

  ZoneHCGoals: any;
  ChurchAtt: any;

  ChurchAttFeedback: any;
  ZoneHCGoalsFeedback: any;
  GoalsFeedback: Object;
  goalDisplay: number;
  HCAtt: boolean;
  CAtt: boolean;
  ZHCAtt: boolean;
  goalsPost: any;
  Person:any;
  session:any;
  Message: any;
  enableMaintain: boolean;
  enableFeedback: boolean;
  ChurchGoals: any;
  DiscipleshipGoals: any;
  ZChurchGoals: any;
  ZHomecellGoals: any;
  NMOGoals: any;
  StructureGoals: any;
  ZoneGoals: any;
  ZChurchCAtt: boolean;
  ChurchCAtt: boolean;
  NMO: boolean;
  Zone: boolean;
  struct: boolean;
  Disc: boolean;
  ZoneGrowthSET: boolean;
  ZoneHCATTSET: boolean;
  ZoneChurchAttSET: boolean;
  SearchGoalDropDown: any;
  ZoneGrowthFBSET: boolean;
  ZoneChurchAttFBSET: boolean;
  ZoneHCATTFBSET: boolean;
  HCATTFBSET: boolean;
  ChurchAttFBSET: boolean;
  dropdownList: any;

  //
  HCATTFeed: boolean;
  HCATTMAintain: boolean;

  CATTFeed: boolean;
  CATTMAintain: boolean;

  zHCATTFeed: boolean;
  zHCATTMAintain: boolean;

  NMOFeed: boolean;
  NMOMAintain: boolean;

  ZCATTFeed: boolean;
  ZCATTMAintain: boolean;

  DiscFeed: boolean;
 DiscMAintain: boolean;

  ZoneFeed: boolean;
  ZoneMAintain: boolean;

  StructFeed: boolean;
  StructMAintain: boolean;



  constructor(private GoalsService: GoalsServiceService,
    private toastrService: NbToastrService ,private dialogService: NbDialogService, private loginService: LoginService,
    private memberService: MembersService,
    private sidebarService: NbSidebarService,
    private router : Router, private formBuilder: FormBuilder) {
      this.goalsPost = this.formBuilder.group({
        goalDescription: '',
      })
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

  Goals: any;
  ngOnInit(): void {
    if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;

        this.GoalsService.DropDown(this.Person.PersonID).subscribe(x=>{ 
          this.dropdownList = x;
        });
        this.HCATTFeed = false;
        this.HCATTMAintain= false;
      
        this.CATTFeed= false;
        this.CATTMAintain= false;
      
        this.zHCATTFeed= false;
        this.zHCATTMAintain= false;
      
        this.NMOFeed= false;
        this.NMOMAintain= false;
      
        this.ZCATTFeed= false;
        this.ZCATTMAintain= false;
      
        this.DiscFeed= false;
        this.DiscMAintain= false;
      
        this.ZoneFeed= false;
        this.ZoneMAintain= false;
      
        this.StructFeed= false;
        this.StructMAintain= false;

        if(this.Person.OrgIndivPos == "Senior Pastor")
        {
          this.HCATTFeed = true;
        this.HCATTMAintain= true;
      
        this.CATTFeed= true;
        this.CATTMAintain= true;
      
        this.zHCATTFeed= true;
        this.zHCATTMAintain= true;
      
        this.NMOFeed= true;
        this.NMOMAintain= true;
      
        this.ZCATTFeed= true;
        this.ZCATTMAintain= true;
      
        this.DiscFeed= true;
        this.DiscMAintain= true;
      
        this.ZoneFeed= true;
        this.ZoneMAintain= true;
      
        this.StructFeed= true;
        this.StructMAintain= true;
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
          this.zHCATTMAintain= true;
          this.ZCATTMAintain= true;
          this.ZoneMAintain= true;
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
          this.HCATTMAintain= true;
          this.CATTMAintain= true;  
          this.zHCATTFeed= true;
          this.ZCATTFeed= true;
          this.ZoneFeed= true;
          this.StructMAintain= true;
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

          this.NMOMAintain= true;
          this.DiscMAintain= true;    
          this.StructFeed= true;
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
           this.NMOFeed= true;      
           this.DiscFeed= true;

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
           this.HCATTFeed = true;     
           this.CATTFeed= true;
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

    this.HCAtt = false;
    this.ZHCAtt = false;
    this.ChurchCAtt = false;
    this.ZChurchCAtt = false;
    this.Disc = false;
    this.NMO = false;
    this.Zone = false;
    this.struct = false;
    this.enableMaintain = false;
    this.enableFeedback = false;

    this.GoalsService.DropDown(this.Person.PersonID).subscribe(x=>{ 
      this.dropdownList = x;
    })
   
    }
}
Maintain()
{
  if(this.enableMaintain ==  true)
  {
    this.enableMaintain = false;
  }
  else
  {
    this.enableMaintain = true;
  }
}

Feedback()
{
  if(this.enableFeedback ==  true)
  {
    this.enableFeedback = false;
  }
  else
  {
    this.enableFeedback = true;
  }
}

displayGoal(form)
{
  if(form.goalDescription == 6)
  {

    this.GoalsService.getHomecellAtt().subscribe(data=> {this.Goals = data;
      this.HCAtt = true;
      this.ZHCAtt = false;
      this.ChurchCAtt = false;
      this.ZChurchCAtt = false;
      this.Disc = false;
      this.NMO = false;
      this.Zone = false;
      this.struct = false;
    });
  }
  else if(form.goalDescription == 12)
  {

    this.GoalsService.getZoneHomecellAtt().subscribe(data=> {this.ZHomecellGoals = data; 
      this.HCAtt = false;
      this.ZHCAtt = true;
      this.ChurchCAtt = false;
      this.ZChurchCAtt = false;
      this.Disc = false;
      this.NMO = false;
      this.Zone = false;
      this.struct = false;});
  }
  else if(form.goalDescription == 7)
  {

    this.GoalsService.getChurchAtt().subscribe(data=> {this.ChurchGoals = data; 
      this.HCAtt = false;
      this.ZHCAtt = false;
      this.ChurchCAtt = true;
      this.ZChurchCAtt = false;
      this.Disc = false;
      this.NMO = false;
      this.Zone = false;
      this.struct = false;});
  }
  else if(form.goalDescription == 13)
  {

    this.GoalsService.getZoneChurchAtt().subscribe(data=> {this.ZChurchGoals = data; 
      this.HCAtt = false;
      this.ZHCAtt = false;
      this.ChurchCAtt = false;
      this.ZChurchCAtt = true;
      this.Disc = false;
      this.NMO = false;
      this.Zone = false;
      this.struct = false;});
  }
  else if(form.goalDescription == 10)
  {

    this.GoalsService.getNMO().subscribe(data=> {this.NMOGoals = data; 
      this.HCAtt = false;
      this.ZHCAtt = false;
      this.ChurchCAtt = false;
      this.ZChurchCAtt = false;
      this.Disc = false;
      this.NMO = true;
      this.Zone = false;
      this.struct = false;});
  }
  else if(form.goalDescription == 8)
  {

    this.GoalsService.getDiscipleship().subscribe(data=> {this.DiscipleshipGoals = data; 
      this.HCAtt = false;
      this.ZHCAtt = false;
      this.ChurchCAtt = false;
      this.ZChurchCAtt = false;
      this.Disc = true;
      this.NMO = false;
      this.Zone = false;
      this.struct = false;});
  }
  else if(form.goalDescription == 11)
  {

    this.GoalsService.getZoneGrowth().subscribe(data=> {this.ZoneGoals = data; 
      this.HCAtt = false;
      this.ZHCAtt = false;
      this.ChurchCAtt = false;
      this.ZChurchCAtt = false;
      this.Disc = false;
      this.NMO = false;
      this.Zone = true;
      this.struct = false;});
  }
  else if(form.goalDescription == 9)
  {
   
    this.GoalsService.getStructureGrwoth().subscribe(data=> {this.StructureGoals = data; 
      this.HCAtt = false;
      this.ZHCAtt = false;
      this.ChurchCAtt = false;
      this.ZChurchCAtt = false;
      this.Disc = false;
      this.NMO = false;
      this.Zone = false;
      this.struct = true;});
  }
}
    //delete method that will send the goalID data to the service
    deleteHomecellAttGoalID(goalID) {

      if(confirm("Are you sure you want to delete this goal?"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteHomecellAttGoal(data).subscribe(x =>{

        if(x != null)
        {
          this.Goals = x;
          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }

      });
    }
    }
    //delete method that will send the goalID data to the service
    deleteZoneChurchAttGoalgoalID(goalID) {
      if(confirm("Are you sure you want to delete this goal?"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteZoneChurchAttGoal(goalID).subscribe(x =>{

        if(x != null)
        {
          this.ZoneHCGoals = x;
          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }
      });
      }
    }
    //delete method that will send the goalID data to the service
    deleteChurchAttGoalgoalID(goalID) {
      if(confirm("Are you sure you want to delete this goal?"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteChurchAttGoal(goalID).subscribe(x =>{

        if(x != null)
        {
          this.ChurchAtt = x;
          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }

      });
      }
    }
    //delete method that will send the goalID data to the service
    deleteZoneHomecellAttendanceGoalgoalID(goalID) {
      if(confirm("Are you sure you want to delete this goal?"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteZoneHomecellAttGoal(goalID).subscribe(x =>{

        if(x != null)
        {
          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }

      });
      }
    }
    //delete method that will send the goalID data to the service
    deleteNewMemberOrientationGoalgoalID(goalID) {
      if(confirm("Are you sure you want to delete this goal?"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteNMOGoal(goalID).subscribe(x =>{

        if(x != null)
        {
          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }

      });
    }
    }
    //delete method that will send the goalID data to the service
    deleteDiscipleshipGoalgoalID(goalID) {
      if(confirm("Are you sure you want to delete this goal?"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteDiscipleshipGoal(goalID).subscribe(x =>{

        if(x != null)
        {
          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }

      });
    }
    }
    //delete method that will send the goalID data to the service
    deleteStructureGrowthGoalgoalID(goalID) {
      if(confirm("Are you sure you want to delete this goal?"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteStructureGrowthGoal(goalID).subscribe(x =>{

        if(x != null)
        {
          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }

      });
    }
    }
    //delete method that will send the goalID data to the service
    deleteZoneGrowthGoalgoalID(goalID) {
      if(confirm("Are you sure you want to delete this goal"))
      {
      console.log(goalID);
      var data = {goalID: goalID, PersonID: this.Person.PersonID}

      this.GoalsService.deleteZoneGrowthGoal(goalID).subscribe(x =>{

        if(x != null)
        {

          this.Message = "Weekly Goal was removed successfully."
          this.displayMessage('top-right', 'success');
        }
        else{
          this.Message = "Something went wrong please try again."
          this.displayMessage('top-right', 'danger');
        }

      });
    }
    }
    submitData(pro)
    {
      console.log(pro);
      this.GoalsService.setData(pro);
      this.GoalsService.setData1(1);
    }
    submitData1(pro)
    {
      console.log(pro);
      this.GoalsService.setData(pro);
      this.GoalsService.setData1(2);
    }
    submitData2(pro)
    {
      console.log(pro);
      this.GoalsService.setData(pro);
      this.GoalsService.setData1(3);
    }

    displayMessage(position, status) {

      this.toastrService.show(
        status || 'Success',
        this.Message,
        { position, status});
    }

    setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }
  
  }

