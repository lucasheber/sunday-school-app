import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { homeOutline, schoolOutline, settingsOutline, logOutOutline, homeSharp, schoolSharp, settingsSharp, logOutSharp } from 'ionicons/icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
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
  isDarkMode: boolean = true;

  public appPages = [
    { title: 'home.title', url: '/home', icon: 'home' },
    { title: 'classes.title', url: '/classes', icon: 'school' },
    { title: 'settings.title', url: '/settings', icon: 'settings' },
    { title: 'logout.title', url: '/logout', icon: 'log-out' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({ homeOutline, homeSharp, schoolOutline, schoolSharp, settingsOutline, settingsSharp, logOutOutline, logOutSharp });
  }

  async ngOnInit() {
    const dark = await Preferences.get({ key: 'dark' });
    this.initializeDarkPalette(dark.value === 'true');

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

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.isDarkMode = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  async toggleDarkMode(event: CustomEvent) {
    await Preferences.set({ key: 'dark', value: event.detail.checked ? 'true' : 'false' });
    this.toggleDarkPalette(event.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  navigate(path: string) {
    this.router.navigate([path], { replaceUrl: true });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      location.reload();
    });
  }

}
