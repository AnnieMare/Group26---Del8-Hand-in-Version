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
using System.Data.Entity;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;


namespace RC_API.Controllers
{
    public class CounsellingController : ApiController
    {
        static string message = "";
        static string Emailsubject = "";
        static string toMember = "";
        static string toName = "";
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        // 8.1 add counselling request
        [System.Web.Http.Route("api/Counselling/AddCounsellingRequest")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> AddCounsellingRequest([FromBody] Counselling_Request AddCounsellingRequest)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            if (AddCounsellingRequest != null)
            {

                db.Configuration.ProxyCreationEnabled = false;

                string PhoneNumber = db.People.Where(x => x.PersonID == AddCounsellingRequest.PersonID).Select(o => o.Number).FirstOrDefault();
                string MemberName = db.People.Where(x => x.PersonID == AddCounsellingRequest.PersonID).Select(o => o.Name).FirstOrDefault();

                AddCounsellingRequest.PhoneNumber = PhoneNumber;


                db.Counselling_Request.Add(AddCounsellingRequest);
                db.SaveChanges();
               

                List<string> SentimentAnalysis = AddCounsellingRequest.CounsellingDescription.ToLower().Split(' ').ToList();
                List<Sentiment_Analysis> getCriticalWords = db.Sentiment_Analysis.ToList();

                for (int i = 0; i < SentimentAnalysis.Count(); i++)
                {
                    string wordCheck = SentimentAnalysis[i].Replace(".", "") + "\r\n";
                    foreach (var word in getCriticalWords)
                    {
                        if (wordCheck == word.CriticalWord.ToLower())
                        {
                            message = AddCounsellingRequest.CounsellingDescription;
                            Emailsubject = "Alert - Urgent Counselling Request";
                            toName = MemberName;
                            sendEmail();
                        }
                    }
                }
                return GetCounsellingRequest();
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
            var to = new EmailAddress(getKey.FromEmail, toName);
            var plainTextContent = message;
            var htmlContent = "Good day " + toName + "<br><br>" + message + "<br><br>  From" + "<br> Revive Communications";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }

        //8.2 view counselling request/ response
        [System.Web.Http.Route("api/Counselling/GetCounsellingRequest")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> GetCounsellingRequest()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            db.Configuration.ProxyCreationEnabled = false;
            return GetCounsellingRequestList(db.Counselling_Request.ToList());
        }

        private List<dynamic> GetCounsellingRequestList(List<Counselling_Request> forClient)
        {
            List<dynamic> dynamicCounsellingRequests = new List<dynamic>();
            foreach (Counselling_Request counselling in forClient)
            {
                dynamic dynamicCounsellingRequest = new ExpandoObject();
                //assign
                dynamicCounsellingRequest.CounsellingRequestID = counselling.CounsellingRequestID;
                dynamicCounsellingRequest.PersonID = counselling.PersonID;
                dynamicCounsellingRequest.CounsellingDescription = counselling.CounsellingDescription;
                dynamicCounsellingRequest.PhoneNumber = counselling.PhoneNumber;
                //add to origional
                dynamicCounsellingRequests.Add(dynamicCounsellingRequest);
            }
            return dynamicCounsellingRequests;
        }

        //8.3 add counselling response
        [System.Web.Http.Route("api/Counselling/AddCounsellingResponse")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> AddCounsellingResponse([FromBody] Counselling AddCounsellingResponse)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            if (AddCounsellingResponse != null)
            {

                db.Configuration.ProxyCreationEnabled = false;
                db.Counsellings.Add(AddCounsellingResponse);
                db.SaveChanges();
                return GetCounsellingResponse();
            }
            else
            {
                return null;
            }
        }
        //view counsellingResponse
        [System.Web.Http.Route("api/Counselling/GetCounsellingResponse")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> GetCounsellingResponse()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            db.Configuration.ProxyCreationEnabled = false;
            return GetCounsellingResponseList(db.Counsellings.ToList());
        }

        private List<dynamic> GetCounsellingResponseList(List<Counselling> forClient)
        {
            List<dynamic> dynamicCounsellingResponses = new List<dynamic>();
            foreach (Counselling counselling in forClient)
            {
                dynamic dynamicCounsellingResponse = new ExpandoObject();
                //assign
                dynamicCounsellingResponse.CounsellingID = counselling.CounsellingID;
                dynamicCounsellingResponse.CounsellingResponse = counselling.CounsellingResponse;

                //add to origional
                dynamicCounsellingResponses.Add(dynamicCounsellingResponse);
            }
            return dynamicCounsellingResponses;
        }

        //8.4 resolve counselling request
        [System.Web.Http.Route("api/Counselling/ResolveCounselling")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> ResolveCounselling([FromBody] Counselling_Request groups)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            Counselling_Request group = db.Counselling_Request.Where(x => x.CounsellingRequestID == groups.CounsellingRequestID).FirstOrDefault();
            db.Counselling_Request.Remove(group);
            db.SaveChanges();
            return GetCounsellingRequest();
        }
        //check for push
        //Get GroupType by ID
        /*  [System.Web.Http.Route("api/Counselling/GetCounsellingByID")]
          [System.Web.Mvc.HttpGet]
          public dynamic GetCounsellingByID(dynamic CounsellingReqID)
          {
              ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
              db.Configuration.ProxyCreationEnabled = false;

              int id = CounsellingReqID;

              //retrieve object where id is equal to id received
              Counselling_Request thisCounsellingType = db.Counselling_Request.Where(x => x.CounsellingRequestID == id).FirstOrDefault();
              try
              {
                  return thisCounsellingType;//return object
              }
              catch (Exception e)
              {
                  //else return error
                  dynamic toReturn = new ExpandoObject();
                  toReturn.Error = e.Message;
                  return toReturn;
              }
          }*/

       // //Get GroupType by ID
       // [System.Web.Http.Route("api/Counselling/GetCounsellingByID/{CounsellingID}")]
       // [System.Web.Mvc.HttpGet]
       // public dynamic GetCounsellingByID(int CounsellingRequestID)

       //// public dynamic GetCounsellingByID(int CounsellingID)

       // {
       //     ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
       //     db.Configuration.ProxyCreationEnabled = false;

       //     int id = CounsellingRequestID;

       //     //retrieve object where id is equal to id received

       //     //Counselling_Request thisCounsellingType = db.Counselling_Request.Where(x => x.CounsellingRequestID == CounsellingRequestID).FirstOrDefault();

       //     dynamic fullPerson = new ExpandoObject();

       //     fullPerson = db.Counselling_Request.Where(x => x.CounsellingRequestID == id).Include(x => x.Person).FirstOrDefault();

       //    Counselling_Request thisCounsellingType = db.Counselling_Request.Where(x => x.CounsellingRequestID == id).FirstOrDefault();

       //     try
       //     {
       //         return fullPerson;//return object
       //     }
       //     catch (Exception e)
       //     {
       //         //else return error
       //         dynamic toReturn = new ExpandoObject();
       //         toReturn.Error = e.Message;
       //         return toReturn;
       //     }


            [System.Web.Http.Route("api/Counselling/GetCounsellingByID/{ID}")]
            [System.Web.Mvc.HttpGet]
            public dynamic GetCounsellingByID(int ID)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
                db.Configuration.ProxyCreationEnabled = false;

                //retrieve object where id is equal to id received
                Counselling_Request thisRequest = db.Counselling_Request.Where(x => x.CounsellingRequestID == ID).Include("Person").FirstOrDefault();

            dynamic counsellingReq = new ExpandoObject();
            counsellingReq = db.Counselling_Request.Where(x => x.CounsellingRequestID == ID).FirstOrDefault();
                try
                {
                    return thisRequest;//return object
                }
                catch (Exception e)
                {
                    //else return error
                    dynamic toReturn = new ExpandoObject();
                    toReturn.Error = e.Message;
                    return toReturn;
                }
            }
        }
    }

