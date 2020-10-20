import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
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
export class KidsChurchService {

  child;
  selectedchild: any;

  constructor( private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getChildren(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/KidsChurch/getAllChildren')
  }

  getKidsChurchClasses(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/KidsChurch/getKidsChurch')
  }

  getParentChildren(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/KidsChurch/getPersonChildren')
  }
  getMyChildren(Parent): Observable<any>
  {
    return this.http.post('https://localhost:44390/api/KidsChurch/MyChildren', Parent)
  }

  addChild(newChild)
  {
    return this.http.post('https://localhost:44390/api/KidsChurch/addChild', newChild)


  }

  updateChild(updateChild)
  {
    return this.http.post('https://localhost:44390/api/KidsChurch/updateChild', updateChild);
  }

  setData(children)
  {
    console.log(children);
    this.selectedchild = children;
  }

  getData()
  {
    console.log(this.selectedchild);
    return this.selectedchild;
  }

  RemoveChild(ChildDel)
  {
    return this.http.post('https://localhost:44390/api/KidsChurch/RemoveChild',ChildDel);
  }

  register(x){
    return this.http.post<any>('https://localhost:44390/api/KidsChurch/registerChild', x, this.httpOptions)
  }

  getChildByParentID(parentID)
  {
    return this.http.post('https://localhost:44390/api/KidsChurch/ChildByParent', parentID, httpOptions).pipe(map(result => result));
  console.log(parentID);
  }

  getChildByParent(parentID)
  {
    return this.http.post('https://localhost:44390/api/KidsChurch/ChildByParentID', parentID, httpOptions).pipe(map(result => result));
  console.log(parentID);
  }

  ChildCheckIn(childID)
  {
    console.log(childID)
    return this.http.post('https://localhost:44390/api/KidsChurch/checkInChildIon',childID)
 }

 ChildSignOut(childID)
 {
  return this.http.post('https://localhost:44390/api/KidsChurch/signOutChildIon',childID)
 }

}
