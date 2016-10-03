import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginButtons } from 'angular2-meteor-accounts-ui';
import { MdToolbar } from '@angular2-material/toolbar';

//https://www.barbarianmeetscoding.com/blog/2016/07/07/updating-your-angular-2-app-to-use-the-new-router/
//noinspection TypeScriptCheckImport
import template from './app.component.html';

@Component({
  selector: 'app',
  template,
  //directives: [ LoginButtons, ROUTER_DIRECTIVES ]
})

export class AppComponent {

  doThis() {
    console.warn("doing this ");
    // Meteor.loginWithLdap("ENCORE\\jumeyer", ";1blackStripe", function (a, b) {
    //   console.warn(a);
    //   console.warn(b);
    // });
  }
}


