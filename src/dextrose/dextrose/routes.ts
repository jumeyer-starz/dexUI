import {provideRouter, Routes} from '@angular/router';
import {CardDemo} from '../card/card-demo';

import {RedirectManager} from '../redirect-manager/redirect-manager';

export const routes: Routes = [
  {path: '', component: CardDemo},
  {path: 'home', component: CardDemo},
  {path: 'redirects', component: RedirectManager},
];

export const DEMO_APP_ROUTE_PROVIDER = provideRouter(routes);
