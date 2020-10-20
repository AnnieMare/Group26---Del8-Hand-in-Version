import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private SERVER_URL = 'https://localhost:44390';
  constructor( private Http: HttpClient,
    ) { }


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  getHomecellAttendance(form){

    //return this.Http.get<any[]>('https://localhost:44362/api/Report/GetReportData?CategoryID='+CategoryID)
    return this.Http.post<any[]>(this.SERVER_URL +'/api/GenerateReport/getHomecellAttendance',form, this.httpOptions)
    .pipe(map(result => result));

  }
  getChurchAttendance(form){

    //return this.Http.get<any[]>('https://localhost:44362/api/Report/GetReportData?CategoryID='+CategoryID)
    return this.Http.post<any[]>(this.SERVER_URL +'/api/GenerateReport/getChurchAttendance',form, this.httpOptions)
    .pipe(map(result => result));

  }

  getOverview(form){

    //return this.Http.get<any[]>('https://localhost:44362/api/Report/GetReportData?CategoryID='+CategoryID)
    return this.Http.post<any[]>(this.SERVER_URL +'/api/GenerateReport/getOverview',form, this.httpOptions)
    .pipe(map(result => result));

  }
  getDiscData(form){

    //return this.Http.get<any[]>('https://localhost:44362/api/Report/GetReportData?CategoryID='+CategoryID)
    return this.Http.post<any[]>(this.SERVER_URL +'/api/GenerateReport/getDiscipleshipReport', form, this.httpOptions)
    .pipe(map(result => result));

  }
  getZoneGrowth(form){

    //return this.Http.get<any[]>('https://localhost:44362/api/Report/GetReportData?CategoryID='+CategoryID)
    return this.Http.post<any[]>(this.SERVER_URL +'/api/GenerateReport/getZoneGrowth', form, this.httpOptions)
    .pipe(map(result => result));

  }
}
