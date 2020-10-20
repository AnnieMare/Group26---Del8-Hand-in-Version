import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-post-announcement',
  templateUrl: './post-announcement.page.html',
  styleUrls: ['./post-announcement.page.scss'],
})
export class PostAnnouncementPage implements OnInit {

  ReceiverList: any;
  AnnouncementContent: any;
  ConfirmedAnnouncement: any;
  form
  isChecked = [];
  SelectedReceivers =[];
  Persons = []
  
  Person:any;
  session:any;

  constructor(
    private toastrService: ToastController,  
    private service : MessageService,
    private router: Router,
    private loginService : LoginService
  ) { }
  
  PersonID
  ngOnInit() {

    if(!localStorage.getItem("accessToken")){
      this.router.navigate(['']);
    }
    else{
      this.session ={"SessionID": localStorage.getItem("accessToken")}
      this.loginService.getUserDetails(this.session).subscribe(res =>{
        this.Person = res;
        this.PersonID = this.Person.PersonID
        console.log(this.PersonID)
        
        console.log(this.Person)
      })

      
    }
    
    this.service.getPeople().subscribe(x => {
    this.Persons = x;
    console.log(x);})
  }

  onSubmit(Announcement){
    console.log(Announcement)
 
    this.service.postAnnouncement(Announcement).subscribe(x =>{
       this.presentToast()
    });
  }



  checkbox1 = false; // bind first checkbox


  changeSelection(item) {

    if(this.SelectedReceivers.includes(item)) {
      this.SelectedReceivers = this.SelectedReceivers.filter((value)=>value!=item);

    } else {
      this.SelectedReceivers.push(item)
    }
  }


  checked = false;
  async presentToast() {
    const toast = await this.toastrService.create({
      message: 'Announcement sent successfully.',
      duration: 2000
    });
    toast.present();
  }
  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }
  showWA = false
  receiversSelected(){
    this.showWA = true
  }
  showConfirm = false
  messageCreated(){
    this.showConfirm = true
  }
}
