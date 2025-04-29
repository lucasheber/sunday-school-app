import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode: boolean = true;

  constructor() { }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    const dark = await Preferences.get({ key: 'dark' });
    this.initializeDarkPalette(dark.value === 'true');
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.isDarkMode = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  // Return the current dark mode status
  async getDarkModeStatus(): Promise<boolean> {
    await this.initialize();
    return this.isDarkMode;
  }
}
