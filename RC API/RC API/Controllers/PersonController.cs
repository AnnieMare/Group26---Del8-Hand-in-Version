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

namespace RC_API.Controllers
{
    // [EnableCors(origins: "", headers: "", methods: "*")]

    public class PersonController : ApiController
    {
        ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

        dynamic toReturn = new ExpandoObject();

        //Update Person
        [HttpPost]
        [Route("api/Person/UpdatePerson")]
        public IHttpActionResult UpdatePerson(Person psn)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Person objEmp = new Person();
                objEmp = db.People.Find(psn.PersonID);
                if (objEmp != null)
                {
                    objEmp.Name = psn.Name;
                    objEmp.Surname = psn.Surname;
                    objEmp.Address = psn.Address;
                    objEmp.Suburb = psn.Suburb;
                    objEmp.City = psn.City;
                    objEmp.Number = psn.Number;
                    objEmp.Email = psn.Email;

                }
                db.SaveChanges();

            }
            catch (Exception e)
            {

                toReturn.Error = e.Message;
                return toReturn;

            }
            return Ok(psn);
        }

        //------------------------------------------Search Person--------------------------------------------

        [System.Web.Http.Route("api/Person/getAllPersons")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllPersons()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                return getAllPersonReturnList(db.People.ToList());
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }

        public List<dynamic> getAllPersonReturnList(List<Person> allPeople)
        {
            //Database conncection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
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
                    dynamicPerson.City = person.City;
                    dynamicPerson.Suburb = person.Suburb;
                    dynamicPerson.Activation_Status_ID = person.Activation_Status_ID;

                    dynamicPeople.Add(dynamicPerson);
                }
            }
            catch (Exception e)
            {

            }


            return dynamicPeople;
        }
    }
}