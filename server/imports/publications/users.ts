import { Meteor } from 'meteor/meteor';

import {Redirects} from '../../../both/collections/redirect.collection';

Meteor.publish('uninvited', function (partyId: string) {
  let party = Redirects.findOne(partyId);

  if (!party)
    throw new Meteor.Error('404', 'No such party!');

  return Meteor.users.find({
    _id: {
      $nin: party.invited || [],
      $ne: this.userId
    }
  });
});
