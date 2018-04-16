import {Component} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Pessoa } from './domain/pessoa';
import { PessoaService } from './service/pessoa.service';
import { OAuthService } from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Pessoas';
  pessoas: Pessoa[];
  filteredList: Pessoa[];
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

  constructor(public media: TdMediaService,
              private oauthService: OAuthService, 
              private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _pessoaService: PessoaService,
              private _dialogService: TdDialogService,
              private _snackBarService: MatSnackBar,              
              private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
                
              this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
              this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/teradata-ux.svg'));
              this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
              this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));
              this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
              this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent-mark.svg'));

  }

  ngOnInit(): void {
    // recuperar o personal que está usando o sistema
    this._titleService.setTitle('Pessoas');
    this.load("1");
    //this.authenticate();
  }

  public authenticate() {
    this.oauthService.issuer = 'https://localhost:9443/oauth2/token';
    this.oauthService.loginUrl = "https://localhost:9445/oauth2/authorize"; //Id-Provider?
    this.oauthService.redirectUri = "http://localhost:4200/";
    this.oauthService.clientId = "J2ekq364QBAnzDMNPiOxfwbw0Wwa";
    this.oauthService.scope = "openid";
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tryLogin({
      onTokenReceived: context => {
          console.log('onTokenReceived:', context);
          console.log( 'accessToken: ' + context.accessToken);
          environment.access_token = context.accessToken;
          console.log( 'load' );
          this.load( context.accessToken );
          let claims = this.oauthService.getIdentityClaims();
          console.log('claims: ', claims );
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
          this.load( this.oauthService.getAccessToken() );
        }
    });        
  }

  async load( accessToken: string ): Promise<void> {
    try {
      this._loadingService.register('pessoas.list');
      let self = this;
      this._pessoaService.setAccessToken( accessToken );
      this._pessoaService.getList( ).subscribe( data => {
        console.log("data: " + data);
        self.pessoas = data as Pessoa[];
      });
    } catch (error) {
      console.log( error );
      this.pessoas = [];
    } finally {
      this.filteredList = this.pessoas as Pessoa[];
      this._loadingService.resolve('pessoas.list');
    }
  }

}
