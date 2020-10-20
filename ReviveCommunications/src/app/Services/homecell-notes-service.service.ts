import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomecellNotesServiceService {

  constructor( private http: HttpClient) {}

  getHomecellNotes(): Observable<any>{
    return this.http.get('https://localhost:44390/api/HomecellNotes/getHomecellNotes');
  }

  addNewHCNotes(HomecellNotesName)
  {
    console.log(HomecellNotesName)
    return this.http.post('https://localhost:44390/api/HomecellNotes/AddHomecellNotes?HomecellNotesName=' + HomecellNotesName, HomecellNotesName )
 
  }

  removeHomecellNotes(fileName)
  {
    console.log(fileName);
    return this.http.post('https://localhost:44390/api/HomecellNotes/removeHomecellNotes?HomecellNotesName=' + fileName, fileName)
  }

  //api/HomecellNotes/HomecellNotesByID
  HomecellNotesByID(HomecellNotesID)
  {
    console.log(HomecellNotesID)
    return this.http.post('https://localhost:44390/api/HomecellNotes/HomecellNotesByID', HomecellNotesID )
  }
}

