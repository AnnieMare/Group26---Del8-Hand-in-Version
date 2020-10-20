using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using RC_API.Models;
using System.Web.Http.Cors;
using System.Dynamic;
using System.Web.UI.WebControls;
using System.Net.Http;
using System.Net;
using System.Data.Entity;

namespace RC_API.Controllers
{
    public class DiscipleshipController : ApiController
    {

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        //*********CRUD DISCIPLESHIP START************//


        //CREATE DISCIPLESHIP
        [System.Web.Http.Route("api/Discipleship/addDiscipleship")]
        [System.Web.Mvc.HttpPost]
        public dynamic addDiscipleship([FromBody] dynamic discipleship)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;


            dynamic toReturn = new ExpandoObject();

            string d = discipleship.DiscipleshipDescription;
            DbContextTransaction transaction = db.Database.BeginTransaction();
            try
            {
                //retrieve similar data
                List<Discipleship> disc = db.Discipleships.Where(x => x.DiscipleshipDescription == d).ToList();

                if (disc.Count == 0)
                {
                    
                   
                    Discipleship thisDiscipleship = new Discipleship();
                    thisDiscipleship.DiscipleshipDescription = discipleship.DiscipleshipDescription;

                    //If no similar entry exists add to db
                    db.Discipleships.Add(thisDiscipleship);
                    db.SaveChanges();

                    Discipleship NewDisc = db.Discipleships.Where(x => x.DiscipleshipDescription == thisDiscipleship.DiscipleshipDescription).FirstOrDefault();


                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = discipleship.PersonID;
                    auditLog.EventDescription = "Added a Discipleship with ID: " + NewDisc.DiscipleshipID + " and Name: " + NewDisc.DiscipleshipDescription;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    db.SaveChanges();//save

                    transaction.Commit();
                   
                }
                else
                {
                    //else return error
                    toReturn.Error = "Similar already exists";
                    return toReturn;
                }



            }
            catch (Exception e)
            {
                transaction.Rollback();
                // if error occurs return error
                toReturn.Error = e.Message + e.InnerException;
                return toReturn;

            }

            return getAllDiscipleships();


        }


        //READ ALL DISCIPLESHIPS 
        [System.Web.Http.Route("api/Discipleship/getAllDiscipleships")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllDiscipleships()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;


            try
            {
                //retrieve all 
                List<Discipleship> Disc = db.Discipleships.ToList();
                return getDiscipleshipList(Disc);


            }
            catch (Exception e)
            {
                //else return null
                return null;
                //dynamic toReturn = new ExpandoObject();
                //toReturn.Error = e.Message;
                //return toReturn;
            }

        }


        public List<dynamic> getDiscipleshipList(List<Discipleship> allDiscipleships)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicDiscipleships = new List<dynamic>();
            //get dynamic object list

            try
            {
                foreach (Discipleship thisDiscipleship in allDiscipleships)
                {
                    dynamic dynamicDiscipleship = new ExpandoObject();

                    dynamicDiscipleship.DiscipleshipID = thisDiscipleship.DiscipleshipID;
                    dynamicDiscipleship.DiscipleshipDescription = thisDiscipleship.DiscipleshipDescription;

                    dynamicDiscipleships.Add(dynamicDiscipleship);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicDiscipleships;

        }



        //Get Discipleship by ID
        [System.Web.Http.Route("api/Discipleship/GetDiscipleshipByID/{DiscipleshipID}")]
        [System.Web.Mvc.HttpGet]
        public dynamic GetDiscipleshipByID(int DiscipleshipID)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            //retrieve object where id is equal to id received
            Discipleship thisDiscipleship = db.Discipleships.Where(x => x.DiscipleshipID == DiscipleshipID).FirstOrDefault();

            try
            {
                return thisDiscipleship;//return object
            }
            catch (Exception e)
            {
                //else return error
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e.Message;
                return toReturn;
            }
        }


        //UPDATE DISCIPLESHIP
        [System.Web.Http.Route("api/Discipleship/updateDiscipleship")]
        [System.Web.Mvc.HttpPost]
        public dynamic updateDiscipleship([FromBody] dynamic currentDiscipleship)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;


            string d = currentDiscipleship.DiscipleshipDescription;
            int id = currentDiscipleship.DiscipleshipID;
            //retrieve selected object
            Discipleship thisDiscipleship = db.Discipleships.Where(i => i.DiscipleshipID == id).FirstOrDefault();

            //alter attributes
            thisDiscipleship.DiscipleshipID = currentDiscipleship.DiscipleshipID;
            thisDiscipleship.DiscipleshipDescription = currentDiscipleship.DiscipleshipDescription;
            dynamic toReturn = new ExpandoObject();
            try
            {
                //check for similar
                List<Discipleship> disc = db.Discipleships.Where(x => x.DiscipleshipDescription == d).ToList();

                if (disc.Count == 0)
                {

                    Audit_Trail auditLog = new Audit_Trail();
                    auditLog.PersonID = currentDiscipleship.PersonID;
                    auditLog.EventDescription = "Updated a Discipleship with ID: " + thisDiscipleship.DiscipleshipID + " to have Name: " + thisDiscipleship.DiscipleshipDescription;
                    auditLog.EventDateTime = DateTime.Now;
                    db.Audit_Trail.Add(auditLog);

                    //if not similar save
                    db.SaveChanges();
                    return getAllDiscipleships();
                }
                else
                {
                    //else return error
                    toReturn.Error = "Similar already exists";
                    return toReturn;
                }
            }
            catch (Exception e)
            {
                //else error
                toReturn.Error = e.Message + e.InnerException;
                return toReturn;
            }

        }


        //DELETE DISCIPLESHIP
        [System.Web.Http.Route("api/Discipleship/delDiscipleship")]
        [System.Web.Mvc.HttpPost]
        public dynamic delDiscipleship([FromBody] dynamic currentDiscipleship)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;


            int id = currentDiscipleship.discipleship.DiscipleshipID;
 try
            {
            //retrieve selected
            Discipleship thisDiscipleship = db.Discipleships.Where(x => x.DiscipleshipID == id).FirstOrDefault();


                Audit_Trail auditLog = new Audit_Trail();
                auditLog.PersonID = currentDiscipleship.userID;
                auditLog.EventDescription = "Deleted a Discipleship with ID: " + thisDiscipleship.DiscipleshipID + " and Name: " + thisDiscipleship.DiscipleshipDescription;
                auditLog.EventDateTime = DateTime.Now;
                db.Audit_Trail.Add(auditLog);

                //remove from db
                db.Discipleships.Remove(thisDiscipleship);
                //save
                db.SaveChanges();
                return getAllDiscipleships();
            }
            catch (Exception e)
            {
                //else error
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e.Message;
                return toReturn;
            }

        }

        //*********CRUD DISCIPLESHIP END************//
    }
}
