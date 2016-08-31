import {Component, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs/Observable';
//import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular2-material/dialog/dialog';
//import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';


@Component({
    moduleId: module.id,
    selector: 'redirect-manager',
    templateUrl: 'redirect-manager.html',
    pipes: [AsyncPipe],
    styleUrls: ['redirect-manager.css'],
    encapsulation: ViewEncapsulation.None,
    //providers: [MdDialog, OVERLAY_PROVIDERS]
})

// class URLTestResult{
//     path:string;
//     status:number;
// }
//
// class Redirect{
//     path:string;
//     uuid:string;
//     url:string;
//     createdBy: string;
//     createdOn: string;
//     modifiedOn: string;
// }
// class RedirectHostName{
//     server: string;
//     redirects: Redirect[];
//
//     constructor(s:string){
//         this.server = s;
//     }
// }


export class RedirectManager {
    //d: RedirectHostName[];
    hosts : any=     [
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


    public addHost(){
        //let config = new MdDialogConfig();
        //config.viewContainerRef = this.viewContainerRef;
        // this.dialogRef = this.dialog.open(HostDialog, config).afterClosed().subscribe(result => {
        //     this.lastCloseResult = result;
        //     this.dialogRef = null;
        //
        //     console.warn("dude here");
        //     console.warn(this.lastCloseResult);
        //     console.warn(this.dialogRef);
        //     this.hosts.push(new RedirectHostName(this.lastCloseResult));
        // });
    }

    asyncTabs: Observable<any>;

    //dialog vars
    //dialogRef: MdDialogRef<HostDialog>;
    //private lastCloseResult: string;
    constructor(
        // public dialog: MdDialog,
        // public viewContainerRef: ViewContainerRef
    ) {
        this.asyncTabs = Observable.create((observer: any) => {
            setTimeout(() => {
                observer.next(this.hosts);
                console.warn(this.hosts);
            }, 500);
        });


    }
}



// @Component({
//     selector: 'host-dialog',
//     template: `
//   <p>Enter New Hostname</p>
//   <p><label>Enter Hostname<input #howMuch></label></p>
//
//   <button type="button" (click)="dialogRef.close()"><md-icon md-fab  class="md-24">close</md-icon></button>
//   <button type="button" (click)="dialogRef.close(howMuch.value)"><md-icon md-fab class="md-24">check</md-icon></button>`
// })
// export class HostDialog {
//     constructor(public dialogRef: MdDialogRef<HostDialog>) { }
// }
//
