
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RC_API.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Web.UI.WebControls;
using System.Data.Entity;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;


namespace RC_API.Controllers
{
    public class GoalsController : ApiController
    {
        static string message = "";
        static string Emailsubject = "";
        static string toLeader = "";
        static string toName = "";

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        //*********CRUD GOALS START************//


        //Homecell Attendance Goal
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic SetHomecellAttGoal(dynamic newHomecellAtt) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newHomecellAtt != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                DbContextTransaction transaction = db.Database.BeginTransaction();

                if (newHomecellAtt.form.Overseer != null && newHomecellAtt.form.Members != null && newHomecellAtt.form.Leaders != null
                  && newHomecellAtt.form.Visitors != null && newHomecellAtt.form.FirstTimeVisitors != null && newHomecellAtt.form.Salvations != null)
                {
                    try
                    {
                            Homecell_Attendance_Goal hc = new Homecell_Attendance_Goal();
                            hc.Date = newHomecellAtt.form.Date;
                            hc.Description = newHomecellAtt.form.Description;
                            hc.FirstTimeVisitors = newHomecellAtt.form.FirstTimeVisitors;
                            hc.Leaders = newHomecellAtt.form.Leaders;
                            hc.Members = newHomecellAtt.form.Members;
                            hc.Overseer = newHomecellAtt.form.Overseer;
                            hc.Salvations = newHomecellAtt.form.Salvations;
                            hc.Visitors = newHomecellAtt.form.Visitors;

                            db.Homecell_Attendance_Goal.Add(hc); //add new Homecell attenance goal
                            db.SaveChanges();
                            int id = db.Homecell_Attendance_Goal.OrderByDescending(x => x.HomecellAttendanceGoalID).Select(x => x.HomecellAttendanceGoalID).FirstOrDefault();

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newHomecellAtt.PersonID;
                            auditLog.EventDescription = "Created Homecell Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges();
                            transaction.Commit();

                            return returnMessage = "Weekly Homecell goal have been set successfully.";
                  

                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateHomecellAttGoal([FromBody] dynamic HomecellAttGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (HomecellAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                if (HomecellAttGoal.form.HomecellAttendanceGoalID != null && HomecellAttGoal.form.Date != null && HomecellAttGoal.form.Overseer != null && HomecellAttGoal.form.Members != null && HomecellAttGoal.form.Leaders != null
                    && HomecellAttGoal.form.Visitors != null && HomecellAttGoal.form.FirstTimeVisitors != null && HomecellAttGoal.form.Salvations != null)
                {
                    try
                    {
                        
                            int id = HomecellAttGoal.form.HomecellAttendanceGoalID;
                            Homecell_Attendance_Goal HomecellAtt = db.Homecell_Attendance_Goal.Where(z => z.HomecellAttendanceGoalID == id).FirstOrDefault(); //retrieve record to update data
                            HomecellAtt.Date = HomecellAttGoal.form.Date; //update data with parameter data
                            HomecellAtt.Members = HomecellAttGoal.form.Members;
                            HomecellAtt.Leaders = HomecellAttGoal.form.Leaders;
                            HomecellAtt.Visitors = HomecellAttGoal.form.Visitors;
                            HomecellAtt.FirstTimeVisitors = HomecellAttGoal.form.FirstTimeVisitors;
                            HomecellAtt.Overseer = HomecellAttGoal.form.Overseer;
                            HomecellAtt.Salvations = HomecellAttGoal.form.Salvations;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = HomecellAttGoal.PersonID;
                            auditLog.EventDescription = "Updated Homecell Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 

                            return returnMessage = "Weekly Homecell Attendance goal was updated successfully.";
                      
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }

        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getAllHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllHomecellAttGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getHomecellAtt(db.Homecell_Attendance_Goal.ToList()); // return called method
        }

        public List<dynamic> getHomecellAtt(List<Homecell_Attendance_Goal> HomecellAtt)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            List<dynamic> DynamicHomecellAttGoal = new List<dynamic>();
            try
            {
               
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var HomecellAttGoal in HomecellAtt)
                {
                   
                    Person getOverseer = db.People.Where(x=> x.PersonID == HomecellAttGoal.Overseer).FirstOrDefault();
                    //create new dynamic object 
                    dynamic DynamicHomecellAtt = new ExpandoObject();
                    DynamicHomecellAtt.HomecellAttendanceGoalID = HomecellAttGoal.HomecellAttendanceGoalID;
                    DynamicHomecellAtt.Date = HomecellAttGoal.Date;
                    DynamicHomecellAtt.Members = HomecellAttGoal.Members;
                    DynamicHomecellAtt.Leaders = HomecellAttGoal.Leaders;
                    DynamicHomecellAtt.Visitors = HomecellAttGoal.Visitors;
                    DynamicHomecellAtt.FirstTimeVisitors = HomecellAttGoal.FirstTimeVisitors;
                    DynamicHomecellAtt.Overseer = getOverseer.Name;
                    DynamicHomecellAtt.Salvations = HomecellAttGoal.Salvations;

                    Homecell_Attendance_Feedback feedbackExists = db.Homecell_Attendance_Feedback.Where(x => x.HomecellAttendanceGoalID == HomecellAttGoal.HomecellAttendanceGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        DynamicHomecellAtt.FBHomecellAttendanceGoalID = "None";
                        DynamicHomecellAtt.FBMembers = "None";
                        DynamicHomecellAtt.FBLeaders = "None";
                        DynamicHomecellAtt.FBVisitors = "None";
                        DynamicHomecellAtt.FBFirstTimeVisitors = "None";
                        DynamicHomecellAtt.GBSalvations = "None";
                        DynamicHomecellAtt.GoalFeedbackExists = true;
                    }
                    else
                    {
                        DynamicHomecellAtt.FBHomecellAttendanceGoalID = feedbackExists.HomecellAttendanceGoalID;
                        DynamicHomecellAtt.FBMembers = feedbackExists.Members;
                        DynamicHomecellAtt.FBLeaders = feedbackExists.Leaders;
                        DynamicHomecellAtt.FBVisitors = feedbackExists.Visitors;
                        DynamicHomecellAtt.FBFirstTimeVisitors = feedbackExists.FirstTimeVisitors;
                        DynamicHomecellAtt.GBSalvations = feedbackExists.Salvations;
                        DynamicHomecellAtt.GoalFeedbackExists = false;

                    }

                    DynamicHomecellAttGoal.Add(DynamicHomecellAtt); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return DynamicHomecellAttGoal;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/RemoveHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpDelete]

        public List<dynamic> RemoveHomecellAttGoal([FromBody] dynamic HomecellAttGoal) //get JSON parameterget
        {
            //validate that there is no null values
            if (HomecellAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data
                DbContextTransaction transaction = db.Database.BeginTransaction();

                try
                {
                    int id = HomecellAttGoal.goalID.HomecellAttendanceGoalID;
                    Homecell_Attendance_Goal HomecellAtt = db.Homecell_Attendance_Goal.Where(z => z.HomecellAttendanceGoalID == id).FirstOrDefault(); //return record based on ID
                    db.Homecell_Attendance_Goal.Remove(HomecellAtt); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = HomecellAttGoal.PersonID;
                    auditLog.EventDescription = "Removed Homecell Attendance Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return null;
                }

                return getAllHomecellAttGoal();
            }
            else
            {
                return null;
            }
        }

        //Church Attenedance Goal
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic SetChurchAttGoal(dynamic newchurchAtt) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newchurchAtt != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                DbContextTransaction transaction = db.Database.BeginTransaction();

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                if (newchurchAtt.form.Date != null && newchurchAtt.form.Overseer != null && newchurchAtt.form.Member != null && newchurchAtt.form.Leader != null
                   && newchurchAtt.form.Visitors != null && newchurchAtt.form.FirstTimeVisitors != null && newchurchAtt.form.Salvations != null)
                {
                    try
                    {
                      
                            Church_Attendance_Goal ca = new Church_Attendance_Goal();

                            ca.Date = newchurchAtt.form.Date;
                            ca.Description = newchurchAtt.form.Description;
                            ca.FirstTimeVisitors = newchurchAtt.form.FirstTimeVisitors;
                            ca.Leader = newchurchAtt.form.Leader;
                            ca.Member = newchurchAtt.form.Member;
                            ca.Overseer = newchurchAtt.form.Overseer;
                            ca.Salvations = newchurchAtt.form.Salvations;
                            ca.Visitors = newchurchAtt.form.Visitors;


                            db.Church_Attendance_Goal.Add(ca); //add new church attenance goals
                            db.SaveChanges();

                            int id = db.Church_Attendance_Goal.OrderByDescending(x => x.ChurchAttGoalID).Select(x => x.ChurchAttGoalID).FirstOrDefault();

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newchurchAtt.PersonID;
                            auditLog.EventDescription = "Created Church Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges();
                            transaction.Commit();

                            return returnMessage = "Weekly Church Attendance goal was set successfully.";
                        
      
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }

                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateChurchAttGoal([FromBody] dynamic ChurchAttGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (ChurchAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (ChurchAttGoal.ChurchAttGoalID != null && ChurchAttGoal.form.Date && ChurchAttGoal.form.Overseer != null && ChurchAttGoal.form.Member != null && ChurchAttGoal.form.Leader != null &&
                 ChurchAttGoal.form.Visitors != null && ChurchAttGoal.form.FirstTimeVisitors != null && ChurchAttGoal.form.Salvations != null)
                {
                    try
                    {
                        
                            int id = ChurchAttGoal.ChurchAttGoalID;
                            Church_Attendance_Goal ChurchAtt = db.Church_Attendance_Goal.Where(z => z.ChurchAttGoalID == id).FirstOrDefault(); //retrieve record to update data
                            ChurchAtt.Date = ChurchAttGoal.form.Date; //update data with parameter data
                            ChurchAtt.Member = ChurchAttGoal.form.Member;
                            ChurchAtt.Leader = ChurchAttGoal.Leader;
                            ChurchAtt.Visitors = ChurchAttGoal.form.Visitors;
                            ChurchAtt.FirstTimeVisitors = ChurchAttGoal.form.FirstTimeVisitors;
                            ChurchAtt.Overseer = ChurchAttGoal.form.Overseer;
                            ChurchAtt.Salvations = ChurchAttGoal.form.Salvations;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = ChurchAttGoal.PersonID;
                            auditLog.EventDescription = "Updated Church Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 
                            return returnMessage = "Weekly Church attendance goal was updated successfully.";
                       
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getAllChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllChurchAttGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getChurchAtt(db.Church_Attendance_Goal.ToList()); // return called method
        }

        public List<dynamic> getChurchAtt(List<Church_Attendance_Goal> ChurchAtt)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory // create database connection
            List<dynamic> DynamicChurchAttGoal = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var ChurchAttGoal in ChurchAtt)
                {

                    Person getOverseer = db.People.Where(x => x.PersonID == ChurchAttGoal.Overseer).FirstOrDefault();
                    //create new dynamic object 
                    dynamic DynamicChurchAtt = new ExpandoObject();
                    DynamicChurchAtt.Date = ChurchAttGoal.Date; //update data with parameter data
                    DynamicChurchAtt.Member = ChurchAttGoal.Member;
                    DynamicChurchAtt.ChurchAttGoalID = ChurchAttGoal.ChurchAttGoalID;
                    DynamicChurchAtt.Leader = ChurchAttGoal.Leader;
                    DynamicChurchAtt.Visitors = ChurchAttGoal.Visitors;
                    DynamicChurchAtt.FirstTimeVisitors = ChurchAttGoal.FirstTimeVisitors;
                    DynamicChurchAtt.Overseer = getOverseer.Name;
                    DynamicChurchAtt.Salvations = ChurchAttGoal.Salvations;

                    Church_Attendance_Feedback feedbackExists = db.Church_Attendance_Feedback.Where(x => x.ChurchAttGoalID == ChurchAttGoal.ChurchAttGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        DynamicChurchAtt.FBMember = "None";
                        DynamicChurchAtt.FBLeader = "None";
                        DynamicChurchAtt.FBVisitors = "None";
                        DynamicChurchAtt.FBFirstTimeVisitors = "None";
                        DynamicChurchAtt.FBSalvations = "None";
                        DynamicChurchAtt.GoalFeedbackExists = true;
                    }
                    else
                    {
                        DynamicChurchAtt.FBMember = feedbackExists.Member;
                        DynamicChurchAtt.FBLeader = feedbackExists.Leader;
                        DynamicChurchAtt.FBVisitors = feedbackExists.Visitors;
                        DynamicChurchAtt.FBFirstTimeVisitors = feedbackExists.FirstTimeVisitors;
                        DynamicChurchAtt.FBSalvations = feedbackExists.Salvations;
                        DynamicChurchAtt.GoalFeedbackExists = false;

                    }

                    DynamicChurchAttGoal.Add(DynamicChurchAtt); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return DynamicChurchAttGoal;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/DeleteChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> DeleteChurchAttGoal([FromBody] dynamic ChurchAttGoal) //get JSON parameter
        {
            //validate that there is no null values
            if (ChurchAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data

                try
                {
                    int id = ChurchAttGoal.goalID.ChurchAttGoalID;
                    Church_Attendance_Goal ChurchAtt = db.Church_Attendance_Goal.Where(z => z.ChurchAttGoalID == id).FirstOrDefault(); //return record based on ID
                    db.Church_Attendance_Goal.Remove(ChurchAtt); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = ChurchAttGoal.PersonID;
                    auditLog.EventDescription = "Removed Church Attendance Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();

                }
                catch (Exception)
                {
                    return null;
                }


                return getAllChurchAttGoal();
            }
            else
            {
                return null;
            }
        }


        //Zone Homecell Attenance Goal
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetZoneHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic SetZoneHomecellAttGoal([FromBody] dynamic newZoneHomecellAtt) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newZoneHomecellAtt != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                DbContextTransaction transaction = db.Database.BeginTransaction();
                if (newZoneHomecellAtt.form.Date != null && newZoneHomecellAtt.form.Overseer != null && newZoneHomecellAtt.form.Members != null && newZoneHomecellAtt.form.Leaders != null &&
                 newZoneHomecellAtt.form.Visitors != null && newZoneHomecellAtt.form.FirstTimeVisitors != null && newZoneHomecellAtt.form.Salvations != null)
                {
                    try
                    {
                        
                            Zone_Homecell_Attendance_Goal z = new Zone_Homecell_Attendance_Goal();
                            z.Date = newZoneHomecellAtt.form.Date;
                            z.Description = newZoneHomecellAtt.form.Description;
                            z.FirstTimeVisitors = newZoneHomecellAtt.form.FirstTimeVisitors;
                            z.Leaders = newZoneHomecellAtt.form.Leaders;
                            z.Members = newZoneHomecellAtt.form.Members;
                            z.Overseer = newZoneHomecellAtt.form.Overseer;
                            z.Salvations = newZoneHomecellAtt.form.Salvations;
                            z.Visitors = newZoneHomecellAtt.form.Visitors;

                            db.Zone_Homecell_Attendance_Goal.Add(z); //add new Zone homecell attendance goal
                            db.SaveChanges();

                            int id = db.Zone_Homecell_Attendance_Goal.OrderByDescending(x => x.ZoneHomecellAttGoalID).Select(x => x.ZoneHomecellAttGoalID).FirstOrDefault();

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newZoneHomecellAtt.PersonID;
                            auditLog.EventDescription = "Created Zone Homecell Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);
                            db.SaveChanges();
                            transaction.Commit();

                            return returnMessage = "Zone Homecell Attendance Goal was set successfully.";

                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }

        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateZoneHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateZoneHomecellAttGoal([FromBody] dynamic ZoneHomecellAttGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (ZoneHomecellAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (ZoneHomecellAttGoal.form.ZoneHomecellAttGoalID != null && ZoneHomecellAttGoal.form.Date != null && ZoneHomecellAttGoal.form.Overseer != null && ZoneHomecellAttGoal.form.Members != null && ZoneHomecellAttGoal.form.Leaders != null &&
                ZoneHomecellAttGoal.form.Visitors != null && ZoneHomecellAttGoal.form.FirstTimeVisitors != null && ZoneHomecellAttGoal.form.Salvations != null)
                {
                    try
                    {
                      
                            int id = ZoneHomecellAttGoal.form.ZoneHomecellAttGoalID;
                            Zone_Homecell_Attendance_Goal ZoneHomecellAtt = db.Zone_Homecell_Attendance_Goal.Where(z => z.ZoneHomecellAttGoalID == id).FirstOrDefault(); //retrieve record to update data
                            ZoneHomecellAtt.Date = ZoneHomecellAttGoal.form.Date; //update data with parameter data
                            ZoneHomecellAtt.Members = ZoneHomecellAttGoal.form.Members;
                            ZoneHomecellAtt.Leaders = ZoneHomecellAttGoal.form.Leaders;
                            ZoneHomecellAtt.Visitors = ZoneHomecellAttGoal.form.Visitors;
                            ZoneHomecellAtt.FirstTimeVisitors = ZoneHomecellAttGoal.form.FirstTimeVisitors;
                            ZoneHomecellAtt.Overseer = ZoneHomecellAttGoal.form.Overseer;
                            ZoneHomecellAtt.Salvations = ZoneHomecellAttGoal.form.Salvations;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = ZoneHomecellAttGoal.PersonID;
                            auditLog.EventDescription = "Updated Zone Church Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 
                            return returnMessage = "Zone Homecell Attendance goal was updated successfully.";
                      
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getAllZoneHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllZoneHomecellAttGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getZoneHomecellAtt(db.Zone_Homecell_Attendance_Goal.ToList()); // return called method
        }

        public List<dynamic> getZoneHomecellAtt(List<Zone_Homecell_Attendance_Goal> ZoneHomecellAtt)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            List<dynamic> DynamicZoneHomecellAttGoal = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var ZoneHomecellAttGoal in ZoneHomecellAtt)
                {
                    Person getOverseer = db.People.Where(x => x.PersonID == ZoneHomecellAttGoal.Overseer).FirstOrDefault();
                    //create new dynamic object 
                    dynamic DynamicHomecellAtt = new ExpandoObject();
                    DynamicHomecellAtt.Date = ZoneHomecellAttGoal.Date; //update data with parameter data
                    DynamicHomecellAtt.Members = ZoneHomecellAttGoal.Members;
                    DynamicHomecellAtt.ZoneHomecellAttGoalID = ZoneHomecellAttGoal.ZoneHomecellAttGoalID;
                    DynamicHomecellAtt.Leaders = ZoneHomecellAttGoal.Leaders;
                    DynamicHomecellAtt.Visitors = ZoneHomecellAttGoal.Visitors;
                    DynamicHomecellAtt.FirstTimeVisitors = ZoneHomecellAttGoal.FirstTimeVisitors;
                    DynamicHomecellAtt.Overseer = getOverseer.Name;
                    DynamicHomecellAtt.Salvations = ZoneHomecellAttGoal.Salvations;

                    Zone_Homecell_Attendance_Feedback feedbackExists = db.Zone_Homecell_Attendance_Feedback.Where(x => x.ZoneHomecellAttGoalID == ZoneHomecellAttGoal.ZoneHomecellAttGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        DynamicHomecellAtt.FBMembers = "None";
                        DynamicHomecellAtt.FBLeaders = "None";
                        DynamicHomecellAtt.FBVisitors = "None";
                        DynamicHomecellAtt.FBFirstTimeVisitors = "None";
                        DynamicHomecellAtt.FBOverseer = "None";
                        DynamicHomecellAtt.FBSalvations = "None";
                        DynamicHomecellAtt.GoalFeedbackExists = true;

                    }
                    else
                    {
                        DynamicHomecellAtt.FBMembers = feedbackExists.Member;
                        DynamicHomecellAtt.FBLeaders = feedbackExists.Leader;
                        DynamicHomecellAtt.FBVisitors = feedbackExists.Visitors;
                        DynamicHomecellAtt.FBFirstTimeVisitors = feedbackExists.FirstTimeVisitors;
                        DynamicHomecellAtt.FBSalvations = feedbackExists.Salvations;
                        DynamicHomecellAtt.GoalFeedbackExists = false;

                    }
                    DynamicZoneHomecellAttGoal.Add(DynamicHomecellAtt); // add to dynamic list
                }
            }
            catch (Exception)
            {

                return null;
            }

            return DynamicZoneHomecellAttGoal;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/DeleteZoneHomecellAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> DeleteZoneHomecellAttGoal([FromBody] dynamic ZoneHomecellAttGoal) //get JSON parameter
        {
            //validate that there is no null values
            if (ZoneHomecellAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data

                try
                {
                    int id = ZoneHomecellAttGoal.goalID.ZoneHomecellAttGoalID;
                    Zone_Homecell_Attendance_Goal ZoneHomecellAtt = db.Zone_Homecell_Attendance_Goal.Where(z => z.ZoneHomecellAttGoalID == id).FirstOrDefault(); //return record based on ID
                    db.Zone_Homecell_Attendance_Goal.Remove(ZoneHomecellAtt); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = ZoneHomecellAttGoal;
                    auditLog.EventDescription = "Removed Church Attendance Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }


                return getAllZoneHomecellAttGoal();
            }
            else
            {
                return null;
            }
        }

        //Zone Church Attenance Goal
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetZoneChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic SetZoneChurchAttGoal([FromBody] dynamic newZoneChurchAtt) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newZoneChurchAtt != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                DbContextTransaction transaction = db.Database.BeginTransaction();
                if (newZoneChurchAtt.form.Date != null && newZoneChurchAtt.form.Overseer != null && newZoneChurchAtt.form.Member != null && newZoneChurchAtt.form.Leader != null &&
                     newZoneChurchAtt.form.Visitors != null && newZoneChurchAtt.form.FirstTimeVisitors != null && newZoneChurchAtt.form.Salvations != null)
                {
                    try
                    {
                        
                            Zone_Church_Attendance_Goal z = new Zone_Church_Attendance_Goal();
                            z.Date = newZoneChurchAtt.form.Date;
                            z.Description = newZoneChurchAtt.form.Description;
                            z.FirstTimeVisitors = newZoneChurchAtt.form.FirstTimeVisitors;
                            z.Leader = newZoneChurchAtt.form.Leader;
                            z.Member = newZoneChurchAtt.form.Member;
                            z.Overseer = newZoneChurchAtt.form.Overseer;
                            z.Salvations = newZoneChurchAtt.form.Salvations;
                            z.Visitors = newZoneChurchAtt.form.Visitors;

                            db.Zone_Church_Attendance_Goal.Add(z); //add new Zone church attendance goal
                            db.SaveChanges();

                            int id = db.Zone_Church_Attendance_Goal.OrderByDescending(x => x.ZoneChurchAttGoalID).Select(x => x.ZoneChurchAttGoalID).FirstOrDefault();


                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newZoneChurchAtt.PersonID;
                            auditLog.EventDescription = "Created Zone Church Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges();

                            return returnMessage = "Zone Church Attendance Goal was set successfully.";
                    
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }

        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateZoneChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateZoneChurchAttGoal([FromBody] dynamic ZoneChurchAttGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (ZoneChurchAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (ZoneChurchAttGoal.form.ZoneChurchAttGoalID != null && ZoneChurchAttGoal.form.Date != null && ZoneChurchAttGoal.form.Overseer != null && ZoneChurchAttGoal.form.Member != null && ZoneChurchAttGoal.form.Leader != null &&
                 ZoneChurchAttGoal.form.Visitors != null && ZoneChurchAttGoal.form.FirstTimeVisitors != null && ZoneChurchAttGoal.form.Salvations != null)
                {
                    try
                    {
                        
                            int id = ZoneChurchAttGoal.form.ZoneChurchAttGoalID;
                            Zone_Church_Attendance_Goal ZoneChurchAtt = db.Zone_Church_Attendance_Goal.Where(z => z.ZoneChurchAttGoalID == id).FirstOrDefault(); //retrieve record to update data
                            ZoneChurchAtt.Date = ZoneChurchAttGoal.Date; //update data with parameter data
                            ZoneChurchAtt.Member = ZoneChurchAttGoal.Member;
                            ZoneChurchAtt.Leader = ZoneChurchAttGoal.Leader;
                            ZoneChurchAtt.Visitors = ZoneChurchAttGoal.Visitors;
                            ZoneChurchAtt.FirstTimeVisitors = ZoneChurchAttGoal.FirstTimeVisitors;
                            ZoneChurchAtt.Overseer = ZoneChurchAttGoal.Overseer;
                            ZoneChurchAtt.Salvations = ZoneChurchAttGoal.Salvations;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = ZoneChurchAttGoal.PersonID;
                            auditLog.EventDescription = "Updated Zone Church Attendance Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 

                            return returnMessage = "Zone church attendance was updated successfully.";
                       
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getAllZoneChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllZoneChurchAttGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getZoneChurchAtt(db.Zone_Church_Attendance_Goal.ToList()); // return called method
        }

        public List<dynamic> getZoneChurchAtt(List<Zone_Church_Attendance_Goal> ZoneChurchAtt)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

            List<dynamic> DynamicZoneChurchAttGoal = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var ZoneChurchAttGoal in ZoneChurchAtt)
                {
                    Person getOverseer = db.People.Where(x => x.PersonID == ZoneChurchAttGoal.Overseer).FirstOrDefault();

                    //create new dynamic object 
                    dynamic DynamicChurchAtt = new ExpandoObject();
                    DynamicChurchAtt.Date = ZoneChurchAttGoal.Date; //update data with parameter data
                    DynamicChurchAtt.Member = ZoneChurchAttGoal.Member;
                    DynamicChurchAtt.ZoneChurchAttGoalID = ZoneChurchAttGoal.ZoneChurchAttGoalID;
                    DynamicChurchAtt.Leader = ZoneChurchAttGoal.Leader;
                    DynamicChurchAtt.Visitors = ZoneChurchAttGoal.Visitors;
                    DynamicChurchAtt.FirstTimeVisitors = ZoneChurchAttGoal.FirstTimeVisitors;
                    DynamicChurchAtt.Overseer = getOverseer.Name;
                    DynamicChurchAtt.Salvations = ZoneChurchAttGoal.Salvations;

                    Zone_Church_Attendance_Feedback feedbackExists = db.Zone_Church_Attendance_Feedback.Where(x => x.ZoneChurchAttGoalID == ZoneChurchAttGoal.ZoneChurchAttGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        DynamicChurchAtt.FBMember = "None";
                        DynamicChurchAtt.FBLeader = "None";
                        DynamicChurchAtt.FBVisitors = "None";
                        DynamicChurchAtt.FBFirstTimeVisitors = "None";
                        DynamicChurchAtt.FBSalvations = "None";
                        DynamicChurchAtt.GoalFeedbackExists = true;
                    }
                    else
                    {
                        DynamicChurchAtt.FBMember = feedbackExists.Member;
                        DynamicChurchAtt.FBLeader = feedbackExists.Leader;
                        DynamicChurchAtt.FBVisitors = feedbackExists.Visitors;
                        DynamicChurchAtt.FBFirstTimeVisitors = feedbackExists.FirstTimeVisitors;
                        DynamicChurchAtt.FBSalvations = feedbackExists.Salvations;
                        DynamicChurchAtt.GoalFeedbackExists = false;

                    }
                    DynamicZoneChurchAttGoal.Add(DynamicChurchAtt); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return DynamicZoneChurchAttGoal;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/DeleteZoneChurchAttGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> DeleteZoneChurchAttGoal([FromBody] dynamic ZoneChurchAttGoal) //get JSON parameter
        {
            //validate that there is no null values
            if (ZoneChurchAttGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data

                try
                {
                    int id = ZoneChurchAttGoal.goalID.ZoneChurchAttGoalID;
                    Zone_Church_Attendance_Goal ZoneChurchAtt = db.Zone_Church_Attendance_Goal.Where(z => z.ZoneChurchAttGoalID == id).FirstOrDefault(); //return record based on ID
                    db.Zone_Church_Attendance_Goal.Remove(ZoneChurchAtt); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = ZoneChurchAttGoal.PersonID;
                    auditLog.EventDescription = "Removed Zone Church Attendance Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);
                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }

                return getAllZoneChurchAttGoal();
            }
            else
            {
                return null;
            }
        }

        //New Member Orientation Goal
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetNMOGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic SetNMOGoal([FromBody] dynamic newNMO) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newNMO != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                DbContextTransaction transaction = db.Database.BeginTransaction();

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (newNMO.form.Date != null && newNMO.form.Overseer != null && newNMO.form.MonthTotal != null)
                {
                    try
                    {
                        
                            NMO_Goal n = new NMO_Goal();
                            n.Date = newNMO.form.Date;
                            n.MonthTotal = newNMO.form.MonthTotal;
                            n.Overseer = newNMO.form.Overseer;

                            db.NMO_Goal.Add(n); //add new salvation to Salvations table
                            db.SaveChanges();
                            int id = db.NMO_Goal.OrderByDescending(x => x.NMOGoalID).Select(x => x.NMOGoalID).FirstOrDefault();

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newNMO.PersonID;
                            auditLog.EventDescription = "Created New Members Orientation Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges();
                            transaction.Commit();

                            return returnMessage = "New Member Oriantation Monthly goal set successfully.";
                      
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }

        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateNMOGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateNMOGoal([FromBody] dynamic NMOGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (NMOGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (NMOGoal.form.NMOGoalID != null && NMOGoal.form.Date != null && NMOGoal.form.Overseer != null && NMOGoal.form.MonthTotal != null)
                {
                    try
                    {
                        
                            int id = NMOGoal.form.NMOGoalID;
                            NMO_Goal NMO = db.NMO_Goal.Where(z => z.NMOGoalID == id).FirstOrDefault(); //retrieve record to update data
                            NMO.MonthTotal = NMOGoal.form.MonthTotal; //update data with parameter data
                            NMO.MonthTotal = NMOGoal.form.MonthTotal;
                            NMO.Overseer = NMOGoal.form.Overseer;
                            NMO.Date = NMOGoal.form.Date;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = NMOGoal.PersonID;
                            auditLog.EventDescription = "Updated New Members Orientation Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 
                            return returnMessage = "New Member Oriantation monthly goal was updated successfully.";


                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }

        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getAllNMOGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllNMOGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getNMO(db.NMO_Goal.ToList()); // return called method
        }

        public List<dynamic> getNMO(List<NMO_Goal> NMOGoals)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            List<dynamic> DynamicNMOGoal = new List<dynamic>();

            try
            {
                foreach (var NMOGoal in NMOGoals)
                {
                    Person getOverseer = db.People.Where(x => x.PersonID == NMOGoal.Overseer).FirstOrDefault();

                    //create new dynamic object 
                    dynamic DynamicNMO = new ExpandoObject();
                    DynamicNMO.NMOGoalID = NMOGoal.NMOGoalID;
                    DynamicNMO.MonthTotal = NMOGoal.MonthTotal; //update data with parameter data
                    DynamicNMO.Overseer = getOverseer.Name;
                    DynamicNMO.Date = NMOGoal.Date;

                    NMO_Feedback feedbackExists = db.NMO_Feedback.Where(x => x.NMOGoalID == NMOGoal.NMOGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        DynamicNMO.FBMonthTotal = "None"; //update data with parameter data
                        DynamicNMO.GoalFeedbackExists = true;
                    }
                    else
                    {
                        DynamicNMO.FBMonthTotal = feedbackExists.MonthTotal;
                        DynamicNMO.GoalFeedbackExists = false;

                    }
                    DynamicNMOGoal.Add(DynamicNMO); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }
            //foreach method ro retrieve data from database and add it to list to return

            return DynamicNMOGoal;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/DeleteNMOGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> DeleteNMOGoal([FromBody] dynamic NMOGoal) //get JSON parameter
        {
            //validate that there is no null values
            if (NMOGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data

                try
                {
                    int id = NMOGoal.goalID.NMOGoalID;
                    NMO_Goal NMO = db.NMO_Goal.Where(z => z.NMOGoalID == id).FirstOrDefault(); //return record based on ID
                    db.NMO_Goal.Remove(NMO); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = NMOGoal.PersonID;
                    auditLog.EventDescription = "Removed New Members Orientation Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }


                return getAllNMOGoal();
            }
            else
            {
                return null;
            }
        }

        //Discipleship Goal
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetDiscipleshipGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic SetDiscipleshipGoal([FromBody] dynamic newDisicpleshipGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newDisicpleshipGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                DbContextTransaction transaction = db.Database.BeginTransaction();
                if (newDisicpleshipGoal.form.Date != null && newDisicpleshipGoal.form.Overseer != null && newDisicpleshipGoal.form.DiscipleshipType != null &&
                    newDisicpleshipGoal.form.Attendance != null)
                {
                    try
                    {
                        
                            Discipleship_Goal d = new Discipleship_Goal();
                            d.Attendance = newDisicpleshipGoal.form.Attendance;
                            d.Date = newDisicpleshipGoal.form.Date;
                            d.Description = newDisicpleshipGoal.form.Description;
                            d.DiscipleshipType = newDisicpleshipGoal.form.DiscipleshipType;
                            d.Overseer = newDisicpleshipGoal.form.Overseer;

                            db.Discipleship_Goal.Add(d); //add new discipleship goal
                            db.SaveChanges();

                            int id = db.Discipleship_Goal.OrderByDescending(x => x.DiscipleshipGoalID).Select(x => x.DiscipleshipGoalID).FirstOrDefault();


                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newDisicpleshipGoal.PersonID;
                            auditLog.EventDescription = "Created Discipleship Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges();
                            transaction.Commit();

                            return returnMessage = "Discipleship Goal set successfully.";
                       
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }

        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateDiscipleshipGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateDiscipleshipGoal([FromBody] dynamic DiscipleshipGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (DiscipleshipGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (DiscipleshipGoal.form.DiscipleshipGoalID != null && DiscipleshipGoal.form.Date != null && DiscipleshipGoal.form.Overseer != null && DiscipleshipGoal.form.DiscipleshipType != null &&
                    DiscipleshipGoal.form.Attendance != null)
                {
                    try
                    {
                        
                            int id = DiscipleshipGoal.form.DiscipleshipGoalID;
                            Discipleship_Goal Discipleship = db.Discipleship_Goal.Where(z => z.DiscipleshipGoalID == id).FirstOrDefault(); //retrieve record to update data
                            Discipleship.Description = DiscipleshipGoal.form.Description; //update data with parameter data
                            Discipleship.DiscipleshipType = DiscipleshipGoal.form.DiscipleshipType;
                            Discipleship.Attendance = DiscipleshipGoal.form.Attendance;
                            Discipleship.Overseer = DiscipleshipGoal.form.Overseer;
                            Discipleship.Date = DiscipleshipGoal.form.Date;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = DiscipleshipGoal.PersonID;
                            auditLog.EventDescription = "Updated Discipleship Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 
                            return returnMessage = "Discipleship Goal was updated successfully.";
                        
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getDiscipleshipGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getDiscipleshipGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getDiscipleship(db.Discipleship_Goal.ToList()); // return called method
        }

        public List<dynamic> getDiscipleship(List<Discipleship_Goal> discipleshipGoals)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            List<dynamic> DynamicdiscipleshipGoals = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var discipleshipGoal in discipleshipGoals)
                {
                    Person getOverseer = db.People.Where(x => x.PersonID == discipleshipGoal.Overseer).FirstOrDefault();

                    //create new dynamic object 
                    dynamic Dynamicdiscipleship = new ExpandoObject();
                    Dynamicdiscipleship.DiscipleshipGoalID = discipleshipGoal.DiscipleshipGoalID;
                    Dynamicdiscipleship.Description = discipleshipGoal.Description; //update data with parameter data
                    Dynamicdiscipleship.DiscipleshipType = discipleshipGoal.DiscipleshipType;
                    Dynamicdiscipleship.Attendance = discipleshipGoal.Attendance;
                    Dynamicdiscipleship.Overseer = getOverseer.Name;
                    Dynamicdiscipleship.Date = discipleshipGoal.Date;

                    Discipleship_Feedback feedbackExists = db.Discipleship_Feedback.Where(x => x.DiscipleshipGoalID == discipleshipGoal.DiscipleshipGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        Dynamicdiscipleship.FBAttendance = "None"; //update data with parameter data
                        Dynamicdiscipleship.GoalFeedbackExists = true;
                    }
                    else
                    {
                        Dynamicdiscipleship.FBAttendance = feedbackExists.Attendance;
                        Dynamicdiscipleship.GoalFeedbackExists = false;

                    }
                    DynamicdiscipleshipGoals.Add(Dynamicdiscipleship); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return DynamicdiscipleshipGoals;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/DeleteDiscipleshipGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> DeleteDiscipleshipGoal([FromBody] dynamic DiscipleshipGoal) //get JSON parameter
        {
            //validate that there is no null values
            if (DiscipleshipGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data

                try
                {
                    int id = DiscipleshipGoal.goalID.DiscipleshipGoalID;
                    Discipleship_Goal DeleteDiscipleship = db.Discipleship_Goal.Where(z => z.DiscipleshipGoalID == id).FirstOrDefault(); //return record based on ID
                    db.Discipleship_Goal.Remove(DeleteDiscipleship); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = DiscipleshipGoal.PersonID;
                    auditLog.EventDescription = "Removed Discipleship Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }


                return getDiscipleshipGoal();
            }
            else
            {
                return null;
            }
        }


        //Structure Growth Goal
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetStructureGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic SetStructureGrowthGoal([FromBody] dynamic newStructureGrowth) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newStructureGrowth != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                DbContextTransaction transaction = db.Database.BeginTransaction();

                if (newStructureGrowth.form.Date != null && newStructureGrowth.form.Overseer != null && newStructureGrowth.form.Members != null)
                {
                    try
                    {
                        
                            Structure_Growth_Goal s = new Structure_Growth_Goal();
                            s.Date = newStructureGrowth.form.Date;
                            s.Description = newStructureGrowth.form.Description;
                            s.Members = newStructureGrowth.form.Members;
                            s.Overseer = newStructureGrowth.form.Overseer;

                            db.Structure_Growth_Goal.Add(s); //add new structure growth goal

                            db.SaveChanges();
                            int id = db.Structure_Growth_Goal.OrderByDescending(x => x.StructureGrowthGoalID).Select(x => x.StructureGrowthGoalID).FirstOrDefault();


                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newStructureGrowth.PersonID;
                            auditLog.EventDescription = "Created Structure Growth Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges();
                            transaction.Commit();

                            return returnMessage = "Structure Growth Goal was set successfully.";

                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateStructureGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateStructureGrowthGoal([FromBody] dynamic StructureGrowthGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (StructureGrowthGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (StructureGrowthGoal.form.StructureGrowthGoalID != null && StructureGrowthGoal.form.Date != null && StructureGrowthGoal.form.Overseer != null && StructureGrowthGoal.form.Members != null)
                {
                    try
                    {
                       
                            int id = StructureGrowthGoal.form.StructureGrowthGoalID;
                            Structure_Growth_Goal StructureGrowth = db.Structure_Growth_Goal.Where(z => z.StructureGrowthGoalID == id).FirstOrDefault(); //retrieve record to update data
                            StructureGrowth.Description = StructureGrowthGoal.form.Description; //update data with parameter data
                            StructureGrowth.Members = StructureGrowthGoal.form.Members;
                            StructureGrowth.Overseer = StructureGrowthGoal.form.Overseer;
                            StructureGrowth.Date = StructureGrowthGoal.form.Date;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = StructureGrowthGoal.PersonID;
                            auditLog.EventDescription = "Updated Structure Growth Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 
                            return returnMessage = "Structure Growth Goal was updated successfully.";
                       
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getStructureGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getStructureGrowthGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getStructureGrowth(db.Structure_Growth_Goal.ToList()); // return called method
        }

        public List<dynamic> getStructureGrowth(List<Structure_Growth_Goal> StructureGrowthGoals)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            List<dynamic> DynamicStructureGrowthGoals = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var StructureGrowthGoal in StructureGrowthGoals)
                {
                    Person getOverseer = db.People.Where(x => x.PersonID == StructureGrowthGoal.Overseer).FirstOrDefault();

                    //create new dynamic object 
                    dynamic DynamicStructureGrowth = new ExpandoObject();
                    DynamicStructureGrowth.StructureGrowthGoalID = StructureGrowthGoal.StructureGrowthGoalID;
                    DynamicStructureGrowth.Description = StructureGrowthGoal.Description;
                    DynamicStructureGrowth.Members = StructureGrowthGoal.Members;
                    DynamicStructureGrowth.Overseer = getOverseer.Name;
                    DynamicStructureGrowth.Date = StructureGrowthGoal.Date;

                    Structure_Growth_Feedback feedbackExists = db.Structure_Growth_Feedback.Where(x => x.StructureGrowthGoalID == StructureGrowthGoal.StructureGrowthGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        DynamicStructureGrowth.FBMembers = "None"; //update data with parameter data
                        DynamicStructureGrowth.GoalFeedbackExists = true;
                    }
                    else
                    {
                        DynamicStructureGrowth.FBMembers = feedbackExists.Members;
                        DynamicStructureGrowth.GoalFeedbackExists = false;

                    }
                    DynamicStructureGrowthGoals.Add(DynamicStructureGrowth); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return DynamicStructureGrowthGoals;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/DeleteStructureGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> DeleteStructureGrowthGoal([FromBody] dynamic StructureGrowthGoal) //get JSON parameter
        {
            //validate that there is no null values
            if (StructureGrowthGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data

                try
                {
                    int id = StructureGrowthGoal.goalID.StructureGrowthGoalID;
                    Structure_Growth_Goal DeleteStructureGrowth = db.Structure_Growth_Goal.Where(z => z.StructureGrowthGoalID == id).FirstOrDefault(); //return record based on ID
                    db.Structure_Growth_Goal.Remove(DeleteStructureGrowth); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = StructureGrowthGoal.PersonID;
                    auditLog.EventDescription = "Removed Structure Growth Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }

                return getStructureGrowthGoal();
            }
            else
            {
                return null;
            }
        }

        //Zone Growth Goal 
        //Set weekly Goal
        [System.Web.Http.Route("api/Goals/SetZoneGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic SetZoneGrowthGoal([FromBody] dynamic newZoneGrowthGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newZoneGrowthGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                DbContextTransaction transaction = db.Database.BeginTransaction();

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (newZoneGrowthGoal.form.Date != null && newZoneGrowthGoal.form.Overseer != null && newZoneGrowthGoal.form.Members != null)
                {
                    try
                    {
                        
                            Zone_Growth_Goal z = new Zone_Growth_Goal();
                            z.Date = newZoneGrowthGoal.form.Date;
                            z.Description = newZoneGrowthGoal.form.Description;
                            z.Members = newZoneGrowthGoal.form.Members;
                            z.Overseer = newZoneGrowthGoal.form.Overseer;

                            db.Zone_Growth_Goal.Add(z); //add new salvation to Salvations table
                            db.SaveChanges();

                            int id = db.Zone_Growth_Goal.OrderByDescending(x => x.ZonegrowthGoalID).Select(x => x.ZonegrowthGoalID).FirstOrDefault();

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = newZoneGrowthGoal.PersonID;
                            auditLog.EventDescription = "Created Zone Growth Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);
                            db.SaveChanges();

                            return returnMessage = "Zone Growth Goal was set successfully.";
                    
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Update Weekly Goal
        [System.Web.Http.Route("api/Goals/UpdateZoneGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic UpdateZoneGrowthGoal([FromBody] dynamic ZoneGrowthGoal) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (ZoneGrowthGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                if (ZoneGrowthGoal.form.StructureGrowthGoalID != null && ZoneGrowthGoal.form.Date != null && ZoneGrowthGoal.form.Overseer != null && ZoneGrowthGoal.form.Members != null)
                {
                    try
                    {
                        
                            int id = ZoneGrowthGoal.form.ZonegrowthGoalID;
                            Zone_Growth_Goal ZoneGrowth = db.Zone_Growth_Goal.Where(z => z.ZonegrowthGoalID == id).FirstOrDefault(); //retrieve record to update data
                            ZoneGrowth.Description = ZoneGrowthGoal.form.Description; //update data with parameter data
                            ZoneGrowth.Members = ZoneGrowthGoal.form.Members;
                            ZoneGrowth.Overseer = ZoneGrowthGoal.form.Overseer;
                            ZoneGrowth.Date = ZoneGrowthGoal.form.Date;

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = ZoneGrowthGoal.PersonID;
                            auditLog.EventDescription = "Updated Zone Growth Goal with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //save changes 
                            return returnMessage = "Zone growth goal was updated successfully.";
                     
                    }
                    catch (Exception)
                    {
                        return returnMessage = "Some information is missing. Please provide the information and try again.";
                    }
                }
                else
                {
                    return returnMessage = "Some information is missing. Please provide the information and try again.";
                }
            }
            else
            {
                return null;
            }
        }
        //Search Weekly Goal
        [System.Web.Http.Route("api/Goals/getZoneGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getZoneGrowthGoal()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            return getZoneGrowth(db.Zone_Growth_Goal.ToList()); // return called method
        }

        public List<dynamic> getZoneGrowth(List<Zone_Growth_Goal> ZoneGrowthGoals)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory
            List<dynamic> DynamicZoneGrowthGoals = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var ZoneGrowthGoal in ZoneGrowthGoals)
                {
                    Person getOverseer = db.People.Where(x => x.PersonID == ZoneGrowthGoal.Overseer).FirstOrDefault();

                    //create new dynamic object 
                    dynamic DynamicZoneGrowth = new ExpandoObject();
                    DynamicZoneGrowth.ZonegrowthGoalID = ZoneGrowthGoal.ZonegrowthGoalID;
                    DynamicZoneGrowth.Description = ZoneGrowthGoal.Description;
                    DynamicZoneGrowth.Members = ZoneGrowthGoal.Members;
                    DynamicZoneGrowth.Overseer = getOverseer.Name;
                    DynamicZoneGrowth.Date = ZoneGrowthGoal.Date;

                    Zone_Growth_Feedback feedbackExists = db.Zone_Growth_Feedback.Where(x => x.ZonegrowthGoalID == ZoneGrowthGoal.ZonegrowthGoalID).FirstOrDefault();
                    if (feedbackExists == null)
                    {
                        DynamicZoneGrowth.FBMembers = "None"; //update data with parameter data
                        DynamicZoneGrowth.GoalFeedbackExists = true;
                    }
                    else
                    {
                        DynamicZoneGrowth.FBMembers = feedbackExists.Members;
                        DynamicZoneGrowth.GoalFeedbackExists = false;

                    }
                    DynamicZoneGrowthGoals.Add(DynamicZoneGrowth); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return DynamicZoneGrowthGoals;
        }
        //Delete Weekly Goal
        [System.Web.Http.Route("api/Goals/DeleteZoneGrowthGoal")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> DeleteZoneGrowthGoal([FromBody] dynamic ZoneGrowthGoal) //get JSON parameter
        {
            //validate that there is no null values
            if (ZoneGrowthGoal != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data

                try
                {
                    int id = ZoneGrowthGoal.goalID.ZonegrowthGoalID;
                    Zone_Growth_Goal DeleteZoneGrowth = db.Zone_Growth_Goal.Where(z => z.ZonegrowthGoalID == id).FirstOrDefault(); //return record based on ID
                    db.Zone_Growth_Goal.Remove(DeleteZoneGrowth); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = ZoneGrowthGoal.PersonID;
                    auditLog.EventDescription = "Removed Zone Growth Goal with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }

                return getZoneGrowthGoal();
            }
            else
            {
                return null;
            }
        }

        //3.17 View Organisational structure position -Charl
        [System.Web.Http.Route("api/OrganisationalStructurePosition/getViewOrgStructPos")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getViewOrgStructPos()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            return getOrgStructPos(db.Organisational_Structure_Position.Where(z => z.OrgIndivPosID == 43).ToList()); // return called method
        }

        public List<dynamic> getOrgStructPos(List<Organisational_Structure_Position> PositionList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            List<dynamic> dynamicOrgStructPositionList = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var Position in PositionList)
                {
                    Organisational_Structure_Type getStructureType = db.Organisational_Structure_Type.Where(z => z.OrgStructTypeID == Position.OrgStructTypeID).FirstOrDefault();
                    Organisational_Individual_Position getIndivPos = db.Organisational_Individual_Position.Where(z => z.OrgIndivPosID == Position.OrgIndivPosID).FirstOrDefault();

                    string orgStructType = getStructureType.Description;
                    string IndivPos = getIndivPos.Decription;

                    //create new dynamic object 
                    dynamic dynamicOrgStructPosition = new ExpandoObject();
                    dynamicOrgStructPosition.OrgStructType = orgStructType;
                    dynamicOrgStructPosition.OrgSTructReportTo = Position.OrgStructIDReportsTo;
                    dynamicOrgStructPosition.Description = Position.Description;
                    dynamicOrgStructPosition.OrgStructLevel = Position.OrgStructLevel;
                    dynamicOrgStructPosition.OrgIndivPos = IndivPos;
                    dynamicOrgStructPosition.OrgStructID = Position.OrgStructID;

                    // dynamicOrgStructPosition.OrgGroupList = Position.Organisational_Group;
                    dynamicOrgStructPositionList.Add(dynamicOrgStructPosition); // add to dynamic list
                }
            }
            catch (Exception)
            {

            }

            return dynamicOrgStructPositionList;
        }

        [System.Web.Http.Route("api/Goals/GoalAccess")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> GoalAccess(int id)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            List<dynamic> dynamicGoalAccessList = new List<dynamic>();

            try
            {
                Person getOrgIndiv = db.People.Include(x => x.Organisational_Structure_Position).Where(z => z.PersonID == id).FirstOrDefault();
                int PersonIndivPos = getOrgIndiv.Organisational_Structure_Position.OrgIndivPosID;
                Organisational_Individual_Position getAccessList = db.Organisational_Individual_Position.Include(z => z.Goal_Access).Where(x => x.OrgIndivPosID == PersonIndivPos).FirstOrDefault();

                foreach (var access in getAccessList.Goal_Access.ToList())
                {
                    if (access.GoalAccessID < 14)
                    {
                        dynamic personAccess = new ExpandoObject();
                        personAccess.Description = access.GoalName;
                        personAccess.GoalAccessID = access.GoalAccessID;

                        dynamicGoalAccessList.Add(personAccess);
                    }
                }

                return dynamicGoalAccessList;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //////Get dropdown data
        ///
        [System.Web.Http.Route("api/Goals/getHCAttList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> getHCAttList()
        {

            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 46).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();
        }


        [System.Web.Http.Route("api/Goals/getCAttList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> getCAttList()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 46).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();
        }

        [System.Web.Http.Route("api/Goals/getZHCAttList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> getZHCAttList()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 41).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();
        }

        [System.Web.Http.Route("api/Goals/getZCAttList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> getZCAttList()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 41).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();

        }

        [System.Web.Http.Route("api/Goals/getNMOList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> geNMOList()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 45).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();

        }

        [System.Web.Http.Route("api/Goals/getDiscList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> getDiscList()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 45).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();

        }

        [System.Web.Http.Route("api/Goals/getZoneList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> geZoneList()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 41).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();

        }

        [System.Web.Http.Route("api/Goals/getStructList")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<Person> getStructureList()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            Organisational_Structure_Position getPosition = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgIndivPosID == 43).FirstOrDefault();

            return db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.OrgStructID == getPosition.OrgStructID).ToList();
        }

        private static void sendEmail()
        {
            Execute().Wait();
        }
        static async Task Execute()
        {
            EmailString getKey = new EmailString();
            var apiKey = getKey.EmailKey;//Environment.GetEnvironmentVariable("ReviveAPI");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(getKey.FromEmail, "ReviveCommunications");
            var subject = Emailsubject;
            var to = new EmailAddress(toLeader, toName);
            var plainTextContent = message;
            var htmlContent = "Good day " + toName + "<br><br>" + message + "<br><br>  From" + "<br> Revive Communications";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }
    }
}

