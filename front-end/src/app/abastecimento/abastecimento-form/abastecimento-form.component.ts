import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { AbastecimentoService } from '../abastecimento.service';
import { CarroService } from '../../carro/carro.service';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-abastecimento-form',
  templateUrl: './abastecimento-form.component.html',
  styleUrls: ['./abastecimento-form.component.scss']
})
export class AbastecimentoFormComponent implements OnInit {

  constructor(
    private abastecimentoSrv: AbastecimentoService,
    private carroSrv: CarroService,
    private usuarioSrv: UsuarioService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo Usuário';
  abastecimento: any = {};
  carros: any = [];
  usuarios: any = [];
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do abastecimento e preenche a variável ligada ao form
        this.abastecimento = await this.abastecimentoSrv.obterUm(params['id']);
        this.title = 'Editando abastecimento';
      }
      catch(error) {
        console.log(error);
      }
    }

    // Entidades relacionadas
    try{
      this.carros = await this.carroSrv.listar();
      this.usuarios = await this.usuarioSrv.listar();
    }
    catch(error) {
      console.log(error);
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Abastecimento criado com sucesso.';
        
        if(this.abastecimento._id) { // Se tem _id, está editando
          msg = 'Abastecimento atualizado com sucesso';
          await this.abastecimentoSrv.atualizar(this.abastecimento);
        }
        else { // Criação de um novo abastecimento
          await this.abastecimentoSrv.novo(this.abastecimento);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/abastecimento']); // Volta à listagem
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
      this.router.navigate(['/abastecimento']); // Retorna à listagem
    }

  }

}
