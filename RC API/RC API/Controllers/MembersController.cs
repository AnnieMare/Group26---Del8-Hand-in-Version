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
using System.IO;
using System.Data.Entity;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using WebGrease.Configuration;


namespace RC_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MembersController : ApiController
    {
        static string message = "";
        static string Emailsubject = "";
        static string toMember = "";
        static string toName = "";

        //*********Members START************//

        //Izaan

        //Retrieve all Members from person table to view the Members and to approve the Members
        [System.Web.Http.Route("api/Members/getAllMembers")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllMembers()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            // !!--User Management--!!
            //string sessionId = Request.Headers.Authorization.ToString();
            //var user = db.Where(o => o.SessionID == sessionId).FirstOrDefault();
            //if(user != null)

            try
            {
                return getAllMembersReturnList(db.People.Where(a => a.Activation_Status_ID == 1).ToList());
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }

        public List<dynamic> getAllMembersReturnList(List<Person> allPeople)
        {
            //Database conncection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicPeople = new List<dynamic>();

            try
            {

                foreach (Person person in allPeople)
                {
                    dynamic dynamicPerson = new ExpandoObject();
                    dynamicPerson.PersonID = person.PersonID;
                    dynamicPerson.Name = person.Name;
                    dynamicPerson.Surname = person.Surname;
                    dynamicPerson.DateOfBirth = person.DateOfBirth;
                    dynamicPerson.Number = person.Number;
                    dynamicPerson.Email = person.Email;
                    dynamicPerson.Address = person.Address;
                    dynamicPerson.Activation_Status = person.Activation_Status_ID;

                    dynamicPeople.Add(dynamicPerson);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicPeople;
        }

        //Function to get all the members in a structure

        //PersonID hard coded at the momemt. Need to send the logged in PersonID as parameter to find the people beneath them.
        //Works on same principle as myChildren in KidsChurch Controller.

        [System.Web.Http.Route("api/Members/MyMembers")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> MyMembers(Person person)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of memory
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> Members = new List<dynamic>();

            if (person == null)
            {
                return null;
            }
            else
            {
                try
                {
                    List<Person> myMembers = db.People.Where(z => z.AssignLeader == person.PersonID).ToList();

                    foreach (var m in myMembers)
                    {
                        //Dynamic object
                        dynamic member = new ExpandoObject();
                        member.PersonID = m.PersonID;
                        member.Name = m.Name;
                        member.Surname = m.Surname;
                        member.Number = m.Number;
                        member.Email = m.Email;

                        Members.Add(member);
                    }
                }
                catch (Exception e)
                {

                }
            }

            return Members;
        }

        //API endpoint to retrieve all of the members who has not yet been approved
        [System.Web.Http.Route("api/Members/getAllUnapprovedMembers")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllUnapprovedMembers()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            // !!--User Management--!!
            //string sessionId = Request.Headers.Authorization.ToString();
            //var user = db.Where(o => o.SessionID == sessionId).FirstOrDefault();
            //if(user != null)

            try
            {
                return getAllUnapprovedMembersReturnList(db.People.Where(a => a.Activation_Status_ID == 4).ToList());
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }

        public List<dynamic> getAllUnapprovedMembersReturnList(List<Person> allPeople)
        {
            //Database conncection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Condigure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicPeople = new List<dynamic>();
            List<dynamic> dynamicPeopleUnapproved = new List<dynamic>();

            try
            {
                //Loop through the list of members with the activation status of not approved and retrieve the person's information
                foreach (Person person in allPeople)
                {
                    dynamic dynamicPerson = new ExpandoObject();
                    dynamicPerson.PersonID = person.PersonID;
                    dynamicPerson.Name = person.Name;
                    dynamicPerson.Surname = person.Surname;
                    dynamicPerson.DateOfBirth = person.DateOfBirth;
                    dynamicPerson.Number = person.Number;
                    dynamicPerson.Email = person.Email;
                    dynamicPerson.Address = person.Address;
                    dynamicPerson.Activation_Status = person.Activation_Status_ID;

                    if (person.Activation_Status_ID == 1)
                    {
                        dynamicPeople.Add(dynamicPerson);
                    }
                    else if (person.Activation_Status_ID == 4)
                    {
                        dynamicPeopleUnapproved.Add(dynamicPerson);
                    }

                }
            }
            catch (Exception)

            {
                return null;
            }

            return dynamicPeople.Concat(dynamicPeopleUnapproved).ToList();
        }

        [System.Web.Http.Route("api/Members/getApprovalProgress")]
        [System.Web.Mvc.HttpGet]
        public dynamic getApprovalProgress()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic object
            dynamic ApprovalProgress = new ExpandoObject();

            try
            {
                List<Person> RemainingApprovals = db.People.Where(z => z.Activation_Status_ID == 4).ToList();
                List<Person> CompletedApprovals = db.People.Where(z => z.Activation_Status_ID == 1).ToList();

                //Count database records
                int remaining = RemainingApprovals.Count;
                int completed = CompletedApprovals.Count;

                //Add list and perform remaining calculations
                ApprovalProgress.Remaining = remaining;
                ApprovalProgress.Completed = completed;

            }
            catch (Exception e)
            {
                return e;
            }

            return ApprovalProgress;
        }

        [System.Web.Http.Route("api/Members/updateMemberApproval")]
        [System.Web.Mvc.HttpPost]

        public List<dynamic> updateMemberApproval([FromBody] dynamic currentPerson)

        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Person thisPerson = db.People.Where(z => z.PersonID == currentPerson.PersonID).FirstOrDefault();

            //Find the person current activation status id en updated the activation status id to approved.

            if (currentPerson != null)
            {
                try
                {
                    int id = currentPerson.MemberID.PersonID;

                    Person psn = db.People.Where(z => z.PersonID == id).FirstOrDefault();
                    //psn = db.People.Find(currentPerson.PersonID);
                    if (psn.Activation_Status_ID == 4)
                    {
                        psn.Activation_Status_ID = 1;

                        db.SaveChanges();

                        //string n = currentPerson.Name;
                        //string s = currentPerson.Surname;
                        //DateTime dob = currentPerson.DateOfBirth;
                        //string num = currentPerson.Number;
                        //string email = currentPerson.Email;


                        //Person newNMO = db.People.Where(z => z.Name == n && z.Surname == s && z.DateOfBirth == dob && z.Number == num && z.Email == email).FirstOrDefault();

                        NMO_Follow_Up dynamicNMOFollowUP = new NMO_Follow_Up();
                        //dynamicNMOFollowUP.PersonID = db.People.OrderByDescending(z => z.PersonID).Select(z => z.PersonID).FirstOrDefault();
                        dynamicNMOFollowUP.PersonID = id;
                        dynamicNMOFollowUP.FollowUpStatus = false;
                        dynamicNMOFollowUP.NoAnswer = false;

                        db.NMO_Follow_Up.Add(dynamicNMOFollowUP);

                        db.SaveChanges();

                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = currentPerson.PersonID;
                        auditLog.EventDescription = "Approved Member with ID: " + id;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);

                        db.SaveChanges();

                        message = "You have been approved. You may now Log into Revive Communications using your username and password.";
                        Emailsubject = "Member Approval at Christian Revival Church (CRC) Main";
                        toMember = psn.Email;
                        toName = psn.Name;

                    }
                }
                catch (Exception)
                {
                    return null;
                }

                return getAllUnapprovedMembers();

            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/Members/Person")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> Person([FromBody] Person personSearch)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection


            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            var PersonList = db.People.Include(z => z.Organisational_Structure_Position).Where(z => z.Name.ToLower().Contains(personSearch.Name.ToLower()));
            return PersonInfo(PersonList);

        }
        public List<dynamic> PersonInfo(dynamic PersonList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            dynamic dynamicOrgStructPositionList = new ExpandoObject();
            List<dynamic> dynamicMemberList = new List<dynamic>();
            //create new dynamic object 

            try
            {
                foreach (var person in PersonList)
                {
                    dynamic dynamicMember = new ExpandoObject();
                    dynamicMember.PersonID = person.PersonID;
                    dynamicMember.Name = person.Name;
                    dynamicMember.Surname = person.Surname;
                    dynamicMember.Address = person.Address;
                    dynamicMember.Suburb = person.Suburb;
                    dynamicMember.City = person.City;
                    dynamicMember.AssignLeader = person.AssignLeader;

                    if (person.AssignLeader == null)
                    {
                        dynamicMember.AssignLeader = "None";
                    }
                    else
                    {
                        int leaderid = person.AssignLeader;
                        Person personPosition = db.People.Where(z => z.AssignLeader == leaderid).FirstOrDefault();
                        dynamicMember.AssignLeader = personPosition.Name;
                    }
                    dynamicMemberList.Add(dynamicMember);

                }
            }
            catch (Exception)
            {

            }



            if (dynamicMemberList.Count > 0)
            {
                return dynamicMemberList;
            }
            else
            {
                return null;
            }
        }

        // 2.22 Assign leader to member
        [System.Web.Http.Route("api/Members/getAssignedMember")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAssignedMember()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                return MemberList(db.People.Where(x => x.AssignLeader == null).ToList());

            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e.Message;
                return toReturn;
            }
        }

        public List<dynamic> MemberList(List<Person> person)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicMember = new List<dynamic>();

            try
            {
                foreach (Person mem in person)
                {
                    dynamic dynamicOrgPosition = new ExpandoObject();

                    dynamicOrgPosition.OrgStructID = mem.OrgStructID;
                    dynamicOrgPosition.AssignLeader = mem.AssignLeader;
                    dynamicOrgPosition.PersonID = mem.PersonID;
                    dynamicOrgPosition.Name = mem.Name;
                    dynamicOrgPosition.Surname = mem.Surname;


                    dynamicMember.Add(dynamicOrgPosition);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicMember;
        }

        [System.Web.Http.Route("api/Members/getUnassignedMember")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getUnassignedMember()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                return UnassignedMemberList(db.People.ToList());

            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e.Message;
                return toReturn;
            }
        }

        public List<dynamic> UnassignedMemberList(List<Person> personList)

        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;


            List<dynamic> dynamicMemberList = new List<dynamic>();

            try
            {
                if (personList.Count > 0)
                {
                    foreach (Person member in personList)
                    {
                        dynamic dynamicMember = new ExpandoObject();
                        dynamicMember.PersonID = member.PersonID;
                        dynamicMember.Name = member.Name;
                        dynamicMember.Surname = member.Surname;
                        dynamicMember.Address = member.Address;
                        dynamicMember.Suburb = member.Suburb;
                        dynamicMember.City = member.City;
                        dynamicMember.AssignLeader = member.AssignLeader;

                        if (member.AssignLeader == null)
                        {
                            dynamicMember.AssignLeader = "None";
                        }
                        else
                        {
                            Person personPosition = db.People.Where(z => z.PersonID == member.AssignLeader).FirstOrDefault();
                            dynamicMember.AssignLeader = personPosition.Name;
                        }

                        dynamicMemberList.Add(dynamicMember);

                    }
                }
                else
                {
                    return null;

                }
            }
            catch (Exception)
            {
                return null;
            }


            return dynamicMemberList;
        }

        //used for the update to retrieve information
        [System.Web.Http.Route("api/Members/MemberByID")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> MemberByID(int personId)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            return UnassignedMemberList(db.People.Where(z => z.PersonID == personId).ToList()); // return called method

        }

        [System.Web.Http.Route("api/Members/getUnassignedLeader")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getUnassignedLeader()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;


            List<Person> orgStructPosition = db.People.Include(z => z.Organisational_Structure_Position).ToList();


            try
            {
                return getUnassignedLeaderList(db.People.Where(x => x.OrgStructID == 25 || x.OrgStructID == 26 || x.OrgStructID == 27 || x.OrgStructID == 28 || x.OrgStructID == 29 || x.OrgStructID == 30 || x.OrgStructID == 31).ToList());
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e.Message;
                return toReturn;
            }
        }

        public List<dynamic> getUnassignedLeaderList(List<Person> structPosition)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicOrgStructurePositions = new List<dynamic>();

            try
            {
                foreach (Person structpos in structPosition)
                {
                    Organisational_Structure_Position orgStruct = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgStructID == structpos.OrgStructID).FirstOrDefault();
                    dynamic dynamicOrgPos = new ExpandoObject();

                    dynamicOrgPos.OrgStructID = structpos.OrgStructID;

                    dynamicOrgPos.Description = orgStruct.Organisational_Individual_Position.Decription;
                    dynamicOrgPos.PersonID = structpos.PersonID;
                    dynamicOrgPos.Name = structpos.Name;
                    dynamicOrgPos.Surname = structpos.Surname;


                    dynamicOrgStructurePositions.Add(dynamicOrgPos);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicOrgStructurePositions;
        }

        [System.Web.Http.Route("api/Members/AssignLeader")]
        [System.Web.Mvc.HttpPost]

        public List<dynamic> AssignLeader([FromBody] dynamic assignLeader)
        {
            if (assignLeader != null)
            {
                //Database connection
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

                //Configure proxy to eliminate overload of data
                db.Configuration.ProxyCreationEnabled = false;

                int id = assignLeader.form.PersonToAssign;
                int leader = assignLeader.form.PersonID;

                Person PersonAssignleader = db.People.Where(z => z.PersonID == id).FirstOrDefault();

                try
                {
                    PersonAssignleader.AssignLeader = assignLeader.form.PersonID;

                    //db.SaveChanges();
                    toMember = PersonAssignleader.Email;
                    toName = PersonAssignleader.Name;

                    db.SaveChanges();

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = assignLeader.PersonID;
                    auditLog.EventDescription = "Leader Assigned with ID: " + leader + " to Person with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges(); //Save nchanges and Add new position

                    Person PersonLeaderAssigned = db.People.Where(x => x.AssignLeader == leader).FirstOrDefault();
                    string position = PersonLeaderAssigned.AssignLeader.ToString();


                    message = position + "have been assigned to " + id;
                    Emailsubject = "Organisational Structure Position Assigned";

                    //sendEmail();
                }
                catch (Exception)

                {

                }


                return UnassignedMemberList(db.People.Where(z => z.PersonID == id).ToList()); // return called method

            }
            else
            {
                return null;
            }
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
            var to = new EmailAddress(toMember, toName);
            var plainTextContent = message;
            var htmlContent = "Good day " + toName + "<br><br>" + message + "<br><br>  From" + "<br> Revive Communications";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }
    }
}