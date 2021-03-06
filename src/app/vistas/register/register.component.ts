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
    if (localStorage.getItem('token')) {
      this.router.navigate(['entradas']);
    }
  }

  onRegistro(form: RegistroI) {
    this.mensajeError = '';
    this.api.registro(form).subscribe(
      (res) => {
        let respuesta = Object.values(res);
        let token = `${respuesta[0].original.access_token}`;

        localStorage.setItem('token', token);
        localStorage.setItem('rol', res.userRol);
        this.router.navigate(['entradas']);
      },
      (err) => {
        
        this.mensajeError = 'Nombre, email o contraseña incorrectos';
      }
    );
  }
}
