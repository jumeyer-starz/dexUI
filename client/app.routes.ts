import { RouterConfig, provideRouter } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { RedirectListComponent } from './imports/redirects/redirects-list.component';
import { RedirectDetailsComponent } from './imports/redirects/redirect-details.component';

const routes: RouterConfig = [
  { path: '',           component: RedirectListComponent },
  { path: 'redirects', component: RedirectListComponent },
  { path: 'redirect/:partyId', component: RedirectDetailsComponent, canActivate: ['CanActivateForLoggedIn'] }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  { provide: 'CanActivateForLoggedIn', useValue: () => !! Meteor.userId() }
];
