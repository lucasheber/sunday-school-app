import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonToggle, IonMenuToggle } from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { moonOutline, moonSharp } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonToggle, IonMenuToggle, CommonModule, FormsModule, TranslocoModule,]
})
export class SettingsPage implements OnInit {

  isDarkMode: boolean = true;

  constructor() { }

  async ngOnInit() {
    const dark = await Preferences.get({ key: 'dark' });
    this.initializeDarkPalette(dark.value === 'true');

    addIcons({ moonOutline });
  }

  openLanguageModal() {
    // Open the language modal here
  }
  openThemeModal() {
    // Open the theme modal here
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

}
