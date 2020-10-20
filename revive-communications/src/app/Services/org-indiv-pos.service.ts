import { OrgIndivPos } from 'src/app/model/OrgIndivPos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Goal } from '../model/Goal';
import { Usecase } from '../model/Usecase';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgIndivPosService {
 created : OrgIndivPos;
  private SERVER_URL = 'https://localhost:44390';
  constructor(private http: HttpClient,
    private router: Router) { }

  createOrgIndivPos(oip) {
    console.log(oip)

   console.log(this.created)
   return this.http.post(this.SERVER_URL+'/api/OrgIndivPos/addOrgIndivPos', oip)
  }

  OrgIndivPosByID(id){
    console.log(id);
    return this.http.get(this.SERVER_URL + `/api/OrgIndivPos/getAllOrgIndivPosByID/${id}`, id );


  }

GetGoalsList(){
  return this.http.get<Goal[]>(this.SERVER_URL+"/api/OrgIndivPos/GetAllGoals")


}

GetUseCasesList(){
  return this.http.get<Usecase[]>(this.SERVER_URL+"/api/OrgIndivPos/GetAllUseCase")

}
GetPositionName(){
  return this.http.get<any[]>(this.SERVER_URL+"/api/OrgIndivPos/getPositionNames")

}

updateOrgIndivPos(oip) {

  return this.http.post(this.SERVER_URL+ '/api/OrgIndivPos/updateOrgIndivPos', oip)
}

      getAllOrgIndivPos(){
        return this.http.get<any[]>(this.SERVER_URL + '/api/OrgIndivPos/getAllOrgIndivPos');
      }

      deleteOrgIndivPos(oip){
        console.log(oip);
        return this.http.post(this.SERVER_URL + '/api/OrgIndivPos/delOrgIndivPos', oip,
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
