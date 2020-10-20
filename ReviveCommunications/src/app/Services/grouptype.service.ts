import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GrouptypeService {

  selecetedPosition:any;
  readonly rootURL = "https://localhost:44390/api"

  constructor(private http: HttpClient, private router: Router) { }

  AddGroupType(NewGroupType)
  {
    return this.http.post(this.rootURL+'/Groups/AddGroupType', NewGroupType).subscribe(data=>{
      this.router.navigate(['/ViewGroupType']);
    });
    
  }

  getGroupType()
  {
    return this.http.get(this.rootURL+'/Groups/GetGroupTypes')
  }
  

  DeleteGroupType(GroupTypeDel)
  {
    return this.http.post(this.rootURL+'/Groups/RemoveGroupType', GroupTypeDel);
  }

  UpdateGroupType(GroupType)
  {
    this.http.post<any>(this.rootURL+'/Groups/UpdateGroupType',GroupType).toPromise().then(data=>{
      console.log(data);
      this.router.navigate(['/ViewGroupType']);

    })
  }
  GroupTypeByID(id){
    console.log(id);
    return this.http.get<any>(this.rootURL + `/Groups/GetGroupTypeByID/${id}`, id );
  }

}
