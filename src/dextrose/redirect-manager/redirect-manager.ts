import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular2-material/dialog/dialog';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';
//import {MaterialModule} from '@angular2-material/all/all';
import { FormsModule, FormControl } from '@angular/forms';


import { Redirect, RedirectHostName, URLTest } from 'redirect-base/redirect-base'

@Component({
    moduleId: module.id,
    selector: 'redirect-manager',
    templateUrl: 'redirect-manager.html',
    pipes: [AsyncPipe],
    styleUrls: ['redirect-manager.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MdDialog, OVERLAY_PROVIDERS]
})


export class RedirectManager {
    hosts:RedirectHostName[]=[];
    dialogRef: MdDialogRef<HostDialog>;
    redirectDialogRef: MdDialogRef<RedirectDialog>;

    asyncTabs: Observable<any>;
    private lastCloseResult: string;

    public addHost(){
        console.warn("add clicked!")
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(HostDialog, config);

        this.dialogRef.afterClosed().subscribe(result => {
            this.lastCloseResult = result;
            this.dialogRef = null;

            console.warn("dude here");
            console.warn(this.lastCloseResult);
            console.warn(this.dialogRef);
            this.hosts.push(new RedirectHostName(this.lastCloseResult));
        });
    }

    public addRedirect(){
        console.warn("new redirect");
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.redirectDialogRef = this.dialog.open(RedirectDialog, config);

        this.redirectDialogRef.afterClosed().subscribe(result => {
            this.lastCloseResult = result;
            this.dialogRef = null;

            console.warn("dude2 here");
            console.warn(this.lastCloseResult);
            console.warn(this.dialogRef);
            this.hosts.push(new RedirectHostName(this.lastCloseResult));
        });
    }

    constructor(
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef
    ) {
        let a = new RedirectHostName('www.starz.com');
        let b = new RedirectHostName('starz.com');

        let c = new Redirect('/jrm','http://justinrmeyer.com');
        c.tests.push(new URLTest('asdf'));
        a.redirects.push(c);
        b.redirects.push(new Redirect('/jrm','http://justinrmeyer.com'));

        console.warn(a);
        console.warn(this.hosts);

        this.hosts.push(a);
        this.hosts.push(b);

        this.asyncTabs = Observable.create((observer: any) => {
            setTimeout(() => {
                console.warn("hosts" );
                console.warn(this.hosts);
                observer.next(this.hosts);
            }, 500);
        });
    }
}

//new hostname form

import { URLValidator } from './url-valid-directive';

@Component({
    selector: 'host-dialog',
    encapsulation: ViewEncapsulation.None,
    //providers: [OVERLAY_PROVIDERS],
    //imports:[FormControl],
    directives:[URLValidator],
    template: `
  <h1>Enter New Hostname</h1>
  <p><label>{{url.valid?'t':'f'}}  {{url.status}}  {{url.value}}http://<input #url validateURL ngModel required></label></p>
    <small [hidden]="url.validURL">
        URL Doesnt appear to be valid
    </small>
  <button type="button" md-mini-fab (click)="dialogRef.close()"><md-icon class="md-24">close</md-icon></button>
  <button type="button" md-mini-fab (click)="dialogRef.close(url.value)" [disabled]="!url.validURL  "><md-icon class="md-24">check</md-icon></button>`

})
export class HostDialog {
    constructor(public dialogRef: MdDialogRef<HostDialog>) { }

    ngOnInit() {
        console.warn("ngOnInit");
    }


}


//new redirect form

@Component({
    selector: 'redirect-dialog',
    encapsulation: ViewEncapsulation.None,
    providers: [OVERLAY_PROVIDERS],
    template: `
  <h1>Enter New Redirect</h1>
  <p><label>Enter Redirect<input #url></label></p>

  <button type="button" md-mini-fab (click)="dialogRef.close()"><md-icon class="md-24">close</md-icon></button>
  <button type="button" md-mini-fab (click)="dialogRef.close(howMuch.value)"><md-icon class="md-24">check</md-icon></button>`
})
export class RedirectDialog {
    constructor(public dialogRef: MdDialogRef<RedirectDialog>) { }
}
