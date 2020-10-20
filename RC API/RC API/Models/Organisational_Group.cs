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
    
    public partial class Organisational_Group
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Organisational_Group()
        {
            this.Persons_Group = new HashSet<Persons_Group>();
        }
    
        public int OrgGroupID { get; set; }
        public string Description { get; set; }
        public Nullable<int> Size { get; set; }
        public string Address { get; set; }
        public Nullable<int> GroupTypeID { get; set; }
        public int SuburbID { get; set; }
    
        public virtual Group_Type Group_Type { get; set; }
        public virtual Suburb Suburb { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Persons_Group> Persons_Group { get; set; }
    }
}
