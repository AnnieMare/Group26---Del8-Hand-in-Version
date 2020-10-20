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
    public class LoginController : ApiController
    {
        static string message = "";
        static string Emailsubject = "";
        static string toMember = "";
        static string toName = "";
        //Database connection
        ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

        [System.Web.Http.Route("api/Login/RegisterPerson")]
        [System.Web.Mvc.HttpPost]
        public IHttpActionResult RegisterPerson([FromBody] Person person)
        {
            db.Configuration.ProxyCreationEnabled = false;

            dynamic toReturn = new ExpandoObject();
            var hash = GenerateHash(ApplySomeSalt(person.Password));


            if (person == null)
            {
                return BadRequest(ModelState);
            }
            try
            {
                person.Activation_Status_ID = 4;
                person.Password = hash;
                db.People.Add(person);
                db.SaveChanges();

                //string n = person.Name;
                //string s = person.Surname;
                //string num = person.Number;
                //string e = person.Email;

                //Person newPerson = db.People.Where(z => z.Name == n && z.Surname == s && z.Number == num && z.Email == e).FirstOrDefault();

                //NMO_Follow_Up newFollowUp = new NMO_Follow_Up();
                //newFollowUp.Person.PersonID = newPerson.PersonID;

                //db.NMO_Follow_Up.Add(newFollowUp);
                //db.SaveChanges();

            }
            catch (Exception e)
            {
                toReturn.Error = e.Message;
                return toReturn;
            }

            return Ok(person);
        }

        //[Route("api/Person/RegisterChild")]
        //[HttpPost]

        //public IHttpActionResult RegisterChild([FromBody] Child child)
        //{
        //    ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
        //    db.Configuration.ProxyCreationEnabled = false;


        //    dynamic toReturn = new ExpandoObject();


        //    //public IHttpActionResult PostUser(User data)
        //    {

        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }
        //        try
        //        {
        //            db.Children.Add(child);
        //            db.SaveChanges();
        //        }
        //        catch (Exception e)
        //        {

        //            toReturn.Error = e.Message;
        //            return toReturn;

        //        }
        //        return Ok(child);

        //    }


        //}



        //Person Details
        [Route("api/Login/PersonDetails")]
        [HttpPost]

        public object PersonDetails(dynamic sess)
        {

            string SessionID = sess.SessionID;
            Person person = db.People.Where(zz => zz.SessionID == SessionID).FirstOrDefault();
            if (person != null)
            {
                Organisational_Structure_Position orgStruct = db.Organisational_Structure_Position.Include(x => x.Organisational_Individual_Position).Where(z => z.OrgStructID == person.OrgStructID).FirstOrDefault();


                dynamic Person = new ExpandoObject();
                Person.PersonID = person.PersonID;
                Person.Name = person.Name;
                Person.Surname = person.Surname;
                Person.DateOfBirth = person.DateOfBirth;
                Person.Number = person.Number;
                Person.Email = person.Email;
                Person.Address = person.Address;
                Person.City = person.City;
                Person.Suburb = person.Suburb;
                Person.OrgIndivPosID = orgStruct.Organisational_Individual_Position.OrgIndivPosID;
                Person.OrgIndivPos = orgStruct.Organisational_Individual_Position.Decription;
                Person.OrgStructID = person.OrgStructID;
                Person.Assignleader = person.AssignLeader;
            
                person.Password = "You can't see this!";
                return Person;
            }
            else
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = "Invalid token!";
                return toReturn;

            }

        }



        //Login
        [Route("api/Login/Login")]
        [HttpPost]
        public object Login([FromBody] Person person)

        {

            var hash = GenerateHash(ApplySomeSalt(person.Password));
            var p = db.People.Where(zz => zz.Password == hash && zz.Username == person.Username).FirstOrDefault();

            dynamic toReturn = new ExpandoObject();


            try
            {
                if (p != null)
                {
                    if (p.Activation_Status_ID == 1)
                    {

                        Guid g = Guid.NewGuid();
                        p.SessionID = g.ToString();
                        db.Entry(p).State = EntityState.Modified;

                        db.SaveChanges();
                        toReturn.SessionID = g.ToString();
                        return toReturn;
                    }
                    else
                    {
                        toReturn.Error = "Incorrect Username or Password!";
                    }
                }
                else
                {
                    toReturn.Error = "You do not have access.";
                }



            }
            catch (Exception e)
            {
                //dynamic toReturn = new ExpandoObject();

                if (e != null)
                {
                    toReturn.Error = e.Message + e.InnerException;
                    return toReturn;
                }
                else
                {
                    return null;
                }
            }

            return toReturn;
        }

        //----------------------reset password--------------------------------------------
        //OTP

        [HttpPost]
        [Route("api/Login/SendOTP")]
        private string GenerateRandomOTP(int iOTPLength, string[] saAllowedCharacters)

        {

            string sOTP = String.Empty;

            string sTempChars = String.Empty;

            Random rand = new Random();


            for (int i = 0; i < iOTPLength; i++)

            {

                int p = rand.Next(0, saAllowedCharacters.Length);

                sTempChars = saAllowedCharacters[rand.Next(0, saAllowedCharacters.Length)];

                sOTP += sTempChars;

            }

            return sOTP;

        }

        public dynamic SendOTP([FromBody] Person psn)
        {
            string[] saAllowedCharacters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
            string sRandomOTP = GenerateRandomOTP(8, saAllowedCharacters);
            dynamic toReturn = new ExpandoObject();
            //Person getPersonInfo = db.People.Where(z => z.Username == psn.Username && z.DateOfBirth == psn.DateOfBirth).FirstOrDefault();
            //toMember = psn.Email;
            // toName = getPersonInfo.Name;

            Person p = db.People.Where(zz => zz.DateOfBirth == psn.DateOfBirth && zz.Username == psn.Username).FirstOrDefault();

            if (p != null)
            {
                try
                {
                    message = "Enter this OTP to reset your password: " + sRandomOTP;
                    Emailsubject = "Reset Password OTP";
                    toMember = p.Email;
                    p.OTP = Convert.ToInt32(sRandomOTP);
                    //db.People.Add(p);
                    db.SaveChanges();
                    
                    sendEmail();
                    return toReturn = "OTP Send";

                }
                catch (Exception e)
                {
                    //dynamic toReturn = new ExpandoObject();

                    if (e != null)
                    {
                        toReturn.Error = e.Message + e.InnerException;
                        return toReturn;
                    }
                    else
                    {
                        return null;
                    }
                }

            }
            else
            {
                toReturn.Error = "Incorrect Username or Date of Birth!";

            }

            return toReturn;

        }


        [HttpPut]
        [Route("api/Login/ResetPassword")]

        //update password
        public IHttpActionResult ResetPassword([FromBody] Person psn)
        {
            dynamic toReturn = new ExpandoObject();
            var hash = GenerateHash(ApplySomeSalt(psn.Password));
            Person p = db.People.Where(zz => zz.OTP == psn.OTP).FirstOrDefault();



            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (p != null)
            {
                try
                {
                    Person objEmp = db.People.Where(x => x.PersonID == p.PersonID).FirstOrDefault();
                    if (objEmp != null)
                    {
                        objEmp.Password = hash;


                    }
                    db.SaveChanges();


                }
                catch (Exception e)
                {
                    toReturn.Error = e.Message;
                    return toReturn;
                }
            }
         
             else
            {
                toReturn.Error = "Incorrect OTP";

            }
            return Ok(psn);
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


        [System.Web.Http.Route("api/Login/getPersonByID/{{PersonID}}")]
        [System.Web.Mvc.HttpPost]
        public dynamic getPersonByID(int PersonID)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            Person thisperson = db.People.Where(x => x.PersonID == PersonID).FirstOrDefault();

            try
            {
                return thisperson;
            }
            catch (Exception e)
            {
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
