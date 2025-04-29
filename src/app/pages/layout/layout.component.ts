import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { homeOutline, schoolOutline, settingsOutline, logOutOutline, homeSharp, schoolSharp, settingsSharp, logOutSharp, calendarSharp, calendarOutline } from 'ionicons/icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, TranslocoModule],
})
export class LayoutComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthService);

  user: User | null = null;

  public appPages = [
    { title: 'home.title', url: '/home', icon: 'home' },
    { title: 'classes.title', url: '/classes', icon: 'school' },
    // { title: 'calendar.title', url: '/calendar', icon: 'calendar' },
    { title: 'settings.title', url: '/settings', icon: 'settings' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({ homeOutline, homeSharp, schoolOutline, schoolSharp, settingsOutline, settingsSharp, logOutOutline, logOutSharp, calendarOutline, calendarSharp });
  }

  async ngOnInit() {
    // validate firebase auth
    this.authenticationService.isLoggedIn$().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
      return
    });

    this.authenticationService
      .getUser()
      .subscribe((user) => {
        this.user = user;
      });

  }

  logout() {
    console.log('logout');

    this.authenticationService.logout().subscribe(() => {
      location.reload();
    });
  }

}
