using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RC_API.Models;
using System.Web.Http.Cors;
using System.IO;
using System.Web.Hosting;
using System.Net.Http.Headers;
using System.Data;
using System.Dynamic;
using System.Data.Entity;
using System.Globalization;
using System.Text;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Web.UI.WebControls;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace RC_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GroupsController : ApiController
    {
        static string message = "";
        static string Emailsubject = "";
        static string toMember = "";
        static string toName = "";

        //*********GROUPS START************// -- Izaan

        //3.19 View Organisational group - Izaan
        //Read all groups
        [System.Web.Http.Route("api/Groups/getAllGroups")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllGroups()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            // !!--User Management--!!
            //string sessionId = Request.Headers.Authorization.ToString();
            //var user = db.Where(o => o.SessionID == sessionId).FirstOrDefault();
            //if(user != null)

            try
            {
                return getAllGroupsReturnList(db.Organisational_Group.ToList());
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }


        //Groups list - Izaan
        public List<dynamic> getAllGroupsReturnList(List<Organisational_Group> allGroups)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicGroups = new List<dynamic>();

            try
            {
                foreach (Organisational_Group thisGroup in allGroups)
                {
                    dynamic dynamicGroup = new ExpandoObject();
                    dynamicGroup.OrgGroupID = thisGroup.OrgGroupID;
                    dynamicGroup.GroupTypeID = thisGroup.GroupTypeID;
                    dynamicGroup.Description = thisGroup.Description;
                    dynamicGroup.Size = thisGroup.Size;
                    dynamicGroup.Address = thisGroup.Address;
                    dynamicGroup.SuburbID = thisGroup.SuburbID;

                    dynamicGroups.Add(dynamicGroup);
                }
            }
            catch (Exception e)
            {

            }


            return dynamicGroups;
        }

        //Get church name by ID - Izaan
        [System.Web.Http.Route("api/Groups/getGroupID")]
        [System.Web.Mvc.HttpGet]

        public Organisational_Group getGroupID(int OrgGroupID)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            Organisational_Group thisGroup = db.Organisational_Group.Where(z => z.OrgGroupID == OrgGroupID).FirstOrDefault();

            try
            {
                return thisGroup;
            }
            catch (Exception err)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = err;
                return toReturn;
            }
        }

        //3.18 Add Organisational group - Izaan
        [System.Web.Http.Route("api/Groups/addOrgGroup")]
        [System.Web.Mvc.HttpPost]
        public dynamic addOrgGroup(dynamic orgGroup)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            //Dynamic object for return message
            dynamic returnMessage = new ExpandoObject();

            if (orgGroup != null)
            {
                if (orgGroup.GroupTypeID == null || orgGroup.Description == "" || orgGroup.Address == "" || orgGroup.SuburbID == null)
                {
                    return returnMessage.Message = "Not all the fields were completed. Please ensure that all fields are completed.";
                }
                else
                {
                    try
                    {
                        Organisational_Group group = new Organisational_Group();

                        group.GroupTypeID = orgGroup.GroupTypeID;
                        group.Description = orgGroup.Description;
                        group.Address = orgGroup.Address;
                        group.SuburbID = orgGroup.SuburbID;
                        db.Organisational_Group.Add(group);

                        db.SaveChanges();

                        //Add to Audit trail entity
                        string name = orgGroup.Description;
                        Organisational_Group gname = db.Organisational_Group.Where(z => z.Description == name).FirstOrDefault();

                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = orgGroup.PersonID;
                        auditLog.EventDescription = "Organisational Group added with id: " + gname.OrgGroupID;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);


                        db.SaveChanges();

                        return returnMessage = "All done! We have received the group information.";
                    }
                    catch (Exception)
                    {
                        returnMessage.Message = "Something went wrong! Please try again.";
                        return returnMessage;
                    }
                }
            }
            else
            {
                return null;
            }
        }

        //3.19 Maintain Organisational group - Izaan
        [System.Web.Http.Route("api/Groups/updateOrgGroup")]
        [System.Web.Mvc.HttpPost]
        public dynamic updateOrgGroup(dynamic currentGroup)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            dynamic returnMessage = new ExpandoObject();

            int id = currentGroup.GroupID.OrgGroupID;

            //Check to see if the child exists
            if (currentGroup != null)
            {
                if (currentGroup.GroupID.GroupTypeID == null || currentGroup.GroupID.Description == "" || currentGroup.GroupID.Address == "" || currentGroup.GroupID.SuburbID == null || currentGroup.GroupID.Size == null)
                {
                    return returnMessage.Message = "Please make sure that all information is provided for the group.";
                }
                else
                {
                    
                    //Retrieve selected object
                    Organisational_Group thisGroup = db.Organisational_Group.Where(z => z.OrgGroupID == id).FirstOrDefault();

                    //Create dynamic object
                    dynamic toReturn = new ExpandoObject();

                    try
                    {
                        //Update the attributes

                        thisGroup.GroupTypeID = currentGroup.GroupTypeID;

                        thisGroup.Description = currentGroup.GroupID.Description;
                        thisGroup.Address = currentGroup.GroupID.Address;
                        thisGroup.SuburbID = currentGroup.GroupID.SuburbID;
                        thisGroup.Size = currentGroup.GroupID.Size;

                        db.SaveChanges();

                        //Add to Audit trail entity
                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = currentGroup.PersonID;
                        auditLog.EventDescription = "Organisational Group updated with id: " + id;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);

                        db.SaveChanges();

                        return returnMessage.Message = "All done! We have received the group information.";
                    }
                    catch (Exception)
                    {
                        returnMessage.Message = "Something went wrong! Please try again.";
                        return returnMessage;
                    }
                }
            }
            else
            {
                return null;
            }

        }

        //Retrieve group types - Izaan
        [System.Web.Http.Route("api/Groups/getAllGroupTypes")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllGroupTypes()
        {

            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            // !!--User Management--!!
            //string sessionId = Request.Headers.Authorization.ToString();
            //var user = db.Where(o => o.SessionID == sessionId).FirstOrDefault();
            //if(user != null)

            return getAllGroupTypesReturnList(db.Group_Type.ToList());

        }

        //Group type list - Izaan
        public List<dynamic> getAllGroupTypesReturnList(List<Group_Type> allGroupTypes)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            //Creating dynamic list
            List<dynamic> dynamicGroupTypes = new List<dynamic>();

            try
            {
                foreach (Group_Type gType in allGroupTypes)
                {
                    //Creating dynmaic object
                    dynamic dynamicGroupType = new ExpandoObject();
                    dynamicGroupType.GroupTypeID = gType.GroupTypeID;
                    dynamicGroupType.GroupTypeName = gType.GroupTypeName;

                    //Adding dynamic object to dynamic lits
                    dynamicGroupTypes.Add(dynamicGroupType);
                }
            }
            catch (Exception)
            {

            }

            return dynamicGroupTypes;
        }

        //Add suburb - Izaan
        [System.Web.Http.Route("api/Groups/addSuburb")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> addSuburb([FromBody] Suburb suburb)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            db.Suburbs.Add(suburb);
            db.SaveChanges();
            return getAllSuburbs();
        }

        //Get suburbs - Izaan
        [System.Web.Http.Route("api/Groups/getAllSuburbs")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllSuburbs()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            return getAllSuburbsList(db.Suburbs.ToList());
        }

        //Sububrb List - Izaan
        public List<dynamic> getAllSuburbsList(List<Suburb> suburbList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicSuburbs = new List<dynamic>();

            try
            {
                foreach (Suburb s in suburbList)
                {
                    dynamic dynamicSuburb = new ExpandoObject();
                    dynamicSuburb.SuburbID = s.SuburbID;
                    dynamicSuburb.SuburbName = s.SuburbName;
                    dynamicSuburb.CityID = s.CityID;

                    dynamicSuburbs.Add(dynamicSuburb);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicSuburbs;
        }

        //Retrieve ll cities - Izaan
        [System.Web.Http.Route("api/Groups/getAllCities")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllCities()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            return getAllCityList(db.Cities.ToList());
        }

        //City list - Izaan
        public List<dynamic> getAllCityList(List<City> cityList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicCities = new List<dynamic>();
            foreach (City c in cityList)
            {
                dynamic dynamicCity = new ExpandoObject();
                dynamicCity.CityID = c.CityID;
                dynamicCity.CityName = c.CityName;
                dynamicCity.ProvinceID = c.ProvID;

                dynamicCities.Add(dynamicCity);
            }
            return dynamicCities;
        }

        //Retrieve provinces - Izaan
        [System.Web.Http.Route("api/Groups/getAllProvinces")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllProvinces()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            return getAllProvinesList(db.Provinces.ToList());
        }

        //Province list - Izaan
        public List<dynamic> getAllProvinesList(List<Province> provinceList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicProvinces = new List<dynamic>();
            foreach (Province p in provinceList)
            {
                dynamic dynamicProvince = new ExpandoObject();
                dynamicProvince.ProvinceID = p.ProvinceID;
                dynamicProvince.ProvinceName = p.ProvinceName;
                dynamicProvince.CountryID = p.CountryID;

                dynamicProvinces.Add(dynamicProvince);
            }
            return dynamicProvinces;
        }

        //Retrieve all countries - Izaan
        [System.Web.Http.Route("api/Groups/getAllCountries")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllCountries()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            return getAllCountries(db.Countries.ToList());
        }

        //Country list - Izaan
        public List<dynamic> getAllCountries(List<Country> countryList)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicCountries = new List<dynamic>();
            foreach (Country country in countryList)
            {
                dynamic dynamicCountry = new ExpandoObject();
                dynamicCountry.CountryID = country.CountryID;
                dynamicCountry.CountryName = country.CountryName;

                dynamicCountries.Add(dynamicCountry);
            }
            return dynamicCountries;
        }

        [System.Web.Http.Route("api/Groups/MyGroups")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> MyGroups(Person personID)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminamte overload of memory
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic list
            List<dynamic> Groups = new List<dynamic>();

            //Group_Type getHomecellID = db.Group_Type.Where(z => z.GroupTypeName == "Homecell").FirstOrDefault();

            if (personID == null)
            {
                return null;
            }
            else if (personID.OrgStructID == 27)
            {
                List<Organisational_Group> orgGroups = db.Organisational_Group.ToList();

                foreach (Organisational_Group thisgroup in orgGroups)
                {
                    dynamic dynamicGroup = new ExpandoObject();
                    dynamicGroup.OrgGroupID = thisgroup.OrgGroupID;
                    dynamicGroup.GroupTypeID = thisgroup.GroupTypeID;
                    dynamicGroup.Description = thisgroup.Description;
                    dynamicGroup.Size = thisgroup.Size;
                    dynamicGroup.Address = thisgroup.Address;
                    dynamicGroup.SuburbID = thisgroup.SuburbID;

                    Groups.Add(dynamicGroup);
                }
            }
            else
            {
                //Create list of people to find the person currently loggend in with their ID
                List<Persons_Group> myGroups = db.Persons_Group.Include(z => z.Organisational_Group).Where(x => x.PersonID == personID.PersonID).ToList();

                //Loop through the list of parents found and find the children with the matching PersonID and the Kids Church of the child with the matching KidsChurchID
                foreach (Persons_Group psngroup in myGroups)
                {
                    Group_Type type = db.Group_Type.Where(z => z.GroupTypeID == psngroup.Organisational_Group.GroupTypeID).FirstOrDefault();
                    Suburb suburb = db.Suburbs.Where(x => x.SuburbID == psngroup.Organisational_Group.SuburbID).FirstOrDefault();
                    //Create dynamic object to find the child information to be returned
                    dynamic group = new ExpandoObject();

                    group.PersonID = psngroup.PersonID;
                    group.OrgGroupID = psngroup.Organisational_Group.OrgGroupID;
                    group.PersonGroupID = psngroup.PersonGroupID;
                    group.GroupTypeID = type.GroupTypeID;
                    group.Description = psngroup.Organisational_Group.Description;
                    group.Address = psngroup.Organisational_Group.Address;
                    group.SuburbID = suburb.SuburbID;
                    group.Size = psngroup.Organisational_Group.Size;

                    //Add dynamic object created to the dynamic list
                    Groups.Add(group);


                }
            }

            if (Groups.Count != 0)
            {
                return Groups;
            }

            else
            {
                return null;
            }
        }

        bool groupAssigned = false;

        [System.Web.Http.Route("api/Groups/TransferGroups")]
        [System.Web.Mvc.HttpPost]
        public dynamic TransferGroups([FromBody] dynamic currentgroup)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            //Dynamic object to return message
            dynamic returnMessage = new ExpandoObject();

            string groups = "";

            if (currentgroup != null)
            {
                int group1 = 0, group2 = 0, group3 = 0;
                int pGroup1 = 0, pGroup2 = 0, pGroup3 = 0;

                int id = currentgroup.form.PersonToAssign;

                try { group1 = currentgroup.form.group1; } catch { };

                try { group2 = currentgroup.form.group2; } catch { };

                try { group3 = currentgroup.form.group3; } catch { };
               
                try { pGroup1 = currentgroup.form.personGroup1; } catch { };

                try { pGroup2 = currentgroup.form.personGroup2; } catch { };

                try { pGroup3 = currentgroup.form.personGroup3; } catch { };

                try
                {
                    Person PersonOrgStructPosition = db.People.Where(x => x.PersonID == id).FirstOrDefault();

                    if (group1 != 0)
                    {
                        List<Persons_Group> GroupServeCheck = db.Persons_Group.Where(z => z.PersonID == id).ToList();
                        if (GroupServeCheck.Count <= 3)
                        {
                            Persons_Group checkGroup = db.Persons_Group.Where(z => z.PersonGroupID == pGroup1).FirstOrDefault();
                            if (checkGroup != null)
                            {
                                checkGroup.ServeGroups = currentgroup.form.group1;
                                //db.Persons_Group.Add(NewGroupServe);


                                db.SaveChanges(); //Save nchanges and Add new position
                                groupAssigned = true;

                                //Organisational_Group getGroupDescription = db.Organisational_Group.Where(z => z.OrgGroupID == group1).FirstOrDefault();
                                //groups += ", " + getGroupDescription.Description;
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
                        if (GroupServeCheck.Count <= 3)
                        {
                            Persons_Group checkGroup = db.Persons_Group.Where(z => z.PersonGroupID == pGroup2).FirstOrDefault();
                            if (checkGroup != null)
                            {
                                checkGroup.ServeGroups = currentgroup.form.group2;
                                //db.Persons_Group.Add(NewGroupServe);


                                db.SaveChanges(); //Save nchanges and Add new position
                                groupAssigned = true;

                                //Organisational_Group getGroupDescription = db.Organisational_Group.Where(z => z.OrgGroupID == group2).FirstOrDefault();
                                //groups += ", " + getGroupDescription.Description;
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
                        if (GroupServeCheck.Count <= 3)
                        {
                            Persons_Group checkGroup = db.Persons_Group.Where(z => z.PersonGroupID == pGroup3).FirstOrDefault();
                            if (checkGroup != null)
                            {
                                checkGroup.ServeGroups = currentgroup.form.group3;
                                //db.Persons_Group.Add(NewGroupServe);


                                db.SaveChanges(); //Save nchanges and Add new position
                                groupAssigned = true;

                                //Organisational_Group getGroupDescription = db.Organisational_Group.Where(z => z.OrgGroupID == group3).FirstOrDefault();
                                //groups += ", " + getGroupDescription.Description;
                            }
                            else
                            {
                                return returnMessage = "Member already serves in this organisational group. Try selecting another group and try again.";
                            }
                        }

                        message = "You have transfered to your new group. Log into ReviveCommunications to view groups.";
                        Emailsubject = "Member group transfer Christian Revival Church (CRC) Main";
                        toMember = PersonOrgStructPosition.Email;
                        toName = PersonOrgStructPosition.Name;
                        sendEmail();
                    }


                }
                catch (Exception)
                {
                    returnMessage.Message = "Something went wrong! Please try again.";
                    return returnMessage;
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

        [System.Web.Http.Route("api/Groups/MemberGroups")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> MemberGroups(int personId)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;
            List<dynamic> dynamicMemberGroupList = new List<dynamic>();

            //Group_Type getHomecellTypeID = db.Group_Type.Where(z => z.GroupTypeName == "Homecell").FirstOrDefault();
            List<Persons_Group> memberGroup = db.Persons_Group.Include(z => z.Organisational_Group).Where(z => z.PersonID == personId).ToList();

            foreach (Persons_Group group in memberGroup)
            {

                dynamic dynamicMemberGroups = new ExpandoObject();
                dynamicMemberGroups.PersonGroup = group.PersonGroupID;
                dynamicMemberGroups.Group = group.ServeGroups;
                dynamicMemberGroups.GroupName = group.Organisational_Group.Description;
                dynamicMemberGroupList.Add(dynamicMemberGroups);

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

        [System.Web.Http.Route("api/Groups/getUnassignedMember")]
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
                        dynamicMember.City = member.City;
                        dynamicMember.OrgStructID = member.OrgStructID;

                        if (member.OrgStructID == null)
                        {
                            dynamicMember.OrgStructPosition = "None";
                        }
                        else
                        {
                            Organisational_Structure_Position personPosition = db.Organisational_Structure_Position.Where(z => z.OrgStructID == member.OrgStructID).FirstOrDefault();
                            dynamicMember.OrgStructPosition = personPosition.Description;
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
        [System.Web.Http.Route("api/Groups/MemberByID")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> MemberByID(int personId)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            return getUnassignedMemberList(db.People.Where(z => z.PersonID == personId).ToList()); // return called method
        }

        [System.Web.Http.Route("api/Groups/getGroupByPerson")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getGroupByPerson()
        {
            //Databse conncection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            //List<Organisational_Structure_Position> thisPersonGroup = db.Organisational_Structure_Position.Include(z => z.Organisational_Group).ToList();

            try
            {
                //    return PersonGroup(thisPersonGroup);
                return null;
            }
            catch (Exception e)
            {
                dynamic toRetrun = new ExpandoObject();
                toRetrun.Error = e;
                return toRetrun;
            }
        }

        public List<dynamic> PersonGroup(List<Organisational_Structure_Position> allgroups)
        {
            //Database conncection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicPersonGroups = new List<dynamic>();

            try
            {
                foreach (Organisational_Structure_Position stuctureposition in allgroups)
                {
                    dynamic dynamicPersonGroup = new ExpandoObject();
                    dynamicPersonGroup.OrgStructID = stuctureposition.OrgStructID;
                    dynamicPersonGroup.OrgStructLevel = stuctureposition.OrgStructLevel;
               
                    dynamicPersonGroup.Description = stuctureposition.Description;
                
                    dynamicPersonGroup.OrgStructTypeID = stuctureposition.OrgStructTypeID;
                    dynamicPersonGroup.OrgIndivPosId = stuctureposition.OrgIndivPosID;
                    dynamicPersonGroup.OrgStructIDReportsTo = stuctureposition.OrgStructIDReportsTo;
                  

                    dynamicPersonGroups.Add(dynamicPersonGroup);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicPersonGroups;
        }



        //*********GROUPS START************// -- Marno

        //3.7 Add group type-Marno

        [System.Web.Http.Route("api/Groups/AddGroupType")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> AddGroupType([FromBody] Group_Type AddGroupType)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            try
            {
                if (AddGroupType != null)
                {

                    db.Configuration.ProxyCreationEnabled = false;
                    db.Group_Type.Add(AddGroupType);
                    db.SaveChanges();

                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {

            }
            return GetGroupTypes();
        }


        //3.8 Search group type -Marno (This is also a view)
        [System.Web.Http.Route("api/Groups/GetGroupTypes")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> GetGroupTypes()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            db.Configuration.ProxyCreationEnabled = false;
            return GetGroupTypeList(db.Group_Type.ToList());
        }

        private List<dynamic> GetGroupTypeList(List<Group_Type> forClient)
        {
            List<dynamic> dynamicGroupTypes = new List<dynamic>();

            try
            {
                foreach (Group_Type grouptype in forClient)
                {
                    dynamic dynamicGroupType = new ExpandoObject();
                    //assign
                    dynamicGroupType.GroupTypeID = grouptype.GroupTypeID;
                    dynamicGroupType.GroupTypeName = grouptype.GroupTypeName;

                    //add to origional
                    dynamicGroupTypes.Add(dynamicGroupType);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicGroupTypes;
        }


        //3.9 Update group type - Marno
        [System.Web.Http.Route("api/Groups/UpdateGroupType")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> UpdateFood([FromBody] Group_Type newGroupType)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            try
            {
                Group_Type updater = db.Group_Type.Where(x => x.GroupTypeID == newGroupType.GroupTypeID).FirstOrDefault();
                updater.GroupTypeName = newGroupType.GroupTypeName;

                db.Group_Type.Attach(updater);
                db.Entry(updater).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception e)
            {

            }

            return GetGroupTypes();
        }

        //3.10 Delete group Type - Marno
        [System.Web.Http.Route("api/Groups/RemoveGroupType")]
        [System.Web.Mvc.HttpDelete]
        public List<dynamic> RemoveGroupType([FromBody] Group_Type groups)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            try
            {
                Group_Type group = db.Group_Type.Where(x => x.GroupTypeID == groups.GroupTypeID).FirstOrDefault();
                db.Group_Type.Remove(group);
                db.SaveChanges();
            }
            catch (Exception e)
            {

            }

            return GetGroupTypes();
        }

        //Get GroupType by ID
        [System.Web.Http.Route("api/Groups/GetGroupTypeByID/{GroupTypeID}")]
        [System.Web.Mvc.HttpGet]
        public dynamic GetGroupTypeByID(int GroupTypeID)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            //retrieve object where id is equal to id received
            Group_Type thisGroupType = db.Group_Type.Where(x => x.GroupTypeID == GroupTypeID).FirstOrDefault();

            try
            {
                return thisGroupType;//return object
            }
            catch (Exception e)
            {
                //else return error
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e.Message;
                return toReturn;
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
