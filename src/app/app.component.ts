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
    // recuperar o personal que está usando o sistema
    this.authenticate();
    //this.load('um');
  }

  public authenticate() {
    console.log('authenticate');
    //this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //this.oauthService.jwks = {"keys":[{"kty":"RSA","e":"AQAB","use":"sig","kid":"d0ec514a32b6f88c0abd12a2840699bdd3deba9d","alg":"RS256","n":"ALLdgDZ_3VgFVU6VAnWg6UwJYtqdaaKccdzP5kk14F9qv___tPZnJmRmQhRdbyEyVDK-5xgiuRd2RIA9WSwWdsBUEiSLWOJGp9_NuoMcq9GVZ2fCZrDU8BQ8xDJ8v3LaJ4sJEtTaY2_aPl6NTfLEddtPWfqvAQL0szcIzgK7_bYZn-mQvDNhn_WP7M3qA23EaSb6G9wlxLM8hjvBLK4F4Ukdm_tQrhErsApa8zBAI4ysE_1Qlq7_R7hn9kgX0Xjx7ndBwjtGX6GlWXRV0Bi9V3dsaF3Zbj4vovyUBJ1Oqfe1j5gzFzyU31NsFkGWmHAknoHOY_AqzHaTR3dziOlAeqk"}]}
    this.oauthService.strictDiscoveryDocumentValidation = false;
    //this.oauthService.issuer = 'https://app1ssosite015h.hom.sicredi.net:9443/oauth2/token';
    //this.oauthService.issuer = 'https://localhost:9443/oauth2/token';
    this.oauthService.issuer = 'https://app1ssosite015h.hom.sicredi.net:9443/oauth2/token';
    
    //this.oauthService.issuer = 'https://172.17.0.1:9443/oauth2/token';
    this.oauthService.loginUrl = "https://app1ssosite015h.hom.sicredi.net:9443/oauth2/authorize"; //Id-Provider?
    this.oauthService.redirectUri = "http://localhost:4200/";
    this.oauthService.clientId = "xdtnOFzaaxOPB651ocEQSmiwn9ca";
    this.oauthService.scope = "openid";
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);

/*
    console.log('loadDiscoveryDocument - inicio');
    //this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.loadDiscoveryDocument('https://app1ssosite014h.hom.sicredi.net:9443/oauth2/oidcdiscovery/.well-known/openid-configuration').then((doc) => {
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