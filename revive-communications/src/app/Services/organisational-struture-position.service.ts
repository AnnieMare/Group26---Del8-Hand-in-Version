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
  selectedPosition: any;
  constructor( private http: HttpClient) {}

  AddOrganisationalStructurePosition(newPosition)
  {
    this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/CreateOrgStructPos', newPosition).subscribe(x => {
      console.log(x)
    })
  }

  UpdateOrganisationalStructurePosition(newPosition)
  {
    this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/UpdateOrgStructPos', newPosition).subscribe(x => {
      console.log(x)
    })
  }

//Read and retrieve Organisational structure position
  OrgStructType(): Observable<any>{
    return this.http.get('https://localhost:44390/api/OrganisationalStructurePosition/getStructType');
  }

  OrgStructPos(): Observable<any>{
    return this.http.get('https://localhost:44390/api/OrganisationalStructurePosition/getAllViewOrgStructPos');

  }

  setData(position)
  {
    console.log(position);
    this.selectedPosition = position;
  }

  getData()
  {
    console.log(this.selectedPosition);
    return this.selectedPosition;
  }

  deleteOrgStructPos(PositionID)
  {
    console.log(PositionID);

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
}

