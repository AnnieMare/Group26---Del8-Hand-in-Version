import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
export class CounsellingService {

  readonly rootURL = "https://localhost:44390/api"

  constructor(private http: HttpClient, private router: Router) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  AddCounselling(NewCounselling)
  {
    return this.http.post(this.rootURL+'/Counselling/AddCounsellingRequest', NewCounselling).subscribe(data=>{
      this.router.navigate(['/ViewCounselling']);
    });
    
  }

  getCounselling()
  {
    return this.http.get(this.rootURL+'/Counselling/GetCounsellingRequest')
  }

  ResolveCounselling(CounsellingDel)
  {
    return this.http.post(this.rootURL+'/Counselling/ResolveCounselling', CounsellingDel);
  }

  getCounsellingByID(id){
    console.log(id);
    return this.http.get<any>(this.rootURL + `/Counselling/GetCounsellingByID/${id}`, id );
  }

}
