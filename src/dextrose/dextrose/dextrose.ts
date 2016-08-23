import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'home',
  template: `<p>placeholder</p>`,
  // templateUrl: 'card-app.html',
  // styleUrls: ['card-app.css']
})
export class Home {}

@Component({
  moduleId: module.id,
  selector: 'dextrose-selector',
  providers: [],
  templateUrl: 'dextrose.html',
  styleUrls: ['dextrose.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DextroseApp { }
