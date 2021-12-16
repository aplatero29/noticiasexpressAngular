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
  submitted: boolean = false;
  files: any;

  editarForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl(null),
    user_id: new FormControl(''),
    categoria_id: new FormControl(''),
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
        imagen: this.entrada[0].imagen,
        user_id: this.entrada[0].autor.id,
        categoria_id: this.entrada[0].categoria.id,
      });
      console.log(this.editarForm);
    });
  }
  actualizarEntrada(form: EntradasI) {
    console.log(form);
    var myFormData = new FormData();
    myFormData.append('imagen', this.files, this.files.name);
    myFormData.append('titulo', this.editarForm.get('titulo')?.value);
    myFormData.append('descripcion', this.editarForm.get('descripcion')?.value);
    myFormData.append('user_id', this.editarForm.get('user_id')?.value);
    myFormData.append(
      'categoria_id',
      this.editarForm.get('categoria_id')?.value
    );

    let entradaNueva: EntradasI[] = [];
    entradaNueva[0].imagen = form.imagen;
    entradaNueva[0].titulo = form.titulo;
    entradaNueva[0].descripcion = form.descripcion;
    entradaNueva[0].autor.id = form.autor.id;
    entradaNueva[0].categoria.id = form.categoria.id;
    myFormData.forEach((value, key) => {
      console.log(key + ' ' + value);
    });

    this.mensajeError = '';
    this.mensajeOK = '';
    this.api.putEntrada(entradaNueva, this.entrada[0].id).subscribe(
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

  subirImagen(event: any) {
    this.files = event.target.files[0];
    console.log(event);

    this.editarForm.patchValue({
      imagen: this.files,
    });
    this.editarForm.get('imagen')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {};
    console.log(this.editarForm);
    console.log(this.editarForm.get('imagen'));
  }
}
