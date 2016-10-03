//import { bootstrap } from 'angular2-meteor-auto-bootstrap';
//import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import '../both/methods/redirect.methods.ts';



// bootstrap(AppComponent, [
//   disableDeprecatedForms(),
//   provideForms(),
//   APP_ROUTER_PROVIDERS
// ]);

// Deps.autorun(function () {
//   Meteor.subscribe("userData");
// });

Meteor.methods({
  loginWithLdap: function (username, password, callback) {
    console.warn("loginWLdap now");
    // var methodArguments = {username: username, pwd: password, ldap: true, data: LDAP.data()};
    // Accounts.callLoginMethod({
    //   methodArguments: [methodArguments],
    //   validateResult: function (result) {
    //   },
    //   userCallback: callback
    // });

    // Meteor.loginWithLDAP(username, password,
    //     {dn:  username},
    //     function (error, success) {
    //       if (error) {
    //         console.warn(Accounts);
    //         console.log(error);
    //       } else {
    //         console.warn("good");
    //         console.warn(success);
    //         //FlowRouter.redirect('/');
    //         return {name:'test'}
    //       };
    //     });
  }

});

// var loginRequest = { user:'test', pass:'whateer' };
// Accounts.validateNewUser({
//     methodArguments: [loginRequest],
//     userCallback: function (err) {
//         if (!err) {
//             console.warn("attempting login");
//
//         }
//     }
// });
// Accounts.validateNewUser(function(){
//    console.warn("whaaat");
// });


