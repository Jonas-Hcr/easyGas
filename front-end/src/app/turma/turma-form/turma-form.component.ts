import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { TurmaService } from '../turma.service';
import { CursoService } from '../../curso/curso.service';
import { ProfessorService } from '../../professor/professor.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {

  constructor(
    private turmaSrv: TurmaService,
    private cursoSrv: CursoService,
    private professorSrv: ProfessorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova turma';
  turma: any = {};
  cursos: any = []; // Vetor vazio (entidade relacionada)
  professores: any = []; // Vetor vazio (entidade relacionada)

  // Dataset "manual"
  diasSemana: any = [
    { _id: 'dom', nome: 'Domingo' },
    { _id: 'seg', nome: 'Segunda-feira' },
    { _id: 'ter', nome: 'Terça-feira' },
    { _id: 'qua', nome: 'Quarta-feira' },
    { _id: 'qui', nome: 'Quinta-feira '},
    { _id: 'sex', nome: 'Sexta-feira' },
    { _id: 'sáb', nome: 'Sábado' }
  ];
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados da turma e preenche a variável ligada ao form
        this.turma = await this.turmaSrv.obterUm(params['id']);
        this.title = 'Editando turma';
      }
      catch(error) {
        console.log(error);
      }
    }
    
    // Entidades relacionadas
    try{
      this.cursos = await this.cursoSrv.listar();
      this.professores = await this.professorSrv.listar();
    }
    catch(error) {
      console.log(error);
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Turma criada com sucesso.';
        
        if(this.turma._id) { // Se tem _id, está editando
          msg = 'Turma atualizada com sucesso';
          await this.turmaSrv.atualizar(this.turma);
        }
        else { // Criação de uma nova turma
          await this.turmaSrv.novo(this.turma);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/turma']); // Volta à listagem
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
      this.router.navigate(['/turma']); // Retorna à listagem
    }

  }

}
