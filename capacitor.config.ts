import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ebd.lucasheber.dev',
  appName: 'EBD ADPTB',
  webDir: 'www',

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      showSpinner: false,
      backgroundColor: '#87d7f3',
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: '#000000',
      style: 'DARK',
      show: false,
      color: '#000000',
      overlaysWebView: false,
      overlay: false,
    },
  }
};

export default config;
