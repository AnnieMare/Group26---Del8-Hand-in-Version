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
using System.Web.Compilation;

namespace RC_API.Controllers
{
    public class FollowUpController : ApiController
    {
        ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); // create database connection

        //4.1 Follow-up on salvation - Charl
        [EnableCors(origins: "*", headers: "*", methods: "*")]

        //Read All Salvation information
        [System.Web.Http.Route("api/FollowUp/getSalvation")] //create route for api
        [System.Web.Mvc.HttpGet]

        public List<dynamic> getSalvation()
        {
            //get the current weeks follow-ups
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days-2);
            DateTime end = start.AddDays(6);

            //configure proxy to eliminate overload of memory
            db.Configuration.ProxyCreationEnabled = false;

            //return current week's salvation follow-ups
            return SalvationInformation(db.Salvations.Where(z => z.FollowedUp == false && z.Date > start && z.Date < end).ToList()); // return called method        }
        }
        public List<dynamic> SalvationInformation(List<Salvation> SalvationTable)
        {
            List<dynamic> dynamicSalvationList = new List<dynamic>();
            List<dynamic> dynamicSalvationListNoAnswer = new List<dynamic>();

            //if condition is not met it returns null and error handling happens on angular
            if (SalvationTable != null)
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var Visitor in SalvationTable)
                {
                    dynamic dynamicSalvation1 = new ExpandoObject();
                    dynamicSalvation1.SalID = Visitor.SalID;
                    dynamicSalvation1.Title = Visitor.Title;
                    dynamicSalvation1.Date = Visitor.Date;
                    dynamicSalvation1.AlterWorker = Visitor.AlterWorker;
                    dynamicSalvation1.Name = Visitor.Name;
                    dynamicSalvation1.Surname = Visitor.Surname;
                    dynamicSalvation1.Age = Visitor.Age;
                    dynamicSalvation1.EmploymentStatus = Visitor.EmploymentStatus;
                    dynamicSalvation1.MaritialStatus = Visitor.MaritualStatus;
                    dynamicSalvation1.ResidentialAddress = Visitor.ResidentialAddress;
                    dynamicSalvation1.Suburb = Visitor.Suburb;
                    dynamicSalvation1.City = Visitor.City;
                    dynamicSalvation1.HomeTelNo = Visitor.HomeTelNo;
                    dynamicSalvation1.WorkTelNo = Visitor.WorkTelNo;
                    dynamicSalvation1.Cellphone = Visitor.CellPhone;
                    dynamicSalvation1.Email = Visitor.Email;
                    dynamicSalvation1.Invited = Visitor.Invited;
                    dynamicSalvation1.NameSurnameInvite = Visitor.NameSurnameInvite;
                    dynamicSalvation1.HomecellLeader = Visitor.HomecellLeader;
                    dynamicSalvation1.ZonePastor = Visitor.ZonePastor;
                    dynamicSalvation1.StudyAddress = Visitor.StudyAddress;
                    dynamicSalvation1.ParentGuardianCell = Visitor.ParentGuardianCell;
                    dynamicSalvation1.PrayerRequest = Visitor.PrayerRequest;
                    dynamicSalvation1.SchoolLevel = Visitor.SchoolLevel;
                    dynamicSalvation1.NameofSchool = Visitor.NameofSchool;
                    dynamicSalvation1.Grade = Visitor.Grade;
                    dynamicSalvation1.StudyYear = Visitor.StudyYear;
                    dynamicSalvation1.Institution = Visitor.Institution;
                    dynamicSalvation1.FollowedUp = Visitor.FollowedUp;
                    dynamicSalvation1.NoAnswer = Visitor.NoAnswer;

                    //condition will check follow-up status and add it to list in the 
                    if (Visitor.FollowedUp == true && Visitor.NoAnswer == false || Visitor.FollowedUp == false && Visitor.NoAnswer == false)
                    {
                        dynamicSalvationList.Add(dynamicSalvation1); //add to top of the list if follow-up has not het been completed
                    }
                    else if (Visitor.FollowedUp == false && Visitor.NoAnswer == true)
                    {
                        dynamicSalvationListNoAnswer.Add(dynamicSalvation1); //add bottom of the list if follow-up status is NoAnswer
                    }
                }
            }
            else
            {
                return null; //return null if no follow-ups for the week esists
            }

            //return concatenated so that follow-ups are in the correct order
            return dynamicSalvationList.Concat(dynamicSalvationListNoAnswer).ToList();
        }


        [System.Web.Http.Route("api/FollowUp/getSalvationProgress")] //create route for api
        [System.Web.Mvc.HttpGet]
        public dynamic getSalvationProgress()
        {
            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days-2);
            DateTime end = start.AddDays(6);

            //create new dynamic object for calculations
            dynamic FollowUpProgress = new ExpandoObject();

            try
            {
                //Get list of data depending on remaining and completed
                List<Salvation> RemaininFollowUps = db.Salvations.Where(x => x.FollowedUp == false && x.NoAnswer == true && x.Date > start && x.Date < end || x.FollowedUp == false && x.Date > start && x.Date < end).ToList();
                List<Salvation> CompletedFollowUps = db.Salvations.Where(x => x.FollowedUp == true && x.Date > start && x.Date < end).ToList();

                //count databse records based on follow-up status
                int remaining = RemaininFollowUps.Count;
                int completed = CompletedFollowUps.Count;


                //Add list totals and perfom remaining calculations
                FollowUpProgress.Remaining = remaining;
                FollowUpProgress.Completed = completed;

            }
            catch (Exception e)
            {
                return e;
            }

            return FollowUpProgress; //return progress to angular
        }

        //Salvation Follow-up Completed 
        [System.Web.Http.Route("api/FollowUp/CompletedSalvationFollowUp")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> CompletedSalvationFollowUp([FromBody] dynamic SalvationUpdate) //get JSON parameter
        {
            //check if parameter receives data values
            if (SalvationUpdate != null)
            {
                //configure proxy to eliminate overload of memory
                db.Configuration.ProxyCreationEnabled = false;
                try
                {
                    int SalvationID = SalvationUpdate.SalID.SalID;

                    //get current salvation record to update follow-up status
                    Salvation SalFollowUpUpdate = db.Salvations.Where(z => z.SalID == SalvationID).FirstOrDefault(); //retrieve record to update data

                    //update boolean values
                    SalFollowUpUpdate.FollowedUp = true;
                    SalFollowUpUpdate.NoAnswer = false;

                    //Add to Audit trail entity
                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = SalvationUpdate.PersonID;
                    auditLog.EventDescription = "Completed Follow-up on Salvation with ID: " + SalFollowUpUpdate.SalID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges(); //save changes in database

                    //return all salvations for the week after follow-up is completed
                    return getSalvation();
                }
                catch (Exception)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        //Follow-up no Answer
        [System.Web.Http.Route("api/FollowUp/SalvationFollowUpNoAnswer")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> SalvationFollowUpNoAnswer([FromBody] dynamic SalvationUpdate) //get JSON parameter
        {
            //validate that there is no null values
            if (SalvationUpdate != null)
            {
                //configure proxy to eliminate overload of memory
                db.Configuration.ProxyCreationEnabled = false;

                try
                {
                    //get current salvation record to update follow-up status
                    int SalvationID = SalvationUpdate.SalID.SalID;
                    Salvation SalFollowUpUpdate = db.Salvations.Where(z => z.SalID == SalvationID).FirstOrDefault(); //retrieve record to update data

                    //update boolean values
                    SalFollowUpUpdate.FollowedUp = false;
                    SalFollowUpUpdate.NoAnswer = true;

                    //Add to Audit trail entity
                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = SalvationUpdate.PersonID;
                    auditLog.EventDescription = "No Answer for Follow-up on Salvation with ID: " + SalFollowUpUpdate.SalID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges(); //save changes in database
                }
                catch (Exception)
                {
                    return null;
                }

                //return all salvations for the week after follow-up is completed
                return getSalvation();
            }
            else
            {
                return null;
            }
        }

        //4.6 Follow-up on Members wanting to serve - Charl
        //Read All Members wanting to serve information
        [System.Web.Http.Route("api/FollowUp/getMembersWantingToServe")] //create route for api
        [System.Web.Mvc.HttpGet]

        public List<dynamic> getMembersWantingToServe()
        {
            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days-2);
            DateTime end = start.AddDays(6);

            //configure proxy to eliminate overload of memory
            db.Configuration.ProxyCreationEnabled = false;

            return getMembersServeInformation(db.Members_Serve_Follow_Up.Include("Person").Where(x => x.FollowUpStatus == false && x.FollowUpDate > start && x.FollowUpDate < end).ToList()); // return called method
        }

        public List<dynamic> getMembersServeInformation(List<Members_Serve_Follow_Up> MemberServeList)
        {
            List<dynamic> dynamicMemberServe = new List<dynamic>();
            List<dynamic> dynamicMemberServeNoAnswer = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var member in MemberServeList)
                {
                    Organisational_Group group1 = db.Organisational_Group.Where(z => z.OrgGroupID == member.Group1).FirstOrDefault();
                    Organisational_Group group2 = db.Organisational_Group.Where(z => z.OrgGroupID == member.Group2).FirstOrDefault();
                    Organisational_Group group3 = db.Organisational_Group.Where(z => z.OrgGroupID == member.Group3).FirstOrDefault();
                    //create new dynamic object 
                    dynamic dynamicMember = new ExpandoObject();
                    dynamicMember.ServeRequestID = member.ServeRequestID;
                    dynamicMember.PersonName = member.Person.Name;
                    dynamicMember.PersonID = member.Person.PersonID;
                    dynamicMember.PersonSurname = member.Person.Surname;
                    dynamicMember.PersonNumber = member.Person.Number;
                    dynamicMember.PersonEmail = member.Person.Email;
                    dynamicMember.FollowUpDate = member.FollowUpDate;
                    dynamicMember.ZonePastor = member.ZonePastor;
                    dynamicMember.Homecell = member.Homecell;
                    dynamicMember.SpiritualGiftTestSession = member.SpiritualGiftTestSession;
                    dynamicMember.HighestSpiritualGifts = member.HighestSpiritualGifts;
                    dynamicMember.Group1 = group1.Description;
                    dynamicMember.ServeRequestID = member.ServeRequestID;
                    dynamicMember.Group2 = group2.Description;
                    dynamicMember.Group3 = group3.Description;
                    dynamicMember.Comment = member.Comment;
                    dynamicMember.FollowedUp = member.FollowUpStatus;
                    dynamicMember.NoAnswer = member.NoAnswer;// add to dynamic list

                    if (dynamicMember.Comment == null)
                    {
                        dynamicMember.Comment = "None";
                    }
                    else
                    {
                        dynamicMember.Comment = member.Comment;
                    }

                    if (member.FollowUpStatus == true && member.NoAnswer == false || member.FollowUpStatus == false && member.NoAnswer == false)
                    {
                        //add to dynamic list 
                        dynamicMemberServe.Add(dynamicMember);
                    }
                    else if (member.FollowUpStatus == false && member.NoAnswer == true)
                    {
                        // add to dynamic list
                        dynamicMemberServeNoAnswer.Add(dynamicMember);
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }

            //return concatenated so that follow-ups are in the correct order
            return dynamicMemberServe.Concat(dynamicMemberServeNoAnswer).ToList();
        }

        [System.Web.Http.Route("api/FollowUp/getMemberServeProgress")] //create route for api
        [System.Web.Mvc.HttpGet]
        public dynamic getMemberServeProgress() //get JSON parameter
        {
            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days);
            DateTime end = start.AddDays(6);

            //create new dynamic object for calculations
            dynamic FollowUpProgress = new ExpandoObject();

            try
            {
                //Get list of data depending on remaining and completed
                List<Members_Serve_Follow_Up> RemaininFollowUps = db.Members_Serve_Follow_Up.Where(x => x.FollowUpStatus == false && x.NoAnswer == true && x.FollowUpDate > start && x.FollowUpDate < end || x.FollowUpStatus == false && x.FollowUpDate > start && x.FollowUpDate < end).ToList();
                List<Members_Serve_Follow_Up> CompletedFollowUps = db.Members_Serve_Follow_Up.Where(x => x.FollowUpStatus == true && x.FollowUpDate > start && x.FollowUpDate < end).ToList();

                //count databse records based on follow-up status
                int remaining = RemaininFollowUps.Count;
                int completed = CompletedFollowUps.Count;


                //Add list totals and perfom remaining calculations
                FollowUpProgress.Remaining = remaining;
                FollowUpProgress.Completed = completed;

            }
            catch (Exception e)
            {
                return e;
            }

            return FollowUpProgress; //return progress to angular
        }

        //Follow-up  Completed
        [System.Web.Http.Route("api/FollowUp/UpdateMembersServeFollowUp")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateMembersServeFollowUp([FromBody] dynamic MemberServeUpdate) //get JSON parameter
        {
            //validate that there is no null values
            if (MemberServeUpdate != null)
            {
                // configure proxy to eliminate overload of memory
                db.Configuration.ProxyCreationEnabled = false;

                try
                {
                    //retrieve database record to update follow-up status
                    int id = MemberServeUpdate.MemberID.ServeRequestID;
                    Members_Serve_Follow_Up MemberServeFollowUpUpdate = db.Members_Serve_Follow_Up.Where(z => z.ServeRequestID == id).FirstOrDefault(); //retrieve record to update data

                    //update boolean values
                    MemberServeFollowUpUpdate.FollowUpStatus = true;
                    MemberServeFollowUpUpdate.NoAnswer = false;

                    //Add to Audit trail entity
                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = MemberServeUpdate.PersonID;
                    auditLog.EventDescription = "Completed Follow-up on Members wanting to serve with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges(); //save changes in database
                }
                catch (Exception)
                {
                    return null;
                }

                //return the remaining members wanting to serve to angular
                return getMembersWantingToServe();
            }
            else
            {
                return null;
            }
        }

        //Follow-up no Answer
        [System.Web.Http.Route("api/FollowUp/UpdateMembersServeNoAnswer")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateMembersServeNoAnswer([FromBody] dynamic MemberServeUpdate) //get JSON parameter
        {
            //validate that there is no null values
            if (MemberServeUpdate != null)
            {
                // configure proxy to eliminate overload of memory
                db.Configuration.ProxyCreationEnabled = false;

                try
                {
                    //retrieve database record to update follow-up status
                    int id = MemberServeUpdate.MemberID.ServeRequestID;
                    Members_Serve_Follow_Up MemberServeFollowUpUpdate = db.Members_Serve_Follow_Up.Where(z => z.ServeRequestID == id).FirstOrDefault(); //retrieve record to update data

                    //update boolean values
                    MemberServeFollowUpUpdate.FollowUpStatus = false;
                    MemberServeFollowUpUpdate.NoAnswer = true;

                    //Add to Audit trail entity
                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = MemberServeUpdate.PersonID;
                    auditLog.EventDescription = "No Answer for Follow-up on Members wanting to serve with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges(); //save changes in database 
                }
                catch (Exception)
                {
                    return null;
                }

                return getMembersWantingToServe();
            }
            else
            {
                return null;
            }
        }

        ////4.5 Follow up on discipleship - Annie
        ////Read All Members who do 
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [System.Web.Http.Route("api/FollowUp/getPersonDiscInfo")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getPersonDiscInfo()
        {
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory


            //create list of members that have already been followed up on in the current week 
            var dateCriteria = DateTime.Now.Date.AddDays(-7);
            List<Person_Discipleship> completeFollowUps = db.Person_Discipleship.OrderByDescending(x => x.FollowUpDate)
                .Where(o => o.FollowUpDate <= dateCriteria || o.FollowedUp == true).ToList();


            int DiscipleshipCount = db.Discipleships.Count();



            //Create a list of people who have not completed all the discipleships
            List<Person> needDisc = db.People.Include("Person_Discipleship").Where(x => x.Person_Discipleship.Count < DiscipleshipCount).ToList();

            List<Person> needsFollowUp = new List<Person>();
            foreach (Person p in needDisc)
            {
                //If the person that does not have all 5 has not been called yet this week add to list.
                if (completeFollowUps.Any(x => x.PersonID == p.PersonID))
                {

                }
                else
                {
                    needsFollowUp.Add(p);
                }

            }


            return getMembersDiscipleshipInformation(needsFollowUp); // return called method

        }

        public List<dynamic> getMembersDiscipleshipInformation(List<Person> incompleteDisListc)
        {
            List<dynamic> toPassList = new List<dynamic>();

            dynamic toPass = new ExpandoObject();
            List<dynamic> dynamicMemberDisc = new List<dynamic>();

            try
            {
                //foreach method to retrieve data from database and add it to list to return

                foreach (var member in incompleteDisListc)
                {
                    //create new dynamic object 
                    dynamic dynamicMember = new ExpandoObject();
                    dynamicMember.PersonID = member.PersonID;
                    dynamicMember.PersonName = member.Name;
                    dynamicMember.PersonSurname = member.Surname;
                    dynamicMember.PersonNumber = member.Number;
                    dynamicMember.Discipleships = getPersonsOutstandingDisc(member.PersonID);


                    dynamicMemberDisc.Add(dynamicMember); // add to dynamic list
                }
                toPass.MemberList = dynamicMemberDisc;

                //Calculate progress statistics
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

                //create new dynamic object for calculations
                dynamic FollowUpProgress = new ExpandoObject();

                //Get list of data depending on remaining and completed
                // List<Person_Discipleship> TotalFollowUps = db.Person_Discipleship.Where(x => x.FollowedUp == false ).ToList();
                List<Person_Discipleship> CompletedFollowUps = db.Person_Discipleship.Where(x => x.FollowedUp == true && x.FollowUpDate == DateTime.Today).ToList();
                int TotalFollowUps = incompleteDisListc.Count;



                //Add list totals and perfom remaining calculations
                FollowUpProgress.Total = TotalFollowUps;

                if (TotalFollowUps != 0)
                {
                    FollowUpProgress.Remaining = TotalFollowUps - CompletedFollowUps.Count;
                    FollowUpProgress.Completed = CompletedFollowUps.Count;
                    FollowUpProgress.PersentageComplete = CompletedFollowUps.Count / TotalFollowUps * 100;

                }

                //Add calculations and numbers of prgress to the lists
                toPass.FollowUpPorgress = FollowUpProgress;
                toPassList.Add(toPass);
            }
            catch (Exception e)
            {

            }


            return toPassList; //return the list
        }

        [System.Web.Http.Route("api/FollowUp/getDiscProgress")] //create route for api
        [System.Web.Mvc.HttpGet]
        public dynamic getDiscProgress() //get JSON parameter
        {
            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days);
            DateTime end = start.AddDays(6);

            //create new dynamic object for calculations
            dynamic FollowUpProgress = new ExpandoObject();

            try
            {
                int DiscipleshipCount = db.Discipleships.Count();

                var dateCriteria = DateTime.Now.Date.AddDays(-7);
                //Get list of data depending on remaining and completed
                List<Person_Discipleship> CompletedFollowUps = db.Person_Discipleship.OrderByDescending(x => x.FollowUpDate)
                .Where(o => o.FollowUpDate <= dateCriteria || o.FollowedUp == true).ToList();


                List<Person> needDisc = db.People.Include("Person_Discipleship").Where(x => x.Person_Discipleship.Count < DiscipleshipCount).ToList();

             
                List<Person> RemaininFollowUps = new List<Person>();
                foreach (Person p in needDisc)
                {
                    //If the person that does not have all 5 has not been called yet this week add to list.
                    if (CompletedFollowUps.Any(x => x.PersonID == p.PersonID))
                    {

                    }
                    else
                    {
                        RemaininFollowUps.Add(p);
                    }

                }

                



                //count databse records based on follow-up status
                int remaining = RemaininFollowUps.Count;
                int completed = CompletedFollowUps.Count;


                //Add list totals and perfom remaining calculations
                FollowUpProgress.Remaining = remaining;
                FollowUpProgress.Completed = completed;

            }
            catch (Exception e)
            {
                return e;
            }

            return FollowUpProgress; //return progress to angular
        }

        //Follow-up  Completed
        [System.Web.Http.Route("api/FollowUp/UpdateDiscipleshipFollowUp")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateDiscipleshipFollowUp([FromBody] dynamic FollowupUpdate) //get JSON parameter
        {
            //validate that there is no null values
            if (FollowupUpdate != null)
            {

                int id = FollowupUpdate.FollowupData.Person0;
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

                Person thisPerson = db.People.Where(z => z.PersonID == id).FirstOrDefault(); //retrieve record to update data

                try
                {
                    Person_Discipleship pD = new Person_Discipleship();

                  

                 

                    foreach (var p in FollowupUpdate.FollowupData.Person_Discipleship.Discipleship)
                    {
                        pD.PersonID = thisPerson.PersonID;
                        pD.DiscipleshipID = p.DiscipleshipID;
                        pD.FollowUpDate = DateTime.Today;
                        pD.FollowedUp = true;

                    }
                    
                  

                    thisPerson.Person_Discipleship.Add(pD); //Add new completed dicipleship to members Person_Disc table


                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = FollowupUpdate.PersonID;
                    auditLog.EventDescription = "Completed Follow-up on Discipleship on Person with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges(); //save changes
                }
                catch (Exception e)
                {
                    if (FollowupUpdate.FollowupData.Person_Discipleship != null)
                    {
                        Person_Discipleship pD = new Person_Discipleship();

                            pD.PersonID = thisPerson.PersonID;
                            pD.DiscipleshipID = FollowupUpdate.FollowupData.Person_Discipleship;
                            pD.FollowUpDate = DateTime.Today;
                            pD.FollowedUp = true;

                        thisPerson.Person_Discipleship.Add(pD); //Add new completed dicipleship to members Person_Disc table


                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = FollowupUpdate.PersonID;
                        auditLog.EventDescription = "Completed Follow-up on Discipleship on Person with ID: " + id;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);

                        db.SaveChanges();

                    }
                    else
                    {

                    }
                }


                return getPersonDiscInfo();
            }
            else
            {
                return null;
            }
        }


        public List<dynamic> getPersonsOutstandingDisc(int PersonID) //get JSON parameter
        {
            List<OutstandingDiscipleship> pD = db.OutstandingDiscipleships.Where(x => x.personid == PersonID).ToList();

            List<dynamic> outstanding = new List<dynamic>();
            try
            {
                foreach (var o in pD)
                {
                    //create new dynamic object 
                    dynamic dynamicOutstanding = new ExpandoObject();

                    dynamicOutstanding.PersonID = PersonID;
                    dynamicOutstanding.Discipleship = db.Discipleships.Where(d => d.DiscipleshipID == o.discipleshipid);


                    outstanding.Add(dynamicOutstanding); // add to dynamic list
                }
            }
            catch (Exception e)
            {

            }


            return outstanding;
        }

        //4.7 Follow-up Member - Marno
        //returns members and then must allow pop/follow up
        [System.Web.Http.Route("api/FollowUp/GetMembers")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> GetMembers()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            db.Configuration.ProxyCreationEnabled = false;
            return GetMemberList(db.People.ToList());
        }

        private List<dynamic> GetMemberList(List<Person> forClient)
        {
            List<dynamic> dynamicMembers = new List<dynamic>();

            try
            {
                foreach (Person p in db.People)
                {
                    int pID = p.PersonID;
                    if(!db.Member_Follow_Up.Any(x=> x.PersonID == pID))
                    {

                    }
                    else
                    {
                        dynamic NewMember = new ExpandoObject();
                        NewMember.PersonID = p.PersonID;
                        NewMember.FollowUpDate = DateTime.Now.Date.AddDays(-7);
                        NewMember.FollowUpStatus = false;
                        NewMember.Name = p.Name;
                        NewMember.Surname = p.Surname;
                        NewMember.Number = p.Number;
                        dynamicMembers.Add(NewMember);
                    }
                }
               
            }
            catch (Exception e)
            {

            }

            return dynamicMembers;
        }

        [System.Web.Http.Route("api/FollowUp/PopMember")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> PopMembers([FromBody] Person currentP)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            Person Change = db.People.Where(x => x.PersonID == currentP.PersonID).FirstOrDefault();
            try
            {
                db.People.Remove(Change);
                db.SaveChanges();
                db.People.Add(Change);
                db.SaveChanges();
            }
            catch (Exception e)
            {

            }


            return GetMembers();
        }

        //4.2 Follow-Up on New Members Orientation - Izaan

        //Read all members who attended NMO
        [System.Web.Http.Route("api/FollowUp/getNMO")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getNMO()
        {
            //Connecting to database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload memory
            db.Configuration.ProxyCreationEnabled = false;

            ////Get the current weeks follow-ups
            //DayOfWeek day = DateTime.Now.DayOfWeek;
            //int days = day - DayOfWeek.Monday;

            ////DateTime range to check condition
            //DateTime start = DateTime.Now.AddDays(-days);
            //DateTime end = start.AddDays(6);

            //Return the current week's NMO follow-ups
            return getNMOInformation(db.NMO_Follow_Up.Include("Person").Where(z => z.FollowUpStatus == false).ToList()); //Return called method
        }

        public List<dynamic> getNMOInformation(List<NMO_Follow_Up> NMOTable)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload memory
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic list
            List<dynamic> dynamicNMOAttendList = new List<dynamic>();
            List<dynamic> dynamicNMOListNoAnswer = new List<dynamic>();

            try
            {
                //foreach method to retrieve data from databse and add it to list to return
                foreach (var member in NMOTable)
                {
                    Person memberNMO = db.People.Where(z => z.PersonID == member.PersonID).FirstOrDefault();

                    //Create dynamic object
                    dynamic dynamicNMOMember = new ExpandoObject();
                    dynamicNMOMember.ID = member.ID;
                    dynamicNMOMember.PersonID = member.PersonID;
                    dynamicNMOMember.Name = memberNMO.Name;
                    dynamicNMOMember.Surname = memberNMO.Surname;
                    dynamicNMOMember.Number = memberNMO.Number;
                    dynamicNMOMember.Email = memberNMO.Email;
                    dynamicNMOMember.FollowUpStatus = member.FollowUpStatus;
                    dynamicNMOMember.NoAnswer = member.NoAnswer;

                    if (member.FollowUpStatus == true && member.NoAnswer == false || member.FollowUpStatus == false && member.NoAnswer == false)
                    {
                        //Add to dynamic list
                        dynamicNMOAttendList.Add(dynamicNMOMember);
                    }
                    else if (member.FollowUpStatus == false && member.NoAnswer == false)
                    {
                        //Add to dynamic list
                        dynamicNMOListNoAnswer.Add(dynamicNMOMember);
                    }

                }

            }
            catch (Exception)
            {
                return null;
            }

            return dynamicNMOAttendList.Concat(dynamicNMOListNoAnswer).ToList(); //Return list

        }

        [System.Web.Http.Route("api/FollowUp/getNMOProgress")] //create route for api
        [System.Web.Mvc.HttpGet]
        public dynamic getNMOProgress()
        {
            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days);
            DateTime end = start.AddDays(6);

            //create new dynamic object for calculations
            dynamic FollowUpProgress = new ExpandoObject();

            try
            {
                //Get list of data depending on remaining and completed
                List<NMO_Follow_Up> RemaininFollowUps = db.NMO_Follow_Up.Where(x => x.FollowUpStatus == false && x.NoAnswer == true || x.FollowUpStatus == false).ToList();
                List<NMO_Follow_Up> CompletedFollowUps = db.NMO_Follow_Up.Where(x => x.FollowUpStatus == true).ToList();

                //count databse records based on follow-up status
                int remaining = RemaininFollowUps.Count;
                int completed = CompletedFollowUps.Count;


                //Add list totals and perfom remaining calculations
                FollowUpProgress.Remaining = remaining;
                FollowUpProgress.Completed = completed;

            }
            catch (Exception e)
            {
                return e;
            }

            return FollowUpProgress; //return progress to angular
        }

        //Follow-up Completed
        [System.Web.Http.Route("api/FollowUp/UpdateNMOFollowUP")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateNMOFollowUP([FromBody] dynamic NMOUpdate)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Validate that there is no null values
            if (NMOUpdate != null)
            {
                try
                {
                    int id = NMOUpdate.NMOID.ID;

                    //Get the current record to update the follow-up status
                    NMO_Follow_Up NMOAttendFollowUpUpdate = db.NMO_Follow_Up.Where(z => z.ID == id).FirstOrDefault();

                    //Update bopolean values
                    NMOAttendFollowUpUpdate.FollowUpStatus = true;
                    NMOAttendFollowUpUpdate.NoAnswer = false;

                    //Add to Audit trail entity
                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = NMOUpdate.PersonID;
                    auditLog.EventDescription = "Completed Follow-up on NMO with ID: " + NMOUpdate.id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();

                    //return all salvations for the week after follow-up is completed
                    return getNMO();
                }
                catch (Exception)
                {
                    return null;
                }

            }
            else
            {
                return null;
            }
        }

        //Follow-up no answer
        [System.Web.Http.Route("api/FollowUp/UpdateNMOFollowUPNoAnswer")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateNMOFollowUPNoAnswer([FromBody] dynamic NMOUpdate)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Validate that there is no null values
            if (NMOUpdate != null)
            {
                try
                {
                    //Get the current record to update the follow-up status
                    int NMOID = NMOUpdate.NMOID.ID;
                    NMO_Follow_Up NMOAttendFollowUpUpdate = db.NMO_Follow_Up.Where(z => z.ID == NMOID).FirstOrDefault();

                    //update boolean values
                    NMOAttendFollowUpUpdate.FollowUpStatus = false;
                    NMOAttendFollowUpUpdate.NoAnswer = true;

                    //Add to Audit trail entity
                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = NMOUpdate.PersonID;
                    auditLog.EventDescription = "No Answer for Follow-up on NMO with ID: " + NMOUpdate.NMOID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return null;
                }

                //return all NMO records for the week after follow-up is completed
                return getNMO();
            }
            else
            {
                return null;
            }
        }

        //4.4 Follow-Up on Leaders - Izaan

        //Read all leaders
        [System.Web.Http.Route("api/FollowUp/getLeaders")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getLeaders()
        {
            //Connecting to database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload memory
            db.Configuration.ProxyCreationEnabled = false;

            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days-1);
            DateTime end = start.AddDays(6);

            List<Leader_Follow_Up> PrevWeek = db.Leader_Follow_Up.Include("Person").Where(z => z.FollowUpDate < start).ToList();

            foreach(Leader_Follow_Up leader in PrevWeek)
            {
                
                leader.NoAnswer = false;
                leader.FollowUpStatus = false;
                leader.FollowUpDate = DateTime.Today;
                db.SaveChanges();
            }
            return LeaderInformation(db.Leader_Follow_Up.Include("Person").Where(z=> z.FollowUpDate > start && z.FollowUpDate < end).ToList()); //Return called method
        }

        public List<dynamic> LeaderInformation(List<Leader_Follow_Up> LeaderList)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload memory
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic list
            List<dynamic> dynamicLeaders = new List<dynamic>();
            List<dynamic> dynamicLeaderListNoAnswer = new List<dynamic>();

            try
            {
                //foreach method to retrieve data from databse and add it to list to return
                foreach (var leader in LeaderList)
                {
                    //Person memberLeader = db.People.Where(z => z.PersonID == leader.PersonID).FirstOrDefault();

                    //Create dynamic object
                    dynamic dynamicLeader = new ExpandoObject();
                    dynamicLeader.ID = leader.ID;
                    dynamicLeader.PersonID = leader.PersonID;
                    if(leader.NoAnswer == true)
                    {
                        dynamicLeader.Surname = leader.Person.Surname + " (No Answer)";
                    }
                    else
                    {
                        dynamicLeader.Surname = leader.Person.Surname;
                    }
                    dynamicLeader.Name = leader.Person.Name;
                    dynamicLeader.Number = leader.Person.Number;
                    dynamicLeader.Email = leader.Person.Email;
                    dynamicLeader.FollowUpDate = leader.FollowUpDate;
                    dynamicLeader.FollowUpStatus = leader.FollowUpStatus;
                    dynamicLeader.NoAnswer = leader.NoAnswer;


                    if (leader.FollowUpStatus == false && leader.NoAnswer == false)
                    {
                        //Add to dynamic list
                        dynamicLeaders.Add(dynamicLeader);
                    }
                    else if (leader.FollowUpStatus == true && leader.NoAnswer == false || leader.FollowUpStatus == false && leader.NoAnswer == true)
                    {
                        //Add to dynamic list
                        dynamicLeaderListNoAnswer.Add(dynamicLeader);
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }

            return dynamicLeaders.Concat(dynamicLeaderListNoAnswer).ToList(); //Return list
        }

        //Get the progress for the leader follow-up
        [System.Web.Http.Route("api/FollowUp/getLeaderProgress")]
        [System.Web.Mvc.HttpGet]
        public dynamic getLeaderProgress()
        {
            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days);
            DateTime end = start.AddDays(6);

            //create new dynamic object for calculations
            dynamic FollowUpProgress = new ExpandoObject();

            try
            {
                //Get list of data depending on remaining and completed
                List<Leader_Follow_Up> RemaininFollowUps = db.Leader_Follow_Up.Where(x => x.FollowUpStatus == false && x.NoAnswer == true && x.FollowUpDate > start && x.FollowUpDate < end || x.FollowUpStatus == false && x.FollowUpDate > start && x.FollowUpDate < end).ToList();
                List<Leader_Follow_Up> CompletedFollowUps = db.Leader_Follow_Up.Where(x => x.FollowUpStatus == true && x.FollowUpDate > start && x.FollowUpDate < end).ToList();

                //count databse records based on follow-up status
                int remaining = RemaininFollowUps.Count;
                int completed = CompletedFollowUps.Count;


                //Add list totals and perfom remaining calculations
                FollowUpProgress.Remaining = remaining;
                FollowUpProgress.Completed = completed;
            }
            catch (Exception e)
            {
                return e;
            }

            return FollowUpProgress;
        }

        //Follow-up Completed
        [System.Web.Http.Route("api/FollowUp/UpdateLeaderFollowUP")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateLeaderFollowUP([FromBody] dynamic LeaderUpdate)
        {
            //Database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Validate that there is no null values
            if (LeaderUpdate != null)
            {
                try
                {
                    //Retrieve database record
                    int leaderID = LeaderUpdate.LeaderID.ID;
                    Leader_Follow_Up LeaderFollowUpUpdate = db.Leader_Follow_Up.Where(z => z.ID == leaderID).FirstOrDefault();

                    //update boolean values
                    LeaderFollowUpUpdate.FollowUpStatus = true;
                    LeaderFollowUpUpdate.NoAnswer = false;

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = LeaderUpdate.PersonID;
                    auditLog.EventDescription = "Completed Follow-up on Leader with ID: " + leaderID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }

                return getLeaders();
            }
            else
            {
                return null;
            }
        }

        //Follow-up no answer
        [System.Web.Http.Route("api/FollowUp/UpdateLeaderFollowUPNoAnswer")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateLeaderFollowUPNoAnswer([FromBody] dynamic LeaderUpdate)
        {
            //Database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Validate that there is no null values
            if (LeaderUpdate != null)
            {


                try
                {
                    //Retrieve record from database
                    int leaderID = LeaderUpdate.LeaderID.ID;
                    Leader_Follow_Up LeaderFollowUpUpdate = db.Leader_Follow_Up.Where(z => z.ID == leaderID).FirstOrDefault();

                    //update boolean values
                    LeaderFollowUpUpdate.FollowUpStatus = false;
                    LeaderFollowUpUpdate.NoAnswer = true;

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = LeaderUpdate.PersonID;
                    auditLog.EventDescription = "No answer for Follow-up on Leader with ID: " + leaderID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }

                return getLeaders();
            }
            else
            {
                return null;
            }
        }

        // 4.3 Follow-Up on Overseer - Lali
        //----------------OVERSEER FOLLOW-UP----------

        //Read All Overseers information
        //Read all leaders
        [System.Web.Http.Route("api/FollowUp/getOverseers")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getOverseers()
        {
            //Connecting to database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload memory
            db.Configuration.ProxyCreationEnabled = false;

            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days);
            DateTime end = start.AddDays(6);

            List<Overseer_Follow_Up> PrevWeek = db.Overseer_Follow_Up.Include("Person").Where(z => z.FollowUpDate < start).ToList();

            foreach (Overseer_Follow_Up overseer in PrevWeek)
            {

                overseer.NoAnswer = false;
                overseer.FollowUpStatus = false;
                overseer.FollowUpDate = DateTime.Today;
                db.SaveChanges();
            }
            return OverseerInformation(db.Overseer_Follow_Up.Include("Person").Where(z => z.FollowUpDate > start && z.FollowUpDate < end).ToList()); //Return called method
        }

        public List<dynamic> OverseerInformation(List<Overseer_Follow_Up> OverseerList)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload memory
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic list
            List<dynamic> dynamicOverseers = new List<dynamic>();
            List<dynamic> dynamicOverseerListNoAnswer = new List<dynamic>();

            try
            {
                //foreach method to retrieve data from databse and add it to list to return
                foreach (var overseer in OverseerList)
                {
                    //Person memberLeader = db.People.Where(z => z.PersonID == leader.PersonID).FirstOrDefault();

                    //Create dynamic object
                    dynamic dynamicOV = new ExpandoObject();
                    dynamicOV.ID = overseer.OverseerFollowUpID;
                    dynamicOV.PersonID = overseer.PersonID;
                    if (overseer.NoAnswer == true)
                    {
                        dynamicOV.Surname = overseer.Person.Surname + " (No Answer)";
                    }
                    else
                    {
                        dynamicOV.Surname = overseer.Person.Surname;
                    }
                    dynamicOV.Name = overseer.Person.Name;
                    dynamicOV.Number = overseer.Person.Number;
                    dynamicOV.Email = overseer.Person.Email;
                    dynamicOV.FollowUpDate = overseer.FollowUpDate;
                    dynamicOV.FollowUpStatus = overseer.FollowUpStatus;
                    dynamicOV.NoAnswer = overseer.NoAnswer;


                    if (overseer.FollowUpStatus == false && overseer.NoAnswer == false)
                    {
                        //Add to dynamic list
                        dynamicOverseers.Add(dynamicOV);
                    }
                    else if (overseer.FollowUpStatus == true && overseer.NoAnswer == false || overseer.FollowUpStatus == false && overseer.NoAnswer == true)
                    {
                        //Add to dynamic list
                        dynamicOverseerListNoAnswer.Add(dynamicOV);
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }

            return dynamicOverseers.Concat(dynamicOverseerListNoAnswer).ToList(); //Return list
        }

        //Get the progress for the leader follow-up
        [System.Web.Http.Route("api/FollowUp/getOverseerProgress")]
        [System.Web.Mvc.HttpGet]
        public dynamic getOverseerProgress()
        {
            //get the current week
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;

            //DateTime range to check condition
            DateTime start = DateTime.Now.AddDays(-days);
            DateTime end = start.AddDays(6);

            //create new dynamic object for calculations
            dynamic FollowUpProgress = new ExpandoObject();

            try
            {
                //Get list of data depending on remaining and completed
                List<Overseer_Follow_Up> RemaininFollowUps = db.Overseer_Follow_Up.Where(x => x.FollowUpStatus == false && x.NoAnswer == true && x.FollowUpDate > start && x.FollowUpDate < end || x.FollowUpStatus == false && x.FollowUpDate > start && x.FollowUpDate < end).ToList();
                List<Overseer_Follow_Up> CompletedFollowUps = db.Overseer_Follow_Up.Where(x => x.FollowUpStatus == true && x.FollowUpDate > start && x.FollowUpDate < end).ToList();

                //count databse records based on follow-up status
                int remaining = RemaininFollowUps.Count;
                int completed = CompletedFollowUps.Count;


                //Add list totals and perfom remaining calculations
                FollowUpProgress.Remaining = remaining;
                FollowUpProgress.Completed = completed;
            }
            catch (Exception e)
            {
                return e;
            }

            return FollowUpProgress;
        }

        //Follow-up Completed
        [System.Web.Http.Route("api/FollowUp/UpdateOverseerFollowUP")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateOverseerFollowUP([FromBody] dynamic OverseerUpdate)
        {
            //Database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Validate that there is no null values
            if (OverseerUpdate != null)
            {
                try
                {
                    //Retrieve database record
                    int overseerID = OverseerUpdate.OverseerID.ID;
                    Overseer_Follow_Up OverseerFollowUpUpdate = db.Overseer_Follow_Up.Where(z => z.OverseerFollowUpID == overseerID).FirstOrDefault();

                    //update boolean values
                    OverseerFollowUpUpdate.FollowUpStatus = true;
                    OverseerFollowUpUpdate.NoAnswer = false;

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = OverseerUpdate.PersonID;
                    auditLog.EventDescription = "Completed Follow-up on Leader with ID: " + overseerID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }

                return getOverseers();
            }
            else
            {
                return null;
            }
        }

        //Follow-up no answer
        [System.Web.Http.Route("api/FollowUp/UpdateOverseerFollowUPNoAnswer")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateOverseerFollowUPNoAnswer([FromBody] dynamic OverseerUpdate)
        {
            //Database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Validate that there is no null values
            if (OverseerUpdate != null)
            {
                try
                {
                    //Retrieve record from database
                    int overseerID = OverseerUpdate.OverseerID.ID;
                    Overseer_Follow_Up OverseerFollowUpUpdate = db.Overseer_Follow_Up.Where(z => z.OverseerFollowUpID == overseerID).FirstOrDefault();

                    //update boolean values
                    OverseerFollowUpUpdate.FollowUpStatus = false;
                    OverseerFollowUpUpdate.NoAnswer = true;

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = OverseerUpdate.PersonID;
                    auditLog.EventDescription = "No answer for Follow-up on Leader with ID: " + overseerID;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();
                }
                catch (Exception)
                {
                    return null;
                }

                return getOverseers();
            }
            else
            {
                return null;
            }
        }

    }

}

