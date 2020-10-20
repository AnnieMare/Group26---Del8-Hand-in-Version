import { Discipleship } from './../model/Discipleship';

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscipleshipService {

  private SERVER_URL = 'https://localhost:44390';
  constructor(private http: HttpClient,
    private router: Router) { }

  createDiscipleship(disc) {
   return this.http.post(  this.SERVER_URL+'/api/Discipleship/addDiscipleship', disc)
  }

  DiscipleshipByID(id){
    console.log(id);
    return this.http.get<Discipleship>(this.SERVER_URL + `/api/Discipleship/GetDiscipleshipByID/${id}`, id );


  }


updateDiscipleship(Disc) {

  return this.http.post<Discipleship>(this.SERVER_URL+ '/api/Discipleship/updateDiscipleship', Disc)
}

      getAllDiscipleships(){
        return this.http.get<Discipleship[]>(this.SERVER_URL + '/api/Discipleship/getAllDiscipleships');
      }

      deleteDiscipleship(Disc){
        console.log(Disc);
        return this.http.post(this.SERVER_URL + '/api/Discipleship/delDiscipleship', Disc,
          { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': '',
        }), responseType: 'json'}).pipe(
          tap (
            data => data,
            error => error
        ));

      }

}

