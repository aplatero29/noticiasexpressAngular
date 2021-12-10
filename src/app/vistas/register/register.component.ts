import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroI } from 'src/app/modelos/auth.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  mensajeError: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.comprobarToken();
  }

  comprobarToken() {
    console.log(localStorage);
    //console.log(this.helper);
    if (localStorage.getItem('token')) {
      this.router.navigate(['entradas']);
    }
  }

  onRegistro(form: RegistroI) {
    this.mensajeError = '';
    this.api.registro(form).subscribe(
      (res) => {
        let respuesta = Object.values(res);
        let token = `${respuesta[0].original.token_type} ${respuesta[0].original.access_token}`;
        console.log(res)
        console.log(res.userRol);
        localStorage.setItem('token', token); //Agregamos el token como Bearer XXXXX
        localStorage.setItem('rol', res.userRol);
        this.router.navigate(['entradas']);
      },
      (err) => {
        console.log(err);
        this.mensajeError = 'Nombre, email o contraseña incorrectos';
      }
    );
  }
}
