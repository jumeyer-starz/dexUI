import {Redirects} from '../../../both/collections/redirect.collection';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

function buildQuery(partyId?: string, qstr?: string): Object {
  // const isAvailable = {
  //   $or: [
  //     { 'public': true },
  //     {
  //       $and: [
  //         { owner: this.userId },
  //         { owner: { $exists: true } }
  //       ]
  //     }, {
  //       $and: [
  //         { invited: this.userId },
  //         { invited: { $exists: true } }
  //       ]
  //     }
  //   ]
  // };


  if (partyId) {
    //return { $and: [{ _id: partyId }, isAvailable] };
    return { _id: partyId };
  }

  const searchRegEx = {
    '$regex': '.*' + (qstr || '') + '.*',
    '$options': 'i'
  };

  //return { $and: [{ 'redirect.name': searchRegEx }, isAvailable] };
  return {
    $or:[
        {'redirect': searchRegEx },
        {'description': searchRegEx },
        {'name': searchRegEx }
    ]
  };
}

Meteor.publish('parties', function(options: any, qstr?: string) {
  const selector = buildQuery.call(this, null, qstr);
  Counts.publish(this, 'numberOfParties', Redirects.find(selector), { noReady: true });
  return Redirects.find(selector, options);
});

Meteor.publish('party', function(partyId: string) {
  return Redirects.find(buildQuery.call(this, partyId));
});
