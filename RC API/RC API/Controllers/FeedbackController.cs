using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using RC_API.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Data.Entity;

namespace RC_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class FeedbackController : ApiController
    {
        //2.13 report on Homecell attendance -Marno
        [System.Web.Http.Route("api/Feedback/ReportHCAttendance")]
        [System.Web.Mvc.HttpPost]
        public void ReportHCAttendance([FromBody] dynamic AddHCAttendance)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();

            try
            {
                if (AddHCAttendance != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;
                    Homecell_Attendance_Feedback Att = new Homecell_Attendance_Feedback();

                    Att.Date = AddHCAttendance.Date;
                    Att.Description = AddHCAttendance.Description;
                    Att.Members = AddHCAttendance.Member;
                    Att.Salvations = AddHCAttendance.Salvations;
                    Att.Leaders = AddHCAttendance.Leader;
                    Att.Visitors = AddHCAttendance.Visitors;
                    Att.FirstTimeVisitors = AddHCAttendance.FirstTimeVisitors;
                    Att.HomecellAttendanceGoalID = AddHCAttendance.HomecellAttendanceGoalID;
                    Att.OrgIndivPosID = AddHCAttendance.OrgIndivPosID;

                    db.Homecell_Attendance_Feedback.Add(Att);
                    db.SaveChanges();

                    Homecell_Attendance_Feedback hc = db.Homecell_Attendance_Feedback.OrderByDescending(x => x.HomecellAttendanceFeedbackID).Select(x => x).FirstOrDefault();

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddHCAttendance.PersonID;
                    auditLog.EventDescription = "Feedback on Homecell Attendance with ID: " + hc.HomecellAttendanceFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();


                }
            }
            catch (Exception e)
            {
                transaction.Rollback();

            }

        }

        //2.14 Report on church attendance- -Marno
        [System.Web.Http.Route("api/Feedback/ReportChurchAttendance")]
        [System.Web.Mvc.HttpPost]
        public void ReportChurchAttendance([FromBody] dynamic AddChurchAttendance)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();
            try
            {
                if (AddChurchAttendance != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;

                    Church_Attendance_Feedback Att = new Church_Attendance_Feedback();

                    Att.Date = AddChurchAttendance.Date;
                    Att.Description = AddChurchAttendance.Description;
                    Att.Member = AddChurchAttendance.Member;
                    Att.Salvations = AddChurchAttendance.Salvations;
                    Att.Leader = AddChurchAttendance.Leader;
                    Att.Visitors = AddChurchAttendance.Visitors;
                    Att.FirstTimeVisitors = AddChurchAttendance.FirstTimeVisitors;
                    Att.ChurchAttGoalID = AddChurchAttendance.ChurchAttGoalID;
                    Att.OrgIndivPosID = AddChurchAttendance.OrgIndivPosID;

                    db.Church_Attendance_Feedback.Add(Att);
                    db.SaveChanges();

                    Church_Attendance_Feedback hc = db.Church_Attendance_Feedback.OrderByDescending(x => x.ChurchAttFeedbackID).Select(x => x).FirstOrDefault();

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddChurchAttendance.PersonID;
                    auditLog.EventDescription = "Feedback on Church Attendance with ID: " + hc.ChurchAttFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
            }

        }

        //2.15 Report discipleship -Marno
        [System.Web.Http.Route("api/Feedback/ReportDisc")]
        [System.Web.Mvc.HttpPost]
        public void ReportDisc([FromBody] dynamic AddDisc)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();

            try
            {
                if (AddDisc != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;

                    Discipleship_Feedback newDiscFeedback = new Discipleship_Feedback();
                    newDiscFeedback.Attendance = AddDisc.Attendance;
                    newDiscFeedback.Date = AddDisc.Date;
                    newDiscFeedback.Description = AddDisc.Description;
                    newDiscFeedback.DiscipleshipGoalID = AddDisc.DiscipleshipGoalID;
                    newDiscFeedback.DiscipleshipType = AddDisc.DiscipleshipType;
                    newDiscFeedback.OrgIndivPosID = AddDisc.OrgIndivPosID;
                    
                    db.Discipleship_Feedback.Add(newDiscFeedback);
                    db.SaveChanges();

                    Discipleship_Feedback hc = db.Discipleship_Feedback.OrderByDescending(x => x.DiscipleshipFeedbackID).Select(x => x).FirstOrDefault();


                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddDisc.PersonID;
                    auditLog.EventDescription = "Feedback on Discipleship with ID: " + hc.DiscipleshipFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
            }

        }


        //2.16 Report on structture growth -Marno
        [System.Web.Http.Route("api/Feedback/ReportStructureGrowth")]
        [System.Web.Mvc.HttpPost]
        public void ReportStructureGrowth([FromBody] dynamic AddStructureGrowth)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();
            try
            {
                if (AddStructureGrowth != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;

                    Structure_Growth_Feedback sg = new Structure_Growth_Feedback();
                    sg.Date = AddStructureGrowth.form.Date;
                    sg.Members = AddStructureGrowth.form.Member;
                    sg.OrgIndivPosID = AddStructureGrowth.form.OrgIndivPosID;
                    sg.StructureGrowthGoalID = AddStructureGrowth.form.StructureGrowthGoalID;
                    sg.StructureName = AddStructureGrowth.form.StructureName;

                    db.Structure_Growth_Feedback.Add(sg);
                    db.SaveChanges();

                    Structure_Growth_Feedback hc = db.Structure_Growth_Feedback.OrderByDescending(x => x.StructureGrowthFeedbackID).Select(x => x).FirstOrDefault();


                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddStructureGrowth.Person.PersonID;
                    auditLog.EventDescription = "Feedback on Structure Growth with ID: " + hc.StructureGrowthFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
            }

        }

        //2.17 Report on NMO -Marno
        [System.Web.Http.Route("api/Feedback/ReportNMO")]
        [System.Web.Mvc.HttpPost]
        public void ReportNMO([FromBody] dynamic AddNMO)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();
            try
            {
                if (AddNMO != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;
                    NMO_Feedback nmo = new NMO_Feedback();
                    nmo.Date = AddNMO.form.Date;
                    nmo.MonthTotal = AddNMO.form.MonthTotal;
                    nmo.NMOGoalID = AddNMO.form.NMOGoalID;
                    nmo.OrgIndivPosID = AddNMO.form.OrgIndivPosID;

                    db.NMO_Feedback.Add(nmo);
                    db.SaveChanges();

                    NMO_Feedback hc = db.NMO_Feedback.OrderByDescending(x => x.NMOFeedbackID).Select(x => x).FirstOrDefault();


                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddNMO.Person.PersonID;
                    auditLog.EventDescription = "Feedback on New Members Orienatation with ID: " + hc.NMOFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
            }

        }

        //2.18 Report on zone growth -Marno
        [System.Web.Http.Route("api/Feedback/ReportZoneGrowth")]
        [System.Web.Mvc.HttpPost]
        public void ReportZoneGrowth([FromBody] dynamic AddZG)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();


            try
            {
                if (AddZG != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;

                    Zone_Growth_Feedback zg = new Zone_Growth_Feedback();

                    zg.Date = AddZG.Date;
                    zg.Description = AddZG.Description;
                    zg.Members = AddZG.Member;
                    zg.OrgIndivPosID = AddZG.OrgIndivPosID;
                    zg.ZonegrowthGoalID = AddZG.ZoneGrowthGoalID;

                    db.Zone_Growth_Feedback.Add(zg);
                    db.SaveChanges();

                    Zone_Growth_Feedback hc = db.Zone_Growth_Feedback.OrderByDescending(x => x.ZonegrowthFeedbackID).Select(x => x).FirstOrDefault();

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddZG.PersonID;
                    auditLog.EventDescription = "Feedback on Zone Growth with ID: " + hc.ZonegrowthFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
            }

        }

        //2.19 Report on zone HC att -Marno
        [System.Web.Http.Route("api/Feedback/ReportZoneHC")]
        [System.Web.Mvc.HttpPost]
        public void ReportZoneHC([FromBody] dynamic AddZHA)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();
            try
            {
                if (AddZHA != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;

                    Zone_Homecell_Attendance_Feedback za = new Zone_Homecell_Attendance_Feedback();
                    za.Date = AddZHA.Date;
                    za.Description = AddZHA.Description;
                    za.FirstTimeVisitors = AddZHA.FirstTimeVisitors;
                    za.Leader = AddZHA.Leader;
                    za.Member = AddZHA.Member;
                    za.OrgIndivPosID = AddZHA.OrgIndivPosID;
                    za.Salvations = AddZHA.Salvations;
                    za.Visitors = AddZHA.Visitors;
                    za.ZoneHomecellAttGoalID = AddZHA.ZoneHomecellAttGoalID;

                    db.Zone_Homecell_Attendance_Feedback.Add(za);
                    db.SaveChanges();

                    Zone_Homecell_Attendance_Feedback hc = db.Zone_Homecell_Attendance_Feedback.OrderByDescending(x => x.ZoneHomecellAttFeedbackID)
                        .Select(x => x).FirstOrDefault();


                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddZHA.PersonID;
                    auditLog.EventDescription = "Feedback on Zone Homecell Attendance with ID: " + hc.ZoneHomecellAttFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
            }

        }

        //2.20 Report on zone church att -Marno
        [System.Web.Http.Route("api/Feedback/ReportZoneCA")]
        [System.Web.Mvc.HttpPost]
        public void ReportZoneCA([FromBody] dynamic AddZCA)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            DbContextTransaction transaction = db.Database.BeginTransaction();
            try
            {
                if (AddZCA != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;

                    Zone_Church_Attendance_Feedback zc = new Zone_Church_Attendance_Feedback();
                    zc.Date = AddZCA.Date;
                    zc.Description = AddZCA.Description;
                    zc.FirstTimeVisitors = AddZCA.FirstTimeVisitors;
                    zc.Leader = AddZCA.Leader;
                    zc.Member = AddZCA.Member;
                    zc.OrgIndivPosID = AddZCA.OrgIndivPosID;
                    zc.Salvations = AddZCA.Salvations;
                    zc.ZoneChurchAttGoalID = AddZCA.ZoneChurchAttGoalID;                    

                    db.Zone_Church_Attendance_Feedback.Add(zc);
                    db.SaveChanges();

                    Zone_Church_Attendance_Feedback hc = db.Zone_Church_Attendance_Feedback.OrderByDescending(x => x.ZoneChurchAttFeedbackID).Select(x => x).FirstOrDefault();


                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = AddZCA.PersonID;
                    auditLog.EventDescription = "Feedback on Zone Church Attendance with ID: " + hc.ZoneChurchAttFeedbackID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
            }

        }

        //Search Weekly Goal
        [System.Web.Http.Route("api/Feedback/getAllChurchAttFeedback")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getAllChurchAttFeedback()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getChurchAtt(db.Church_Attendance_Feedback.ToList()); // return called method
        }

        public List<dynamic> getChurchAtt(List<Church_Attendance_Feedback> ChurchAtt)
        {
            List<dynamic> DynamicChurchAttFeedback = new List<dynamic>();
            //foreach method ro retrieve data from database and add it to list to return
            foreach (var ChurchAttFeedback in ChurchAtt)
            {
                //create new dynamic object 
                dynamic DynamicChurchAtt = new ExpandoObject();
                DynamicChurchAtt.Date = ChurchAttFeedback.Date; //update data with parameter data
                DynamicChurchAtt.Member = ChurchAttFeedback.Member;
                DynamicChurchAtt.Leader = ChurchAttFeedback.Leader;
                DynamicChurchAtt.Visitors = ChurchAttFeedback.Visitors;
                DynamicChurchAtt.FirstTimeVisitors = ChurchAttFeedback.FirstTimeVisitors;
                DynamicChurchAtt.Salvations = ChurchAttFeedback.Salvations;
                DynamicChurchAttFeedback.Add(DynamicChurchAtt); // add to dynamic list
            }
            return DynamicChurchAttFeedback;
        }

        [System.Web.Http.Route("api/Feedback/getAllHomecellAttFeedback")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllHomecellAttFeedback()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getHomecellAtt(db.Homecell_Attendance_Feedback.ToList()); // return called method
        }

        public List<dynamic> getHomecellAtt(List<Homecell_Attendance_Feedback> HomecellAtt)
        {
            List<dynamic> DynamicHomecellAttFeedback = new List<dynamic>();
            //foreach method ro retrieve data from database and add it to list to return
            foreach (var HomecellAttFeedback in HomecellAtt)
            {
                //create new dynamic object 
                dynamic DynamicHomecellAtt = new ExpandoObject();
                DynamicHomecellAtt.HomecellAttendanceGoalID = HomecellAttFeedback.HomecellAttendanceGoalID;
                DynamicHomecellAtt.Date = HomecellAttFeedback.Date;
                DynamicHomecellAtt.Members = HomecellAttFeedback.Members;
                DynamicHomecellAtt.Leaders = HomecellAttFeedback.Leaders;
                DynamicHomecellAtt.Visitors = HomecellAttFeedback.Visitors;
                DynamicHomecellAtt.FirstTimeVisitors = HomecellAttFeedback.FirstTimeVisitors;
                DynamicHomecellAtt.Salvations = HomecellAttFeedback.Salvations;
                DynamicHomecellAttFeedback.Add(DynamicHomecellAtt); // add to dynamic list
            }
            return DynamicHomecellAttFeedback;
        }

        [System.Web.Http.Route("api/Feedback/getAllZoneHomecellAttFeedback")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getAllZoneHomecellAttFeedback()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getZoneHomecellAtt(db.Zone_Homecell_Attendance_Feedback.ToList()); // return called method
        }

        public List<dynamic> getZoneHomecellAtt(List<Zone_Homecell_Attendance_Feedback> ZoneHomecellAtt)
        {
            List<dynamic> DynamicZoneHomecellAttFeedback = new List<dynamic>();
            //foreach method ro retrieve data from database and add it to list to return
            foreach (var ZoneHomecellAttFeedback in ZoneHomecellAtt)
            {
                //create new dynamic object 
                dynamic DynamicHomecellAtt = new ExpandoObject();
                DynamicHomecellAtt.Date = ZoneHomecellAttFeedback.Date; //update data with parameter data
                DynamicHomecellAtt.Members = ZoneHomecellAttFeedback.Member;
                DynamicHomecellAtt.Leaders = ZoneHomecellAttFeedback.Leader;
                DynamicHomecellAtt.Visitors = ZoneHomecellAttFeedback.Visitors;
                DynamicHomecellAtt.FirstTimeVisitors = ZoneHomecellAttFeedback.FirstTimeVisitors;
                DynamicHomecellAtt.Salvations = ZoneHomecellAttFeedback.Salvations;
                DynamicZoneHomecellAttFeedback.Add(DynamicHomecellAtt); // add to dynamic list
            }
            return DynamicZoneHomecellAttFeedback;
        }
    }
}

