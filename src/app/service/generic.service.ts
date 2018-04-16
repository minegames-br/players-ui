import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';


export class Service {

    protected accessToken: string;
    protected _api: string;

    constructor(protected http: Http, 
        protected httpClient: HttpClient,               
        protected oauthService: OAuthService, 
    ) {

    }

    protected getHttpOptions(): any {
        let bearer = "";

        let httpOptions = {
            headers: new HttpHeaders({
              'Accept':  'application/json',
              'Authorization': `Bearer ${environment.access_token}`
            })
        };
        return httpOptions;
    }
    /*
    protected getHttpOptions(): any {
        let bearer = "";
        if( this.oauthService.getAccessToken() == null || this.oauthService.getAccessToken() == "") {
            bearer = this.accessToken;
        } else {
            bearer = this.oauthService.getAccessToken();
        }
        let httpOptions = {
            headers: new HttpHeaders({
              'Accept':  'application/json',
              'Authorization': `Bearer ${bearer}`
            })
        };
        return httpOptions;
    }
*/

    public setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public findAll(): any[] {
        let list = [];
        return list;
    }

    public getList(): any {
        let url = `${environment.api_gateway_url}${this._api}`;
        console.log( url );
        return this.httpClient.get( url, this.getHttpOptions() );
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