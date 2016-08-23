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
  selector: 'demo-app',
  providers: [],
  templateUrl: 'demo-app.html',
  styleUrls: ['demo-app.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoApp { }
