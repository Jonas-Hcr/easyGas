import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbastecimentoService {

  /* INJEÇÃO DE DEPENDÊNCIA
    O atributo privado http, do tipo HttpClient,
    é criado pelo Angular e INJETADO como parâmetro
    do construtor, ficando imediatamente disponível
    para uso
  */
  constructor(private http: HttpClient) 
  { }

  private endPoint : string = 'abastecimento';

  listar() {
    return this.http.get(env.apiUri + this.endPoint).toPromise();
  }

  excluir(id: string) {
    // HttpClient.delete() não permite passar um parâmetro body.
    // Por isso, aqui usamos HttpClient.request('delete', ...).
    return this.http.request('delete', env.apiUri + this.endPoint, 
      {body: {_id: id}}).toPromise();
  }

  novo(abastecimento: any) {
    return this.http.post(env.apiUri + this.endPoint, abastecimento).toPromise();
  }

  obterUm(id: string) {
    return this.http.get(env.apiUri + this.endPoint + '/' + id).toPromise();
  }

  atualizar(abastecimento: any) {
    return this.http.put(env.apiUri + this.endPoint, abastecimento).toPromise();
  }

}
