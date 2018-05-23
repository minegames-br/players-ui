import {Component} from '@angular/core';
import { Player } from './domain/player';
import { PlayerService } from './service/player.service';
import { OAuthService } from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import { JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Players';
  accessToken = "";
  validAccessToken = false;
  idToken = "";
  jsonIdToken = "";
  validIdToken = false;
  players: Player[];
  filteredList: Player[];
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
              private _playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.authenticate();
  }

  public refreshToken() {
    this.oauthService.silentRefresh();
  }

  public authenticate() {
    console.log('authenticate');
    this.oauthService.strictDiscoveryDocumentValidation = environment.openid.strictDiscoveryDocumentValidation;
    this.oauthService.issuer = environment.openid.issuer;
    this.oauthService.loginUrl = environment.openid.loginUrl;
    this.oauthService.redirectUri = environment.openid.redirectUri;
    this.oauthService.clientId = environment.openid.clientId;
    this.oauthService.scope = environment.openid.scope;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.oidc = true;
    this.oauthService.silentRefreshRedirectUri = environment.openid.redirectUri;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument( environment.openid.discovery_url ).then(() => {
      this.oauthService.tryLogin({
        onTokenReceived: context => {
            environment.access_token = context.accessToken;
            this.load( context.accessToken );
            let claims = this.oauthService.getIdentityClaims();
        },
        onLoginError: (err) => {
            console.log('onLoginError:', err);
        }
      }).then(() => {
          if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
              this.oauthService.initImplicitFlow();
          } else {
            this.load( this.oauthService.getAccessToken() );
          }
      });      
    });

  }

  async load( accessToken: string ): Promise<void> {

    console.log( "validate jwks: " + this.oauthService.hasValidIdToken);
    this.validAccessToken = this.oauthService.hasValidAccessToken();
    this.validIdToken = this.oauthService.hasValidIdToken();
    this.accessToken = this.oauthService.getAccessToken();
    this.idToken = this.oauthService.getIdToken();
    this.jsonIdToken = this.decodeToken( this.idToken );

    try {
      let self = this;
      this._playerService.setAccessToken( accessToken );
      this._playerService.getList( ).subscribe( data => {
        self.players = data as Player[];
      });
      this._playerService.getUserInfo().subscribe( data => {
        this.username = data['sub'];
      });
    } catch (error) {
      console.log( error );
      this.players = [];
    } finally {
      this.filteredList = this.players as Player[];
    }
  }

    private urlBase64Decode(str: string) {
          var output = str.replace(/-/g, '+').replace(/_/g, '/');
          switch (output.length % 4) {
              case 0: { break; }
              case 2: { output += '=='; break; }
              case 3: { output += '='; break; }
            default: {
                throw 'Illegal base64url string!';
              }
          }
          return decodeURIComponent(escape(window.atob(output)));
  }
     
  public decodeToken(token: string) {
      var parts = token.split('.');
      if (parts.length !== 3) {
          throw new Error('JWT must have 3 parts');
    }
      var decoded = this.urlBase64Decode(parts[1]);
      if (!decoded) {
          throw new Error('Cannot decode the token');
      }
      return JSON.parse(decoded);
  }

}