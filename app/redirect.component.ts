import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

//import { Hero }        from './hero';
//import { HeroService } from './hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: '../public/redirect.component.html',
    styleUrls: ['../public/stylesheets/redirect.component.css']
})
export class RedirectComponent implements OnInit {
    //heroes: Hero[] = [];

    constructor(
        private router: Router
    //    private heroService: HeroService
        ) {}

    ngOnInit() {
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
