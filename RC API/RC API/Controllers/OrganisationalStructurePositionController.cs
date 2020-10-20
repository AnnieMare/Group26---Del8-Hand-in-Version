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

namespace RC_API.Controllers
{
    public class OrganisationalStructurePositionController : ApiController
    {

        static string message = "";
        static string Emailsubject = "";
        static string toMember = "";
        static string toName = "";

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        //3.15 Add Organisational structure position -Charl

        [System.Web.Http.Route("api/OrganisationalStructurePosition/CreateOrgStructPos")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic CreateOrgStructPos(dynamic NewPosition) //get JSON parameter
        {
            //validate that there is no null values
            if (NewPosition != null)
            {
                string description = "";
                int indivPosition = 0;
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                DbContextTransaction transaction = db.Database.BeginTransaction();
                dynamic returnMessage = new ExpandoObject();
                try
                {
                    description = NewPosition.form.Description;
                    indivPosition = NewPosition.form.OrgIndivPosID;
                    Organisational_Structure_Position checkPosition = db.Organisational_Structure_Position.Where(z => z.Description.ToLower() == description.ToLower() && z.OrgIndivPosID == indivPosition).FirstOrDefault();

                    if (checkPosition == null)
                    {
                        if (NewPosition.form.OrgStructLevel == null || NewPosition.form.OrgStructTypeID == null
                            || NewPosition.form.OrgIndivPosID == null || NewPosition.form.Description == null
                            || NewPosition.form.OrgStructIDReportsTo == null || indivPosition == 0 || description == "")
                        {
                            returnMessage = "Some information is missing. Please make sure that all fields are completed.";
                            return returnMessage;
                        }
                        else
                        {
                            Organisational_Structure_Position o = new Organisational_Structure_Position();
                            o.OrgStructLevel = NewPosition.form.OrgStructLevel;
                            o.OrgStructTypeID = NewPosition.form.OrgStructTypeID;
                            o.OrgIndivPosID = NewPosition.form.OrgIndivPosID;
                            o.OrgStructIDReportsTo = NewPosition.form.OrgStructIDReportsTo;
                            o.Description = NewPosition.form.Description;
                            db.Organisational_Structure_Position.Add(o); //add new customer to customer table

                            db.SaveChanges();

                            int id = db.Organisational_Structure_Position.OrderByDescending(x => x.OrgIndivPosID).Select(x => x.OrgStructID).FirstOrDefault();

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = NewPosition.PersonID;
                            auditLog.EventDescription = "Created Organisational Structure Position with ID: " + id;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);

                            db.SaveChanges(); //Save nchanges and Add new position
                            transaction.Commit();

                            return returnMessage = "New Organisational structure position was added successfully.";
                        }
                    }
                    else
                    {
                        return returnMessage = "This position has already been added. Try adding a new position.";

                    }
                }
                catch (FormatException)
                {
                    transaction.Rollback();
                    return returnMessage = "Some data is in the wrong format, please make sure all fields are in the correct format.";
                }

            }
            else
            {
                return null;
            }
        }

        //3.16 Assign Organisational structure position -Charl
        [System.Web.Http.Route("api/OrganisationalStructurePosition/AssignOrgStructPos")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> AssignOrgStructPos([FromBody] dynamic positionAssignInfo)
        {

            if (positionAssignInfo != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                int id = positionAssignInfo.form.PersonToAssign;
                int PositionID = positionAssignInfo.form.OrgStructID;
                Person PersonOrgStructPosition = db.People.Include(z => z.Organisational_Structure_Position).Where(x => x.PersonID == id).FirstOrDefault();
                Organisational_Structure_Position getAssignPosition = db.Organisational_Structure_Position.Where(z => z.OrgStructID == PositionID).FirstOrDefault();
                Organisational_Individual_Position getMemberPositionID = db.Organisational_Individual_Position.Where(z => z.Decription == "Member").FirstOrDefault();
                try
                {

                    if (getAssignPosition.OrgIndivPosID == getMemberPositionID.OrgIndivPosID)//Place member in member position and group
                    {
                        PersonOrgStructPosition.OrgStructID = positionAssignInfo.form.OrgStructID;
                        Organisational_Group getHomecellInfo = db.Organisational_Group.Where(c => c.Description == getAssignPosition.Description).FirstOrDefault();
                        Persons_Group checkGroup = db.Persons_Group.Include(x => x.Organisational_Group).Where(z => z.PersonID == id && z.ServeGroups == getHomecellInfo.OrgGroupID).FirstOrDefault();
                        if (checkGroup == null)
                        {
                            Persons_Group newGroupAssign = new Persons_Group();
                            newGroupAssign.PersonID = id;
                            newGroupAssign.ServeGroups = getHomecellInfo.OrgGroupID;
                            db.Persons_Group.Add(newGroupAssign);
                            db.SaveChanges(); //Save nchanges and Add new position

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = positionAssignInfo.PersonID;
                            auditLog.EventDescription = "Organisational Structure Position Assigned with ID: " + id + "to Person with ID:" + positionAssignInfo.form.PersonToAssign;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);
                            db.SaveChanges(); //Save nchanges and Add new position


                            Person PersonOrgStructPositionAssigned = db.People.Include(z => z.Organisational_Structure_Position).Where(x => x.PersonID == id).FirstOrDefault();
                            Organisational_Structure_Position getIndivPosition = db.Organisational_Structure_Position.Where(z => z.OrgStructID == PositionID).FirstOrDefault();
                            string position = PersonOrgStructPositionAssigned.Organisational_Structure_Position.Description;
                            Audit_Trail auditLog1 = new Audit_Trail();
                            auditLog1.PersonID = positionAssignInfo.PersonID;
                            auditLog1.EventDescription = "Member with ID" + positionAssignInfo.form.PersonToAssign + "has been placed in Homecell with ID" + getIndivPosition.Organisational_Individual_Position.Decription;
                            auditLog1.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog1);
                            db.SaveChanges(); //Save nchanges and Add new position

                            message = "You have a been assigned as a " + getIndivPosition.Organisational_Individual_Position.Decription + " and been placed in " + getHomecellInfo.Description + " Homecell at Christian Revival Church (CRC) Main.";
                            toMember = PersonOrgStructPosition.Email;
                            toName = PersonOrgStructPosition.Name;


                        }
                        sendEmail();
                    }
                    else
                    {
                        PersonOrgStructPosition.OrgStructID = positionAssignInfo.form.OrgStructID;
                        db.SaveChanges(); //Save nchanges and Add new position

                        //add to leader follow-up table
                        Leader_Follow_Up dynamicLeaderFollowUp = new Leader_Follow_Up();
                        dynamicLeaderFollowUp.PersonID = id;
                        dynamicLeaderFollowUp.FollowUpDate = DateTime.Today;
                        dynamicLeaderFollowUp.FollowUpStatus = false;
                        dynamicLeaderFollowUp.NoAnswer = false;
                        db.Leader_Follow_Up.Add(dynamicLeaderFollowUp);
                        db.SaveChanges();


                        //add to overseer follow-up
                        if (getAssignPosition.OrgIndivPosID == 43)
                        {
                            Overseer_Follow_Up dynamicOverseerFollowUp = new Overseer_Follow_Up();
                            dynamicOverseerFollowUp.PersonID = id;
                            dynamicOverseerFollowUp.FollowUpDate = DateTime.Today;
                            dynamicOverseerFollowUp.FollowUpStatus = false;
                            dynamicOverseerFollowUp.NoAnswer = false;
                            db.Overseer_Follow_Up.Add(dynamicOverseerFollowUp);
                            db.SaveChanges();
                        }

                        //set Email information
                        Person PersonOrgStructPositionAssigned = db.People.Include(z => z.Organisational_Structure_Position).Where(x => x.PersonID == id).FirstOrDefault();
                        string position = PersonOrgStructPositionAssigned.Organisational_Structure_Position.Description;
                        message = "You have a been assigned as a " + position + " at Christian Revival Church (CRC) Main.";
                        toMember = PersonOrgStructPosition.Email;
                        toName = PersonOrgStructPosition.Name;

                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = positionAssignInfo.PersonID;
                        auditLog.EventDescription = "Organisational Structure Position Assigned with ID: " + id + "to Person with ID:" + positionAssignInfo.form.PersonToAssign;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);
                        db.SaveChanges(); //Save nchanges and Add new position

                        sendEmail();
                    }
                }
                catch (Exception)
                {
                    return null;
                }

                return getUnassignedMemberList(db.People.Where(z => z.PersonID == id).ToList()); // return called method
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/Person")] //create route for api
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
                    dynamic dynamicPerson = new ExpandoObject();
                    dynamicPerson.PersonID = person.PersonID;
                    dynamicPerson.Name = person.Name;
                    dynamicPerson.Surname = person.Surname;
                    dynamicPerson.Suburb = person.Suburb;
                    dynamicPerson.City = person.City;
                    dynamicPerson.Address = person.Address;
                    if (person.OrgStructID == null)
                    {
                        dynamicPerson.OrgStructPosition = "None";
                    }
                    else
                    {
                        int orgstructID = person.OrgStructID;
                        Organisational_Structure_Position position = db.Organisational_Structure_Position.Include(z => z.Organisational_Individual_Position).Where(z => z.OrgStructID == orgstructID).FirstOrDefault();
                        dynamicPerson.OrgStructPosition = position.Description;
                        dynamicPerson.OrgIndivPosition = position.Organisational_Individual_Position.Decription;

                    }
                    dynamicMemberList.Add(dynamicPerson);
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

        //3.17 View Organisational structure position -Charl

        [System.Web.Http.Route("api/OrganisationalStructurePosition/getAllViewOrgStructPos")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllViewOrgStructPos()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            return getOrgStructPos(db.Organisational_Structure_Position.ToList()); // return called method
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
                    dynamicOrgStructPosition.Description = Position.Description;
                    dynamicOrgStructPosition.OrgStructLevel = Position.OrgStructLevel;
                    dynamicOrgStructPosition.OrgIndivPos = IndivPos;
                    dynamicOrgStructPosition.OrgStructID = Position.OrgStructID;

                    //Assign the word none to the Head of church insetad of empty values
                    if (Position.OrgStructIDReportsTo == null)
                    {
                        dynamicOrgStructPosition.OrgSTructReportTo = "None";
                    }
                    else
                    {
                        Organisational_Structure_Position reportTo = db.Organisational_Structure_Position.Include(z => z.Organisational_Individual_Position).Where(z => z.OrgStructID == Position.OrgStructIDReportsTo).FirstOrDefault();
                        dynamicOrgStructPosition.OrgSTructReportTo = reportTo.Description;
                        dynamicOrgStructPosition.OrgSTructReportToPosition = reportTo.Organisational_Individual_Position.Decription;

                    }

                    //check if position exist in the person tables and disables delete functionality for position
                    Person positionAssigned = db.People.Where(x => x.OrgStructID == Position.OrgStructID).FirstOrDefault();
                    if (positionAssigned == null)
                    {
                        dynamicOrgStructPosition.PositionAssigned = true;
                    }
                    else
                    {
                        dynamicOrgStructPosition.PositionAssigned = false;
                    }

                    // dynamicOrgStructPosition.OrgGroupList = Position.Organisational_Group;
                    dynamicOrgStructPositionList.Add(dynamicOrgStructPosition); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return dynamicOrgStructPositionList;
        }

        //get Organisational structure type
        [System.Web.Http.Route("api/OrganisationalStructurePosition/getStructType")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getStructType()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            return getOrgStructTYpe(db.Organisational_Structure_Type.ToList()); // return called method
        }
        public List<dynamic> getOrgStructTYpe(List<Organisational_Structure_Type> typeList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            List<dynamic> dynamicOrgStructTypeList = new List<dynamic>();

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var type in typeList)
                {
                    //create new dynamic object 
                    dynamic dynamicOrgStructType = new ExpandoObject();
                    dynamicOrgStructType.OrgStructTypeID = type.OrgStructTypeID;
                    dynamicOrgStructType.Description = type.Description;

                    // dynamicOrgStructPosition.OrgGroupList = Position.Organisational_Group;
                    dynamicOrgStructTypeList.Add(dynamicOrgStructType); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }


            return dynamicOrgStructTypeList;
        }

        //3.18 Maintain Organisational structure position -Charl
        [System.Web.Http.Route("api/OrganisationalStructurePosition/UpdateOrgStructPos")] //create route for api
        [System.Web.Mvc.HttpPost]

        public dynamic UpdateOrgStructPos([FromBody] dynamic UpdatedPosition) //get JSON parameter
        {
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (UpdatedPosition != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                try
                {
                    if (UpdatedPosition.form.OrgStructLevel == null || UpdatedPosition.form.OrgStructTypeID == null
                        || UpdatedPosition.form.OrgIndivPosID == null || UpdatedPosition.form.Description == null
                        || UpdatedPosition.form.OrgStructIDReportsTo == null)
                    {
                        returnMessage = "Some information is missing. Please make sure that all fields are completed.";
                        return returnMessage;
                    }
                    else
                    {
                        int id = UpdatedPosition.form.OrgStructID;
                        Organisational_Structure_Position OrgStructPosition = db.Organisational_Structure_Position.Where(x => x.OrgStructID == id).FirstOrDefault();
                        OrgStructPosition.OrgIndivPosID = UpdatedPosition.form.OrgIndivPosID;
                        OrgStructPosition.OrgStructTypeID = UpdatedPosition.form.OrgStructTypeID;
                        OrgStructPosition.OrgStructLevel = UpdatedPosition.form.OrgStructLevel;
                        OrgStructPosition.OrgStructIDReportsTo = UpdatedPosition.form.OrgStructIDReportsTo;
                        OrgStructPosition.Description = UpdatedPosition.form.Description;

                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = UpdatedPosition.PersonID;
                        auditLog.EventDescription = "Updated Organisational Structure Position with ID: " + id;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);

                        db.SaveChanges(); //Save nchanges and Add new position

                        return returnMessage = "Organisational structure position was updated successfully.";
                    }
                }
                catch (Exception)
                {
                    return returnMessage = "Something went wrong. Please try again.";
                }
            }
            else
            {
                return returnMessage = "Something went wrong. Please try again.";
            }
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/RemoveOrganisationalStructurePositionD")] //create route for api
        [System.Web.Mvc.HttpDelete]


        public dynamic RemoveOrganisationalStructurePositionD([FromBody] dynamic orgStructPos) //get JSON parameter
        {
            //validate that there is no null values
            if (orgStructPos != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3(); //establish database connection
                db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of data
                dynamic returnMessage = new ExpandoObject();

                try
                {
                    int id = orgStructPos.form.OrgStructID;
                    Organisational_Structure_Position orgStructPosDelete = db.Organisational_Structure_Position.Where(z => z.OrgStructID == id).FirstOrDefault(); //return record based on ID
                    db.Organisational_Structure_Position.Remove(orgStructPosDelete); //remove record retrieved from customer table

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = orgStructPos.PersonID;
                    auditLog.EventDescription = "Deleted Organisational Structure Position with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);
                    db.SaveChanges();

                    return returnMessage = "Organisational structure position was deleted successfully.";

                }
                catch (Exception)
                {
                    return returnMessage = "Something went wrong. Please try again.";
                }
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/OrgStructPosByID")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic OrgStructPosByID(int orgstruct)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            return OrgStructPos(db.Organisational_Structure_Position.Where(x => x.OrgStructID == orgstruct).FirstOrDefault()); // return called method
        }

        public dynamic OrgStructPos(Organisational_Structure_Position Position)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            dynamic dynamicOrgStructPosition = new ExpandoObject();
            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                Organisational_Structure_Type getStructureType = db.Organisational_Structure_Type.Where(z => z.OrgStructTypeID == Position.OrgStructTypeID).FirstOrDefault();
                Organisational_Individual_Position getIndivPos = db.Organisational_Individual_Position.Where(z => z.OrgIndivPosID == Position.OrgIndivPosID).FirstOrDefault();

                //create new dynamic object 
                dynamicOrgStructPosition.OrgStructType = getStructureType.OrgStructTypeID;
                dynamicOrgStructPosition.OrgSTructReportTo = Position.OrgStructIDReportsTo;
                dynamicOrgStructPosition.Description = Position.Description;
                dynamicOrgStructPosition.OrgStructLevel = Position.OrgStructLevel;
                dynamicOrgStructPosition.OrgIndivPos = getIndivPos.OrgIndivPosID;
                dynamicOrgStructPosition.OrgStructID = Position.OrgStructID;
            }
            catch (Exception)
            {
                return null;
            }

            return dynamicOrgStructPosition;
        }

        //3.17 View Organisational structure position -Charl
        [System.Web.Http.Route("api/OrganisationalStructurePosition/SearchedOrgStructPos")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> SearchedOrgStructPos([FromBody] Organisational_Structure_Position searchPosition)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            if (searchPosition.OrgStructLevel == 0)
            {
                return getOrgStructPos(db.Organisational_Structure_Position.ToList()); // return called method
            }

            return getOrgStructPos(db.Organisational_Structure_Position.Where(x => x.OrgStructLevel == searchPosition.OrgStructLevel).ToList()); // return called method

        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/getStructureLevels")] //create route for api
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getStructureLevels()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            return getSearchResults(db.Organisational_Structure_Position.ToList()); // return called method
        }

        public List<dynamic> getSearchResults(List<Organisational_Structure_Position> structureList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            List<dynamic> dynamicOrgStructPositionList = new List<dynamic>();
            List<Organisational_Structure_Position> searchPosition = db.Organisational_Structure_Position.ToList();

            var structureLevelList = structureList.GroupBy(z => z.OrgStructLevel);

            try
            {
                //foreach method ro retrieve data from database and add it to list to return
                foreach (var Level in structureLevelList)
                {

                    //Organisational_Structure_Type getStructureType = db.Organisational_Structure_Type.Where(z => z.OrgStructTypeID == Level.OrgStructTypeID).FirstOrDefault();
                    Organisational_Structure_Position getIndivPos = db.Organisational_Structure_Position.Include("Organisational_Individual_Position").Where(z => z.OrgStructLevel == Level.Key).FirstOrDefault();

                    //create new dynamic object 
                    dynamic dynamicOrgStructPosition = new ExpandoObject();
                    //dynamicOrgStructPosition.OrgStructType = orgStructType;
                    dynamicOrgStructPosition.OrgStructLevel = Level.Key;
                    dynamicOrgStructPosition.OrgIndivPos = getIndivPos.Organisational_Individual_Position.Decription;

                    // dynamicOrgStructPosition.OrgGroupList = Position.Organisational_Group;
                    dynamicOrgStructPositionList.Add(dynamicOrgStructPosition); // add to dynamic list
                }
            }
            catch (Exception)
            {
                return null;
            }

            return dynamicOrgStructPositionList; //dynamicOrgStructPositionList;
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/getUnassignedMember")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getUnassignedMember()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                return getUnassignedMemberList(db.People.ToList());
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<dynamic> getUnassignedMemberList(List<Person> memberList)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicUnassignedMemberList = new List<dynamic>();

            try
            {
                if (memberList.Count > 0)
                {
                    foreach (Person member in memberList)
                    {
                        dynamic dynamicMember = new ExpandoObject();
                        dynamicMember.PersonID = member.PersonID;
                        dynamicMember.Name = member.Name;
                        dynamicMember.Surname = member.Surname;
                        dynamicMember.Address = member.Address;
                        dynamicMember.Suburb = member.Suburb;
                        Suburb getSububrID = db.Suburbs.Where(z => z.SuburbName == member.Suburb).FirstOrDefault();
                        if (getSububrID != null)
                        {
                            dynamicMember.SuburbID = getSububrID.SuburbID;
                        }
                        dynamicMember.City = member.City;
                        dynamicMember.OrgStructID = member.OrgStructID;

                        if (member.OrgStructID == null)
                        {
                            dynamicMember.OrgStructPosition = "None";
                        }
                        else
                        {
                            Organisational_Structure_Position personPosition = db.Organisational_Structure_Position.Include(z => z.Organisational_Individual_Position).Where(z => z.OrgStructID == member.OrgStructID).FirstOrDefault();
                            dynamicMember.OrgStructPosition = personPosition.Description;
                            dynamicMember.OrgIndivPosition = personPosition.Organisational_Individual_Position.Decription;
                        }

                        dynamicUnassignedMemberList.Add(dynamicMember);

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

            return dynamicUnassignedMemberList;
        }


        //used for the update to retrieve information
        [System.Web.Http.Route("api/OrganisationalStructurePosition/MemberByID")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> MemberByID(int personId)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            return getUnassignedMemberList(db.People.Where(z => z.PersonID == personId).ToList()); // return called method
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/AllGroups")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> AllGroups(int personId)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                Person getPersonCity = db.People.Where(z => z.PersonID == personId).FirstOrDefault();
                City getCity = db.Cities.Where(x => x.CityName.ToLower() == getPersonCity.City.ToLower()).FirstOrDefault();
                List<Suburb> getSuburbList = db.Suburbs.Where(z => z.CityID == getCity.CityID).ToList();
                List<dynamic> groupLists = new List<dynamic>();
                foreach (Suburb sub in getSuburbList)
                {
                    dynamic dynamicGroup = new ExpandoObject();
                    Organisational_Group getOrgGroups = db.Organisational_Group.Include(x => x.Group_Type).Where(z => z.SuburbID == sub.SuburbID && z.Group_Type.GroupTypeName != "Homecell").FirstOrDefault();
                    if (getOrgGroups != null)
                    {
                        dynamicGroup.OrgGroupID = getOrgGroups.OrgGroupID;
                        dynamicGroup.GroupTypeID = getOrgGroups.GroupTypeID;
                        dynamicGroup.Description = getOrgGroups.Description;
                        dynamicGroup.Address = getOrgGroups.Address;
                        dynamicGroup.SuburbID = getOrgGroups.SuburbID;
                        groupLists.Add(dynamicGroup);
                    }

                }
                return getAllGroupsReturnList(groupLists);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<dynamic> getAllGroupsReturnList(dynamic allGroups)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicGroups = new List<dynamic>();

            try
            {
                foreach (var thisGroup in allGroups)
                {
                    dynamic dynamicGroup = new ExpandoObject();
                    dynamicGroup.OrgGroupID = thisGroup.OrgGroupID;
                    dynamicGroup.GroupTypeID = thisGroup.GroupTypeID;
                    dynamicGroup.Description = thisGroup.Description;
                    dynamicGroup.Address = thisGroup.Address;
                    dynamicGroup.SuburbID = thisGroup.SuburbID;

                    dynamicGroups.Add(dynamicGroup);
                }
            }
            catch (Exception)
            {
                return null;
            }

            return dynamicGroups;
        }
        bool groupAssigned = false;
        [System.Web.Http.Route("api/OrganisationalStructurePosition/AssignOrgGroup")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic AssignOrgGroup([FromBody] dynamic groupAssignInfo)
        {
            dynamic returnMessage = new ExpandoObject();
            string groups = "";
            if (groupAssignInfo != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                int group1 = 0, group2 = 0, group3 = 0;
                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
                int id = groupAssignInfo.form.PersonToAssign;


                try { group1 = groupAssignInfo.form.group1; } catch { };

                try { group2 = groupAssignInfo.form.group2; } catch { };

                try { group3 = groupAssignInfo.form.group3; } catch { };


                try
                {
                    Person PersonOrgStructPosition = db.People.Where(x => x.PersonID == id).FirstOrDefault();

                    if (group1 != 0)
                    {
                        List<Persons_Group> GroupServeCheck = db.Persons_Group.Where(z => z.PersonID == id).ToList();
                        if (GroupServeCheck.Count < 3)
                        {
                            Persons_Group checkGroup = db.Persons_Group.Where(z => z.PersonID == id && z.ServeGroups == group1).FirstOrDefault();
                            if (checkGroup == null)
                            {
                                Persons_Group NewGroupServe = new Persons_Group();
                                NewGroupServe.PersonID = id;
                                NewGroupServe.ServeGroups = groupAssignInfo.form.group1;

                                db.Persons_Group.Add(NewGroupServe);

                                Audit_Trail auditLog = new Audit_Trail();
                                auditLog.PersonID = groupAssignInfo.PersonID;
                                auditLog.EventDescription = "Organisational Group Assigned with ID: " + groupAssignInfo.form.group3 + "to Person with ID:" + groupAssignInfo.form.PersonToAssign;
                                auditLog.EventDateTime = DateTime.Now;
                                db.Audit_Trail.Add(auditLog);
                                db.SaveChanges(); //Save nchanges and Add new position
                                groupAssigned = true;
                                Organisational_Group getGroupDescription = db.Organisational_Group.Where(z => z.OrgGroupID == group1).FirstOrDefault();
                                groups += getGroupDescription.Description;
                            }
                            else
                            {
                                return returnMessage = "Member already serves in this organisational group. Try selecting another group and try again.";
                            }
                        }
                    }

                    if (group2 != 0)
                    {
                        List<Persons_Group> GroupServeCheck = db.Persons_Group.Where(z => z.PersonID == id).ToList();
                        if (GroupServeCheck.Count < 3)
                        {
                            Persons_Group checkGroup = db.Persons_Group.Where(z => z.PersonID == id && z.ServeGroups == group2).FirstOrDefault();
                            if (checkGroup == null)
                            {
                                Persons_Group NewGroupServe = new Persons_Group();
                                NewGroupServe.PersonID = id;
                                NewGroupServe.ServeGroups = groupAssignInfo.form.group2;
                                db.Persons_Group.Add(NewGroupServe);

                                Audit_Trail auditLog = new Audit_Trail();
                                auditLog.PersonID = groupAssignInfo.PersonID;
                                auditLog.EventDescription = "Organisational Group Assigned with ID: " + groupAssignInfo.form.group3 + "to Person with ID:" + groupAssignInfo.form.PersonToAssign;
                                auditLog.EventDateTime = DateTime.Now;
                                db.Audit_Trail.Add(auditLog);
                                db.SaveChanges(); //Save nchanges and Add new position
                                groupAssigned = true;

                                Organisational_Group getGroupDescription = db.Organisational_Group.Where(z => z.OrgGroupID == group2).FirstOrDefault();
                                groups += ", " + getGroupDescription.Description;
                            }
                            else
                            {
                                return returnMessage = "Member already serves in this organisational group. Try selecting another group and try again.";
                            }
                        }
                    }

                    if (group3 != 0)
                    {
                        List<Persons_Group> GroupServeCheck = db.Persons_Group.Where(z => z.PersonID == id).ToList();
                        if (GroupServeCheck.Count < 3)
                        {
                            Persons_Group checkGroup = db.Persons_Group.Where(z => z.PersonID == id && z.ServeGroups == group3).FirstOrDefault();
                            if (checkGroup == null)
                            {
                                Persons_Group NewGroupServe = new Persons_Group();
                                NewGroupServe.PersonID = id;
                                NewGroupServe.ServeGroups = groupAssignInfo.form.group3;
                                db.Persons_Group.Add(NewGroupServe);

                                Audit_Trail auditLog = new Audit_Trail();
                                auditLog.PersonID = groupAssignInfo.PersonID;
                                auditLog.EventDescription = "Organisational Group Assigned with ID: " + groupAssignInfo.form.group3 + "to Person with ID:" + groupAssignInfo.form.PersonToAssign;
                                auditLog.EventDateTime = DateTime.Now;
                                db.Audit_Trail.Add(auditLog);
                                db.SaveChanges(); //Save nchanges and Add new position
                                groupAssigned = true;

                                Organisational_Group getGroupDescription = db.Organisational_Group.Where(z => z.OrgGroupID == group3).FirstOrDefault();
                                groups += ", " + getGroupDescription.Description;
                            }
                            else
                            {
                                return returnMessage = "Member already serves in this organisational group. Try selecting another group and try again.";
                            }
                        }
                    }

                }
                catch (Exception)
                {
                    return null;
                }

                if (groupAssigned)
                {

                    Person getPersonInfo = db.People.Where(z => z.PersonID == id).FirstOrDefault();
                    toMember = getPersonInfo.Email;
                    toName = getPersonInfo.Name;
                    message = "You are now serving in " + groups + " at Christian Revival Church (CRC) Main.";
                    Emailsubject = "Organisational group(s) Assigned";

                    sendEmail();

                    return returnMessage = "Member is now serving in the selected Organisational groups.";
                }
                else
                {
                    return returnMessage = "Please select the Organisational group(s) that the member wants to serve in.";
                }

            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/MemberGroups")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> MemberGroups(int personId)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;
            List<dynamic> dynamicMemberGroupList = new List<dynamic>();

            Group_Type getHomecellTypeID = db.Group_Type.Where(z => z.GroupTypeName == "Homecell").FirstOrDefault();
            List<Persons_Group> memberGroup = db.Persons_Group.Include(z => z.Organisational_Group).Where(z => z.PersonID == personId).ToList();

            foreach (Persons_Group group in memberGroup)
            {
                if (group.Organisational_Group.GroupTypeID != getHomecellTypeID.GroupTypeID)
                {
                    dynamic dynamicMemberGroups = new ExpandoObject();
                    dynamicMemberGroups.Group = group.ServeGroups;
                    dynamicMemberGroups.GroupName = group.Organisational_Group.Description;
                    dynamicMemberGroupList.Add(dynamicMemberGroups);
                }
            }
            if (dynamicMemberGroupList.Count != 0)
            {
                return dynamicMemberGroupList;
            }

            else
            {
                return null;
            }
        }


        [System.Web.Http.Route("api/OrganisationalStructurePosition/Homecells")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> Homecells(int personId)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                Person getPerson = db.People.Where(z => z.PersonID == personId).FirstOrDefault();
                Suburb getSuburb = db.Suburbs.Where(z => z.SuburbName == getPerson.Suburb).FirstOrDefault();
                return getAllGroupsReturnList(db.Organisational_Group.Include(x => x.Group_Type).Where(z => z.SuburbID == getSuburb.SuburbID && z.Group_Type.GroupTypeName == "Homecell").ToList());

            }
            catch (Exception)
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/HomecellsBySuburb")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> HomecellsBySuburb(int SuburbID)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                Suburb getSuburb = db.Suburbs.Where(z => z.SuburbID == SuburbID).FirstOrDefault();
                return getAllGroupsReturnList(db.Organisational_Group.Include(x => x.Group_Type).Where(z => z.SuburbID == getSuburb.SuburbID && z.Group_Type.GroupTypeName == "Homecell").ToList());

            }
            catch (Exception)
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/memberHomecells")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> memberHomecells(int personId)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;
            List<dynamic> dynamicMemberGroupList = new List<dynamic>();
            dynamic dynamicMemberGroups = new ExpandoObject();
            Group_Type getHomecellTypeID = db.Group_Type.Where(z => z.GroupTypeName == "Homecell").FirstOrDefault();
            Persons_Group memberGroup = db.Persons_Group.Include(z => z.Organisational_Group).Where(z => z.PersonID == personId && z.Organisational_Group.GroupTypeID == getHomecellTypeID.GroupTypeID).FirstOrDefault();
            if (memberGroup != null)
            {

                dynamicMemberGroups.Group = memberGroup.ServeGroups;
                dynamicMemberGroups.GroupName = memberGroup.Organisational_Group.Description;
                dynamicMemberGroupList.Add(dynamicMemberGroups);

            }
            else
            {
                return null;
            }

            return dynamicMemberGroupList;

        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/Suburbs")]
        [System.Web.Mvc.HttpPost]
        public List<Suburb> Suburbs(int personId)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                Person getPersonCity = db.People.Where(z => z.PersonID == personId).FirstOrDefault();
                City getCity = db.Cities.Where(x => x.CityName.ToLower() == getPersonCity.City.ToLower()).FirstOrDefault();
                List<Suburb> getSuburbList = db.Suburbs.Where(z => z.CityID == getCity.CityID).ToList();
                return getSuburbList;
            }

            catch (Exception)
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/OrganisationalStructurePosition/AssignHomecell")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic AssignHomecell([FromBody] dynamic groupAssignInfo)
        {
            dynamic returnMessage = new ExpandoObject();
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            int group1 = 0;
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            if (groupAssignInfo != null)
            {

                int id = groupAssignInfo.form.PersonToAssign;

                try { group1 = groupAssignInfo.form.Group; } catch { };

                try
                {
                    Person PersonOrgStructPosition = db.People.Where(x => x.PersonID == id).FirstOrDefault();

                    if (group1 != 0)
                    {
                        Group_Type getHomecellID = db.Group_Type.Where(z => z.GroupTypeName == "Homecell").FirstOrDefault();
                        Persons_Group checkGroup = db.Persons_Group.Include(x => x.Organisational_Group).Where(z => z.PersonID == id && z.Organisational_Group.GroupTypeID == getHomecellID.GroupTypeID).FirstOrDefault();

                        if (checkGroup.ServeGroups != group1)
                        {

                            checkGroup.PersonID = id;
                            checkGroup.ServeGroups = groupAssignInfo.form.Group;
                            db.SaveChanges(); //Save nchanges and Add new position

                            Organisational_Group getHomecell = db.Organisational_Group.Where(z => z.OrgGroupID == group1).FirstOrDefault();
                            Organisational_Structure_Position OrgStructPos = db.Organisational_Structure_Position.Include(c => c.Organisational_Individual_Position).Where(x => x.Description == getHomecell.Description && x.Organisational_Individual_Position.Decription == "Member").FirstOrDefault();

                            if (OrgStructPos != null)
                            {
                                Person getMember = db.People.Where(c => c.PersonID == id).FirstOrDefault();
                                getMember.OrgStructID = OrgStructPos.OrgStructID;
                                db.SaveChanges();

                                Audit_Trail auditLog1 = new Audit_Trail();
                                auditLog1.PersonID = groupAssignInfo.PersonID;
                                auditLog1.EventDescription = "Organisational Structure Position Assigned with ID: " + OrgStructPos.OrgStructID + "to Person with ID:" + groupAssignInfo.form.PersonToAssign;
                                auditLog1.EventDateTime = DateTime.Now;
                                db.Audit_Trail.Add(auditLog1);
                                db.SaveChanges(); //Save nchanges and Add new position
                            }

                            Audit_Trail auditLog = new Audit_Trail();
                            auditLog.PersonID = groupAssignInfo.PersonID;
                            auditLog.EventDescription = "Person with ID:" + groupAssignInfo.form.PersonToAssign + "has been blaced in Homecell with ID: " + groupAssignInfo.form.group1;
                            auditLog.EventDateTime = DateTime.Now;
                            db.Audit_Trail.Add(auditLog);
                            db.SaveChanges(); //Save nchanges and Add new position

                            return returnMessage = "Member has been placed in a new Homecell.";

                        }
                        else
                        {
                            return returnMessage = "Member is already placed the selected Homecell.";
                        }
                    }
                }
                catch (Exception)
                {
                    return null;
                }
            }
            Organisational_Group getGroupName = db.Organisational_Group.Where(x => x.OrgGroupID == group1).FirstOrDefault();
            return returnMessage = "Member has been in placed in " + getGroupName;
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

