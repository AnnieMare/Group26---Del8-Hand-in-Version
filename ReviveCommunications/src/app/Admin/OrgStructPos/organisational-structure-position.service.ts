import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganisationalStructurePositionService {

  constructor( private http: HttpClient) {}

  AddOrganisationalStructurePosition(newPosition)
  {
    this.http.post('https://localhost:44390/api/OrganisationalStructurePosition/CreateOrgStructPos', newPosition).subscribe(x => {
      console.log(x)
    })
  }
}
