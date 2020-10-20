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
using System.Security.Cryptography;

namespace RC_API.Controllers
{
    public class HomecellNotesController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        //*********CRD HomecellNotes START  - Charl ************//

        //2.23 Add Homecell Notes
        [System.Web.Http.Route("api/HomecellNotes/AddHomecellNotes")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic AddHomecellNotes(dynamic HomecellNotesName) //get string parameter
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            dynamic returnMessage = new ExpandoObject();
            string file = HomecellNotesName.FileName;

            //check if notes where already added
            Homecell_Notes checkNotes = db.Homecell_Notes.Where(z => z.HomecellNotes == file).FirstOrDefault();
            Homecell_Notes newHomecellNotes = new Homecell_Notes(); //create object of type Homecell_Notes to add to the database

            if (checkNotes == null)//check to see if notes already exist in the databse
            {
                newHomecellNotes.UploadDate = DateTime.Today;
                newHomecellNotes.HomecellNotes = file;
                db.Homecell_Notes.Add(newHomecellNotes);
                db.SaveChanges();

                //retrieve Homecell notes to remove based on selected Homecell notes
                Homecell_Notes HCNotes = db.Homecell_Notes.Where(z => z.HomecellNotes == file).FirstOrDefault();

                //Add to Audit trail entity
                Audit_Trail auditLog = new Audit_Trail();
                auditLog.PersonID = HomecellNotesName.PersonID;
                auditLog.EventDescription = "Added Homecell Notes with with ID: " + HCNotes.HCNID;
                auditLog.EventDateTime = DateTime.Now;
                db.Audit_Trail.Add(auditLog);
                db.SaveChanges();

                returnMessage = "Successfull";

            }
            else //if it exist an error message is returned.
            {
                returnMessage = "The file you are trying to upload, has already been uploaded. Please try again by uploading a different file.";
            }

            return returnMessage; //return message to Angular
        }


        //Get all Homecell Notes from the database
        [System.Web.Http.Route("api/HomecellNotes/getHomecellNotes")] //create route for api
        [System.Web.Mvc.HttpGet]

        public List<dynamic> getHomecellNotes()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

            return HCNotesInformation(db.Homecell_Notes.ToList()); // return called method
        }

        public List<dynamic> HCNotesInformation(List<Homecell_Notes> HomecellNotesTable)
        {
            List<dynamic> dynamicHCNotesList = new List<dynamic>(); //create a dynamic list for method return

            //foreach method ro retrieve data from database and add it to list to return
            foreach (var HCNotes in HomecellNotesTable)
            {
                //create new dynamic object 
                dynamic dynamicHCNotes = new ExpandoObject();
                dynamicHCNotes.HCNID = HCNotes.HCNID;
                dynamicHCNotes.HomecellNotes = HCNotes.HomecellNotes;
                dynamicHCNotes.UploadDate = HCNotes.UploadDate;

                // add to dynamic list to return
                dynamicHCNotesList.Add(dynamicHCNotes);
            }

            return dynamicHCNotesList; //return list
        }


        [System.Web.Http.Route("api/HomecellNotes/removeHomecellNotes")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic removeHomecellNotes(dynamic HomecellNotesName) //get string parameter
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

            try
            {
                string file = HomecellNotesName.FileName;
                //retrieve Homecell notes to remove based on selected Homecell notes
                Homecell_Notes HCNotes = db.Homecell_Notes.Where(z => z.HomecellNotes == file).FirstOrDefault();
                db.Homecell_Notes.Remove(HCNotes);
                
                //Add to Audit trail entity
                Audit_Trail auditLog = new Audit_Trail();
                auditLog.PersonID = HomecellNotesName.PersonID;
                auditLog.EventDescription = "Removed Homecell Notes with with ID: " + HCNotes.HCNID;
                auditLog.EventDateTime = DateTime.Now;
                db.Audit_Trail.Add(auditLog);

                db.SaveChanges();
            }
            catch (Exception)
            {
                return null;
            }

            return getHomecellNotes();
        }

        //This endpoint is used to retrieve specific notes for the search functionality
        [System.Web.Http.Route("api/HomecellNotes/HomecellNotesByID")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> HomecellNotesByID([FromBody] Homecell_Notes HomecellNotesID)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection
            db.Configuration.ProxyCreationEnabled = false; // configure proxy to eliminate overload of memory

            if (HomecellNotesID.HCNID == 0) // if ID is zero all Homecell notes needs to be retrieved by calling the getHomecellNotes method
            {
                return getHomecellNotes(); // return called method
            }

            //if condition and return not met return only the selected Homecell notes
            return HCNotesInformation(db.Homecell_Notes.Where(z => z.HCNID == HomecellNotesID.HCNID).ToList()); // return called method with where clause
        }
    }
}

