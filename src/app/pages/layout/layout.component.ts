import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle, IonContent, IonMenu, IonList, IonItem, IonRouterOutlet, IonMenuToggle, IonIcon, IonLabel,
  IonAvatar,
  IonButton,
  IonToggle,
  IonItemDivider,
} from '@ionic/angular/standalone';
import { homeOutline, peopleOutline, schoolOutline } from 'ionicons/icons';

import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    FormsModule,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonMenuToggle,
    IonIcon,
    IonLabel,
    IonAvatar,
    IonButton,
    IonToggle,
    IonItemDivider
  ],
})
export class LayoutComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthService);

  user: User | null = null;
  isDarkMode: boolean = true;

  constructor() {

    addIcons({ homeOutline, peopleOutline, schoolOutline });
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

  logout() {
    this.authenticationService.logout().subscribe(() => {
      location.reload();
    });
  }

}
