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
    
    public partial class Church_Attendance_Feedback
    {
        public int ChurchAttFeedbackID { get; set; }
        public System.DateTime Date { get; set; }
        public string Description { get; set; }
        public int Member { get; set; }
        public int Leader { get; set; }
        public int Visitors { get; set; }
        public int FirstTimeVisitors { get; set; }
        public int Salvations { get; set; }
        public int ChurchAttGoalID { get; set; }
        public int OrgIndivPosID { get; set; }
    
        public virtual Church_Attendance_Goal Church_Attendance_Goal { get; set; }
        public virtual Organisational_Individual_Position Organisational_Individual_Position { get; set; }
    }
}
