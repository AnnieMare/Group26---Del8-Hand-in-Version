import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbToastrService } from '@nebular/theme';
import { LeaderOption } from 'src/app/model/leaderoptions';
import { NbDialogService } from '@nebular/theme';
import { ViewMemberDialogComponent } from 'src/app/Person/view-member-dialog/view-member-dialog.component';
import { IMembers } from 'src/app/model/members';
import { MembersService } from 'src/app/Services/members.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-approve-member',
  templateUrl: './approve-member.component.html',
  styleUrls: ['./approve-member.component.scss']
})
export class ApproveMemberComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  checked = false;
  members: IMembers[];
  approveMember;
  NoApprovalsLeft: string;
  MembersProgress: any;
  MemberFound: any;


TotalApprovals: any;


  constructor(private toastrService: NbToastrService,
              private memberService: MembersService,
              private dialogService: NbDialogService,
              private formBuilder: FormBuilder,
              private router: Router ,
              private sidebarService: NbSidebarService,
              private loginService: LoginService,
              )
              {
                this.approveMember = this.formBuilder.group(
                {
                  Approved: "",
                  PersonID: ""
                }
                );
                monkeyPatchChartJsTooltip();
                monkeyPatchChartJsLegend();
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
    Person:any;

    session:any;

    MemberApprove;

  ngOnInit()
  {


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

    //retrieving data for follow-up from service
    this.memberService.getUnapprovedMembers().subscribe(data=> {this.MemberApprove = data;
    });

    this.memberService.getApprovalProgress().subscribe(data=> {this.MembersProgress = data;
     //Assign members progress to array to render pie chart
     //this.pieChartData[0] = this.MembersProgress.Completed;
     //this.pieChartData[1] = this.MembersProgress.Remaining;
     this.TotalApprovals = this.MembersProgress.Remaining;
     //if no salvations are remaining on form load
     if(this.MembersProgress.Remaining == 0)
     {
       this.NoApprovalsLeft = 'No member approvals remaining.';
     }
   });

   this.memberService.getUnapprovedMembers()
   .subscribe
   (
     data => {
       this.members = data;
       console.log(data);
     }
   );
  }

  open() {
    this.dialogService.open(ViewMemberDialogComponent, {
      context: {

      },
    });
  }

  showToast(position, status) {

    if (this.checked = true)
    {
      this.toastrService.show(
        status || 'Success',
        `Member successfully approved.`,
        { position, status});
    }
    else
    {
      this.toastrService.show(
        status || 'Danger',
        `Member not found`,
        { position, status});
    }


  }

  showErrorToast(position, status) {

    this.toastrService.show(
      status || 'Danger',
      `Member not found`,
      { position, status});
  }

  onSubmit(form)
  {

    //console.log(form);
    var data = { MemberID: form, PersonID: this.Person.PersonID }
    this.memberService.updateMemberApproval(data).subscribe(x =>{
      this.showToast('top-right', 'success');
      this.MemberApprove = x;
      this.getProgress();
      this.memberService.getUnapprovedMembers().subscribe(data=> {this.MemberApprove = data;
      });
    });
  }

  getProgress()
  {
    this.memberService.getApprovalProgress().subscribe(data=> {this.MembersProgress = data;
      //Assign members progress to array to render pie chart
      //this.pieChartData[0] = this.MembersProgress.Completed;
      //this.pieChartData[1] = this.MembersProgress.Remaining;
      this.TotalApprovals = this.MembersProgress.Remaining;
      //Update chart on follow-up completed click and no answer click
      this.chart.chart.update();
      //if no salvations are remaining
      if(this.MembersProgress.Remaining == 0)
      {
        this.NoApprovalsLeft = 'No member approvals remaining.';
      }});

  }

  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }

}

