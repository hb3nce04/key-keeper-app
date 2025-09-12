import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideNzIcons} from 'ng-zorro-antd/icon';
import {IconDefinition} from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideNzIcons(icons),
    provideAnimationsAsync()
  ]
};
