import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonToggle, IonMenuToggle } from '@ionic/angular/standalone';
import { TranslocoModule } from '@jsverse/transloco';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { moonOutline, moonSharp } from 'ionicons/icons';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonToggle, IonMenuToggle, CommonModule, FormsModule, TranslocoModule,]
})
export class SettingsPage implements OnInit {

  isDarkMode: boolean = true;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    addIcons({ moonOutline });
  }


  async ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.isDarkMode = await this.themeService.getDarkModeStatus();
  }

  openLanguageModal() {
    // Open the language modal here
  }
  openThemeModal() {
    // Open the theme modal here
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  async toggleDarkMode(event: CustomEvent) {
    await Preferences.set({ key: 'dark', value: event.detail.checked ? 'true' : 'false' });
    this.themeService.toggleDarkPalette(event.detail.checked);
  }
}
