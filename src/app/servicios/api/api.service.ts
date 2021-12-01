import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
