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
  consul_test = consul({
    host: "52.90.160.92",
    port: 80
  });
  consul_prod = consul({
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
  test_wtch.on('change', function (data,msg) {
    console.log('\ntest data change:', data);

    //data.forEach((r) => Redirects.insert({name:r.Key, path:r.Value, redirect:r.Value}));
  });
  prod_wtch.on('change', function (data,msg) {
    console.log('\nprod data change:', data);

    //data.forEach((r) => Redirects.insert({name:r.Key, path:r.Value, redirect:r.Value}));
  });



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
    //       //     reidrect:data[i].Value,
    //       //     time: Date.now()
    //       //   });
    //       // }
    //
    //     }) //.on
    //
    // );
  // });
  // boundInsert();


});


