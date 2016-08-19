import { Component } from '@angular/core';

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';

import { RedirectManagerComponent } from './redirect-manager/redirect-manager.component';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [RedirectManagerComponent]
})
export class AppComponent {
  title = 'jtfc!';
}

