import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular2-material/dialog/dialog';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';

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

// ///
// let config = new MdDialogConfig();
// config.viewContainerRef = this.viewContainerRef;
// this.dialogRef = this.dialog.open(JazzDialog, config);
// this.dialogRef.afterClosed().subscribe(result => {
//     this.lastCloseResult = result;
//     this.dialogRef = null;
// });
// ///
export class RedirectManager {
    hosts:RedirectHostName[]=[];
    dialogRef: MdDialogRef<HostDialog>;


    asyncTabs: Observable<any>;
    private lastCloseResult: string;

    public addHost(){
        console.warn("add clicked!")
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(HostDialog, config);

        // this.dialogRef.afterClosed().subscribe(result => {
        //     this.lastCloseResult = result;
        //     this.dialogRef = null;
        //
        //     console.warn("dude here");
        //     console.warn(this.lastCloseResult);
        //     console.warn(this.dialogRef);
        //     this.hosts.push(new RedirectHostName(this.lastCloseResult));
        // });
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



@Component({
    selector: 'host-dialog',
    template: `
  <p>Enter New Hostname</p>
  <p><label>Enter Hostname<input #howMuch></label></p>

  <button type="button" (click)="dialogRef.close()"><md-icon md-fab  class="md-24">close</md-icon></button>
  <button type="button" (click)="dialogRef.close(howMuch.value)"><md-icon md-fab class="md-24">check</md-icon></button>`
})
export class HostDialog {
    constructor(public dialogRef: MdDialogRef<HostDialog>) { }
}

