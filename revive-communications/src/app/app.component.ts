import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  public appPages = [
      {
        title: 'Update Profile',
        icon: 'pencil',
        url: 'update-person',
      },
      {
        title: 'Message Members',
        icon: 'mail',
        children: [
          {
            title: 'Send Invitation',
            icon: 'caret-forward',
            url: 'send-invitation'

  
          },
          {
            title: 'Post Announcement',
            icon: 'caret-forward',
            url: 'post-announcement'

          },
          {
            title: 'Remove Announcement',
            icon: 'caret-forward',
            url: 'remove-announcement'
          },
        ],
      },
      
       {
        title: 'Groups',
        icon: 'people-circle',
        url: 'join-group',
      },

       {
        title: 'Homecell notes',
        icon: 'document-attach',
        url: 'homecell-notes'
      },

       {
        title: 'Kids Church',
        icon: 'happy',
        
        children: [
          {
            title: 'Register Children',
            icon: 'caret-forward',
            url: 'register-child'

  
          },
          {
            title: 'Check In',
            icon: 'caret-forward',
            url: 'kids-church-check-in'

          },
          {
            title: 'Sign Out',
            icon: 'caret-forward',
            url: 'sign-out'
          },
        ],
  
      },

      {
        title: 'Follow-up',
        icon: 'call',
        children: [
          {
            title: 'Salvation',
            icon: 'caret-forward',
            url: 'salvation-followup'
  
          },
          {
            title: 'Requests to Serve',
            icon: 'caret-forward',
            url: 'members-wanting-to-serve-follow-up'
          },
          {
            title: 'NMO',
            icon: 'caret-forward',
            url: 'nmo-followup'
          },
          {
            title: 'Overseers',
            icon: 'caret-forward',
            url: 'overseer-followup'
          },
          {
            title: 'Leaders',
            icon: 'caret-forward',
            url: 'leader-follow-up'
          },
          {
            title: 'Members',
            icon: 'caret-forward',
            url: 'member-follow-up'
          },
          {
            title: 'Discipleship',
            icon: 'caret-forward',
            url: 'discipleship-followup'
          },
        ],
  
      },

           {
        title: 'Counselling',
        icon: 'heart',
        url: 'add-counselling-request'
      },

    
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate(["/login"]);
  }
}
