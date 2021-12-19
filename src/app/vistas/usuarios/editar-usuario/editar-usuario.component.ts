import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  usuario!: UsuariosI;
  usuarioId: number=0;
  mensajeError: string = '';
  mensajeOK: string = '';

  editarForm = new FormGroup({
    nombre: new FormControl(''),
    rol: new FormControl(''),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.activeRouter.params.subscribe((params) => {
      this.usuarioId = +params['id'];
    });

    this.api.getUsuarioPorId(this.usuarioId).subscribe((data) => {
      let array = Object.values(data);
      console.log(array[0])
      this.usuario = array[0];
      console.log(this.usuario);
      this.editarForm.patchValue({
        nombre: this.usuario.nombre
      });

    });
  }
  
  actualizarUsuario(form: UsuariosI) {
    console.log(form);
    this.mensajeError = '';
    this.mensajeOK = '';
    this.api.putUsuarioAdmin(form, this.usuarioId).subscribe(
      (res) => {
        console.log(res.message);
        this.mensajeOK = res.message;
        //this.mensajeError = res
        //this.mensaje = res
      },
      (err) => {
        console.error(err);
        this.mensajeError =
          'No has realizado ningún cambio';
      }
    );
  }
}
