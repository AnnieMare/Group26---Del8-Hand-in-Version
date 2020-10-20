import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'post-announcement',
    loadChildren: () => import('./Messages/post-announcement/post-announcement.module').then( m => m.PostAnnouncementPageModule)
  },
  {
    path: 'send-invitation',
    loadChildren: () => import('./Messages/send-invitation/send-invitation.module').then( m => m.SendInvitationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'view-announcement',
    loadChildren: () => import('./Messages/view-announcement/view-announcement.module').then( m => m.ViewAnnouncementPageModule)
  },
  {
    path: 'view-invitation',
    loadChildren: () => import('./Messages/view-invitation/view-invitation.module').then( m => m.ViewInvitationPageModule)
  },
  {
    path: 'remove-announcement',
    loadChildren: () => import('./Messages/remove-announcement/remove-announcement.module').then( m => m.RemoveAnnouncementPageModule)
  },
  {
    path: 'discipleship-followup',
    loadChildren: () => import('./FollowUp/discipleship-followup/discipleship-followup.module').then( m => m.DiscipleshipFollowupPageModule)
  },
  {
    path: 'overview-structure',
    loadChildren: () => import('./Reports/overview-structure/overview-structure.module').then( m => m.OverviewStructurePageModule)
  },
  {
    path: 'view-discipleship',
    loadChildren: () => import('./Admin/Discipleships/view-discipleship/view-discipleship.module').then( m => m.ViewDiscipleshipPageModule)
  },
  {
    path: 'add-discipleship',
    loadChildren: () => import('./Admin/Discipleships/add-discipleship/add-discipleship.module').then( m => m.AddDiscipleshipPageModule)
  },
  {
    path: 'update-discipleship',
    loadChildren: () => import('./Admin/Discipleships/update-discipleship/update-discipleship.module').then( m => m.UpdateDiscipleshipPageModule)
  },
  {
    path: 'view-ind-pos',
    loadChildren: () => import('./Admin/OrgIndivPos/view-ind-pos/view-ind-pos.module').then( m => m.ViewIndPosPageModule)
  },
  {
    path: 'add-ind-pos',
    loadChildren: () => import('./Admin/OrgIndivPos/add-ind-pos/add-ind-pos.module').then( m => m.AddIndPosPageModule)
  },
  {
    path: 'update-ind-pos',
    loadChildren: () => import('./Admin/OrgIndivPos/update-ind-pos/update-ind-pos.module').then( m => m.UpdateIndPosPageModule)
  },
  {
    path: 'structure-growth-feedback',
    loadChildren: () => import('./Feedback/structure-growth-feedback/structure-growth-feedback.module').then( m => m.StructureGrowthFeedbackPageModule)
  },
  {
    path: 'nmofeedback',
    loadChildren: () => import('./Feedback/nmofeedback/nmofeedback.module').then( m => m.NMOFeedbackPageModule)
  },
  {
    path: 'salvation-followup',
    loadChildren: () => import('./FollowUp/Salvation/salvation-followup/salvation-followup.module').then( m => m.SalvationFollowupPageModule)
  },
  {
    path: 'members-wanting-to-serve-follow-up',
    loadChildren: () => import('./FollowUp/Members-wanting-to-serve/members-wanting-to-serve-follow-up/members-wanting-to-serve-follow-up.module').then( m => m.MembersWantingToServeFollowUpPageModule)
  },
  {
    path: 'homecell-notes',
    loadChildren: () => import('./Homecell-Notes/HomecellNotes/homecell-notes/homecell-notes.module').then( m => m.HomecellNotesPageModule)
  },
  {
    path: 'zone-growth',
    loadChildren: () => import('./Reports/Zone-growth/zone-growth/zone-growth.module').then( m => m.ZoneGrowthPageModule)
  },
  {
    path: 'assign-org-struct-pos',
    loadChildren: () => import('./Admin/AssignOrgStructPosition/assign-org-struct-pos/assign-org-struct-pos.module').then( m => m.AssignOrgStructPosPageModule)
  },
  {
    path: 'salvation-form',
    loadChildren: () => import('./Salvation/salvation-form/salvation-form.module').then( m => m.SalvationFormPageModule)
  },
  {
    path: 'kids-church-check-in',
    loadChildren: () => import('./KidsChurch/Check-in/kids-church-check-in/kids-church-check-in.module').then( m => m.KidsChurchCheckInPageModule)
  },
  {
    path: 'set-weekly-goals',
    loadChildren: () => import('./Goals/Set-Weekly-Goals/set-weekly-goals/set-weekly-goals.module').then( m => m.SetWeeklyGoalsPageModule)
  },
  {
    path: 'update-weekly-goals',
    loadChildren: () => import('./Goals/Update-Weekly-Goals/update-weekly-goals/update-weekly-goals.module').then( m => m.UpdateWeeklyGoalsPageModule)
  },
  {
    path: 'search-weekly-goals',
    loadChildren: () => import('./Goals/Search-Weekly-Goals/search-weekly-goals/search-weekly-goals.module').then( m => m.SearchWeeklyGoalsPageModule)
  },
  {
    path: 'register-child',
    loadChildren: () => import('./KidsChurch/register-child/register-child.module').then( m => m.RegisterChildPageModule)
  },
  {

    path: 'nmo-followup',
    loadChildren: () => import('./FollowUp/nmo-followup/nmo-followup.module').then( m => m.NmoFollowupPageModule)
  },
  {
    path: 'leader-follow-up',
    loadChildren: () => import('./FollowUp/leader-follow-up/leader-follow-up.module').then( m => m.LeaderFollowUpPageModule)
  },
  {
    path: 'join-group',
    loadChildren: () => import('./Group/join-group/join-group.module').then( m => m.JoinGroupPageModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then( m => m.PagePageModule)
  },
  {
    path: 'member-follow-up',
    loadChildren: () => import('./FollowUp/member-follow-up/member-follow-up.module').then( m => m.MemberFollowUpPageModule)
  },
  {
    path: 'add-counselling-request',
    loadChildren: () => import('./Counselling/add-counselling-request/add-counselling-request.module').then( m => m.AddCounsellingRequestPageModule)
  },
  {
    path: 'children',
    loadChildren: () => import('./KidsChurch/children/children.module').then( m => m.ChildrenPageModule)


  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-updated',
    loadChildren: () => import('./login-updated/login-updated.module').then( m => m.LoginUpdatedPageModule)

  },
  {
    path: 'sign-out',
    loadChildren: () => import('./KidsChurch/sign-out/sign-out.module').then( m => m.SignOutPageModule)
  },

  {
    path: 'salvation-form',
    loadChildren: () => import('./Salvation/salvation-form/salvation-form.module').then( m => m.SalvationFormPageModule)
  },
  {
    path: 'kids-church-check-in',
    loadChildren: () => import('./KidsChurch/Check-in/kids-church-check-in/kids-church-check-in.module').then( m => m.KidsChurchCheckInPageModule)
  },
  {
    path: 'set-weekly-goals',
    loadChildren: () => import('./Goals/Set-Weekly-Goals/set-weekly-goals/set-weekly-goals.module').then( m => m.SetWeeklyGoalsPageModule)
  },
  {
    path: 'update-weekly-goals',
    loadChildren: () => import('./Goals/Update-Weekly-Goals/update-weekly-goals/update-weekly-goals.module').then( m => m.UpdateWeeklyGoalsPageModule)
  },
  {
    path: 'search-weekly-goals',
    loadChildren: () => import('./Goals/Search-Weekly-Goals/search-weekly-goals/search-weekly-goals.module').then( m => m.SearchWeeklyGoalsPageModule)
  },
  {
    path: 'register-child',
    loadChildren: () => import('./KidsChurch/register-child/register-child.module').then( m => m.RegisterChildPageModule)
  },
  {

    path: 'nmo-followup',
    loadChildren: () => import('./FollowUp/nmo-followup/nmo-followup.module').then( m => m.NmoFollowupPageModule)
  },
  {
    path: 'leader-follow-up',
    loadChildren: () => import('./FollowUp/leader-follow-up/leader-follow-up.module').then( m => m.LeaderFollowUpPageModule)
  },
  {
    path: 'join-group',
    loadChildren: () => import('./Group/join-group/join-group.module').then( m => m.JoinGroupPageModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then( m => m.PagePageModule)
  },
  {
    path: 'member-follow-up',
    loadChildren: () => import('./FollowUp/member-follow-up/member-follow-up.module').then( m => m.MemberFollowUpPageModule)
  },
  {
    path: 'add-counselling-request',
    loadChildren: () => import('./Counselling/add-counselling-request/add-counselling-request.module').then( m => m.AddCounsellingRequestPageModule)
  },
  {
    path: 'children',
    loadChildren: () => import('./KidsChurch/children/children.module').then( m => m.ChildrenPageModule)


  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-updated',
    loadChildren: () => import('./login-updated/login-updated.module').then( m => m.LoginUpdatedPageModule)

  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'update-person',
    loadChildren: () => import('./update-person/update-person.module').then( m => m.UpdatePersonPageModule)
  },
  {
    path: 'overseer-follow-up',
    loadChildren: () => import('./FollowUp/overseer-follow-up/overseer-follow-up.module').then( m => m.OverseerFollowUpPageModule)
  },
  {
    path: 'update-ind-pos',
    loadChildren: () => import('./Admin/OrgIndivPos/update-ind-pos/update-ind-pos.module').then( m => m.UpdateIndPosPageModule)
  },
  {
    path: 'structure-growth-feedback',
    loadChildren: () => import('./Feedback/structure-growth-feedback/structure-growth-feedback.module').then( m => m.StructureGrowthFeedbackPageModule)
  },
  {
    path: 'nmofeedback',
    loadChildren: () => import('./Feedback/nmofeedback/nmofeedback.module').then( m => m.NMOFeedbackPageModule)
  },
  {
    path: 'salvation-followup',
    loadChildren: () => import('./FollowUp/Salvation/salvation-followup/salvation-followup.module').then( m => m.SalvationFollowupPageModule)
  },
  {
    path: 'members-wanting-to-serve-follow-up',
    loadChildren: () => import('./FollowUp/Members-wanting-to-serve/members-wanting-to-serve-follow-up/members-wanting-to-serve-follow-up.module').then( m => m.MembersWantingToServeFollowUpPageModule)
  },
  {
    path: 'homecell-notes',
    loadChildren: () => import('./Homecell-Notes/HomecellNotes/homecell-notes/homecell-notes.module').then( m => m.HomecellNotesPageModule)
  },
  {
    path: 'zone-growth',
    loadChildren: () => import('./Reports/Zone-growth/zone-growth/zone-growth.module').then( m => m.ZoneGrowthPageModule)
  },
  {
    path: 'assign-org-struct-pos',
    loadChildren: () => import('./Admin/AssignOrgStructPosition/assign-org-struct-pos/assign-org-struct-pos.module').then( m => m.AssignOrgStructPosPageModule)
  },
  {
    path: 'salvation-form',
    loadChildren: () => import('./Salvation/salvation-form/salvation-form.module').then( m => m.SalvationFormPageModule)
  },
  {
    path: 'kids-church-check-in',
    loadChildren: () => import('./KidsChurch/Check-in/kids-church-check-in/kids-church-check-in.module').then( m => m.KidsChurchCheckInPageModule)
  },
  {
    path: 'set-weekly-goals',
    loadChildren: () => import('./Goals/Set-Weekly-Goals/set-weekly-goals/set-weekly-goals.module').then( m => m.SetWeeklyGoalsPageModule)
  },
  {
    path: 'update-weekly-goals',
    loadChildren: () => import('./Goals/Update-Weekly-Goals/update-weekly-goals/update-weekly-goals.module').then( m => m.UpdateWeeklyGoalsPageModule)
  },
  {
    path: 'search-weekly-goals',
    loadChildren: () => import('./Goals/Search-Weekly-Goals/search-weekly-goals/search-weekly-goals.module').then( m => m.SearchWeeklyGoalsPageModule)
  },
  {
    path: 'register-child',
    loadChildren: () => import('./KidsChurch/register-child/register-child.module').then( m => m.RegisterChildPageModule)
  },
  {
    path: 'report-hcatt',
    loadChildren: () => import('./Feedback/report-hcatt/report-hcatt.module').then( m => m.ReportHCAttPageModule)
  },
  {
    path: 'report-church-att',
    loadChildren: () => import('./Feedback/report-church-att/report-church-att.module').then( m => m.ReportChurchAttPageModule)
  },
  {
    path: 'join-org-group',
    loadChildren: () => import('./Group/join-org-group/join-org-group.module').then( m => m.JoinOrgGroupPageModule)
  },


  {
    path: 'homecell-notes',
    loadChildren: () => import('./Homecell-Notes/HomecellNotes/homecell-notes/homecell-notes.module').then( m => m.HomecellNotesPageModule)
  },
  {
    path: 'zone-growth',
    loadChildren: () => import('./Reports/Zone-growth/zone-growth/zone-growth.module').then( m => m.ZoneGrowthPageModule)
  },
  {
    path: 'assign-org-struct-pos',
    loadChildren: () => import('./Admin/AssignOrgStructPosition/assign-org-struct-pos/assign-org-struct-pos.module').then( m => m.AssignOrgStructPosPageModule)
  },
  {
    path: 'salvation-form',
    loadChildren: () => import('./Salvation/salvation-form/salvation-form.module').then( m => m.SalvationFormPageModule)
  },
  {
    path: 'kids-church-check-in',
    loadChildren: () => import('./KidsChurch/Check-in/kids-church-check-in/kids-church-check-in.module').then( m => m.KidsChurchCheckInPageModule)
  },
  {
    path: 'set-weekly-goals',
    loadChildren: () => import('./Goals/Set-Weekly-Goals/set-weekly-goals/set-weekly-goals.module').then( m => m.SetWeeklyGoalsPageModule)
  },
  {
    path: 'update-weekly-goals',
    loadChildren: () => import('./Goals/Update-Weekly-Goals/update-weekly-goals/update-weekly-goals.module').then( m => m.UpdateWeeklyGoalsPageModule)
  },
  {
    path: 'search-weekly-goals',
    loadChildren: () => import('./Goals/Search-Weekly-Goals/search-weekly-goals/search-weekly-goals.module').then( m => m.SearchWeeklyGoalsPageModule)
  },
  {
    path: 'register-child',
    loadChildren: () => import('./KidsChurch/register-child/register-child.module').then( m => m.RegisterChildPageModule)
  },
  {

    path: 'nmo-followup',
    loadChildren: () => import('./FollowUp/nmo-followup/nmo-followup.module').then( m => m.NmoFollowupPageModule)
  },
  {
    path: 'leader-follow-up',
    loadChildren: () => import('./FollowUp/leader-follow-up/leader-follow-up.module').then( m => m.LeaderFollowUpPageModule)
  },
  {
    path: 'join-group',
    loadChildren: () => import('./Group/join-group/join-group.module').then( m => m.JoinGroupPageModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then( m => m.PagePageModule)
  },
  {
    path: 'member-follow-up',
    loadChildren: () => import('./FollowUp/member-follow-up/member-follow-up.module').then( m => m.MemberFollowUpPageModule)
  },
  {
    path: 'add-counselling-request',
    loadChildren: () => import('./Counselling/add-counselling-request/add-counselling-request.module').then( m => m.AddCounsellingRequestPageModule)
  },
  {
    path: 'children',
    loadChildren: () => import('./KidsChurch/children/children.module').then( m => m.ChildrenPageModule)

  },
  {
    path: 'qrkidschurch',
    loadChildren: () => import('./KidsChurch/qrkidschurch/qrkidschurch.module').then( m => m.QRKidschurchPageModule)
  },
];



//   {
//     path: 'homecell-notes',
//     loadChildren: () => import('./Homecell-Notes/HomecellNotes/homecell-notes/homecell-notes.module').then( m => m.HomecellNotesPageModule)
//   },
//   {
//     path: 'zone-growth',
//     loadChildren: () => import('./Reports/Zone-growth/zone-growth/zone-growth.module').then( m => m.ZoneGrowthPageModule)
//   },
//   {
//     path: 'assign-org-struct-pos',
//     loadChildren: () => import('./Admin/AssignOrgStructPosition/assign-org-struct-pos/assign-org-struct-pos.module').then( m => m.AssignOrgStructPosPageModule)
//   },
//   {
//     path: 'salvation-form',
//     loadChildren: () => import('./Salvation/salvation-form/salvation-form.module').then( m => m.SalvationFormPageModule)
//   },
//   {
//     path: 'kids-church-check-in',
//     loadChildren: () => import('./KidsChurch/Check-in/kids-church-check-in/kids-church-check-in.module').then( m => m.KidsChurchCheckInPageModule)
//   },
//   {
//     path: 'set-weekly-goals',
//     loadChildren: () => import('./Goals/Set-Weekly-Goals/set-weekly-goals/set-weekly-goals.module').then( m => m.SetWeeklyGoalsPageModule)
//   },
//   {
//     path: 'update-weekly-goals',
//     loadChildren: () => import('./Goals/Update-Weekly-Goals/update-weekly-goals/update-weekly-goals.module').then( m => m.UpdateWeeklyGoalsPageModule)
//   },
//   {
//     path: 'search-weekly-goals',
//     loadChildren: () => import('./Goals/Search-Weekly-Goals/search-weekly-goals/search-weekly-goals.module').then( m => m.SearchWeeklyGoalsPageModule)
//   },
//   {
//     path: 'register-child',
//     loadChildren: () => import('./KidsChurch/register-child/register-child.module').then( m => m.RegisterChildPageModule)
//   },
//   {

//     path: 'nmo-followup',
//     loadChildren: () => import('./FollowUp/nmo-followup/nmo-followup.module').then( m => m.NmoFollowupPageModule)
//   },
//   {
//     path: 'leader-follow-up',
//     loadChildren: () => import('./FollowUp/leader-follow-up/leader-follow-up.module').then( m => m.LeaderFollowUpPageModule)
//   },
//   {
//     path: 'join-group',
//     loadChildren: () => import('./Group/join-group/join-group.module').then( m => m.JoinGroupPageModule)
//   },
//   {
//     path: 'page',
//     loadChildren: () => import('./page/page.module').then( m => m.PagePageModule)
//   },
//   {
//     path: 'member-follow-up',
//     loadChildren: () => import('./FollowUp/member-follow-up/member-follow-up.module').then( m => m.MemberFollowUpPageModule)
//   },
//   {
//     path: 'add-counselling-request',
//     loadChildren: () => import('./Counselling/add-counselling-request/add-counselling-request.module').then( m => m.AddCounsellingRequestPageModule)
//   },
//   {
//     path: 'children',
//     loadChildren: () => import('./KidsChurch/children/children.module').then( m => m.ChildrenPageModule)

//   },
//   {
//     path: 'qrkidschurch',
//     loadChildren: () => import('./KidsChurch/qrkidschurch/qrkidschurch.module').then( m => m.QRKidschurchPageModule)
//   },



// ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
