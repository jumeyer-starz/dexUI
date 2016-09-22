import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LoginButtons } from 'angular2-meteor-accounts-ui';



//noinspection TypeScriptCheckImport
import template from './app.component.html';

@Component({
  selector: 'app',
  template,
  directives: [ROUTER_DIRECTIVES, LoginButtons]
})

export class AppComponent {

  public doThis = function() {
    console.warn("doing thsi ");
    Meteor.loginWithPassword("jumeyer", "pass", function (a, b) {
      console.warn(a);
      console.warn(b);
    });
  }
}
