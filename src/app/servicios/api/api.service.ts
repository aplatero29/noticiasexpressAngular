import { Injectable } from '@angular/core';
import { LoginI, RegistroI } from '../../modelos/auth.interface';
import { MensajeI, ResponseI } from '../../modelos/response.interface';
import { EntradasI } from '../../modelos/listarentradas.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriasI } from 'src/app/modelos/listarcategorias.interface';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = environment.urlApi; //URL Produccion
  //url: string = 'http://noticiasexpress.test/api/v1/'; //URL Local (apache server)
  //url: string = 'http://127.0.0.1:8000/api/v1/'; //URL php artisan serve

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
    sessionStorage.clear();
    return this.http.post(dir, {
      headers: { Authorization: token },
    });
  }
  /****************** USUARIOS ******************/
  getUsuario(): Observable<UsuariosI> {
    let dir = this.url + 'auth/me';

    return this.http.get<UsuariosI>(dir);
  }

  getUsuarioPorId(idUsuario: number | string) {
    let dir = this.url + 'usuarios/' + idUsuario;
    return this.http.get<[]>(dir);
  }

  getAllUsuarios(): Observable<UsuariosI[]> {
    let dir = this.url + 'usuarios';
    return this.http.get<UsuariosI[]>(dir);
  }

  postUsuario(form: any): Observable<MensajeI> {
    let dir = this.url + 'usuarios';
    return this.http.post<MensajeI>(dir, form);
  }

  putUsuario(form: any, idUsuario: number | string): Observable<MensajeI> {
    let dir = this.url + 'usuarios/' + idUsuario;
    return this.http.put<MensajeI>(dir, form);
  }

  putUsuarioAdmin(form: any, idUsuario: number | string): Observable<MensajeI> {
    let dir = this.url + 'usuario/' + idUsuario;
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
    return this.http.put<MensajeI>(dir, form, { headers: headers });
  }

  deleteUsuario(idUsuario: number | string): Observable<MensajeI> {
    let dir = this.url + 'usuarios/' + idUsuario;
    return this.http.delete<MensajeI>(dir);
  }
  /****************** ENTRADAS ******************/
  getAllEntradas(
    pagina: number,
    itemsPorPagina: number
  ): Observable<EntradasI[]> {
    //let dir = this.url + 'entradas?page=' + pagina;
    //${pagina}&size=${itemsPorPagina}      &page_size=${itemsPorPagina}
    let dir = `${this.url}entradas`;
    return this.http.get<EntradasI[]>(dir);
  }

  getEntrada(idEntrada: number | string): Observable<EntradasI[]> {
    let dir = this.url + 'entradas/' + idEntrada;
    return this.http.get<EntradasI[]>(dir);
  }

  getEntradasPorUsuario(idUsuario: number | string): Observable<EntradasI[]> {
    let dir = this.url + 'usuario/' + idUsuario;
    return this.http.get<EntradasI[]>(dir);
  }

  postEntrada(form: FormData): Observable<MensajeI> {
    let dir = this.url + 'entradas';

    const headers = new HttpHeaders({
      Accept: 'application/json',
  /*      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers':
        '*',
      'Access-Control-Allow-Credentials': 'true', */
/*       'Content-Type': 'multipart/form-data; boundary=9999999' */
    });
    return this.http.post<MensajeI>(dir, form/* , {
      headers: headers,
    } */);
  }

  putEntrada(form: any, idEntrada: number | string): Observable<MensajeI> {
    let dir = this.url + 'entradas/' + idEntrada;
    const httpHeaders = new HttpHeaders();
    return this.http.put<MensajeI>(dir, form);
  }

  deleteEntrada(idEntrada: number | string): Observable<MensajeI> {
    let dir = this.url + 'entradas/' + idEntrada;
    return this.http.delete<MensajeI>(dir);
  }
  /****************** CATEGORIAS ******************/
  getAllCategorias(): Observable<CategoriasI[]> {
    let dir = this.url + 'categorias';
    return this.http.get<CategoriasI[]>(dir);
  }

  getCategoria(categoria: number | string): Observable<CategoriasI> {
    let dir = this.url + 'categoria/' + categoria;
    return this.http.get<CategoriasI>(dir);
  }

  getEntradasPorCategoria(
    idCategoria: number | string
  ): Observable<CategoriasI[]> {
    let dir = this.url + 'categoria/' + idCategoria;
    return this.http.get<CategoriasI[]>(dir);
  }
}
