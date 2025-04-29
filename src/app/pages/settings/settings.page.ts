import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonIcon, IonToggle, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Preferences } from '@capacitor/preferences';
import { addIcons } from 'ionicons';
import { languageOutline, moonOutline, moonSharp } from 'ionicons/icons';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonList, IonItem, IonIcon, IonToggle, IonSelect, IonSelectOption, CommonModule, FormsModule, TranslocoModule,]
})
export class SettingsPage implements OnInit {

  isDarkMode: boolean = true;
  selectedLanguage: string = 'en';

  constructor(
    private themeService: ThemeService,
    private translocoService: TranslocoService,
  ) { }

  ngOnInit() {
    addIcons({ moonOutline, languageOutline });
  }


  async ionViewWillEnter() {
    this.isDarkMode = await this.themeService.getDarkModeStatus();
    this.selectedLanguage = this.translocoService.getActiveLang();
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

  async changeLanguage($event: CustomEvent) {
    const lang = $event.detail.value;

    await Preferences.set({ key: 'lang', value: lang });
    this.translocoService.setActiveLang(lang);
  }
}
