import {Component, ViewEncapsulation} from '@angular/core';
import { Title }     from '@angular/platform-browser';

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
export class DextroseApp {
    public constructor(private titleService: Title ) { }
    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }
}
