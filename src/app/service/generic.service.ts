import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


export class Service {

    protected _api: string;
    protected httpOptions;

    constructor(protected http: Http, protected httpClient: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer 32192487-167e-306e-94c7-8dce29ab1678'
            })
        };
    }

    public findAll(): any[] {
        let list = [];
        return list;
    }

    public getList(): any {
        let url = `${environment.api_gateway_url}${this._api}`;
        return this.httpClient.get( url, this.httpOptions);
    }

    public delete(_id: string): Observable<any> {
      let url = `${environment.api_gateway_url}${this._api}/${_id}`;
      console.log( url );
      return this.http.delete(`${environment.api_gateway_url}${this._api}/${_id}`);
    }

    public save(_domain: Object, id: string): Observable<any> {
        if ( id ) {
            console.log("PUT");
            return this.http.put(`${environment.api_gateway_url}${this._api}/`, _domain);
        } else {
            console.log("POST");
            return this.http.post(`${environment.api_gateway_url}${this._api}`, _domain);
        }
    }

    public getDomain(_id: string): Observable<Object> {
        return this.http.get(`${environment.api_gateway_url}${this._api}/${_id}`)
            .map(( res: Response ) => {
                console.log(res.json() );
                return res.json();
            });
    }


}