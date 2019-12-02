import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { TurmaListComponent } from './turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './turma/turma-form/turma-form.component';

const routes: Routes = [
  { path: 'usuario', component: UsuarioListComponent },
  { path: 'usuario/novo', component: UsuarioFormComponent },
  { path: 'usuario/:id', component: UsuarioFormComponent },

  { path: 'turma', component: TurmaListComponent },
  { path: 'turma/novo', component: TurmaFormComponent },
  { path: 'turma/:id', component: TurmaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
