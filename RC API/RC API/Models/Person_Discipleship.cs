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
    
    public partial class Person_Discipleship
    {
        public int DiscipleshipID { get; set; }
        public int PersonID { get; set; }
        public System.DateTime FollowUpDate { get; set; }
        public bool FollowedUp { get; set; }
    
        public virtual Discipleship Discipleship { get; set; }
        public virtual Person Person { get; set; }
    }
}
