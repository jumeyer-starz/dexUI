import { Routes, RouterModule } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { RedirectListComponent } from './imports/redirects/redirects-list.component';
import { RedirectDetailsComponent } from './imports/redirects/redirect-details.component';

const routes: Routes = [
  { path: '',           component: RedirectListComponent, pathMatch: 'full' },
  { path: 'redirects', component: RedirectListComponent},
  { path: 'redirect/:partyId', component: RedirectDetailsComponent, canActivate: ['CanActivateForLoggedIn'] }
];

// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes),
//     routes
//   { provide: 'CanActivateForLoggedIn', useValue: () => !! Meteor.userId() }
// ];
export const routing = RouterModule.forRoot(routes);
