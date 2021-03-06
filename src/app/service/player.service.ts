import {Injectable} from '@angular/core';
import {Response,Http} from '@angular/http';
import {Service} from './generic.service';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PlayerService extends Service {

    constructor(protected http: Http, 
        protected httpClient: HttpClient,
        protected oauthService: OAuthService, 
    ) {
        super(http, httpClient, oauthService);
        this._api = 'pessoa';
    }

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

    public setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public getUserInfo(): any {
        let url = environment.user_info_url;
        console.log( url );
        return this.httpClient.get( url, this.getHttpOptions() );
    }

}