import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  mensajeError: string = '';
  mensajeOK: string = '';
  nuevoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
  });
  constructor(
    private api: ApiService,
    private router: Router,
    private toast: AlertasService
  ) {}

  ngOnInit(): void {}

  nuevoUsuario(form: any) {
    console.log(form);
    this.mensajeError = '';
    this.mensajeOK = '';
    this.api.postUsuario(form).subscribe(
      (res) => {
        this.toast.showSuccess('Correcto', res.message);
      },
      (err) => {
        this.mensajeError = 'Todos los campos son obligatorios';
      }
    );
  }
}
