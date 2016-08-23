import {Component, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs/Observable';


@Component({
    moduleId: module.id,
    selector: 'redirect-manager',
    templateUrl: 'redirect-manager.html',
    pipes: [AsyncPipe],
    styleUrls: ['redirect-manager.css'],
    encapsulation: ViewEncapsulation.None
})



export class RedirectManager {
    hosts = [
        {
            server: 'www.starz.com',
            redirects:[
                {
                    path:'/jrm',
                    uuid:'unique',
                    enabledTest:true,
                    enabledProd:true,
                    url:'http://justinrmeyer.com',
                    createdBy:'jumeyer',
                    createdOn:'2016-08-21 00:00:00',
                    modifiedOn:'2016-08-21 00:00:00',
                    tests:[
                        {
                            path: "/jrm",
                            status: true
                        },{
                            path: "/jrminfo",
                            status: false
                        }
                    ]
                },{
                    path:'/justin',
                    uuid:'unique',
                    enabledTest:true,
                    enabledProd:true,
                    url:'http://justinrmeyer.info',
                    createdBy:'jumeyer',
                    createdOn:'2016-08-21 00:00:00',
                    modifiedOn:'2016-08-21 00:00:00',
                    tests:[
                        {
                            path: "/jrm",
                            status: true
                        },{
                            path: "/jrminfo",
                            status: false
                        }
                    ]
                }
            ]
        },{
            server: 'starz.com',
            redirects:[
                {
                    path:'/otherurl',
                    uuid:'unique',
                    enabledTest:true,
                    enabledProd:true,
                    url:'http://other.com',
                    createdBy:'jumeyer',
                    createdOn:'2016-08-21 00:00:00',
                    modifiedOn:'2016-08-21 00:00:00',
                    tests:[
                        {
                            path: "/jrm",
                            status: true
                        },{
                            path: "/jrminfo",
                            status: false
                        }
                    ]
                },{
                    path:'/something',
                    uuid:'unique',
                    enabledTest:true,
                    enabledProd:false,
                    url:'http://something.info',
                    createdBy:'jumeyer',
                    createdOn:'2016-08-21 00:00:00',
                    modifiedOn:'2016-08-21 00:00:00',
                    tests:[
                        {
                            path: "/jrm",
                            status: true
                        },{
                            path: "/jrminfo",
                            status: false
                        }
                    ]
                },{
                    path:'/careers',
                    uuid:'unique',
                    enabledTest:false,
                    enabledProd:true,
                    url:'http://linkedin.com',
                    createdBy:'jumeyer',
                    createdOn:'2016-08-23 00:00:00',
                    modifiedOn:'2016-08-21 01:11:01',
                    tests:[
                        {
                            path: "/jrm",
                            status: true
                        },{
                            path: "/jrminfo",
                            status: false
                        }
                    ]
                }
            ]
        }
    ];

    asyncTabs: Observable<any>;

    constructor() {
        this.asyncTabs = Observable.create((observer: any) => {
            setTimeout(() => {
                observer.next(this.hosts);
                console.warn(this.hosts);
            }, 500);
        });
    }
}


///////////////////////////////// dialog below ////




import {ViewContainerRef} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular2-material/dialog/dialog';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';

@Component({
    moduleId: module.id,
    selector: 'dialog-demo',
    templateUrl: 'dialog-demo.html',
    styleUrls: ['dialog-demo.css'],
    providers: [MdDialog, OVERLAY_PROVIDERS]
})
export class DialogDemo {
    dialogRef: MdDialogRef<JazzDialog>;
    lastCloseResult: string;

    constructor(
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef) { }

    open() {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        this.dialogRef = this.dialog.open(JazzDialog, config);

        this.dialogRef.afterClosed().subscribe(result => {
            this.lastCloseResult = result;
            this.dialogRef = null;
        });
    }
}

@Component({
    selector: 'add-redirect-dialog',
    template: `
  <p>It's Jazz!</p>
  <p><label>How much? <input #howMuch></label></p>
  <button type="button" (click)="dialogRef.close(howMuch.value)">Close dialog</button>`
})
export class JazzDialog {
    constructor(public dialogRef: MdDialogRef<JazzDialog>) { }
}

