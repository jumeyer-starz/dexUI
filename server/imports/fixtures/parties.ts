import { Redirects } from '../../../both/collections/redirect.collection';
import { Redirect } from '../../../both/interfaces/redirect.interface';

export function loadRedirects() {
  if (Redirects.find().count() === 0) {
    const parties: Redirect[] = [
      {
        name: 'place',
        description: 'holder',
        location: {
          name: 'test'
        },
        testEnabled: true
      }
    ];

    parties.forEach((party) => Redirects.insert(party));
  }
}
