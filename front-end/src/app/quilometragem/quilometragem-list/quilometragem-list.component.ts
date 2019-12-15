import { Component, OnInit } from '@angular/core';
import { QuilometragemService } from '../quilometragem.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-quilometragem-list',
  templateUrl: './quilometragem-list.component.html',
  styleUrls: ['./quilometragem-list.component.scss']
})
export class QuilometragemListComponent implements OnInit {

  /* QuilometragemService injetado como dependência */
  constructor(
    private quilometragemSrv: QuilometragemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  quilometragens: any = []; // Vetor vazio
  displayedColumns: string[] = ['distancia', 'tempo_gasto', 'usuario', 'rota', 'data', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.quilometragens = await this.quilometragemSrv.listar();
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
        data: { question: 'Deseja realmente excluir esta quilometragem?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.quilometragemSrv.excluir(id);
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
