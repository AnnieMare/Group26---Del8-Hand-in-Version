import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.page.html',
  styleUrls: ['./join-group.page.scss'],
})
export class JoinGroupPage implements OnInit {

  selectedGroup1;
  selectedGroup2;
  selectedGroup3;
  Person:any;
  session:any;

  constructor(private http: HttpClient,
    private router: Router, private loginService:LoginService) { }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

  ngOnInit() {
    
    if(!localStorage.getItem("accessToken")){
    this.router.navigate(['']);
  }
  else{
    this.session ={"SessionID": localStorage.getItem("accessToken")}
    this.loginService.getUserDetails(this.session).subscribe(res =>{
      this.Person = res;
      console.log(this.Person)
    })
  }
  this.http.get<any>('https://localhost:44390/api/Admin/getGroupTypes').subscribe(x=>{
    this.Groups = x;
  })
  }
  Groups;
  selectedGroups=[];
  onSubmit(g){
    console.log(g)

    this.http.post<any>('https://localhost:44390/api/Admin/JoinOrgGroup', g).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      })

  };

}
