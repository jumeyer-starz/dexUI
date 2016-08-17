
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Redirect } from './redirect';

//import { Hero }        from './hero';
//import { HeroService } from './hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: '../public/redirect.manager.component.html',
    styleUrls: ['../public/stylesheets/redirect.manager.component.css']
})
export class RedirectManagerComponent implements OnInit {
    redirects: Redirect[] = [];

    constructor(
        private router: Router
        //    private heroService: HeroService
    ) {}

    ngOnInit() {
        //console.warn("test");
        //this.heroService.getHeroes()
        //    .then(heroes => this.heroes = heroes.slice(1, 5));
    }
    /*
     gotoDetail(hero: Hero) {
     let link = ['/detail', hero.id];
     this.router.navigate(link);
     }
     */
}