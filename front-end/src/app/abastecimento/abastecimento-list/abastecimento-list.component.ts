import { Component, OnInit } from '@angular/core';
import { AbastecimentoService } from '../abastecimento.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-abastecimento-list',
  templateUrl: './abastecimento-list.component.html',
  styleUrls: ['./abastecimento-list.component.scss']
})
export class AbastecimentoListComponent implements OnInit {

  /* AbastecimentoService injetado como dependência */
  constructor(
    private abastecimentoSrv: AbastecimentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  abastecimentos: any = []; // Vetor vazio
  displayedColumns: string[] = ['litros', 'valor_total', 'carro', 'usuario', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.abastecimentos = await this.abastecimentoSrv.listar();
    }
    catch(error) {
      console.error(error);
    }
  
  }

  async excluir(id: string) {
    try {

      // Exibição da caixa de diálogo de confirmação
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Deseja realmente excluir este abastecimento?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.abastecimentoSrv.excluir(id);
        this.snackBar.open('Exclusão efetuada com sucesso', 'Entendi',
          { duration: 3000 });
        this.ngOnInit(); // Atualizar os dados
      }      

    }
    catch(erro) {
      console.log(erro);
      this.snackBar.open('ERRO: não foi possível excluir. Contate o suporte técnico',
       'Entendi', { duration: 3000 });
    }
  }

}
