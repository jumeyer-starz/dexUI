import { Routes, RouterModule } from '@angular/router';

import { RedirectManagerComponent }  from './redirect.manager.component';
import { SomethinComponent }  from './somethin.component';


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/status',
        pathMatch: 'full'
    },{
        path: 'redirects',
        component: RedirectManagerComponent
    },{
        path: 'status',
        component: SomethinComponent
    }
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
