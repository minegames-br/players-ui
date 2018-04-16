import {Injectable} from '@angular/core';
import {Response,Http} from '@angular/http';
import {Service} from './generic.service';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class PessoaService extends Service {



    test = '';

    constructor(protected http: Http, 
        protected httpClient: HttpClient,
        protected oauthService: OAuthService, 
    ) {
        super(http, httpClient, oauthService);
        this._api = 'pessoa';
    }

}