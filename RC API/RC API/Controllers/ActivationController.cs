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
using System.Web.Razor.Generator;

namespace RC_API.Controllers
{
    public class ActivationController : ApiController
    {
        //Database connection
        ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

        public static List<Person> personList = new List<Person>();

        //request reactivate
        [System.Web.Http.Route("api/Activation/Reactivate")]
        [System.Web.Mvc.HttpPost]
        public void Reactivate(Person person)
        {
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                var hash = GenerateHash(ApplySomeSalt(person.Password));
                Person p = db.People.Where(zz => zz.Username == person.Username && zz.Password == hash).FirstOrDefault();


                dynamic toReturn = new ExpandoObject();
                if (person != null)
                {
                    db.Entry(person).State = EntityState.Modified;
                    //Add Zone Pastor still to list

                    personList.Add(new Person() { Name = p.Name, Surname = p.Surname, Activation_Status_ID = p.Activation_Status_ID, PersonID = p.PersonID });
                }
                toReturn.Error = "Incorrect Username or Password";
            }
            catch (Exception e)
            {

                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
            }
        }

        //request reactivate
        [System.Web.Http.Route("api/Activation/DeActivate")]
        [System.Web.Mvc.HttpPost]
        public void DeActivate(Person person)
        {
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                var hash = GenerateHash(ApplySomeSalt(person.Password));
                Person p = db.People.Where(zz => zz.Username == person.Username && zz.Password == hash).FirstOrDefault();


                dynamic toReturn = new ExpandoObject();
                if (person != null)
                {
                    db.Entry(person).State = EntityState.Modified;
                    //Add Zone Pastor still to list

                    personList.Add(new Person() { Name = p.Name, Surname = p.Surname, Activation_Status_ID = p.Activation_Status_ID, PersonID = p.PersonID});
                }
                toReturn.Error = "Incorrect Username or Password";
            }
            catch (Exception e)
            {

                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
            }
        }

        //update activation
        [System.Web.Http.Route("api/Activation/getAllRequests")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllRequests()
        {
            return getAllRequestsReturnList(personList);
        }
        

        public List<dynamic> getAllRequestsReturnList(List<Person> allrequests)
        {
            //Database conncection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicRequests = new List<dynamic>();

            try
            {
                foreach (Person requests in personList)
                {
                    dynamic dynamicPerson = new ExpandoObject();
                    dynamicPerson.Name = requests.Name;
                    dynamicPerson.Surname = requests.Surname;
                    dynamicPerson.PersonID = requests.PersonID;
                    dynamicPerson.Activation_Status_ID = requests.Activation_Status_ID;

                    dynamicRequests.Add(personList);

                }

            }
            catch (Exception e)
            {

            }

            return dynamicRequests;
        }

        //----------
        [System.Web.Http.Route("api/Activation/updateActivation")]
        [System.Web.Mvc.HttpPost]
        public IHttpActionResult updateActivation([FromBody] dynamic currentPerson)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            //Person thisPerson = db.People.Where(z => z.PersonID == currentPerson.PersonID).FirstOrDefault();

            //Find the person current activation status id en updated the activation status id to inactive / active.

            if (currentPerson == null)
            {
                return BadRequest(ModelState);
            }


            try
            {
                int id = currentPerson.form.PersonID;
                Person psn = new Person();
                psn = db.People.Where(x => x.PersonID == id).FirstOrDefault();
                if (psn != null && psn.Activation_Status_ID == 2)
                {
                    psn.Activation_Status_ID = 1;
                }
                else if (psn != null && psn.Activation_Status_ID == 1)
                {
                    psn.Activation_Status_ID = 2;
                }
                Audit_Trail auditLog = new Audit_Trail();
                auditLog.PersonID = currentPerson.PersonID;
                auditLog.EventDescription = "Updated Member with ID: " + psn.PersonID + " to activation status " + psn.Activation_Status_ID;
                auditLog.EventDateTime = DateTime.Now;
                db.Audit_Trail.Add(auditLog);

                db.SaveChanges();


            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
            return Ok(currentPerson);
        }
        //Password hashing

        public static string ApplySomeSalt(string input)
        {
            return input + "ekhounievanuniversiteitnietuksislelikmetmyhelp";
        }

        public static string GenerateHash(string inputString)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha256.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));

            }
            return result.ToString();
        }
    }
}
