import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { RotaService } from '../rota.service';
import { QuilometragemService } from '../../quilometragem/quilometragem.service';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-rota-form',
  templateUrl: './rota-form.component.html',
  styleUrls: ['./rota-form.component.scss']
})
export class RotaFormComponent implements OnInit {

  constructor(
    private rotaSrv: RotaService,
    private quilometragemSrv: QuilometragemService,
    private usuarioSrv: UsuarioService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova Rota';
  rota: any = {};
  quilometragens: any = [];
  usuarios: any = [];

  favoritas: any = [
    { _id: true, nome: 'Sim'},
    { _id: false, nome: 'Não'}
  ]
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do rota e preenche a variável ligada ao form
        this.rota = await this.rotaSrv.obterUm(params['id']);
        this.title = 'Editando rota';
      }
      catch(error) {
        console.log(error);
      }
    }

    try{
      this.quilometragens = await this.quilometragemSrv.listar();
      this.usuarios = await this.usuarioSrv.listar();
    }
    catch(error) {
      console.log(error);
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Rota criada com sucesso.';
        
        if(this.rota._id) { // Se tem _id, está editando
          msg = 'Rota atualizada com sucesso';
          await this.rotaSrv.atualizar(this.rota);
        }
        else { // Criação de um novo rota
          await this.rotaSrv.novo(this.rota);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/rota']); // Volta à listagem
      }
      catch(error) {
        console.log(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          {duration: 3000});
      }
    }
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/rota']); // Retorna à listagem
    }

  }

}
