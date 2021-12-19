import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  OperatorFunction,
} from 'rxjs';
import { CategoriasI } from 'src/app/modelos/listarcategorias.interface';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-nueva-entrada',
  templateUrl: './nueva-entrada.component.html',
  styleUrls: ['./nueva-entrada.component.css'],
})
export class NuevaEntradaComponent implements OnInit {
  categorias: CategoriasI[] = [];
  categoriaSeleccionada: string = '';
  mensajeOK: string = '';
  mensajeError: string = '';
  archivoImagen!: { link: string; file: any; name: string };
  file: any;

  nuevoForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: AlertasService
  ) {}

  ngOnInit(): void {
    this.todasCategorias();
  }

  todasCategorias() {
    this.api.getAllCategorias().subscribe((data) => {
      console.log(data);
      this.categorias = Object.values(data);
      this.categorias = Object.values(this.categorias[0]);
      console.log(this.categorias);
    });
  }
  seleccionarCategoria(e: any) {
    this.nuevoForm.patchValue(
      { categoria: e.target.value.slice(3) },
      { onlySelf: true }
    );
  }

  imagesPreview(event: any) {
    this.file = <File>event.target.files[0]
    /* if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.archivoImagen = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
        };
      };
      reader.readAsDataURL(event.target.files[0]);
      reader.readAsDataURL(this.file)
    } */
  }

  nuevaEntrada(form: any) {
    console.log(form);
    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('descripcion', form.descripcion);
    formData.append('categoria', form.categoria);
    formData.append('imagen', this.file, this.file.name);
    formData.forEach((value, key) => {
      console.log(key + ' - ' + value);
    });

    this.api.postEntrada(form).subscribe(
      (data) => {
        this.toast.showSuccess('Correcto', data.message);
      },
      (err) => {
        console.log(err);
        this.toast.showError('Error', err.errors);
      }
    );
  }
}
