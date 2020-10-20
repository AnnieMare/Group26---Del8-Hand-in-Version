import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupsService } from 'src/app/Services/groups.service';
import { IGroups } from 'src/app/model/groups';
import { IGroupType } from 'src/app/model/grouptype';
import { ICity } from 'src/app/model/city';
import { IProvince } from 'src/app/model/province';
import { ICountry } from 'src/app/model/country';
import { ISuburb } from 'src/app/model/suburb';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MembersService } from 'src/app/Services/members.service';

export interface tempGroup
{
  OrgGroupID: number;
  GroupTypeID: number;
  GroupName: string;
  Address: string;
  SuburbID: number;
  CityID: number;
  ProvinceID: number;
  CountryID: number;
  Size: number;
}

@Component({
  selector: 'app-maintain-group',
  templateUrl: './maintain-group.component.html',
  styleUrls: ['./maintain-group.component.scss']
})
export class MaintainGroupComponent implements OnInit {

  groups: IGroups[];
  grouptypes: IGroupType[];
  suburbs: ISuburb[];
  cities: ICity[];
  countries: ICountry[];
  provinces: IProvince[];
  updateGroup;
  currentGroup: any[];
  group: any;
  Person:any;
	  session:any;


  checked = false;
  errMessage: any;
  Message: any;

  constructor(private sidebarService: NbSidebarService,
              private toastrService: NbToastrService,
              private formbuilder: FormBuilder,
              private groupService: GroupsService,
              private router: Router,
              private loginService:LoginService,
              private memberService: MembersService
              )
              {
                this.updateGroup = this.formbuilder.group(
                  {
                    OrgGroupID: '',
                    GroupTypeID: '',
                    Description: '',
                    Address: '',
                    SuburbID: '',
                    Size: ''
                  }
                );
              }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

  items: any[]
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
    this.groupService.getGroupTypes().subscribe
    (
      gdata =>
      {
        this.grouptypes = gdata;
        console.log(gdata)
      }
    );
    this.groupService.getSuburb().subscribe
    (
      gdata =>
      {
        this.suburbs = gdata;
        console.log(gdata)
      }
    );

    this.group = this.groupService.getData();

    console.log(this.group);

    if (this.group != null)
    {
      this.updateGroup.controls.OrgGroupID.setValue(this.group.OrgGroupID);
      this.updateGroup.controls.GroupTypeID.setValue(this.group.GroupTypeID);
      this.updateGroup.controls.Description.setValue(this.group.Description);
      this.updateGroup.controls.Address.setValue(this.group.Address);
      this.updateGroup.controls.SuburbID.setValue(this.group.SuburbID);
      this.updateGroup.controls.Size.setValue(this.group.Size);
    }
  }


  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  showToast(position, status)
  {
    this.toastrService.show(
      status || 'Success',
      `Group was updated successfully`,
      { position, status});

  }

  showErrorToast(position, status)
  {
    this.toastrService.show(
      status || 'Success',
      this.errMessage,
      { position, status});
  }

  onSubmit(form)
  {

      var data = {GroupID: form, PersonID: this.Person.PersonID}
      console.log(form);
      //form.PersonID = this.Person.PersonID;
      this.groupService.updateOrgGroup(data)
      .subscribe
      (
        message =>
        {
          //console.log(message);
          if(message == "All done! We have received the group information.")
          {
            console.log(message);
            this.Message = message;
            this.router.navigate(["/Groups"]).then(() => {
              this.showToast('top-right', 'success');
            });

          }
          else
          {
            this.errMessage = message;

            this.showErrorToast('top-right', 'danger');
          }
        }
      );
  }

  setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }


}
