import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscipleshipService } from 'src/app/Services/discipleship.service';
import { FollowUpDiscService } from 'src/app/Services/follow-up-disc.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-discipleship-followup',
  templateUrl: './discipleship-followup.page.html',
  styleUrls: ['./discipleship-followup.page.scss'],
})
export class DiscipleshipFollowupPage implements OnInit {

  followUpList;
  persentageComplete;
  AllDiscipleships: any;
  completedDiscipleships: any[];

  session:any;
  Person :any;
  Person_Discipleship =[];

  Discipleships;
  checkedIDs: any[];
  Outstanding: any[];

  ProgressCheck: boolean;
  groups: boolean;
  constructor(
    private service : FollowUpDiscService,
    private DiscService :DiscipleshipService,
    private router : Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.ProgressCheck = false;
    this.ProgressCheck = false;

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
    this.service.getFollowUpList().subscribe(x => {
      this.followUpList = x;
    })
  }

  
  changeSelection(event) {

    console.log(event)

    this.Person_Discipleship = event.detail.value; 

}

onSubmit(followUp){
console.log(followUp);
var data = { FollowupData: followUp, PersonID: this.Person.PersonID}
if(confirm('Are you sure you want to complete this Follow up?')){
   this.service.completeFollowUp(data).subscribe(x => {
  console.log(x)

  this.service.getFollowUpList().subscribe(x => {
    this.followUpList = x;
    console.log(x);
  });

});
}


}

  Check(){
    if(this.ProgressCheck == false)
    {
      this.ProgressCheck = true;
    }
    else{
      this.ProgressCheck = false;
    }
    
    
  }
  CheckGroups(){
      
    if(this.groups == false)
    {
      this.groups = true;
    }
    else{
      this.groups = false;
    }
  }

}
