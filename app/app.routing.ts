import { Routes, RouterModule } from '@angular/router';

import { RedirectComponent }  from './redirect.component';
import { SomethinComponent }  from './somethin.component';

//import { HeroesComponent }     from './heroes.component';
//import { HeroDetailComponent } from './hero-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/redirects',
        pathMatch: 'full'
    },{
        path: 'redirects',
        component: RedirectComponent
    },{
        path: 'somethin',
        component: SomethinComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
