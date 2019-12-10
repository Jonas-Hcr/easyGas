import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { QuilometragemService } from '../quilometragem.service';

@Component({
  selector: 'app-quilometragem-form',
  templateUrl: './quilometragem-form.component.html',
  styleUrls: ['./quilometragem-form.component.scss']
})
export class QuilometragemFormComponent implements OnInit {

  constructor(
    private quilometragemSrv: QuilometragemService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova quilometragem';
  quilometragem: any = {};
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do quilometragem e preenche a variável ligada ao form
        this.quilometragem = await this.quilometragemSrv.obterUm(params['id']);
        this.title = 'Editando quilometragem';
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Quilometragem cadastrada com sucesso.';
        
        if(this.quilometragem._id) { // Se tem _id, está editando
          msg = 'Quilometragem atualizada com sucesso';
          await this.quilometragemSrv.atualizar(this.quilometragem);
        }
        else { // Criação de um novo quilometragem
          await this.quilometragemSrv.novo(this.quilometragem);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/quilometragem']); // Volta à listagem
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
      this.router.navigate(['/quilometragem']); // Retorna à listagem
    }

  }

}
