using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using RC_API.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Data.Entity;

namespace RC_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MessagesController : ApiController
    {
        static string message = "";
        static string Emailsubject = "";
        static string toMember = "";
        static string toName = "";
        //Send Invitation
        [System.Web.Http.Route("api/Messages/SendInvitation")]
        [System.Web.Mvc.HttpPost]
        public void SendInvitation([FromBody] dynamic inv)
        {

            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;
            DbContextTransaction transaction = db.Database.BeginTransaction();

            if (inv != null) //if object not null
            {
                try
                {

                    Invitation dynamicInvitation = new Invitation();

                    //create new announcement based on Object received
                    dynamicInvitation.InvitationDate = inv.InvitationDate.ToString("yyyy-mm-dd");
                    dynamicInvitation.InvitationSenderPersonID = inv.PersonID;
                    dynamicInvitation.InvitationDetail = inv.InvitationDetail;
                    dynamicInvitation.StartTime = inv.StartTime.ToString("HH:mm"); 
                    dynamicInvitation.EndTime = inv.EndTime.ToString("HH:mm"); 
                    dynamicInvitation.Summary = inv.Summary;


                    db.Invitations.Add(dynamicInvitation);// add Invite to database
                    db.SaveChanges();//save

                    string d = inv.InvitationDetail;//write new Invite detail to string

                    Invitation created = db.Invitations.Where(x => x.InvitationDetail == d).FirstOrDefault();//retrieve created Invite



                    foreach (dynamic p in inv.SelectedReceivers)// foreach person in receiver list
                    {
                        //create new Person_Announcement entry
                        Person_Invitation person_Invitation = new Person_Invitation();
                        person_Invitation.PersonID = p.PersonID;
                        person_Invitation.InvitationID = created.InvitationID;


                        db.Person_Invitation.Add(person_Invitation);// Add to data base
                        db.SaveChanges();
                    }
                    int id = db.Invitations.OrderByDescending(x => x.InvitationID).Select(x => x.InvitationID).FirstOrDefault();

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = inv.PersonID;
                    auditLog.EventDescription = "Sent invitation with ID: "+ id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();//save
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    dynamic toReturn = new ExpandoObject();
                    toReturn = e.Message + e.InnerException;// else error 

                }


            }


        }



        //Dismiss Invitation
        [System.Web.Http.Route("api/Messages/dismissInvitation")]
        [System.Web.Mvc.HttpPost]
        public void dismissInvitation([FromBody] Invitation Inv)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            Person_Invitation thisInv = db.Person_Invitation.Where(x => x.InvitationID == Inv.InvitationID).FirstOrDefault();

            try
            {
                thisInv.InvitationStatus = true;

                db.SaveChanges();

            }
            catch (Exception e)
            {

            }

        }

        //get invitations for home screen
        [System.Web.Http.Route("api/Messages/retrieveInvitationsHome")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> retrieveInvitationsHome([FromBody] int PersonID)
        {

            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            if (PersonID == null)
            {
                return null;
            }
            //int PersonID = Person.PersonID;
            DateTime today = DateTime.Now;
            List<Person_Invitation> pI = db.Person_Invitation.Where(x => x.InvitationStatus == false && x.PersonID == PersonID).ToList();// retrieve Person's Person_Invitations



            List<dynamic> inv = new List<dynamic>();
            try
            {
                foreach (Person_Invitation p in pI)//retrieve all invitations that is linked to this person
                {
                    Invitation thisInv = db.Invitations.Where(x => x.InvitationID == p.InvitationID).FirstOrDefault();

                    dynamic i = new ExpandoObject();
                    i.title = thisInv.Summary;
                    i.date = thisInv.InvitationDate;
                    inv.Add(i);
                }
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                if (e != null)
                {
                    toReturn.Error = e.Message;
                    return toReturn;
                }
                else
                {
                    return null;
                }

            }

            return inv;

        }

            //View Invitation     

            [System.Web.Http.Route("api/Messages/retrieveInvitations")]
        [System.Web.Mvc.HttpPost]
        public List<Invitation> retrieveInvitations([FromBody] int PersonID)
        {

            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            if(PersonID == null)
            {
                return null;
            }
            //int PersonID = Person.PersonID;
            DateTime today = DateTime.Now;
            List<Person_Invitation> pI = db.Person_Invitation.Where(x => x.InvitationStatus == false && x.PersonID == PersonID).ToList();// retrieve Person's Person_Invitations



            List<Invitation> inv = new List<Invitation>();
            try
            {
                foreach (Person_Invitation p in pI)//retrieve all invitations that is linked to this person
                {
                    Invitation thisInv = db.Invitations.Where(x => x.InvitationID == p.InvitationID).FirstOrDefault();                                  
                    inv.Add(thisInv);
                }
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                if (e != null)
                {
                    toReturn.Error = e.Message;
                    return toReturn;
                }
                else
                {
                    return null;
                }
            }
            

            return inv;//display list of announcements
        }

        //retrieve invitations for person logged in for calendar view
        [System.Web.Http.Route("api/Messages/retrieveCalenderInvitations")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> retrieveCalenderInvitations([FromBody] int PersonID)
        {
            List<dynamic> calenderList = new List<dynamic>();
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            if (PersonID == null)
            {
                return null;
            }
            //int PersonID = Person.PersonID;
            DateTime today = DateTime.Now;
            List<Person_Invitation> pI = db.Person_Invitation.Where(x => x.InvitationStatus == false && x.PersonID == PersonID).ToList();// retrieve Person's Person_Invitations

            List<Invitation> inv = new List<Invitation>();
            try
            {
                foreach (Person_Invitation p in pI)//retrieve all invitations that is linked to this person
                {
                    Invitation thisInv = db.Invitations.Where(x => x.InvitationID == p.InvitationID).FirstOrDefault();
                    dynamic calenderDynamic = new ExpandoObject();
                    calenderDynamic.title = thisInv.InvitationDetail;
                    calenderDynamic.date = thisInv.InvitationDate;
                    calenderList.Add(calenderDynamic);
                }
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                if (e != null)
                {
                    toReturn.Error = e.Message;
                    return toReturn;
                }
                else
                {
                    return null;
                }
            }
            return calenderList;//display list of announcements
        }


        //Announcemnets
        [System.Web.Http.Route("api/Messages/GetPeople")]
        [System.Web.Mvc.HttpGet]
        public List<Person> GetPeople()
        {

            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<Person> people = db.People.ToList();

            return people;
        }

        //get Announcements
        [System.Web.Http.Route("api/Messages/retrieveAllAnnouncements")]
        [System.Web.Mvc.HttpPost]
        public List<Announcement> retrieveAllAnnouncements([FromBody] dynamic person)
        {
            int id = person.PersonID;
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<Announcement> ann = db.Announcements.Where(x => x.AnnouncementSenderID == id).ToList();
            return ann;//display list of announcements
        }

        //get Persons Announcements
        [System.Web.Http.Route("api/Messages/retrieveAnnouncements")]
        [System.Web.Mvc.HttpPost]
        public List<Announcement> retrieveAnnouncements([FromBody] int pp)
        {

            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            // List<Person_Announcement> pA = db.Person_Announcement.Where(o => o.PersonID == PersonID).ToList();// retrieve Person's Person_Announcements
            if (pp == null)
            {
                return null;
            }
            List<Person_Announcement> pA = db.Person_Announcement.Where(x => x.AnnouncementStatus == false && x.PersonID == pp).ToList();// retrieve Person's Person_Announcements

          
            List<Announcement> ann = new List<Announcement>();

            try
            {
                foreach (Person_Announcement p in pA)//retrieve all announcements that is liked to this person
                {
                    ann.Add(db.Announcements.Where(x => x.AnnouncementID == p.AnnouncementID).FirstOrDefault());
                }
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                if (e != null)
                {
                    toReturn.Error = e.Message;
                    return toReturn;
                }
                else
                {
                    return null;
                }
            }

            return ann;//display list of announcements
        }

        //Delete Announcement
        [System.Web.Http.Route("api/Messages/delAnnouncement")]
        [System.Web.Mvc.HttpPost]
        public void delAnnouncement([FromBody] dynamic announcement)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            int id = announcement.ann.AnnouncementID;
            List<Person_Announcement> thisAnn = db.Person_Announcement.Where(x => x.AnnouncementID == id).ToList();

            try
            {
                foreach (Person_Announcement a in thisAnn)
                {
                    db.Person_Announcement.Remove(a);
                }

                Announcement x = db.Announcements.Where(d => d.AnnouncementID == id).FirstOrDefault();
                db.Announcements.Remove(x);

                Audit_Trail auditLog = new Audit_Trail();
                auditLog.PersonID = announcement.PersonID;
                auditLog.EventDescription = "Removed announcement with ID: " + id;
                auditLog.EventDateTime = DateTime.Now;
                db.Audit_Trail.Add(auditLog);

                db.SaveChanges();

            }
            catch (Exception e)
            {

            }

        }


        //Dismiss Announcement
        [System.Web.Http.Route("api/Messages/dismissAnnouncement")]
        [System.Web.Mvc.HttpPost]
        public void dismissAnnouncement([FromBody] Announcement announcement)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            Person_Announcement thisAnn = db.Person_Announcement.Where(x => x.AnnouncementID == announcement.AnnouncementID).FirstOrDefault();

            try
            {
                thisAnn.AnnouncementStatus = true;

                db.SaveChanges();

            }
            catch (Exception e)
            {

            }

        }

        [System.Web.Http.Route("api/Messages/PostAnnouncement")]
        [System.Web.Mvc.HttpPost]
        public void PostAnnouncement([FromBody] dynamic announcement)
        {

            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;
            DbContextTransaction transaction = db.Database.BeginTransaction();

            if (announcement != null) //if object not null
            {
                try
                {

                    Announcement dynamicAnnouncement = new Announcement();

                    //create new announcement based on Object received
                    ////dynamicAnnouncement.AnnouncementDate = DateTime.Today;
                    dynamicAnnouncement.AnnouncementSenderID = announcement.PersonID;
                    dynamicAnnouncement.AnnouncementDetail = announcement.AnnouncementDetail;
                    dynamicAnnouncement.AnnouncementDate = DateTime.Today.ToString("yyyy-MM-dd");

                    db.Announcements.Add(dynamicAnnouncement);// add Announcement to database
                    db.SaveChanges();//save

                    string d = announcement.AnnouncementDetail;//write new announcement detail to string

                    Announcement created = db.Announcements.Where(x => x.AnnouncementDetail == d).FirstOrDefault();//retrieve created announcement



                    foreach (dynamic p in announcement.SelectedReceivers)// foreach person in receiver list
                    {
                        //create new Person_Announcement entry
                        Person_Announcement dynamicPerson_Announcement = new Person_Announcement();
                        dynamicPerson_Announcement.PersonID = p.PersonID;
                        dynamicPerson_Announcement.AnnouncementID = created.AnnouncementID;


                        db.Person_Announcement.Add(dynamicPerson_Announcement);// Add to data base
                    }

                    int id = db.Announcements.OrderByDescending(x => x.AnnouncementID).Select(x => x.AnnouncementID).FirstOrDefault();

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = announcement.PersonID;
                    auditLog.EventDescription = "Posted announcement with ID: " + id;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();//save
                    transaction.Commit();
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    dynamic toReturn = new ExpandoObject();
                    toReturn = e.Message + e.InnerException;// else error 

                }


            }

        }
    }
}