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

namespace RC_API.Controllers
{
    public class SalvationController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]

        //1.5 Add Salvation information -Charl
        [System.Web.Http.Route("api/Salvation/addSalvationInformation")] //create route for api
        [System.Web.Mvc.HttpPost]
        public dynamic addSalvationInformation([FromBody] Salvation newSalvation) //get JSON parameter
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            dynamic returnMessage = new ExpandoObject();
            //validate that there is no null values
            if (newSalvation != null)
            {

                if (newSalvation.Name == "" || newSalvation.Surname == "" ||
                    newSalvation.Age == "" || newSalvation.EmploymentStatus == "" || newSalvation.MaritualStatus == "")
                {
                    return returnMessage.Message = "Please make sure that all information is provided under Tell us more about yourself.";
                }
                else if (newSalvation.ResidentialAddress == "" || newSalvation.CellPhone == "" || newSalvation.Email == "" || newSalvation.City == "" || newSalvation.Suburb == "")
                {
                    return returnMessage.Message = "Please make sure that all information is provided atleast your full residential address, cellphone number and E-mail address.";
                }
                else
                {
                    try
                    {
                        //Set date before saving to database
                        newSalvation.Date = DateTime.Today;
                        //Set follow-up values to false
                        newSalvation.FollowedUp = false;
                        newSalvation.NoAnswer = false;
                        db.Salvations.Add(newSalvation); //add new salvation to Salvations table
                        db.SaveChanges();

                        return returnMessage.Message = "All done! We received your information. We really encourage you to visit us again";
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
    }
}


