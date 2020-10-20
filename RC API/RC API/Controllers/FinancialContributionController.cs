using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Web.Http.Cors;
using RC_API.Models;
using System.Dynamic;

namespace RC_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FinancialContributionController : ApiController
    {
        //*********FINANCIAL CONTRIBUTION START************//
        //Read all churc banking information
        [System.Web.Http.Route("api/FinancialContribution/getAllChurches")]
        [System.Web.Mvc.HttpGet]

        public List<dynamic> getAllChurches()
        {
            //Connection to database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                return getChurchesReturnList(db.Church_Banking_Details.ToList());
            }
            catch (Exception err)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = err;
                return toReturn;
            }
        }

        public List<dynamic> getChurchesReturnList(List<Church_Banking_Details> allChurches)
        {
            //Connection to database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            //Creating a dynamic list of the churches
            List<dynamic> dynamicChurches = new List<dynamic>();

            foreach (Church_Banking_Details thisChurch in allChurches)
            {
                //creating a dynamic object of the churches
                dynamic dynamicChurch = new ExpandoObject();

                //Retrieve all the church information from the Church_Banking_Details table and saving the info as a dynamic object
                dynamicChurch.ChurchBankID = thisChurch.ChurchBankID;
                dynamicChurch.ChurchName = thisChurch.ChurchName;
                /*dynamicChurch.Bank = thisChurch.Bank;
                dynamicChurch.AccountName = thisChurch.AccountName;
                dynamicChurch.AccountNumber = thisChurch.AccountNumber;
                dynamicChurch.BranchCode = thisChurch.BranchCode;
                dynamicChurch.Reference = thisChurch.Reference;*/

                //Adding the dynmic object to the dynamic list to be returned
                dynamicChurches.Add(dynamicChurch);
            }
            return dynamicChurches;
        }

        //Get church name by ID
        [System.Web.Http.Route("api/FinancialContribution/getChurchByID")]
        [System.Web.Mvc.HttpGet]

        public Church_Banking_Details getChurchByID(int ChurchBankID)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            Church_Banking_Details thisChurch = db.Church_Banking_Details.Where(z => z.ChurchBankID == ChurchBankID).FirstOrDefault();

            try
            {
                return thisChurch;
            }
            catch (Exception err)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = err;
                return toReturn;
            }
        }

        //Get Church banking Details
        [System.Web.Http.Route("api/FinancialContribution/getAllChurchBankingDetails")]
        [System.Web.Mvc.HttpGet]

        public List<dynamic> getAllChurchBankingDetails()
        {
            //Connection to database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                return getChurchBankingReturnList(db.Church_Banking_Details.ToList());
            }
            catch (Exception err)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = err;
                return toReturn;
            }
        }

        public List<dynamic> getChurchBankingReturnList(List<Church_Banking_Details> allChurches)
        {
            //Connection to database
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            //Creating a dynamic list of the churches
            List<dynamic> dynamicChurches = new List<dynamic>();

            foreach (Church_Banking_Details thisChurch in allChurches)
            {
                //creating a dynamic object of the churches
                dynamic dynamicChurch = new ExpandoObject();

                //Retrieve all the church information from the Church_Banking_Details table and saving the info as a dynamic object
                dynamicChurch.ChurchBankID = thisChurch.ChurchBankID;
                dynamicChurch.ChurchName = thisChurch.ChurchName;
                dynamicChurch.Bank = thisChurch.Bank;
                dynamicChurch.AccountName = thisChurch.AccountName;
                dynamicChurch.AccountNumber = thisChurch.AccountNumber;
                dynamicChurch.BranchCode = thisChurch.BranchCode;
                dynamicChurch.Reference = thisChurch.Reference;

                //Adding the dynmic object to the dynamic list to be returned
                dynamicChurches.Add(dynamicChurch);
            }
            return dynamicChurches;
        }

        //Get church banking deatils by ID
        [System.Web.Http.Route("api/FinancialContribution/getChurchBankByID")]
        [System.Web.Mvc.HttpGet]

        public Church_Banking_Details getChurchBankByID(int ChurchBankID)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            Church_Banking_Details thisChurch = db.Church_Banking_Details.Where(z => z.ChurchBankID == ChurchBankID).FirstOrDefault();

            try
            {
                return thisChurch;
            }
            catch (Exception err)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = err;
                return toReturn;
            }
        }
    }
}
