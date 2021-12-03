import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
} from '@angular/forms';

import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('prueba@prueba.com', Validators.required),
    password: new FormControl('123456', Validators.required),
  });

  mensajeError: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.comprobarToken();
  }

  comprobarToken() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['entradas']);
    }
  }

  onLogin(form: LoginI) {
    this.api.LoginByEmail(form).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', `${res.token_type} ${res.access_token}`); //Agregamos el token como Bearer XXXXX
        this.router.navigate(['entradas']);
      },
      (err) => {
        console.log(err);
        this.mensajeError = err.error;
      }
    );
  }
}
