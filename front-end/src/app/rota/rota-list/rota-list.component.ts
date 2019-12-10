import { Component, OnInit } from '@angular/core';
import { RotaService } from '../rota.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-rota-list',
  templateUrl: './rota-list.component.html',
  styleUrls: ['./rota-list.component.scss']
})
export class RotaListComponent implements OnInit {

  /* RotaService injetado como dependência */
  constructor(
    private rotaSrv: RotaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  rotas: any = []; // Vetor vazio
  displayedColumns: string[] = ['partida', 'destino', 'favorita', 'usuario', 'quilometragem', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.rotas = await this.rotaSrv.listar();
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
        data: { question: 'Deseja realmente excluir este rota?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.rotaSrv.excluir(id);
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
