import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../modelos/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('prueba@prueba.comee', Validators.required),
    password: new FormControl('123456', Validators.required),
  });

  mensajeError: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    /* this.comprobarToken(); */
  }

  /* comprobarToken() {
    console.log(localStorage);

    if (localStorage.getItem('token')) {
      this.router.navigate(['entradas']);
    }
  } */

  onLogin(form: LoginI) {
    this.mensajeError = '';
    this.api.login(form).subscribe(
      (res) => {
        let respuesta = Object.values(res);
        let token = `${respuesta[0].original.access_token}`;

        console.log(respuesta);
        console.log(res.userRol);

        localStorage.setItem('token', token); //Agregamos el token como Bearer XXXXX
        localStorage.setItem('rol', res.userRol);
        if (localStorage.getItem('rol')) {
          this.router.navigate(['entradas']);
        }
      },
      (err) => {
        console.log(err);
        this.mensajeError = 'Email o contraseña incorrectos';
      }
    );
  }
}
