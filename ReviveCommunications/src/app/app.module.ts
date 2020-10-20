
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrgChartModule } from 'angular-org-chart';
import { HttpClientModule } from '@angular/common/http';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
//import {SingleMediaPlayer} from './single-media-player';
//counselling
import{ init } from 'emailjs-com';
init("user_sVlvRxwKNjNEaAn0owkzQ");
//////////////////////////////////////////////////////////////



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendInvitationComponent } from './Messages/send-invitation/send-invitation.component';
import { ViewInvitationComponent } from './Messages/view-invitation/view-invitation.component';
import { PostAnnouncementComponent } from './Messages/post-announcement/post-announcement.component';
import { RemoveAnnouncementComponent } from './Messages/remove-announcement/remove-announcement.component';
import { ViewAnnouncementComponent } from './Messages/view-announcement/view-announcement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbIconModule, NbMenuModule, NbInputModule, NbListModule, NbCardModule, NbCheckboxModule, NbUserModule, NbStepperModule, NbRadioModule, NbActionsModule, NbAccordionModule, NbToastrModule, NbDialogModule, NbSelectModule, NbTabsetModule, NbProgressBarModule, NbDatepickerModule, NbTooltipModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
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
import { ViewGroupDialogComponent } from './Groups/view-group-dialog/view-group-dialog.component';
import { MembersComponent } from './Person/members/members.component';
import { AssignLeaderComponent } from './Person/assign-leader/assign-leader.component';
import { ViewMemberDialogComponent } from './Person/view-member-dialog/view-member-dialog.component';
import { ApproveMemberComponent } from './Person/approve-member/approve-member.component';
import { NmoFollowUpComponent } from './FollowUp/nmo-follow-up/nmo-follow-up.component';
import { LeaderFollowUpComponent } from './FollowUp/leader-follow-up/leader-follow-up.component';
import { ChildrenComponent } from './KidsChurch/children/children.component';
import { ViewChildDialogComponent } from './KidsChurch/view-child-dialog/view-child-dialog.component';
import { SignOutChildDialogComponent } from './KidsChurch/sign-out-child-dialog/sign-out-child-dialog.component';
import { SignedOutChildDialogComponent } from './KidsChurch/signed-out-child-dialog/signed-out-child-dialog.component';
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
import { CancelConfirmDiscipleshipComponent } from 'src/app/Admin/Discipleship/cancel-confirm-discipleship/cancel-confirm-discipleship.component';
import { ConfirmDeleteDialogComponent } from './Admin/Discipleship/confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmDeleteOIPDialogComponent } from './Admin/OrgIndivPos/confirm-delete-oipdialog/confirm-delete-oipdialog.component';
import { CancelConfirmOIPComponent } from './Admin/OrgIndivPos/cancel-confirm-oip/cancel-confirm-oip.component';
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
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { ReportDiscComponent } from './Feedback/report-disc/report-disc.component';
//import jsPDF from 'jspdf';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBnlL3gKvcM30gWWSQziOhkPQwIdCy7oro",
  authDomain: "revive-communications.firebaseapp.com",
  databaseURL: "https://revive-communications.firebaseio.com",
  projectId: "revive-communications",
  storageBucket: "revive-communications.appspot.com",
  messagingSenderId: "842765911039",
  appId: "1:842765911039:web:197e54136748ea23baddca",
  measurementId: "G-FBLW2LXDC0"
};

//calender
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

//Firebase module import and see Environment file
import {AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from '../environments/environment';

//pie chart
import { ChartsModule } from 'ng2-charts';
import { SetHomecellAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-homecell-atten-goals/set-homecell-atten-goals.component';
import { SetZoneHomecellAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-zone-homecell-atten-goals/set-zone-homecell-atten-goals.component';
import { SetChurchAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-church-atten-goals/set-church-atten-goals.component';
import { SetZoneChurchAttenGoalsComponent } from './Goals/Set-Weekly-Goals/set-zone-church-atten-goals/set-zone-church-atten-goals.component';
import { SetNMOGoalsComponent } from './Goals/Set-Weekly-Goals/set-nmo-goals/set-nmo-goals.component';
import { SetDiscipleshipGoalsComponent } from './Goals/Set-Weekly-Goals/set-discipleship-goals/set-discipleship-goals.component';
import { SetZoneGrowthGoalsComponent } from './Goals/Set-Weekly-Goals/set-zone-growth-goals/set-zone-growth-goals.component';
import { SetStructureGrowthGoalsComponent } from './Goals/Set-Weekly-Goals/set-structure-growth-goals/set-structure-growth-goals.component';
import { UpdateHomecellAttGoalComponent } from './Goals/Update-Weekly-Goal/update-homecell-att-goal/update-homecell-att-goal.component';
import { UpdateZoneHomecellAttGoalComponent } from './Goals/Update-Weekly-Goal/update-zone-homecell-att-goal/update-zone-homecell-att-goal.component';
import { UpdateChurchAttGoalComponent } from './Goals/Update-Weekly-Goal/update-church-att-goal/update-church-att-goal.component';
import { UpdateZoneChurchAttGoalComponent } from './Goals/Update-Weekly-Goal/update-zone-church-att-goal/update-zone-church-att-goal.component';
import { UpdateNMOGoalComponent } from './Goals/Update-Weekly-Goal/update-nmo-goal/update-nmo-goal.component';
import { UpdateDiscipleshipGoalComponent } from './Goals/Update-Weekly-Goal/update-discipleship-goal/update-discipleship-goal.component';
import { UpdateStructureGrowthGoalComponent } from './Goals/Update-Weekly-Goal/update-structure-growth-goal/update-structure-growth-goal.component';
import { UpdateZoneGrowthGoalComponent } from './Goals/Update-Weekly-Goal/update-zone-growth-goal/update-zone-growth-goal.component';
import { LeaderAssignComponent } from './Person/leader-assign/leader-assign.component';
import { OverseerFollowUpComponent } from './FollowUp/overseer-follow-up/overseer-follow-up.component';

import { OrganisationalStructurePositionAssignComponent } from './Admin/OrgStructPos/organisational-structure-position-assign/organisational-structure-position-assign.component';
import { AssignHomecellComponent } from './Admin/OrgStructPos/assign-homecell/assign-homecell.component';
import { AssignOrganisationalGroupsComponent } from './Admin/OrgStructPos/assign-organisational-groups/assign-organisational-groups.component';

import { ViewGroupTypeComponent } from './Groups/view-group-type/view-group-type.component';
import { NewCounsellingViewComponent } from './Counselling/new-counselling-view/new-counselling-view.component';



@NgModule({
  declarations: [
    AppComponent,
    SendInvitationComponent,
    ViewInvitationComponent,
    PostAnnouncementComponent,
    RemoveAnnouncementComponent,
    ViewAnnouncementComponent,
    ReportStructureGrowthComponent,
    NMOReportComponent,
    AddDiscipleshipComponent,
    SearchDiscipleshipComponent,
    UpdateDiscipleshipComponent,
    ViewOrgIndivPosComponent,
    AddOrgIndivPosComponent,
    MaintainOrgIndivPosComponent,
    FollowUpDiscipleshipComponent,
    RegisterChildComponent,
    OverviewStructureReportComponent,
    FollowUpSalvationComponent,
    FollowUpMembersWantingToServeComponent,
    SalvationViewComponent,
    CreateOrganisationalStrcuturePositionComponent,
    AssignOrganisationalStrcuturePositionComponent,
    ViewOrganisationalStrcuturePositionComponent,
    MaintainOrganisationalStrcuturePositionComponent,
    HomecellNotesComponent,
    AddHomecellNotesComponent,
    CheckInChildComponent,
    ZoneGrowthReportComponent,
    SalvationFormComponent,
    SetWeeklyGoalComponent,
    UpdateWeeklyGoalsComponent,
    SearchWeeklyGoalsComponent,
    EditOrganisationalStructurePositionComponent,
    FinancialContributionComponent,
    GroupsComponent,
    GroupTransferComponent,
    AddGroupComponent,
    MaintainGroupComponent,
    ViewGroupDialogComponent,
    MembersComponent,
    AssignLeaderComponent,
    ViewMemberDialogComponent,
    ApproveMemberComponent,
    NmoFollowUpComponent,
    LeaderFollowUpComponent,
    ChildrenComponent,
    ViewChildDialogComponent,
    SignOutChildDialogComponent,
    SignedOutChildDialogComponent,
    VolunteerChildrenComponent,
    SignOutChildComponent,
    VolunteerSignOutApproveComponent,
    UpdateChildComponent,
    StructureDiscipleshipComponent,
    AddChildComponent,
    CancelConfirmationDialogComponent,
    LoginComponent,
    CancelConfirmDiscipleshipComponent,
    ConfirmDeleteDialogComponent,
    CancelConfirmOIPComponent,
    ConfirmDeleteOIPDialogComponent,
    LandingComponent,
    HomeComponent,
    ResetPasswordComponent,
    UpdateActivationstatusComponent,
    ReactivateComponent,
    DeActivateComponent,
    SearchPersonComponent,
    UpdatePersonComponent,
    AddGroupTypeComponent,
    UpdateGroupTypeComponent,
    JoinGroupComponent,
    ReportStructureGrowthComponent,
    ReportOnChurchAttComponent,
    ReportOnHCAttComponent,
    ReportStructureGrowthComponent,
    ReportOnHCAttComponent,
    ReportOnChurchAttComponent,
    ReportZoneHCComponent,
    ReportZoneChurchAttComponent,
    ReportZoneGrowthComponent,
    AddCounsellingComponent,
    ViewCounsellingComponent,
    ViewCounsellingRequestComponent,
    FollowUpMemberComponent,
    RegisterPersonComponent,
    AuditTrailComponent,
    ReportDiscComponent,
    SetHomecellAttenGoalsComponent,
    SetZoneHomecellAttenGoalsComponent,
    SetChurchAttenGoalsComponent,
    SetZoneChurchAttenGoalsComponent,
    SetNMOGoalsComponent,
    SetDiscipleshipGoalsComponent,
    SetZoneGrowthGoalsComponent,
    SetStructureGrowthGoalsComponent,
    UpdateHomecellAttGoalComponent,
    UpdateZoneHomecellAttGoalComponent,
    UpdateChurchAttGoalComponent,
    UpdateZoneChurchAttGoalComponent,
    UpdateNMOGoalComponent,
    UpdateDiscipleshipGoalComponent,
    UpdateStructureGrowthGoalComponent,
    UpdateZoneGrowthGoalComponent,
    LeaderAssignComponent,
    OverseerFollowUpComponent,
    OrganisationalStructurePositionAssignComponent,
    AssignHomecellComponent,
    AssignOrganisationalGroupsComponent,

    ViewGroupTypeComponent,

    NewCounsellingViewComponent,



  ],
  imports: [
    //Video
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
        VgBufferingModule,
    //HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbIconModule,
    NbMenuModule.forRoot(),
    NbMenuModule,
    NbInputModule,
    NbListModule,
    NbCardModule,
    NbCheckboxModule,
    NbUserModule,
    NbStepperModule,
    NbRadioModule,
    NbActionsModule,
    NbAccordionModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbSelectModule,
    NbTabsetModule,
    NbProgressBarModule,
    //Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrgChartModule,
    NbDatepickerModule.forRoot(),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ChartsModule,
    FullCalendarModule,
    VgCoreModule,
    VgControlsModule,

    NbTooltipModule

    //jsPDF,
  ],
  entryComponents: [
    ConfirmDeleteDialogComponent,
    CancelConfirmDiscipleshipComponent,
    CancelConfirmOIPComponent,
    ConfirmDeleteOIPDialogComponent,
    ViewMemberDialogComponent,
    ViewChildDialogComponent,
    ViewGroupDialogComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
