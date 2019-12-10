import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/**** Datas em português no MatDatepicker  ****/

// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

/**********************************************/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './ui/header/header.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { FooterComponent } from './ui/footer/footer.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { MatDialogModule } from '@angular/material';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component'
import { NgxMaskModule } from 'ngx-mask';
import { AbastecimentoListComponent } from './abastecimento/abastecimento-list/abastecimento-list.component';
import { AbastecimentoFormComponent } from './abastecimento/abastecimento-form/abastecimento-form.component';
import { CarroListComponent } from './carro/carro-list/carro-list.component';
import { CarroFormComponent } from './carro/carro-form/carro-form.component';
import { RotaListComponent } from './rota/rota-list/rota-list.component';
import { RotaFormComponent } from './rota/rota-form/rota-form.component';
import { QuilometragemListComponent } from './quilometragem/quilometragem-list/quilometragem-list.component';
import { QuilometragemFormComponent } from './quilometragem/quilometragem-form/quilometragem-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    FooterComponent,
    UsuarioListComponent,
    ConfirmDlgComponent,
    UsuarioFormComponent,
    AbastecimentoListComponent,
    AbastecimentoFormComponent,
    CarroListComponent,
    CarroFormComponent,
    RotaListComponent,
    RotaFormComponent,
    QuilometragemListComponent,
    QuilometragemFormComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule
    /**********************************************/    
  ],
  entryComponents: [
    ConfirmDlgComponent
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    /**********************************************/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
