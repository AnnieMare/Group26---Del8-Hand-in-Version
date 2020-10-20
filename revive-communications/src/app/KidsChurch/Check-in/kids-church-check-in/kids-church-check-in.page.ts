import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { KidsChurchService } from 'src/app/Services/kids-church.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kids-church-check-in',
  templateUrl: './kids-church-check-in.page.html',
  styleUrls: ['./kids-church-check-in.page.scss'],
})
export class KidsChurchCheckInPage implements OnInit {
  today: number = Date.now();
  Person: any;
  Person_Child = [];
  Children: any;
  childCheck: boolean;
  Index: number;
  Message: string;
  constructor(public loadingController: LoadingController,private router: Router, public alertController: AlertController, public kidsChurchServ: KidsChurchService, public toastController: ToastController) {}
  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Checked-in successfully',
      message: 'Jana Anderson & Josh Anderson was successfully checked-in @ CRC Main Kids Church 8:25 Am 2020-05-06.    Start time: 8:30      End time: 9:30',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait for confirmation from volunteer...',
      duration: 10000
      
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

   // this.presentAlert();
   this.router.navigate(["/home"]);
  }

  fetchSelectedItems(uc) {

    console.log(uc)

    this.Person_Child = uc.filter((value, index) => {
      return value.isChecked
      });

}

changeSelection(uc, index) {

  if(this.Person_Child.includes(uc))
  {
    this.Person_Child.splice(index, 1);
  }
  else{
    this.Person_Child.push(uc);
  }
}
showList: boolean;
  ngOnInit() {
    this.showList = true;
    this.Person = {
      PersonID: 18
    };
    this.kidsChurchServ.getChildByParent(this.Person).subscribe(data => {
      this.Children = data;
      console.log(data);
      if(this.Children.length == 0)
      {
        this.Message = "No children found or registered for KidsChurch."
        this.showList = false;
      }
      else
      {
        this.showList = true;
      }
    }
    );
  }

  checkIn(): void
  {
    if(this.Person_Child.length == 0)
    {
      this.presentToast();
  }
  else
  {
    this.kidsChurchServ.ChildCheckIn(this.Person_Child).subscribe(z=> {
      this.presentLoading();
    });
  }
}

async presentToast() {
  const toast = await this.toastController.create({
  message: 'No Children were selected. Please select a child and try again.',
  duration: 4000
  });
   toast.present();
  }
}

