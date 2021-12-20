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
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
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
    this.mensajeError = '';
    this.api.login(form).subscribe(
      (res) => {
        let respuesta = Object.values(res);
        let token = `${respuesta[0].original.access_token}`;


        localStorage.setItem('token', token);
        localStorage.setItem('rol', res.userRol);
        if (localStorage.getItem('rol')) {
          this.router.navigate(['entradas']);
        }
      },
      (err) => {
        
        this.mensajeError = 'Email o contraseña incorrectos';
      }
    );
  }
}
