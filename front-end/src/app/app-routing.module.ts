import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { AbastecimentoListComponent } from './abastecimento/abastecimento-list/abastecimento-list.component';
import { AbastecimentoFormComponent } from './abastecimento/abastecimento-form/abastecimento-form.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioListComponent },
  { path: 'usuario/novo', component: UsuarioFormComponent },
  { path: 'usuario/:id', component: UsuarioFormComponent },

  { path: 'abastecimento', component: AbastecimentoListComponent },
  { path: 'abastecimento/novo', component: AbastecimentoFormComponent },
  { path: 'abastecimento/:id', component: AbastecimentoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
