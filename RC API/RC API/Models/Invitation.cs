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
    
    public partial class Invitation
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Invitation()
        {
            this.Person_Invitation = new HashSet<Person_Invitation>();
        }
    
        public int InvitationID { get; set; }
        public string InvitationDate { get; set; }
        public string InvitationDetail { get; set; }
        public int InvitationSenderPersonID { get; set; }
        public string Summary { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person_Invitation> Person_Invitation { get; set; }
    }
}
