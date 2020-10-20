using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Web.Http.Cors;
using RC_API.Models;
using System.Dynamic;
using System.Data.Entity;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;


namespace RC_API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class KidsChurchController : ApiController
    {

        static string message = "";
        static string Emailsubject = "";
        static string toMember = "";
        static string toName = "";
        //*********KidsChurch START************//

        //Read all children - Izaan
        [System.Web.Http.Route("api/KidsChurch/getAllChildren")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getAllChildren()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminatate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            // !!--User Management--!!
            //string sessionId = Request.Headers.Authorization.ToString();
            //var user = db.Where(o => o.SessionID == sessionId).FirstOrDefault();
            //if(user != null)

            try
            {
                //Return list of all children
                return getAllChildrenReturnList(db.Children.ToList());
            }
            catch (Exception e)
            {
                //Creating dynamic object to be returned with error message
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }

        public List<dynamic> getAllChildrenReturnList(List<Child> allChildren)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminatate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic list to be returned with all the children in the list in JSON format
            List<dynamic> dynamicChildren = new List<dynamic>();

            try
            {
                //Loop through each child in the list
                foreach (Child thisChild in allChildren)
                {
                    //create dynamic objecct to be added to the dynamic list to be returned
                    dynamic dynamicChild = new ExpandoObject();

                    dynamicChild.ChildID = thisChild.ChildID;
                    dynamicChild.Name = thisChild.Name;
                    dynamicChild.Surname = thisChild.Surname;
                    dynamicChild.DateOfBirth = thisChild.DateOfBirth;

                    dynamicChildren.Add(dynamicChild);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicChildren;
        }

        //Retrieve all children with associated parent information - Izaan
        [System.Web.Http.Route("api/KidsChurch/getPersonChildren")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getPersonChildren()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminatate memory overload
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic list while includin the Person_Children table for the parent information
            List<Child> children = db.Children.Include(zz => zz.Person_Children).ToList();

            try
            {
                //Return list of parent with linked children
                return getPersonChildren(children);
            }
            catch (Exception e)
            {
                dynamic toRetrun = new ExpandoObject();
                toRetrun.Error = e;
                return toRetrun;
            }
        }


        public List<dynamic> getPersonChildren(List<Child> children)
        {
            //Dynamic list
            List<dynamic> dynamicChildren = new List<dynamic>();

            try
            {
                //Loop through each child to retrieve child information
                foreach (Child child in children)
                {
                    dynamic dynamicChild = new ExpandoObject();
                    dynamicChild.ChildID = child.ChildID;
                    dynamicChild.Name = child.Name;
                    dynamicChild.Surname = child.Surname;
                    dynamicChild.DateOfBirth = child.DateOfBirth;
                    dynamicChild.PersonChildren = getAllPersonChildren(child);

                    dynamicChildren.Add(dynamicChild);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicChildren;
        }


        private List<dynamic> getAllPersonChildren(Child child)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicChildren = new List<dynamic>();

            try
            {
                foreach (Person_Children personChild in child.Person_Children)
                {
                    dynamic dynamicPersonChild = new ExpandoObject();
                    dynamicPersonChild.KidsChurchID = personChild.KidsChurchID;
                    dynamicPersonChild.KidsChurchName = db.KidsChurches.Where(x => x.KidsChurchID == personChild.KidsChurchID).Select(o => o.KidsChurchName).FirstOrDefault();
                    dynamicPersonChild.PersonID = personChild.PersonID;
                    dynamicPersonChild.ChildID = personChild.ChildID;
                    dynamicPersonChild.KCVolunteerConfirmation = personChild.KCVolunteerConfirmation;
                    dynamicPersonChild.CheckIn = personChild.CheckIn;
                    dynamicPersonChild.ChekcInDateTime = personChild.CheckInDateTime;
                    dynamicPersonChild.SignOut = personChild.SignOut;
                    dynamicPersonChild.SignOutDateTime = personChild.SignOutDateTime;

                    dynamicChildren.Add(dynamicPersonChild);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicChildren;
        }


        List<dynamic> dynamicPersonChildren = new List<dynamic>();

        // 5.1 Add child - Izaan
        [System.Web.Http.Route("api/KidsChurch/addChild")]
        [System.Web.Mvc.HttpPost]
        public dynamic addChild(dynamic child)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            dynamic returnMessage = new ExpandoObject();

            if (child != null)
            {
                if (child.Name == "" || child.Surname == "" || child.DateOfBirth == null)
                {
                    return returnMessage.Message = "Please make sure that all information is provided for your child.";
                }
                else
                {
                    try
                    {
                        Child dynamicChild = new Child();

                        dynamicChild.Name = child.Name;
                        dynamicChild.Surname = child.Surname;
                        dynamicChild.DateOfBirth = child.DateOfBirth;


                        db.Children.Add(dynamicChild);

                        db.SaveChanges();


                        string n = child.Name;
                        string s = child.Surname;
                        DateTime dob = child.DateOfBirth;


                        Child newChild = db.Children.Where(z => z.Name == n && z.Surname == s && z.DateOfBirth == dob).FirstOrDefault();

                        //List<dynamic> ParentChild = new List<dynamic>();


                        Person_Children dynamicPerson_Child = new Person_Children();
                        dynamicPerson_Child.PersonID = db.People.OrderByDescending(p => p.PersonID).Select(p => p.PersonID).FirstOrDefault();
                        dynamicPerson_Child.ChildID = newChild.ChildID;
                        //dynamicPerson_Child.KidsChurchID = 8;
                        dynamicPerson_Child.PersonID = child.PersonID;


                        db.Person_Children.Add(dynamicPerson_Child);


                        db.SaveChanges();

                        return returnMessage.Message = "All done! We received your child's information.";

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

        //Function to return all the children linked to the parents account

        [System.Web.Http.Route("api/KidsChurch/MyChildren")]
        [System.Web.Mvc.HttpPost]

        public List<dynamic> MyChildren([FromBody] Person parent)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();


            //Configure proxy to eliminamte overload of memory
            db.Configuration.ProxyCreationEnabled = false;

            //Create dynamic list
            List<dynamic> Children = new List<dynamic>();
            List<dynamic> dynamicMyChildren = new List<dynamic>();

            //Check if the parent passed through as parameter is null and if the parent is found, the parent's children should also be found
            if (parent == null)
            {
                return null;
            }
            else
            {
                //Create list of parent to find the parent currently loggend in with their ID
                List<Person_Children> myChildren = db.Person_Children.Include(y => y.KidsChurch).Where(x => x.PersonID == parent.PersonID).ToList();

                try
                {
                    //Loop through the list of parents found and find the children with the matching PersonID and the Kids Church of the child with the matching KidsChurchID
                    foreach (var c in myChildren)
                    {
                        Child cc = db.Children.Where(o => o.ChildID == c.ChildID).FirstOrDefault();
                        KidsChurch kc = db.KidsChurches.Where(i => i.KidsChurchID == c.KidsChurchID).FirstOrDefault();

                        //Create dynamic object to find the child information to be returned
                        dynamic child = new ExpandoObject();
                        child.ChildID = cc.ChildID;
                        child.Name = cc.Name;
                        child.Surname = cc.Surname;
                        child.DateOfBirth = cc.DateOfBirth;
                        //child.KidsChurchName = kc.KidsChurchName;
                        if (kc == null)
                        {
                            child.KidsChurchName = "Not yet registered";
                        }
                        else
                        {
                            child.KidsChurchName = kc.KidsChurchName;
                        }

                        if(cc == null && kc == null)
                        {
                            dynamicMyChildren.Add(child);
                        }
                        else
                        {
                            //Add dynamic object created to the dynamic list
                            Children.Add(child);
                        }
                    }
                        
                }
                catch (Exception)
                {
                    return null;
                }
            }

            //Return the dynamic list
            return Children.Concat(dynamicMyChildren).ToList();

        }

        // 4.7 Register Child - Annie
        [System.Web.Http.Route("api/KidsChurch/registerChild")]
        [System.Web.Mvc.HttpPost]
        public void registerChild([FromBody] dynamic reg)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            int id = reg.selected;
            int kID = reg.selecedclass;


            Person_Children PC = db.Person_Children.Where(x => x.ChildID == id).FirstOrDefault();

            PC.KidsChurchID = kID;
            try
            {
                db.SaveChanges();
            }
            catch
            {

            }

        }


        //Update child
        [System.Web.Http.Route("api/KidsChurch/updateChild")]
        [System.Web.Mvc.HttpPost]
        public dynamic updateChild([FromBody] Child currentChild)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            dynamic returnMessage = new ExpandoObject();

            //Check to see if the child exists
            if (currentChild != null)
            {
                if (currentChild.Name == "" || currentChild.Surname == "" || currentChild.DateOfBirth == null)
                {
                    return returnMessage.Message = "Please make sure that all information is provided for your child.";
                }
                else
                {
                    //Retrieve selected object
                    Child thisChild = db.Children.Where(z => z.ChildID == currentChild.ChildID).FirstOrDefault();


                    //Create dynamic object
                    dynamic toReturn = new ExpandoObject();

                    try
                    {
                        //Update the attributes
                        thisChild.Name = currentChild.Name;
                        thisChild.Surname = currentChild.Surname;
                        thisChild.DateOfBirth = currentChild.DateOfBirth;

                        //Save the changes in database
                        db.SaveChanges();

                        return returnMessage.Message = "All done! We received your child's information.";
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

        [System.Web.Http.Route("api/KidsChurch/getPersonChild")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> getPersonChild()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<Person_Children> personChildren = db.Person_Children.Include(zz => zz.Person).Include(aa => aa.Child).Include(qq => qq.KidsChurch).ToList();

            try
            {
                return getPersonChild(personChildren);
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }

        private List<dynamic> getPersonChild(List<Person_Children> child)
        {
            List<dynamic> dynamicPersonChildren = new List<dynamic>();

            try
            {
                foreach (Person_Children personChild in child)
                {
                    dynamic dynamicPersonChild = new ExpandoObject();
                    dynamicPersonChild.KidsChurchID = personChild.KidsChurchID;
                    dynamicPersonChild.PersonID = personChild.PersonID;
                    dynamicPersonChild.ChildID = personChild.ChildID;
                    dynamicPersonChild.KCVolunteerConfirmation = personChild.KCVolunteerConfirmation;
                    dynamicPersonChild.CheckIn = personChild.CheckIn;
                    dynamicPersonChild.CheckInDateTime = personChild.CheckInDateTime;
                    dynamicPersonChild.SignOut = personChild.SignOut;
                    dynamicPersonChild.SignOutDateTime = personChild.SignOutDateTime;

                    dynamicPersonChildren.Add(dynamicPersonChild);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicPersonChildren;
        }
        [System.Web.Http.Route("api/KidsChurch/getChildByID/{ChildID}")]
        [System.Web.Mvc.HttpGet]
        public dynamic getChildByID(int ID)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            if (ID == null)
            {
                return null;
            }
            else
            {
                Child thisChild = db.Children.Where(x => x.ChildID == ID).FirstOrDefault();
                Person_Children pc = db.Person_Children.Where(x => x.ChildID == thisChild.ChildID).FirstOrDefault();

                dynamic child = new ExpandoObject();
                child.Name = thisChild.Name;
                child.Surname = thisChild.Surname;
                child.DateOfBirth = thisChild.DateOfBirth;
                child.KidsChurchID = pc.KidsChurch.KidsChurchID;


                return child;
            }

        }

        [System.Web.Http.Route("api/KidsChurch/getKidsChurch")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getKidsChurch()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
                return KidsChurchReturnList(db.KidsChurches.ToList());
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }

        public List<dynamic> KidsChurchReturnList(List<KidsChurch> kidsChurch)
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> dynamicKidsChurches = new List<dynamic>();

            foreach (KidsChurch thisKidsChurch in kidsChurch)
            {
                dynamic dynamicKidsChurch = new ExpandoObject();

                dynamicKidsChurch.KidsChurchID = thisKidsChurch.KidsChurchID;
                dynamicKidsChurch.KidshurchName = thisKidsChurch.KidsChurchName;
                dynamicKidsChurch.HeadOfChurch = thisKidsChurch.HeadOfChurch;


                dynamicKidsChurches.Add(dynamicKidsChurch);
            }
            return dynamicKidsChurches;
        }

        [System.Web.Http.Route("api/KidsChurch/getKidsChurchChild")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getKidsChurchChild()
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();
            db.Configuration.ProxyCreationEnabled = false;

            List<KidsChurch> kidsChurches = db.KidsChurches.Include(z => z.Person_Children).ToList();

            try
            {
                return getKidsChurchChild(kidsChurches);
            }
            catch (Exception e)
            {
                dynamic toReturn = new ExpandoObject();
                toReturn.Error = e;
                return toReturn;
            }
        }

        private List<dynamic> getKidsChurchChild(List<KidsChurch> kidsChurches)
        {
            List<dynamic> dynamicKidsChurches = new List<dynamic>();

            try
            {
                foreach (KidsChurch kidsChurch in kidsChurches)
                {
                    dynamic dynamicKidsChurch = new ExpandoObject();
                    dynamicKidsChurch.KidsChurchID = kidsChurch.KidsChurchID;
                    dynamicKidsChurch.KidsChurchName = kidsChurch.KidsChurchName;
                    dynamicKidsChurch.HeadOfChurch = kidsChurch.HeadOfChurch;
                    dynamicKidsChurch.Person_Children = getKidsChurchChild(kidsChurch);

                    dynamicKidsChurches.Add(dynamicKidsChurch);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicKidsChurches;
        }

        private List<dynamic> getKidsChurchChild(KidsChurch kidsChurch)
        {
            List<dynamic> dynamicKidsChurches = new List<dynamic>();

            try
            {
                foreach (Person_Children kidsChurchChild in kidsChurch.Person_Children)
                {
                    dynamic dynamicKidsChurchChild = new ExpandoObject();
                    dynamicKidsChurchChild.KidsChurchID = kidsChurchChild.KidsChurchID;
                    dynamicKidsChurchChild.PersonID = kidsChurchChild.PersonID;
                    dynamicKidsChurchChild.ChildID = kidsChurchChild.ChildID;
                    dynamicKidsChurchChild.KCVolunteerConfirmation = kidsChurchChild.KCVolunteerConfirmation;
                    dynamicKidsChurchChild.CheckIn = kidsChurchChild.CheckIn;
                    dynamicKidsChurchChild.CheckInDateTime = kidsChurchChild.CheckInDateTime;
                    dynamicKidsChurchChild.SignOut = kidsChurchChild.SignOut;
                    dynamicKidsChurchChild.SignOutDateTime = kidsChurchChild.SignOutDateTime;

                    dynamicKidsChurches.Add(dynamicKidsChurchChild);
                }
            }
            catch (Exception e)
            {

            }

            return dynamicKidsChurches;
        }

        //Marno
        [System.Web.Http.Route("api/KidsChurch/RemoveChild")]
        [System.Web.Mvc.HttpPost]
        public List<dynamic> RemoveChild([FromBody] Person_Children kids)
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            Person_Children kid = db.Person_Children.Where(x => x.ChildID == kids.ChildID).FirstOrDefault();
            Child chil = db.Children.Where(x => x.ChildID == kids.ChildID).FirstOrDefault();

            try
            {
                db.Children.Remove(chil);
                //db.Person_Children.Remove(kid);
                db.SaveChanges();
            }
            catch (Exception e)
            {

            }


            return getKidsChurchChild();
        }

        public static List<dynamic> checkInRequestsList = new List<dynamic>();
        [System.Web.Http.Route("api/KidsChurch/checkInChildIon")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> checkInChildIon(dynamic CheckInRequest) //get JSON parameter
        {
            foreach (var request in CheckInRequest)
            {
                checkInRequestsList.Add(request);
            }
            return checkInRequestsList;
        }

        [System.Web.Http.Route("api/KidsChurch/getcheckInChildRequestConfirm")] //create route for api
        [System.Web.Mvc.HttpGet]

        public List<dynamic> getcheckInChildRequestConfirm() //get JSON parameter
        {
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

            db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data
            List<dynamic> returnList = new List<dynamic>();

            foreach (int request in checkInRequestsList)
            {
                Person_Children persChild = db.Person_Children.Include(x => x.KidsChurch).Include(y => y.Child).Include(z => z.Person).Where(c => c.ChildID == request).FirstOrDefault();
                returnList.Add(persChild);
            }

            if (returnList.Count() != 0)
            {
                return getChilConfirmation(returnList);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// //////////////
        /// </summary>

        public List<dynamic> getChilConfirmation(List<dynamic> childInfo) //get JSON parameter
        {
            //validate that there is no null values
            if (childInfo != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data


                List<dynamic> childInfoList = new List<dynamic>();


                try
                {
                    foreach (Person_Children ParentChild in childInfo)
                    {
                        Child childNameInfo = db.Children.Where(x => x.ChildID == ParentChild.ChildID).FirstOrDefault();
                        KidsChurch kidschurchName = db.KidsChurches.Where(x => x.KidsChurchID == ParentChild.KidsChurchID).FirstOrDefault();

                        dynamic child = new ExpandoObject();
                        child.ChildID = childNameInfo.ChildID;
                        child.Name = childNameInfo.Name;
                        child.Surname = childNameInfo.Surname;
                        child.KidsChurchName = kidschurchName.KidsChurchName;
                        childInfoList.Add(child);
                    }
                }
                catch (Exception)
                {
                    return null;
                }

                return childInfoList; // return called method
            }
            else
            {
                return null;
            }
        }

        //5.5 Check-in child - charl
        [System.Web.Http.Route("api/KidsChurch/checkInChild")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> checkInChild([FromBody] dynamic confirmationCheckIn) //get JSON parameter
        {
            //validate that there is no null values
            if (confirmationCheckIn != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                try
                {
                    foreach (var child in confirmationCheckIn.child)
                    {
                        int id = child;
                        Person_Children childCheckIn = db.Person_Children.Include(x=> x.Person).Include(z=> z.Child).Where(x => x.ChildID == id).FirstOrDefault();
                        childCheckIn.KCVolunteerConfirmation = true;
                        childCheckIn.CheckIn = true;
                        childCheckIn.SignOut = false;
                        childCheckIn.CheckInDateTime = DateTime.Now;

                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = confirmationCheckIn.PersonID;
                        auditLog.EventDescription = "Checked in child with ID: " + id;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);
                        
                        db.SaveChanges(); //Save nchanges and Add new position
                                          // return called method

                        childrenList += childCheckIn.Child.Name + " " + childCheckIn.Child.Surname + ", ";
                        toName = childCheckIn.Person.Name;
                        toMember = childCheckIn.Person.Email;
                    }
                    message = childrenList + " Has been successfully checked-in of Kids Church at Christian Revival Church (CRC) Main.";
                    Emailsubject = "Kids Church Sign-out @ CRC";
                    sendEmail();
                    foreach (var child in confirmationCheckIn.child)
                    {
                        checkInRequestsList.Remove(child);
                    }
                    if (checkInRequestsList.Count() == 0)
                        return getChilConfirmation(checkInRequestsList);
                    else
                        return null;

                }
                catch (Exception)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        //5.5 Sign-out child - Izaan

        public static List<dynamic> signOutRequestList = new List<dynamic>();

        [System.Web.Http.Route("api/KidsChurch/signOutChildIon")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> signOutChildIon(dynamic SignOutRequest) //get JSON parameter
        {
            foreach (var request in SignOutRequest)
            {
                signOutRequestList.Add(request);
            }

            return signOutRequestList;
        }

        [System.Web.Http.Route("api/KidsChurch/getsignOutChildRequestConfirm")]
        [System.Web.Mvc.HttpGet]
        public List<dynamic> getsignOutChildRequestConfirm()
        {
            //Database connection
            ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

            //Configure proxy to eliminate overload of data
            db.Configuration.ProxyCreationEnabled = false;

            List<dynamic> returnList = new List<dynamic>();

            foreach (int request in signOutRequestList)
            {
                Person_Children personChild = db.Person_Children.Include(x => x.KidsChurch).Include(y => y.Child).Include(z => z.Person).Where(c => c.ChildID == request).FirstOrDefault();
                returnList.Add(personChild);
            }

            if (returnList.Count() != 0)
            {
                return getChildConfirmation(returnList);
            }
            else
            {
                return null;
            }
        }

        public List<dynamic> getChildConfirmation(List<dynamic> childinfo)
        {
            //Validate that there are no null values
            if (childinfo != null)
            {
                //Database connection
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

                //Configure proxy to eliminate overload
                db.Configuration.ProxyCreationEnabled = false;

                List<dynamic> childInfoList = new List<dynamic>();

                try
                {
                    foreach (Person_Children pchild in childinfo)
                    {
                        Child childNameInfo = db.Children.Where(x => x.ChildID == pchild.ChildID).FirstOrDefault();
                        KidsChurch kidschurchName = db.KidsChurches.Where(x => x.KidsChurchID == pchild.KidsChurchID).FirstOrDefault();

                        dynamic dynamicChild = new ExpandoObject();
                        dynamicChild.ChildID = childNameInfo.ChildID;
                        dynamicChild.Name = childNameInfo.Name;
                        dynamicChild.Surname = childNameInfo.Surname;
                        dynamicChild.KidsChurchName = kidschurchName.KidsChurchName;

                        childInfoList.Add(dynamicChild);
                    }
                }
                catch (Exception)
                {
                    return null;
                }

                return childInfoList; // return called method
            }
            else
            {
                return null;
            }
        }

        string childrenList = "";
        [System.Web.Http.Route("api/KidsChurch/signOutChild")]
        [System.Web.Mvc.HttpPost]
        
        public List<dynamic> signOutChild([FromBody] dynamic confirmationSignOut)
        {
            //Validate for null values
            if (confirmationSignOut != null)
            {
                //Database connection
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();

                //Configure proxy to eliminate overload of data
                db.Configuration.ProxyCreationEnabled = false;

                try
                {
                    foreach (var child in confirmationSignOut.child)
                    {
                        int id = child;
                        Person_Children childSignOut = db.Person_Children.Include(z=> z.Child).Include(x=> x.Person).Where(x => x.ChildID == id).FirstOrDefault();

                        childSignOut.KCVolunteerConfirmation = true;
                        childSignOut.CheckIn = false;
                        childSignOut.SignOut = true;
                        childSignOut.SignOutDateTime = DateTime.Now;

                        Audit_Trail auditLog = new Audit_Trail();
                        auditLog.PersonID = confirmationSignOut.PersonID;
                        auditLog.EventDescription = "Sign out child with ID: " + id;
                        auditLog.EventDateTime = DateTime.Now;
                        db.Audit_Trail.Add(auditLog);

                        db.SaveChanges();
                        childrenList += childSignOut.Child.Name + " " + childSignOut.Child.Surname + ", ";
                        toName = childSignOut.Person.Name;
                        toMember = childSignOut.Person.Email;
                    }
                    message = childrenList + " Has been successfully signed-out of Kids Church at Christian Revival Church (CRC) Main.";
                    Emailsubject = "Kids Church Sign-out @ CRC";
                    sendEmail();
                    foreach (var child in confirmationSignOut.child)
                    {
                        signOutRequestList.Remove(child);
                    }

                    return getChildConfirmation(signOutRequestList);
                }
                catch (Exception)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        [System.Web.Http.Route("api/KidsChurch/ChildByParent")] //create route for api
        [System.Web.Mvc.HttpPost]

        public List<dynamic> ChildByParent(Person personID) //get JSON parameter
        {
            //validate that there is no null values
            if (personID != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                List<Person_Children> childInfo = db.Person_Children.Where(x => x.PersonID == personID.PersonID && x.KidsChurch != null && x.SignOut == false).ToList();

                List<dynamic> childInfoList = new List<dynamic>();


                try
                {
                    foreach (Person_Children ParentChild in childInfo)
                    {

                        Child childNameInfo = db.Children.Where(x => x.ChildID == ParentChild.ChildID).FirstOrDefault();
                        KidsChurch kidschurchName = db.KidsChurches.Where(x => x.KidsChurchID == ParentChild.KidsChurchID).FirstOrDefault();

                        dynamic child = new ExpandoObject();
                        child.ChildID = childNameInfo.ChildID;
                        child.Name = childNameInfo.Name;
                        child.Surname = childNameInfo.Surname;
                        child.KidsChurchName = kidschurchName.KidsChurchName;
                        childInfoList.Add(child);
                    }
                }
                catch (Exception)
                {
                    return null;
                }

                return childInfoList; // return called method
            }
            else
            {
                return null;
            }
        }


        [System.Web.Http.Route("api/KidsChurch/ChildByParentID")] //create route for api
        [System.Web.Mvc.HttpPost]
        public List<dynamic> ChildByParentID(Person personID) //get JSON parameter
        {
            //validate that there is no null values
            if (personID != null)
            {
                ReviveCommunicationsDBEntities3 db = new ReviveCommunicationsDBEntities3();//establish database connection

                db.Configuration.ProxyCreationEnabled = false; //configure proxy to eliminate overload of data

                List<Person_Children> childInfo = db.Person_Children.Where(x => x.PersonID == personID.PersonID && x.KidsChurch != null && x.CheckIn == false).ToList();

                List<dynamic> childInfoList = new List<dynamic>();


                try
                {
                    foreach (Person_Children ParentChild in childInfo)
                    {

                        Child childNameInfo = db.Children.Where(x => x.ChildID == ParentChild.ChildID).FirstOrDefault();
                        KidsChurch kidschurchName = db.KidsChurches.Where(x => x.KidsChurchID == ParentChild.KidsChurchID).FirstOrDefault();

                        dynamic child = new ExpandoObject();
                        child.ChildID = childNameInfo.ChildID;
                        child.Name = childNameInfo.Name;
                        child.Surname = childNameInfo.Surname;
                        child.KidsChurchName = kidschurchName.KidsChurchName;
                        childInfoList.Add(child);
                    }
                }
                catch (Exception)
                {
                    return null;
                }

                return childInfoList; // return called method
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
            var to = new EmailAddress(toMember, toName);
            var plainTextContent = message;
            var htmlContent = "Good day " + toName + "<br><br>" + message + "<br><br>  From" + "<br> Revive Communications";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
        }

    }
}
