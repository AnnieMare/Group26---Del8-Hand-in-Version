//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Person
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Person()
        {
            this.Audit_Trail = new HashSet<Audit_Trail>();
            this.Counselling_Request = new HashSet<Counselling_Request>();
            this.Leader_Follow_Up = new HashSet<Leader_Follow_Up>();
            this.Member_Follow_Up = new HashSet<Member_Follow_Up>();
            this.Members_Serve_Follow_Up = new HashSet<Members_Serve_Follow_Up>();
            this.NMO_Follow_Up = new HashSet<NMO_Follow_Up>();
            this.Overseer_Follow_Up = new HashSet<Overseer_Follow_Up>();
            this.Person1 = new HashSet<Person>();
            this.Person_Announcement = new HashSet<Person_Announcement>();
            this.Person_Children = new HashSet<Person_Children>();
            this.Person_Discipleship = new HashSet<Person_Discipleship>();
            this.Person_Invitation = new HashSet<Person_Invitation>();
            this.Persons_Group = new HashSet<Persons_Group>();
        }
    
        public int PersonID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public System.DateTime DateOfBirth { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Number { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Nullable<int> OTP { get; set; }
        public string SessionID { get; set; }
        public int Activation_Status_ID { get; set; }
        public string Suburb { get; set; }
        public string City { get; set; }
        public Nullable<int> OrgStructID { get; set; }
        public Nullable<int> AssignLeader { get; set; }
    
        public virtual Activation_Status Activation_Status { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Audit_Trail> Audit_Trail { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Counselling_Request> Counselling_Request { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Leader_Follow_Up> Leader_Follow_Up { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Member_Follow_Up> Member_Follow_Up { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Members_Serve_Follow_Up> Members_Serve_Follow_Up { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NMO_Follow_Up> NMO_Follow_Up { get; set; }
        public virtual Organisational_Structure_Position Organisational_Structure_Position { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Overseer_Follow_Up> Overseer_Follow_Up { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person> Person1 { get; set; }
        public virtual Person Person2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person_Announcement> Person_Announcement { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person_Children> Person_Children { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person_Discipleship> Person_Discipleship { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person_Invitation> Person_Invitation { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Persons_Group> Persons_Group { get; set; }
    }
}
