import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': "application/json",
    'Authorization': "token",
    'Access-Control-Allow-Origin': "*"

  })
}

@Injectable({
  providedIn: 'root'
})
export class OrganisationalStructurePositionService {
  public selectedPosition: any;
  constructor( private http: HttpClient) {}

  AddOrganisationalStructurePosition(newPosition)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/CreateOrgStructPos', newPosition)
  }

  UpdateOrganisationalStructurePosition(newPosition)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/UpdateOrgStructPos', newPosition);
  }

  AssignOrganisationalStructurePosition(newPosition)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/AssignOrgStructPos', newPosition);
  }

  PositionbyLevel(Level){
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/SearchedOrgStructPos', Level);
  }

  OrgStructLevel(): Observable<any>{
    return this.http.get('https://localhost:44390/api/OrganisationalStructurePosition/getStructureLevels');
  }
//Read and retrieve Organisational structure position
  OrgStructType(): Observable<any>{
    return this.http.get('https://localhost:44390/api/OrganisationalStructurePosition/getStructType');
  }

  OrgStructPos(): Observable<any>{
    return this.http.get('https://localhost:44390/api/OrganisationalStructurePosition/getAllViewOrgStructPos');

  }

  memberGroupsByID(memberID)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/MemberByID?personId=' + memberID, memberID)
  }

  GetGroups(memberID){
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/AllGroups?personId=' + memberID, memberID);
  }

   AssignOrganisationalGroups(groups)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/AssignOrgGroup', groups);
  }


   getPositionByID(newPosition)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/OrgStructPosByID?orgstruct=' + newPosition, newPosition)
  }

  deleteOrgStructPos(PositionID)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/RemoveOrganisationalStructurePositionD', PositionID)
  }

  MemberInfo(assignInfo)
  {
   return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/AssignOrgStructPos', assignInfo, httpOptions)
  }
  MemberSearchInfo(memberInfo)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/Person', memberInfo, httpOptions).pipe(map(result => result));
    console.log(memberInfo);
  }

  getMembers(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/OrganisationalStructurePosition/getUnassignedMember')
  }

  memberByID(memberID)
  {
    console.log(memberID);
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/MemberByID?personId=' + memberID, memberID)
  }

  membersGroups(MemberID)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/MemberGroups?personId=' + MemberID, MemberID );
  }
  membersHomecells(MemberID)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/memberHomecells?personId=' + MemberID, MemberID );
  }
  Homecells(memberID)
  {
    console.log(memberID);
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/Homecells?personId=' + memberID, memberID)
  }

  HomecellsSuburb(suburbID)
  {
    console.log(suburbID);
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/HomecellsBySuburb?SuburbID=' + suburbID, suburbID)
  }

  Suburbs(memberID)
  {
    console.log(memberID);
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/Suburbs?personId=' + memberID, memberID)
  }

  updateHomecell(groups)
  {
    return this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/AssignHomecell', groups);
  }
}

