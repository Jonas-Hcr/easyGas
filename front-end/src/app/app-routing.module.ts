import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { CarroListComponent } from './carro/carro-list/carro-list.component';
import { CarroFormComponent } from './carro/carro-form/carro-form.component';
import { RotaListComponent } from './rota/rota-list/rota-list.component';
import { RotaFormComponent } from './rota/rota-form/rota-form.component';
import { AbastecimentoListComponent } from './abastecimento/abastecimento-list/abastecimento-list.component';
import { AbastecimentoFormComponent } from './abastecimento/abastecimento-form/abastecimento-form.component';
import { QuilometragemListComponent } from './quilometragem/quilometragem-list/quilometragem-list.component';
import { QuilometragemFormComponent } from './quilometragem/quilometragem-form/quilometragem-form.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioListComponent },
  { path: 'usuario/novo', component: UsuarioFormComponent },
  { path: 'usuario/:id', component: UsuarioFormComponent },

  { path: 'abastecimento', component: AbastecimentoListComponent },
  { path: 'abastecimento/novo', component: AbastecimentoFormComponent },
  { path: 'abastecimento/:id', component: AbastecimentoFormComponent },

  { path: 'carro', component: CarroListComponent },
  { path: 'carro/novo', component: CarroFormComponent },
  { path: 'carro/:id', component: CarroFormComponent },

  { path: 'rota', component: RotaListComponent },
  { path: 'rota/novo', component: RotaFormComponent },
  { path: 'rota/:id', component: RotaFormComponent },

  { path: 'quilometragem', component: QuilometragemListComponent },
  { path: 'quilometragem/novo', component: QuilometragemFormComponent },
  { path: 'quilometragem/:id', component: QuilometragemFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
