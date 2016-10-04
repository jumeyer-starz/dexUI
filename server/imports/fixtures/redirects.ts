import { Redirects } from '../../../both/collections/redirect.collection';
import { Redirect } from '../../../both/interfaces/redirect.interface';

export function loadRedirects() {
  if (Redirects.find().count() === 0) {
    const redirects: Redirect[] = [
      {
        name: 'place',
        path: 'holder',
        redirect:'http://dude.com'
      }
    ];

    redirects.forEach((r) => Redirects.insert(r));
  }
}

