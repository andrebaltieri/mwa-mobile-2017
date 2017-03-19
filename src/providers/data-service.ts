import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    private serviceUrl: string = 'http://58cd6920d4af3112005d8d34.mockapi.io/';

    constructor(public http: Http) {

    }

    authenticate(data: any) {
        return this.http.get(this.serviceUrl + 'users', data).map((res: Response) => res.json());
    }
}