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
    
    public partial class Structure_Growth_Feedback
    {
        public int StructureGrowthFeedbackID { get; set; }
        public System.DateTime Date { get; set; }
        public string StructureName { get; set; }
        public int Members { get; set; }
        public int OrgIndivPosID { get; set; }
        public int StructureGrowthGoalID { get; set; }
    
        public virtual Organisational_Individual_Position Organisational_Individual_Position { get; set; }
        public virtual Structure_Growth_Goal Structure_Growth_Goal { get; set; }
    }
}
