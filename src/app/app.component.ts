import {Component} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { TdLoadingService, TdDialogService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Pessoa } from './domain/pessoa';
import { PessoaService } from './service/pessoa.service';

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
    this._titleService.setTitle('Meus Alunos');
    this.load();
  }

  async load(): Promise<void> {
    try {
      this._loadingService.register('pessoas.list');
      let self = this;
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
