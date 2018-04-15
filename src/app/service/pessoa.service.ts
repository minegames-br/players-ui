import {Injectable} from '@angular/core';
import {Response,Http} from '@angular/http';
import {Service} from './generic.service';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PessoaService extends Service {

    test = '';

    constructor(protected http: Http, protected httpClient: HttpClient) {
        super(http, httpClient);
        this._api = 'pessoa';
    }

}