import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

// Imports for loading & configuring the in-memory web api
//import { HttpModule, XHRBackend } from '@angular/Http';
import { routing, appRoutingProviders } from './app.routing';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }               from './in-memory-data.service';

import { AppComponent }   from './app.component';


import { RedirectManagerComponent }   from './redirect.manager.component';
//import { HeroDetailComponent }  from './hero-detail.component';
//import { HeroSearchComponent }  from './hero-search.component';


@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        routing
        //HttpModule
    ],
    declarations: [
        AppComponent,
        //HeroesComponent,
        RedirectManagerComponent,
        //HeroDetailComponent,
        //HeroSearchComponent
    ],
    providers: [
        appRoutingProviders
        //HeroService,
        //{ provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
        //{ provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
