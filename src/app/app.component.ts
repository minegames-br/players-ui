import {Component} from '@angular/core';
import { Pessoa } from './domain/pessoa';
import { PessoaService } from './service/pessoa.service';
import { OAuthService } from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import { JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Pessoas';
  pessoas: Pessoa[];
  filteredList: Pessoa[];
  username: string;
  title: string;
  logotipo: string;
  routes: Object[] = [
    {
      title: 'Inbox',
      route: '/',
      icon: 'email',
    }, {
      title: 'Snoozed',
      route: '/',
      icon: 'access_time',
    }, {
      title: 'Drafts',
      route: '/',
      icon: 'drafts',
    }, {
      title: 'Sent',
      route: '/',
      icon: 'send',
    }, {
      title: 'Trash',
      route: '/',
      icon: 'delete',
    },
  ];

  constructor(
              private oauthService: OAuthService, 
              private _pessoaService: PessoaService) {
  }

  ngOnInit(): void {
    this.authenticate();
  }

  public authenticate() {
    console.log('authenticate');
    this.oauthService.strictDiscoveryDocumentValidation = environment.openid.strictDiscoveryDocumentValidation;
    this.oauthService.issuer = environment.openid.issuer;
    this.oauthService.loginUrl = environment.openid.loginUrl;
    this.oauthService.redirectUri = environment.openid.redirectUri;
    this.oauthService.clientId = environment.openid.clientId;
    this.oauthService.scope = environment.openid.scope;
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);

/*
    console.log('loadDiscoveryDocument - inicio');
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.loadDiscoveryDocument(environment.openid.URLWELLKNOWN).then((doc) => {
      console.log('JWKS ' + JSON.stringify(this.oauthService.jwks) );
      this.oauthService.tryLogin({
        onTokenReceived: context => {
            console.log('onTokenReceived:', context);
            console.log( 'accessToken: ' + context.accessToken);
            environment.access_token = context.accessToken;
            console.log( 'load' );
            this.load( context.accessToken );
            let claims = this.oauthService.getIdentityClaims();
            console.log( 'claims: ', claims );
        },
        onLoginError: (err) => {
            console.log('onLoginError:', err);
        }
      }).then(() => {
          if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
            console.log('vai chamar initImplicitFlow()');
            console.error( 'implicit' );
              this.oauthService.initImplicitFlow();
          } else {
            console.log( 'load no else to hasValidToken()' );
            console.log( 'access token: ' + this.oauthService.getAccessToken() );
            console.log( 'id token: ' + this.oauthService.getIdToken() );
            this.load( this.oauthService.getAccessToken() );
            console.log('sub: ' + this.oauthService.getIdentityClaims()['sub'] );
          }
      });
    });
    console.log('loadDiscoveryDocument - fim');
*/
    this.oauthService.tryLogin({
      onTokenReceived: context => {
          console.log('onTokenReceived:', context);
          console.log( 'accessToken: ' + context.accessToken);
          environment.access_token = context.accessToken;
          console.log( 'load' );
          this.load( context.accessToken );
          let claims = this.oauthService.getIdentityClaims();
          console.log( 'claims: ', claims );
      },
      onLoginError: (err) => {
          console.log('onLoginError:', err);
      }
    }).then(() => {
        if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
          console.log('vai chamar initImplicitFlow()');
          console.error( 'implicit' );
            this.oauthService.initImplicitFlow();
        } else {
          console.log( 'load no else to hasValidToken()' );
          console.log( 'access token: ' + this.oauthService.getAccessToken() );
          console.log( 'id token: ' + this.oauthService.getIdToken() );
          this.load( this.oauthService.getAccessToken() );
          console.log('sub: ' + this.oauthService.getIdentityClaims()['sub'] );
        }
    });    

  }

  async load( accessToken: string ): Promise<void> {
    try {
      let self = this;
      this._pessoaService.setAccessToken( accessToken );
      this._pessoaService.getList( ).subscribe( data => {
        console.log("data: " + data);
        //self.pessoas = data.LIST.pessoa as Pessoa[];
        self.pessoas = data as Pessoa[];
      });
      console.log("chamar userinfo");
      this._pessoaService.getUserInfo().subscribe( data => {
        console.log( "userinfo - inicio" );
        console.log( JSON.stringify( data ) );
        this.username = data['sub'];
        console.log( "userinfo - fim" );
      });
    } catch (error) {
      console.log( error );
      this.pessoas = [];
    } finally {
      this.filteredList = this.pessoas as Pessoa[];
    }
  }

}