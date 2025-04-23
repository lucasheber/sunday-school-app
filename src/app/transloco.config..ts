import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { environment } from '../environments/environment';

export const translocoProviders = [
    provideTransloco({
        config: {
            availableLangs: ['en', 'pt'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
            prodMode: environment.production,
        },
        loader: TranslocoHttpLoader,
    }),
];