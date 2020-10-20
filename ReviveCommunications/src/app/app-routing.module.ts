import { ReportDiscComponent } from './Feedback/report-disc/report-disc.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportStructureGrowthComponent } from './Feedback/report-structure-growth/report-structure-growth.component';
import { NMOReportComponent } from './Feedback/nmoreport/nmoreport.component';
import { AddDiscipleshipComponent } from './Admin/Discipleship/add-discipleship/add-discipleship.component';
import { SearchDiscipleshipComponent } from './Admin/Discipleship/search-discipleship/search-discipleship.component';
import { UpdateDiscipleshipComponent } from './Admin/Discipleship/update-discipleship/update-discipleship.component';
import { ViewOrgIndivPosComponent } from './Admin/OrgIndivPos/view-org-indiv-pos/view-org-indiv-pos.component';
import { AddOrgIndivPosComponent } from './Admin/OrgIndivPos/add-org-indiv-pos/add-org-indiv-pos.component';
import { MaintainOrgIndivPosComponent } from './Admin/OrgIndivPos/maintain-org-indiv-pos/maintain-org-indiv-pos.component';
import { FollowUpDiscipleshipComponent } from './FollowUp/follow-up-discipleship/follow-up-discipleship.component';
import { RegisterChildComponent } from './KidsChurch/register-child/register-child.component';
import { OverviewStructureReportComponent } from './Reports/overview-structure-report/overview-structure-report.component';
import { FollowUpSalvationComponent } from './FollowUp/Salvation/follow-up-salvation/follow-up-salvation.component';
import { FollowUpMembersWantingToServeComponent } from './FollowUp/Members-wanting-to-serve/follow-up-members-wanting-to-serve/follow-up-members-wanting-to-serve.component';
import { SalvationViewComponent } from './FollowUp/Salvation/salvation-view/salvation-view.component';
import { CreateOrganisationalStrcuturePositionComponent } from './Admin/OrgStructPos/Create-Organisational-Strcuture-Position/create-organisational-strcuture-position/create-organisational-strcuture-position.component';
import { AssignOrganisationalStrcuturePositionComponent } from './Admin/OrgStructPos/Assign-Organisational-Strcuture-Position/assign-organisational-strcuture-position/assign-organisational-strcuture-position.component';
import { ViewOrganisationalStrcuturePositionComponent } from './Admin/OrgStructPos/View-Organisational-Strcuture-Position/view-organisational-strcuture-position/view-organisational-strcuture-position.component';
import { MaintainOrganisationalStrcuturePositionComponent } from './Admin/OrgStructPos/Maintain-Organisational-Strcuture-Position/maintain-organisational-strcuture-position/maintain-organisational-strcuture-position.component';
import { HomecellNotesComponent } from './Person/HomecellNotes/Homecell-Notes/homecell-notes/homecell-notes.component';
import { AddHomecellNotesComponent } from './Person/HomecellNotes/Add-Homecell-Notes/add-homecell-notes/add-homecell-notes.component';
import { CheckInChildComponent } from './KidsChurch/Check-in/check-in-child/check-in-child.component';
import { ZoneGrowthReportComponent } from './Reports/Zone-Growth-Report/zone-growth-report/zone-growth-report.component';
import { SalvationFormComponent } from './Salvation/salvation-form/salvation-form.component';
import { SetWeeklyGoalComponent } from './Goals/set-weekly-goal/set-weekly-goal.component';
import { UpdateWeeklyGoalsComponent } from './Goals/update-weekly-goals/update-weekly-goals.component';
import { SearchWeeklyGoalsComponent } from './Goals/search-weekly-goals/search-weekly-goals.component';
import { EditOrganisationalStructurePositionComponent } from './Admin/OrgStructPos/Maintain-Organisational-Strcuture-Position/Edit-Organisational-structure-position/edit-organisational-structure-position/edit-organisational-structure-position.component';
import { FinancialContributionComponent } from './FinancialContribution/financial-contribution/financial-contribution.component';
import { GroupsComponent } from './Groups/groups/groups.component';
import { GroupTransferComponent } from './Groups/group-transfer/group-transfer.component';
import { AddGroupComponent } from './Groups/add-group/add-group.component';
import { MaintainGroupComponent } from './Groups/maintain-group/maintain-group.component';
import { MembersComponent } from './Person/members/members.component';
import { AssignLeaderComponent } from './Person/assign-leader/assign-leader.component';
import { ApproveMemberComponent } from './Person/approve-member/approve-member.component';
import { NmoFollowUpComponent } from './FollowUp/nmo-follow-up/nmo-follow-up.component';
import { LeaderFollowUpComponent } from './FollowUp/leader-follow-up/leader-follow-up.component';
import { ChildrenComponent } from './KidsChurch/children/children.component';
import { VolunteerChildrenComponent } from './KidsChurch/volunteer-children/volunteer-children.component';
import { SignOutChildComponent } from './KidsChurch/sign-out-child/sign-out-child.component';
import { VolunteerSignOutApproveComponent } from './KidsChurch/volunteer-sign-out-approve/volunteer-sign-out-approve.component';
import { UpdateChildComponent } from './KidsChurch/update-child/update-child.component';
import { StructureDiscipleshipComponent } from './Reports/structure-discipleship/structure-discipleship.component';
import { AddChildComponent } from './KidsChurch/add-child/add-child.component';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
//import { HttpClientModule } from '@angular/common/http';
import { CancelConfirmationDialogComponent } from './Admin/OrgStructPos/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { LoginComponent } from './login/login/login.component';
import { JoinGroupComponent } from './Groups/join-group/join-group.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdateActivationstatusComponent } from './ActivationStatus/update-activationstatus/update-activationstatus.component';
import { ReactivateComponent } from './ActivationStatus/reactivate/reactivate.component';
import { DeActivateComponent } from './ActivationStatus/de-activate/de-activate.component';
import { SearchPersonComponent } from './Person/search-person/search-person.component';
import { UpdatePersonComponent } from './Person/update-person/update-person.component';
import { AddGroupTypeComponent } from './Groups/add-group-type/add-group-type.component';
import { UpdateGroupTypeComponent } from './Groups/update-group-type/update-group-type.component';
import { ReportZoneHCComponent } from './Feedback/report-zone-hc/report-zone-hc.component';
import { ReportZoneChurchAttComponent } from './Feedback/report-zone-church-att/report-zone-church-att.component';
import { ReportZoneGrowthComponent } from './Feedback/report-zone-growth/report-zone-growth.component';
import { ReportOnChurchAttComponent } from './Feedback/report-on-church-att/report-on-church-att.component';
import { ReportOnHCAttComponent } from './Feedback/report-on-hc-att/report-on-hc-att.component';
import { AddCounsellingComponent } from './Counselling/add-counselling/add-counselling.component';
import { ViewCounsellingComponent } from './Counselling/view-counselling/view-counselling.component';
import { ViewCounsellingRequestComponent } from './Counselling/view-counselling-request/view-counselling-request.component';
import { FollowUpMemberComponent } from './FollowUp/follow-up-member/follow-up-member.component';
import { RegisterPersonComponent } from './Person/register-person/register-person.component';
import { SendInvitationComponent } from './Messages/send-invitation/send-invitation.component';
import { PostAnnouncementComponent } from './Messages/post-announcement/post-announcement.component';
import { ViewAnnouncementComponent } from './Messages/view-announcement/view-announcement.component';
import { ViewInvitationComponent } from './Messages/view-invitation/view-invitation.component';
import { RemoveAnnouncementComponent } from './Messages/remove-announcement/remove-announcement.component';
import { SetHomecellAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-homecell-atten-goals/set-homecell-atten-goals.component';
import { SetZoneHomecellAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-zone-homecell-atten-goals/set-zone-homecell-atten-goals.component';
import { SetChurchAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-church-atten-goals/set-church-atten-goals.component';
import { SetNMOGoalsComponent } from './Goals/Set-Weekly-Goals/set-nmo-goals/set-nmo-goals.component';
import { SetDiscipleshipGoalsComponent } from './Goals/Set-Weekly-Goals/set-discipleship-goals/set-discipleship-goals.component';
import { SetZoneChurchAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-zone-church-atten-goals/set-zone-church-atten-goals.component';
import { SetStructureGrowthGoalsComponent } from './Goals/Set-Weekly-Goals/set-structure-growth-goals/set-structure-growth-goals.component';
import { SetZoneGrowthGoalsComponent } from './Goals/Set-Weekly-Goals/set-zone-growth-goals/set-zone-growth-goals.component';
import { UpdateHomecellAttGoalComponent } from './Goals/Update-Weekly-Goal/update-homecell-att-goal/update-homecell-att-goal.component';
import { UpdateZoneChurchAttGoalComponent } from './Goals/Update-Weekly-Goal/update-zone-church-att-goal/update-zone-church-att-goal.component';
import { UpdateNMOGoalComponent } from './Goals/Update-Weekly-Goal/update-nmo-goal/update-nmo-goal.component';
import { UpdateZoneHomecellAttGoalComponent } from './Goals/Update-Weekly-Goal/update-zone-homecell-att-goal/update-zone-homecell-att-goal.component';
import { UpdateZoneGrowthGoalComponent } from './Goals/Update-Weekly-Goal/update-zone-growth-goal/update-zone-growth-goal.component';
import { UpdateStructureGrowthGoalComponent } from './Goals/Update-Weekly-Goal/update-structure-growth-goal/update-structure-growth-goal.component';
import { UpdateChurchAttGoalComponent } from './Goals/Update-Weekly-Goal/update-church-att-goal/update-church-att-goal.component';
import { UpdateDiscipleshipGoalComponent } from './Goals/Update-Weekly-Goal/update-discipleship-goal/update-discipleship-goal.component';
import { LeaderAssignComponent } from './Person/leader-assign/leader-assign.component';
import { OverseerFollowUpComponent } from './FollowUp/overseer-follow-up/overseer-follow-up.component';

import { OrganisationalStructurePositionAssignComponent } from './Admin/OrgStructPos/organisational-structure-position-assign/organisational-structure-position-assign.component';
import { AssignHomecellComponent } from './Admin/OrgStructPos/assign-homecell/assign-homecell.component';
import { AssignOrganisationalGroupsComponent } from './Admin/OrgStructPos/assign-organisational-groups/assign-organisational-groups.component';

import { ViewGroupTypeComponent } from './Groups/view-group-type/view-group-type.component';
import { NewCounsellingViewComponent } from './Counselling/new-counselling-view/new-counselling-view.component';



const routes: Routes = [

  { path: '', component: LandingComponent},
  { path: 'Home', component: HomeComponent},

  //Messages
  { path: 'SendInvitation', component: SendInvitationComponent },
  { path: 'PostAnnouncement', component: PostAnnouncementComponent },
  { path: 'ViewInvitation', component: ViewInvitationComponent },
  { path: 'ViewAnnouncement', component: ViewAnnouncementComponent },
  { path: 'RemoveAnnouncement', component: RemoveAnnouncementComponent },

  //CRUDs
  { path: 'AddDiscipleship', component: AddDiscipleshipComponent },
  { path: 'SearchDiscipleship', component: SearchDiscipleshipComponent },
  { path: 'UpdateDiscipleship/:id', component: UpdateDiscipleshipComponent },
  { path: 'ViewOrgIndivPos', component: ViewOrgIndivPosComponent },
  { path: 'AddOrgIndivPos', component: AddOrgIndivPosComponent },
  { path: 'MaintainOrgIndivPos/:id', component: MaintainOrgIndivPosComponent },
  { path: 'AddChild', component: AddChildComponent },
  { path: 'UpdateChild', component: UpdateChildComponent },
  { path: 'AddGroup', component: AddGroupComponent },
  { path: 'MaintainGroup', component: MaintainGroupComponent },
  { path: 'SalvationForm', component: SalvationFormComponent},
  { path: 'AddOrganisationalStructurePosition', component: CreateOrganisationalStrcuturePositionComponent },
  { path: 'MaintainOrganisationalStructurePosition', component: MaintainOrganisationalStrcuturePositionComponent },
  { path: 'EditOrganisationalStructurePosition/:id', component: EditOrganisationalStructurePositionComponent },
  { path: 'AssignOrganisationalStructurePosition', component: AssignOrganisationalStrcuturePositionComponent },
  { path: 'CancelConfirmation', component: CancelConfirmationDialogComponent },
  { path: 'ViewOrganisationalStructurePosition', component: ViewOrganisationalStrcuturePositionComponent },
  {path: 'OrgstructurePositionAssign/:id', component: OrganisationalStructurePositionAssignComponent},
  {path: 'PlaceInHomecell/:id', component: AssignHomecellComponent},
  {path: 'AssignOrgGroup/:id', component: AssignOrganisationalGroupsComponent},

  //Follow Ups
  { path: 'FollowUpDiscipleship', component: FollowUpDiscipleshipComponent },
  { path: 'FollowUpSalvation' , component: FollowUpSalvationComponent },
  { path: 'SalvtionForm', component: SalvationFormComponent },
  { path: 'FollowUpMembersWantingToServe' , component: FollowUpMembersWantingToServeComponent },
  { path: 'NMOFollowUp', component: NmoFollowUpComponent },
  { path: 'LeaderFollowUp', component: LeaderFollowUpComponent },
  { path: 'MemberFollowUp', component: FollowUpMemberComponent },
  { path: 'OverseerFollowUp', component: OverseerFollowUpComponent },

  //Kids Church
  { path: 'RegisterChild', component: RegisterChildComponent },
  { path: 'SignOutChild', component: SignOutChildComponent },
  { path: 'VolunteerSignOutApprove', component: VolunteerSignOutApproveComponent },
  { path: 'VolunteerChildren', component: VolunteerChildrenComponent} ,
  { path: 'KidsChurch', component: ChildrenComponent },
  { path: 'Check-in', component: CheckInChildComponent },

  //Reports
  { path: 'OverviewStructureReport', component: OverviewStructureReportComponent },
  { path: 'StructureDiscipleshipReport', component: StructureDiscipleshipComponent },
  { path: 'ZoneGrowthReport', component: ZoneGrowthReportComponent },

  //Financial Contribution
  { path: 'FinancialContribution', component: FinancialContributionComponent },

  //Goal Feedback
  { path: 'ZoneGrowth/:id', component: ReportZoneGrowthComponent },
  { path: 'ZoneHomecellAttendance/:id', component: ReportZoneHCComponent },
  { path: 'ZoneChurchAttendance/:id', component: ReportZoneChurchAttComponent },
  { path: 'ReportOnHCAtt/:id', component: ReportOnHCAttComponent },
  { path: 'ReportOnChurchAtt/:id', component: ReportOnChurchAttComponent },
  { path: 'ReportOnHCAttComponent/:id', component: ReportOnHCAttComponent },
  { path: 'ReportStructureGowth/:id', component: ReportStructureGrowthComponent },
  { path: 'NMOReport/:id', component: NMOReportComponent },
  { path: 'DiscReport/:id', component: ReportDiscComponent },

  //Groups
  { path: 'Groups', component: GroupsComponent },
  { path: 'GroupTransfer/:id', component: GroupTransferComponent },
  { path: 'AddGroupType', component: AddGroupTypeComponent },
  { path: 'UpdateGroupType/:id', component: UpdateGroupTypeComponent },
  { path: 'JoinGroup', component: JoinGroupComponent },
  {path: 'ViewGroupType', component: ViewGroupTypeComponent},

  //Members
  { path: 'ApproveMember', component: ApproveMemberComponent },
  { path: 'AssignLeader', component: AssignLeaderComponent },
  { path: 'Members', component: MembersComponent },
  { path: "LeaderAssign/:id", component: LeaderAssignComponent },

  //Login
  { path: 'Login', component: LoginComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'UpdatePerson', component: UpdatePersonComponent },
  { path: 'RegisterPerson', component: RegisterPersonComponent },
  { path: "UpdateActivationStatus", component: UpdateActivationstatusComponent },
  { path: "RequestReactivate", component: ReactivateComponent },
  { path: "RequestDeActivate", component: DeActivateComponent },
  { path: "SearchPerson", component: SearchPersonComponent },

  //Counselling
  {path: 'ViewCounselling', component: ViewCounsellingComponent},
  {path: 'AddCounselling', component:AddCounsellingComponent},
  {path: 'ViewCounsellingRequest/:id', component:ViewCounsellingRequestComponent},
  {path: 'NewCounsellingView/:id', component: NewCounsellingViewComponent},

  //Goals
  { path: 'SetHomecellAttWeeklyGoal', component: SetHomecellAttenGoalsComponent },
  { path: 'SetChurchAttWeeklyGoal', component: SetChurchAttenGoalsComponent },
  { path: 'SetZoneHomecellAttWeeklyGoal', component: SetZoneHomecellAttenGoalsComponent },
  { path: 'SetZoneChurchAttWeeklyGoal', component: SetZoneChurchAttenGoalsComponent },
  { path: 'SetNMOWeeklyGoal', component: SetNMOGoalsComponent },
  { path: 'SetDiscipleshipWeeklyGoal', component: SetDiscipleshipGoalsComponent },
  { path: 'SetZoneGrowthGoal', component: SetZoneGrowthGoalsComponent },
  { path: 'SetStructureGrowthGoal', component: SetStructureGrowthGoalsComponent },
  { path: 'UpdateHomecellAttWeeklyGoal', component: UpdateHomecellAttGoalComponent },
  { path: 'UpdateChurchAttWeeklyGoal', component: UpdateChurchAttGoalComponent},
  { path: 'UpdateZoneHomecellAttWeeklyGoal', component: UpdateZoneHomecellAttGoalComponent },
  { path: 'UpdateZoneChurchAttWeeklyGoal', component: UpdateZoneChurchAttGoalComponent },
  { path: 'UpdateNMOWeeklyGoal', component: UpdateNMOGoalComponent },
  { path: 'UpdateDiscipleshipWeeklyGoal', component: UpdateDiscipleshipGoalComponent },
  { path: 'UpdateZoneGrowthGoal', component: UpdateZoneGrowthGoalComponent },
  { path: 'UpdateStructureGrowthGoal', component: UpdateStructureGrowthGoalComponent },
  { path: 'SearchWeeklyGoal', component: SearchWeeklyGoalsComponent },
  { path: 'UpdateWeeklyGoal', component: UpdateWeeklyGoalsComponent },

  //Homecell Notes
  { path: 'AddHomecellNotes', component: AddHomecellNotesComponent },
  { path: 'HomecellNotes', component: HomecellNotesComponent },

  //Audit Trail
  { path: 'AuditTrail', component: AuditTrailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
