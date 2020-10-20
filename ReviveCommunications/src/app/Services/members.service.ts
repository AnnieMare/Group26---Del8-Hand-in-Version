import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/person';
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
export class MembersService {

  member;
  selectedPerson: any;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Members/getAllMembers')
  }

  getUnapprovedMembers(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Members/getAllUnapprovedMembers')
  }

  updateMemberApproval(activationStatus)
  {
   return this.http.post('https://localhost:44390/api/Members/updateMemberApproval', activationStatus)
  }

  getAllPerson()
  {
    return this.http.get<any[]>('https://localhost:44390/api/Person/getAllPersons')
  }

  updatePerson(person) 
  {    
    this.http.post('https://localhost:44390/api/Person/UpdatePerson', person).subscribe(d => {
      console.log(d)
    });  
  } 

  setData(person)
  {
  console.log(person);
  this.selectedPerson = person;
  }

  getData()
  {
  console.log(this.selectedPerson);
   return this.selectedPerson;
  }

  getUnassignedLeaders(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Members/getUnassignedLeader')
  }

  getUnassignedMembers(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Members/getAssignedMember')
  }

  AssignLeader(leader)
  {
    return this.http.post('https://localhost:44390/api/Members/AssignLeader', leader)
  }

  MyMembers(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Members/getMyMembers')
  }

  getMyMembers(person: any)
  {
    return this.http.post('https://localhost:44390/api/Members/MyMembers', person)
  }

  getApprovalProgress(): Observable<any>{
    return this.http.get('https://localhost:44390/api/Members/getApprovalProgress');
  }

  memberByID(memberID)
  {
    console.log(memberID);
    return this.http.post('https://localhost:44390/api/Members/MemberByID?personId=' + memberID, memberID)
  }

  UnassignedMembers(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/Members/getUnassignedMember')
  }

  MemberSearchInfo(memberInfo)
  {
    return this.http.post('https://localhost:44390/api/Members/Person', memberInfo, httpOptions).pipe(map(result => result));
    console.log(memberInfo);
  }

  
}

