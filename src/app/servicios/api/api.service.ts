import { Injectable } from '@angular/core';
import { LoginI, RegistroI } from '../../modelos/auth.interface';
import { ResponseI } from '../../modelos/response.interface';
import { EntradasI } from '../../modelos/listarentradas.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriasI } from 'src/app/modelos/listarcategorias.interface';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
//let customHeader = new Headers({ Authorization: localStorage.getItem('token') || ''})
const header = {
  Authorization: localStorage.getItem('token') || '',
};
const requestOptions = { headers: header };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://noticiasexpress.test/api/v1/';

  constructor(private http: HttpClient) {}

  login(form: LoginI): Observable<ResponseI> {
    let dir = this.url + 'auth/login';
    return this.http.post<ResponseI>(dir, form);
  }

  registro(form: RegistroI): Observable<ResponseI> {
    let dir = this.url + 'auth/register';
    return this.http.post<ResponseI>(dir, form);
    /* return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions); */
  }

  cerrarSesion() {
    let dir = this.url + 'auth/logout';
    let token = localStorage.getItem('token');
    localStorage.clear();
    return this.http.post(dir, {
      headers: { Authorization: token },
    });
  }
  /****************** USUARIOS ******************/
  getUsuario() {
    let token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      Authorization: token!,
    });

    let dir = this.url + 'auth/me';

    console.log(httpHeaders);
    return this.http.get<UsuariosI>(dir, { headers: httpHeaders });
  }
  /****************** ENTRADAS ******************/
  getAllEntradas(pagina: number): Observable<EntradasI[]> {
    let dir = this.url + 'entradas?page=' + pagina;
    return this.http.get<EntradasI[]>(dir);
  }

  getEntrada(idEntrada: number | string): Observable<EntradasI[]> {
    let dir = this.url + 'entradas/' + idEntrada;
    return this.http.get<EntradasI[]>(dir);
  }
  /****************** CATEGORIAS ******************/
  getAllCategorias(): Observable<CategoriasI[]> {
    let dir = this.url + 'categorias';
    return this.http.get<CategoriasI[]>(dir);
  }

  getEntradasPorCategoria(
    idCategoria: number | string
  ): Observable<CategoriasI[]> {
    let dir = this.url + 'categorias/' + idCategoria;
    return this.http.get<CategoriasI[]>(dir);
  }
}
