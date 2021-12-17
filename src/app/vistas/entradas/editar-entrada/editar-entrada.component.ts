import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-editar-entrada',
  templateUrl: './editar-entrada.component.html',
  styleUrls: ['./editar-entrada.component.css'],
})
export class EditarEntradaComponent implements OnInit {
  entradaId: number | string = '';
  entrada: EntradasI[] = [];
  mensajeOK: string = '';
  mensajeError: string = '';

  editarForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    /* imagen: new FormControl(null), */
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.verEntrada();
  }

  verEntrada() {
    this.activeRouter.params.subscribe((params) => {
      this.entradaId = +params['id'];
    });
    this.api.getEntrada(this.entradaId).subscribe((data) => {
      this.entrada = Object.values(data);
      console.log(this.entrada);
      this.editarForm.patchValue({
        titulo: this.entrada[0].titulo,
        descripcion: this.entrada[0].descripcion,
        /* imagen: this.entrada[0].imagen, */
      });
      console.log(this.editarForm);
    });
  }

  actualizarEntrada(form: EntradasI[]) {
    console.log(form);
    /* const formData = new FormData();
    formData.append('titulo', form[0].titulo);
    formData.append('descripcion', form[0].descripcion);
    if (this.submitted) {
      formData.append('imagen', this.files, this.files.name);
    } */
    /* let entradaNueva: EntradasI[] = [];
    entradaNueva[0].imagen = form.imagen;
    entradaNueva[0].titulo = form.titulo;
    entradaNueva[0].descripcion = form.descripcion;
    entradaNueva[0].autor.id = form.autor.id;
    entradaNueva[0].categoria.id = form.categoria.id; */

    this.mensajeError = '';
    this.mensajeOK = '';
    this.api.putEntrada(form, this.entrada[0].id).subscribe(
      (res) => {
        console.log(res.message);
        this.mensajeOK = res.message;
        //this.mensajeError = res
        //this.mensaje = res
      },
      (err) => {
        console.error(err);
        this.mensajeError = 'No has realizado ningún cambio';
      }
    );
  }

  /* subirImagen(event: any) {
    this.files = event.target.files[0];
    console.log(this.files);
    this.submitted = true;
    console.log(event);

    this.editarForm.patchValue({
      imagen: this.files,
    });
    this.editarForm.get('imagen')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {};
    console.log(this.editarForm);
    console.log(this.editarForm.get('imagen'));
  } */
}
