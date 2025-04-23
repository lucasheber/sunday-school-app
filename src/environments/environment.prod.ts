import { credentials } from 'src/credentials.prod';

export const environment = {
  production: true,
  firebase: credentials.firebaseConfig,
};
