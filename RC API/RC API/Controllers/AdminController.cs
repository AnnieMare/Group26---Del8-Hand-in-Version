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

namespace RC_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AdminController : ApiController
    {

        //get Audit log
        [System.Web.Http.Route("api/Admin/getAuditTrail")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getAuditTrail()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

            List<dynamic> auditTrailList = new List<dynamic>();
             foreach(Audit_Trail a in db.Audit_Trail.OrderByDescending(x => x.AuditTrailID))
            {
                //get person details and Audit trail details
                dynamic AT = new ExpandoObject();

                var person = db.People.Where(x => x.PersonID == a.PersonID).FirstOrDefault();


                AT.Person = "[ID: " + person.PersonID + "] " + person.Name + " " + person.Surname;
                AT.EventDateTime =  a.EventDateTime.ToString("yyyy-MM-dd HH:mm:ss"); 
                AT.EventDescription = a.EventDescription;

                auditTrailList.Add(AT);

            }

            return auditTrailList;

        }

        [System.Web.Http.Route("api/Admin/filterAuditTrail")]
        [System.Web.Mvc.HttpPost]
        public dynamic filterAuditTrail([FromBody] dynamic filter)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

            if (filter != null)
            {
                try
                {
                    DateTime start = filter.StartDate;
                    DateTime end = filter.EndDate;
                    int PersonID = filter.selectedResponsiblePerson;

                    List<Audit_Trail> filteredList = db.Audit_Trail.OrderByDescending(x => x.AuditTrailID).Where(x => x.PersonID == PersonID && x.EventDateTime >= start && x.EventDateTime <= end).ToList();


                    List<dynamic> auditTrailList = new List<dynamic>();
                    foreach (Audit_Trail a in filteredList)
                    {
                        //get person details and Audit trail details
                        dynamic AT = new ExpandoObject();

                        var person = db.People.Where(x => x.PersonID == a.PersonID).FirstOrDefault();


                        AT.Person = "[ID: " + person.PersonID + "] " + person.Name + " " + person.Surname;
                        AT.EventDateTime = a.EventDateTime.ToString("yyyy-MM-dd HH:mm:ss");
                        AT.EventDescription = a.EventDescription;

                        auditTrailList.Add(AT);

                    }

                    return auditTrailList;
                }
                catch
                {
                    dynamic toReturn = new ExpandoObject();
                    toReturn.ErrorMessage = "Your Search Query was incomplete. Please ensure all fields are filled.";
                    return toReturn;
                }
            }
            else
            {
                List<dynamic> auditTrail = new List<dynamic>();
                auditTrail = getAuditTrail();
                return auditTrail;
            }

        }

        [System.Web.Http.Route("api/Admin/getResponsiblePeople")]
        [System.Web.Mvc.HttpGet]
        public List<Person> getResponsiblePeople()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

            List<Person> people = new List<Person>();

            foreach (Audit_Trail i in db.Audit_Trail.ToList())
            {

                Person person = db.People.Where(x => x.PersonID == i.PersonID).FirstOrDefault();
              
                    people.Add(person);
               
            }

            List<Person> PeopleList = people.Distinct().ToList();

            return PeopleList;
        }


        //2.5 Join org group-Marno
        [System.Web.Http.Route("api/Admin/getGroupTypes")]
        [System.Web.Mvc.HttpPost]
        public List<Organisational_Group> getGroupTypes()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

            return db.Organisational_Group.Where(x => x.GroupTypeID != 21).ToList();

        }



        //MArno
        [System.Web.Http.Route("api/Admin/JoinOrgGroup")]
        [System.Web.Mvc.HttpPost]
        public void JoinOrgGroup([FromBody] dynamic JoinOrgGroup)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;
            //JoinOrgGroup.FollowUpStatus = false;
            //JoinOrgGroup.NoAnswer = false;
            DateTime date = DateTime.Today;
            //JoinOrgGroup.FollowUpDate = date;
            if (JoinOrgGroup != null)
            {
                try
                {
                    Members_Serve_Follow_Up members_Serve = new Members_Serve_Follow_Up();
                    members_Serve.PersonID = JoinOrgGroup.PersonID;
                    members_Serve.ZonePastor = JoinOrgGroup.ZonePastor;
                    members_Serve.FollowUpStatus = false;
                    members_Serve.NoAnswer = false;
                    members_Serve.FollowUpDate = DateTime.Today;
                    members_Serve.SpiritualGiftTestSession = JoinOrgGroup.SpiritualGiftTestSession;
                    members_Serve.HighestSpiritualGifts = JoinOrgGroup.HighestSpiritualGifts;
                    members_Serve.Group1 = JoinOrgGroup.Group1;
                    members_Serve.Group2 = JoinOrgGroup.Group2;
                    members_Serve.Group3 = JoinOrgGroup.Group3;

                    members_Serve.Homecell = JoinOrgGroup.Homecell;

                    db.Members_Serve_Follow_Up.Add(members_Serve);
                    db.SaveChanges();
                }
                catch (Exception e)
                {

                }

            }

        }


    }
}
