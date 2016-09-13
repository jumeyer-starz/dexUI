import {Mongo} from 'meteor/mongo';

import {Redirect} from '../interfaces/redirect.interface';

export const Redirects = new Mongo.Collection<Redirect>('parties');

function loggedIn() {
  return !!Meteor.user();
}

Redirects.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
