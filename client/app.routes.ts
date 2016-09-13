import { RouterConfig, provideRouter } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { PartiesListComponent } from './imports/redirects/redirects-list.component';
import { PartyDetailsComponent } from './imports/redirects/redirect-details.component';

const routes: RouterConfig = [
  { path: '',           component: PartiesListComponent },
  { path: 'redirects', component: PartiesListComponent },
  { path: 'redirect/:partyId', component: PartyDetailsComponent, canActivate: ['CanActivateForLoggedIn'] }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  { provide: 'CanActivateForLoggedIn', useValue: () => !! Meteor.userId() }
];
