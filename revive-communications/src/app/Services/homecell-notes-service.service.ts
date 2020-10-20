import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomecellNotesService {

  constructor( private http: HttpClient) {}

  getHomecellNotes(): Observable<any>{
    return this.http.get('https://localhost:44390/api/HomecellNotes/getHomecellNotes');
  }

  //api/HomecellNotes/HomecellNotesByID
  HomecellNotesByID(HomecellNotesID)
  {
    console.log(HomecellNotesID)
    return this.http.post('https://localhost:44390/api/HomecellNotes/HomecellNotesByID', HomecellNotesID )
  }
}
