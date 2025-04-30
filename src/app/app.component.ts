import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor() { }

  async ngOnInit() {
    await this.setStatusBar();
  };

  async setStatusBar() {
    if (isPlatform('android')) {
      await StatusBar.setBackgroundColor({ color: '#ffffff' }); // cor do header
      await StatusBar.setOverlaysWebView({ overlay: true });
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.show();
    }
  }
}
