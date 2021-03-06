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
    
    public partial class Organisational_Structure_Position
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Organisational_Structure_Position()
        {
            this.Organisational_Structure_Position1 = new HashSet<Organisational_Structure_Position>();
            this.People = new HashSet<Person>();
        }
    
        public int OrgStructID { get; set; }
        public int OrgStructLevel { get; set; }
        public string Description { get; set; }
        public int OrgStructTypeID { get; set; }
        public int OrgIndivPosID { get; set; }
        public Nullable<int> OrgStructIDReportsTo { get; set; }
    
        public virtual Organisational_Individual_Position Organisational_Individual_Position { get; set; }
        public virtual Organisational_Structure_Type Organisational_Structure_Type { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Organisational_Structure_Position> Organisational_Structure_Position1 { get; set; }
        public virtual Organisational_Structure_Position Organisational_Structure_Position2 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person> People { get; set; }
    }
}
