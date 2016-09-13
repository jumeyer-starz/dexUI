import { Pipe } from '@angular/core';
import { MeteorComponent } from 'angular2-meteor';

import { Redirects } from '../../../both/collections/redirect.collection';
import { Redirect } from '../../../both/interfaces/redirect.interface';

@Pipe({
  name: 'rsvp',
  pure: false
})
export class RsvpPipe extends MeteorComponent {
  init: boolean = false;
  total: number = 0;

  transform(party: Redirect, type: string): number {
    if (!type) {
      return 0;
    }

    if (!this.init) {
      this.autorun(() => {
        const found = Redirects.findOne(party._id);
        if (found) {
          this.total = found.urlTests ?
            found.urlTests.filter(rsvp => rsvp.response === type).length : 0;
        }
      }, true);
      this.init = true;
    }

    return this.total;
  }
}
