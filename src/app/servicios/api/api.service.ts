import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { EntradasI } from '../../modelos/listarentradas.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriasI } from 'src/app/modelos/listarcategorias.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://noticiasexpress.test/api/v1/';

  constructor(private http: HttpClient) {}

  LoginByEmail(form: LoginI): Observable<ResponseI> {
    let dir = this.url + 'auth/login';
    return this.http.post<ResponseI>(dir, form);
  }

  getAllEntradas(pagina: number): Observable<EntradasI[]> {
    let dir = this.url + 'entradas?page=' + pagina;
    return this.http.get<EntradasI[]>(dir);
  }

  getEntrada(idEntrada: number | string): Observable<EntradasI[]> {
    let dir = this.url + 'entradas/' + idEntrada;
    return this.http.get<EntradasI[]>(dir);
  }

  getAllCategorias(): Observable<CategoriasI[]> {
    let dir = this.url + 'categorias';
    return this.http.get<CategoriasI[]>(dir);
  }

  getEntradasPorCategoria(idCategoria: number | string): Observable<CategoriasI[]> {
    let dir = this.url + 'categorias/' + idCategoria;
    return this.http.get<CategoriasI[]>(dir);
  }
}
