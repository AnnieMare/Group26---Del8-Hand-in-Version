import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-remove-announcement',
  templateUrl: './remove-announcement.page.html',
  styleUrls: ['./remove-announcement.page.scss'],
})
export class RemoveAnnouncementPage implements OnInit {

  
  Announcement;
  Person:any;
  session:any;

  constructor(
    private router: Router,
    private loginService : LoginService,
    private service : MessageService,
    private toastrService: ToastController,  
    public alertController: AlertController
  ) { }

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
        this.service.retrieveAllAnnouncements(this.Person).subscribe(x =>{
          this.Announcement = x;
         })
      })
    }

 
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this announcement?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
            this.router.navigate(['/remove-announcement']);
          }
        }, {
          text: 'Continue',
          handler: () => {
            console.log('Confirm');
            this.deleteConfirm();
          }
        }
      ]
    });

    await alert.present();
  }

  selected;
 
  onDelete(a) {
    console.log(a);
    this.selected = a
    this.presentAlertConfirm()

  }

  deleteConfirm(){
    
    var data = {ann : this.selected, PersonID: this.Person.PersonID}
    this.service.DeleteAnnouncement(data).subscribe(x =>{
      this.presentToast()
      location.reload();
    
    })
  }

  async presentToast() {
    const toast = await this.toastrService.create({
      message: 'Announcement removed successfully.',
      duration: 2000
    });
    toast.present();
  }

}
