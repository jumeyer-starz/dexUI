export class URLTest{
    path:string;
    status:number;

    constructor(p:string){
        this.path = p;
    }
}

export class Redirect{
    path:string;
    url:string;
    tests:URLTest[]=[];

    uuid:string;
    createdBy: string;
    createdOn: string;
    modifiedOn: string;

    constructor(p:string, u:string){
        this.path = p;
        this.url = u;
    }
}
export class RedirectHostName{
    server: string;
    redirects:Redirect[]=[];

    constructor(s:string){
        this.server = s;
    }
}