import {Component, ViewContainerRef, ViewEncapsulation, Input} from '@angular/core';
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
    hostDialogRef:MdDialogRef<HostDialog>;
    redirectDialogRef:MdDialogRef<RedirectDialog>;

    asyncTabs: Observable<any>;


    public addHost(){
        console.warn("add clicked!")
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.hostDialogRef = this.dialog.open(HostDialog, config);

        this.hostDialogRef.afterClosed().subscribe(result => {
            console.warn(this.hostDialogRef);
            this.hostDialogRef = null;

            console.warn("addHost");
            if(result != "")
                this.hosts.push(new RedirectHostName(result));
        });
    }

    public addEditRedirectDialog(server:string){
        console.warn("new redirect " + server);
        let config:MdDialogConfig = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;

        //this.redirectDialogRef = this.dialog.open(RedirectDialog, config);


        this.redirectDialogRef.afterClosed().subscribe(result => {
            console.warn(this.redirectDialogRef);
            this.redirectDialogRef = null;

            console.warn("addEditRedirectDialog for " + server + " " + result.path + " to " + result.url);
            this.addRedirect(server, result.path, result.url);
        });
    }

    public deleteRedirect(){

    }

    private addRedirect(host:string, path:string, url:string){
        for(let i:number = 0; i < this.hosts.length; i++){
            if(this.hosts[i].server == host){
                let newRedirect:Redirect = new Redirect(path, url);
                this.hosts[i].redirects.push(newRedirect);
            }
        }
        console.warn(this.hosts);
    }

    constructor(
        public dialog: MdDialog,
        public viewContainerRef: ViewContainerRef
    ) {
        let a = new RedirectHostName('www.starz.com');
        let b = new RedirectHostName('starz.com');

        let c = new Redirect('/jrm','http://justinrmeyer.com');
        c.tests.push(new URLTest('asdf'));
        c.tests.push(new URLTest('11'));
        c.tests.push(new URLTest('33'));
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


import { URLValidator } from './url-valid-directive';

@Component({
    selector: 'host-dialog',
    encapsulation: ViewEncapsulation.None,
    providers: [OVERLAY_PROVIDERS],
    //imports:[FormControl],
    directives:[URLValidator],
    template: `
  <h1>Enter New Hostname</h1>
  <p><label>http://<input #url validateURL ngModel required></label></p>
    <small [hidden]="!url.valid">
        URL Doesnt appear to be valid
    </small>
  <button type="button" md-mini-fab (click)="hostDialogRef.close()"><md-icon class="md-24">close</md-icon></button>
  <button type="button" md-mini-fab (click)="hostDialogRef.close(url.value)" [disabled]="url.valid  "><md-icon class="md-24">check</md-icon></button>`

})
export class HostDialog {
    constructor(
        public hostDialogRef: MdDialogRef<HostDialog>) { }

    ngOnInit() {
        console.warn("HostDialog ngOnInit");
    }

}



@Component({
    selector: 'redirect-dialog',
    encapsulation: ViewEncapsulation.None,
    providers: [OVERLAY_PROVIDERS],
    template: `
  <h1>Enter New Redirect {{hostString}}</h1>
  <p><label>hostname/<input #path></label></p>
  <p><label>Redirects to <br>http://<input #url></label></p>
  <button type="button" md-mini-fab (click)="redirectDialogRef.close()"><md-icon class="md-24">close</md-icon></button>
  <button type="button" md-mini-fab (click)="redirectDialogRef.close({path:path.value, url:url.value})"><md-icon class="md-24">check</md-icon></button>`
})
export class RedirectDialog {
    host:RedirectHostName;
    @Input('hs') hostString:string;

    constructor(
        public redirectDialogRef: MdDialogRef<RedirectDialog>
    ) {
        console.warn("constructor called " +this.hostString);
        //this.hostString = ;
    }
}
