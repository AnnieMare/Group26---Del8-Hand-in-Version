﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RC_API.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ReviveCommunicationsDBEntities3 : DbContext
    {
        public ReviveCommunicationsDBEntities3()
            : base("name=ReviveCommunicationsDBEntities3")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Activation_Status> Activation_Status { get; set; }
        public virtual DbSet<Announcement> Announcements { get; set; }
        public virtual DbSet<Audit_Trail> Audit_Trail { get; set; }
        public virtual DbSet<Child> Children { get; set; }
        public virtual DbSet<Church_Attendance_Feedback> Church_Attendance_Feedback { get; set; }
        public virtual DbSet<Church_Attendance_Goal> Church_Attendance_Goal { get; set; }
        public virtual DbSet<Church_Banking_Details> Church_Banking_Details { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Counselling> Counsellings { get; set; }
        public virtual DbSet<Counselling_Request> Counselling_Request { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Discipleship> Discipleships { get; set; }
        public virtual DbSet<Discipleship_Feedback> Discipleship_Feedback { get; set; }
        public virtual DbSet<Discipleship_Goal> Discipleship_Goal { get; set; }
        public virtual DbSet<Goal_Access> Goal_Access { get; set; }
        public virtual DbSet<Group_Type> Group_Type { get; set; }
        public virtual DbSet<Homecell_Attendance_Feedback> Homecell_Attendance_Feedback { get; set; }
        public virtual DbSet<Homecell_Attendance_Goal> Homecell_Attendance_Goal { get; set; }
        public virtual DbSet<Homecell_Notes> Homecell_Notes { get; set; }
        public virtual DbSet<Invitation> Invitations { get; set; }
        public virtual DbSet<KidsChurch> KidsChurches { get; set; }
        public virtual DbSet<Leader_Follow_Up> Leader_Follow_Up { get; set; }
        public virtual DbSet<Member_Follow_Up> Member_Follow_Up { get; set; }
        public virtual DbSet<Members_Serve_Follow_Up> Members_Serve_Follow_Up { get; set; }
        public virtual DbSet<NMO_Feedback> NMO_Feedback { get; set; }
        public virtual DbSet<NMO_Follow_Up> NMO_Follow_Up { get; set; }
        public virtual DbSet<NMO_Goal> NMO_Goal { get; set; }
        public virtual DbSet<Organisational_Group> Organisational_Group { get; set; }
        public virtual DbSet<Organisational_Individual_Position> Organisational_Individual_Position { get; set; }
        public virtual DbSet<Organisational_Structure_Position> Organisational_Structure_Position { get; set; }
        public virtual DbSet<Organisational_Structure_Type> Organisational_Structure_Type { get; set; }
        public virtual DbSet<Overseer_Follow_Up> Overseer_Follow_Up { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<Person_Announcement> Person_Announcement { get; set; }
        public virtual DbSet<Person_Children> Person_Children { get; set; }
        public virtual DbSet<Person_Discipleship> Person_Discipleship { get; set; }
        public virtual DbSet<Person_Invitation> Person_Invitation { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<Salvation> Salvations { get; set; }
        public virtual DbSet<Sentiment_Analysis> Sentiment_Analysis { get; set; }
        public virtual DbSet<Structure_Growth_Feedback> Structure_Growth_Feedback { get; set; }
        public virtual DbSet<Structure_Growth_Goal> Structure_Growth_Goal { get; set; }
        public virtual DbSet<Suburb> Suburbs { get; set; }
        public virtual DbSet<Use_Cases> Use_Cases { get; set; }
        public virtual DbSet<Zone_Church_Attendance_Feedback> Zone_Church_Attendance_Feedback { get; set; }
        public virtual DbSet<Zone_Church_Attendance_Goal> Zone_Church_Attendance_Goal { get; set; }
        public virtual DbSet<Zone_Growth_Feedback> Zone_Growth_Feedback { get; set; }
        public virtual DbSet<Zone_Growth_Goal> Zone_Growth_Goal { get; set; }
        public virtual DbSet<Zone_Homecell_Attendance_Feedback> Zone_Homecell_Attendance_Feedback { get; set; }
        public virtual DbSet<Zone_Homecell_Attendance_Goal> Zone_Homecell_Attendance_Goal { get; set; }
        public virtual DbSet<OutstandingDiscipleship> OutstandingDiscipleships { get; set; }
    }
}
