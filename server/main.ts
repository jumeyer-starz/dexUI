import {loadRedirects} from './imports/fixtures/redirects';
import {Meteor} from 'meteor/meteor';
//import consul from 'consul';

declare var require:(moduleId:string) => any;
var consul = require("consul");

import './imports/publications/redirect';
import './imports/publications/users';
import '../both/methods/redirect.methods.ts';

import {Redirects} from "../both/collections/redirect.collection";
import {Redirect} from "../both/interfaces/redirect.interface";

import {MeteorAppRegistry} from "angular2-meteor";


var consul_test:any;
var consul_prod:any;

Accounts.onLogin(function(info) {
  console.log("onLogin fired" + info);
});

Meteor.methods({
  guid:function():string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  },
  fiberTest:function():string{
    return "wahtever"
  },
  pushToConsul:function(newRd: Redirect){
    console.warn("pushed:" + newRd.name);
    let myGuid = Meteor.call('guid');
    consul_prod.kv.set('redirects/'+newRd.name+'/'+myGuid, 'value', function(){console.warn('done');})
    consul_test.kv.set('redirects/'+newRd.name+'/'+myGuid, 'value', function(){console.warn('done');})
  },
  test: function(){
    console.warn("test called");
  },
  loginWithLdap: function (username, password, callback) {
    console.warn("loginWLdap now");
    // var methodArguments = {username: username, pwd: password, ldap: true, data: LDAP.data()};
    //  Accounts.callLoginMethod({
    //   methodArguments: [methodArguments],
    //   validateResult: function (result) {
    //   },
    //   userCallback: callback
    //  });
  }

});




Meteor.startup(() => {
  // load initial Redirects
  loadRedirects();

  console.warn("i'm a server");
  let consul_test = consul({
    host: "52.90.160.92",
    port: 80
  });
  let consul_prod = consul({
    host: "54.164.47.24",
    port: 80
  });

  var test_wtch = consul_test.watch({
    method: consul_test.kv.get,
    options: {
      key: "redirects\/",
      recurse: true
    }
  });
  var prod_wtch = consul_prod.watch({
    method: consul_test.kv.get,
    options: {
      key: "redirects\/",
      recurse: true
    }
  });
  // test_wtch.on('change', function (data,msg) {
  //   console.log('\ntest data change:', data);
  //   //fiber this
  //   //data.forEach((r) => Redirects.insert({name:r.Key, path:r.Value, redirect:r.Value}));
  //
  //
  //     // for (var i = 0; i < data.length; i++) {
  //     //   let r = new Redirect();
  //     //   r.name = data[i].Value;
  //     //   r.path = data[i].Key;
  //     //   r.redirect = data[i].Value;
  //     //   r.time = Date.now();
  //     //   Redirects.insert(r);
  //     // }
  //
  // });



  prod_wtch.on('change', function (data,msg) {
    console.log('\nprod data change:', data);
    //fiber this
    //data.forEach((r) => Redirects.insert({name:r.Key, path:r.Value, redirect:r.Value}));
    Meteor.wrapAsync(function(err){
      console.warn("prod change");
    });
  });




    // Redirects.remove({});
    // for (var i = 0; i < data.length; i++) {
    //   let r = new Redirect();
    //   r.name =  data[i].Value;
    //   r.path = data[i].Key;
    //   r.redirect = data[i].Value;
    //   r.time = Date.now();
    //
    //   Redirects.insert(r);
    // }


  // var boundInsert = Meteor.bindEnvironment( Redirects, function(err) {
  //   if (err) {
  //     console.log("error binding?");
  //     console.log(err);
  //   }
    //where the magic happens
    // test_wtch.on('change', Meteor.bindEnvironment(function (data,msg) {     //function (data, msg) {
    //       console.log('\ndata:', data);
    //
    //       // exports.Messages.remove({});
    //       // for (var i = 0; i < data.length; i++) {
    //       //   exports.Messages.insert({
    //       //     name: data[i].Value,
    //       //     path: data[i].Key,
    //       //     redirect:data[i].Value,
    //       //     time: Date.now()
    //       //   });
    //       // }
    //
    //     }) //.on
    //
    // );
  // });
  // boundInsert();




    // test_wtch.on('change', Meteor.wrapAsync(function (data,msg) {     //function (data, msg) {
    //     console.log('\ndata:', data);
    //
    //     Redirects.remove({});
    //     for (var i = 0; i < data.length; i++) {
    //       let r = new Redirect();
    //       r.name =  data[i].Value;
    //       r.path = data[i].Key;
    //       r.redirect = data[i].Value;
    //       r.time = Date.now();
    //
    //       Redirects.insert(r);
    //     }
    //
    //   })
    // )//.on


});


