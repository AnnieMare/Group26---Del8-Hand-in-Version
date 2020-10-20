import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': "token",
    'Access-Control-Allow-Origin': "*"
  })
}

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  group;
  selectedGroup: any;

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getAllGroups')
  }

  getCity(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getAllCities')
  }

  getCountry(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getAllCountries')
  }

  getProvince(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getAllProvinces')
  }

  getSuburb(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getAllSuburbs')
  }

  addOrgGroup(newGroup)
  {
    return this.http.post('https://localhost:44390/api/Groups/addOrgGroup', newGroup)
  }

  updateOrgGroup(updateGroup)
  {
    return this.http.post('https://localhost:44390/api/Groups/updateOrgGroup', updateGroup);
  }

  getGroupTypes(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getAllGroupTypes')
  }

  getGroupByID(groupSelection: number)
  {
    return this.http.get('https://localhost:44390/api/Groups/getGroupID?OrgGroupID=' + groupSelection).subscribe(x =>
    {
      console.log(x)
    })
  }

  getMyGroups(personid)
  {
    return this.http.post('https://localhost:44390/api/Groups/MyGroups?personID=' + personid, personid)
  }

  getPastorGroups(personid)
  {
    return this.http.post('https://localhost:44390/api/Groups/PastorGroups?personID=' + personid, personid)
  }

  transferGroups(newGroup)
  {
    return this.http.post('https://localhost:44390/api/Groups/TransferGroups', newGroup)
  }

  getPersonGroups(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getGroupByPerson?personID=')
  }

  setData(orggroup)
  {
  console.log(orggroup);
  this.selectedGroup = orggroup;
  }

  getData()
  {
  console.log(this.selectedGroup);
   return this.selectedGroup;
  }

  membersGroups(MemberID)
  {
    return this.http.post('https://localhost:44390/api/Groups/MemberGroups?personId=' + MemberID, MemberID );
  }

  memberByID(memberID)
  {
    console.log(memberID);
    return this.http.post('https://localhost:44390/api/Groups/MemberByID?personId=' + memberID, memberID)
  }

  getMembers(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Groups/getUnassignedMember')
  }

}

