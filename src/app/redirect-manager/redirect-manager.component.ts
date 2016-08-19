// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   moduleId: module.id,
//   selector: 'app-redirect-manager',
//   templateUrl: 'redirect-manager.component.html',
//   styleUrls: ['redirect-manager.component.css']
// })
// export class RedirectManagerComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
// }

//example page: https://justindujardin.github.io/ng2-material/#/components/card

import {Component, OnInit, HostListener} from '@angular/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';

import { NgModule } from '@angular/core';
import { provideForms, disableDeprecatedForms } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
	moduleId: module.id,
	selector: 'app-redirect-manager',
	templateUrl: 'redirect-manager.component.html',
	styleUrls: ['redirect-manager.component.css'],
	//imports: [ NgModule, BrowserModule ],
	directives: [MD_SIDENAV_DIRECTIVES],
	//providers:[MATERIAL_PROVIDERS]
})

//export class RedirectManagerComponent {}



export class RedirectManagerComponent implements OnInit {
	text: string;
	redirects;
	constructor() { }

	ngOnInit() {
		this.redirects = [
			{
				hostname: "www.starz.com",
				path: "/jrm",
				redirect: "http://justinrmeyer.com",
				created: "20160815",
				creadedBy: "jumeyer"

			},
			{
				hostname: "www.starz.com",
				path: "/jrminfo",
				redirect: "http://justinrmeyer.info",
				created: "20160815",
				creadedBy: "jumeyer"
			}
		];
	}


	addRedirect(){
		console.log(this.text);
	}

	@HostListener('window:resize')
  onResize(){
    if(window.innerWidth < 800){
      
		}
	}
};
