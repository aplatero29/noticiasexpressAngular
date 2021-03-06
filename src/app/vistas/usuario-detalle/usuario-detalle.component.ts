import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css'],
})
export class UsuarioDetalleComponent implements OnInit {
  usuario!: UsuariosI;
  usuarioId!: number;
  mensajeOK: string = '';
  mensajeError: string = '';

  editarForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl('123456'),
    newPassword: new FormControl('1234567'),
    confirmNewPassword: new FormControl('1234567'),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private modalService: NgbModal,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.activeRouter.params.subscribe((params) => {
      this.usuarioId = +params['id'];
    });

    this.api.getUsuario().subscribe((data) => {
      this.usuario = data;
      
      this.editarForm.patchValue({
        usuario: this.usuario.nombre,
      });
    });
  }

  editarUsuario(form: UsuariosI) {
    
    this.mensajeError = '';
    this.mensajeOK = '';
    this.api.putUsuario(form, this.usuarioId).subscribe(
      (res) => {
        
        this.mensajeOK = res.message;
        //this.mensajeError = res
        //this.mensaje = res
      },
      (err) => {
        console.error(err);
        this.mensajeError =
          'No has realizado ningún cambio/Contraseña incorrecta';
      }
    );
  }

  eliminarUsuario(id: number | string) {
    this.api.deleteUsuario(id).subscribe((data) => {
      this.modalService.dismissAll();
      this.router.navigate(['/'])
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
