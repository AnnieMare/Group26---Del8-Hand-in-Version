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
    
    public partial class Counselling
    {
        public int CounsellingID { get; set; }
        public int CounsellingRequestID { get; set; }
        public string CounsellingResponse { get; set; }
    
        public virtual Counselling_Request Counselling_Request { get; set; }
    }
}