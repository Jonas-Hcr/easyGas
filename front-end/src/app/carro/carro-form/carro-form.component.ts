import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { CarroService } from '../carro.service';

@Component({
  selector: 'app-carro-form',
  templateUrl: './carro-form.component.html',
  styleUrls: ['./carro-form.component.scss']
})
export class CarroFormComponent implements OnInit {

  constructor(
    private carroSrv: CarroService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo Carro';
  carro: any = {};
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do carro e preenche a variável ligada ao form
        this.carro = await this.carroSrv.obterUm(params['id']);
        this.title = 'Editando carro';
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Carro cadastrado com sucesso.';
        
        if(this.carro._id) { // Se tem _id, está editando
          msg = 'Carro atualizado com sucesso';
          await this.carroSrv.atualizar(this.carro);
        }
        else { // Criação de um novo carro
          await this.carroSrv.novo(this.carro);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/carro']); // Volta à listagem
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
      this.router.navigate(['/carro']); // Retorna à listagem
    }

  }

}
