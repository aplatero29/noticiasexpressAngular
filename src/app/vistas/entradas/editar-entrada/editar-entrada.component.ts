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
  entrada!: EntradasI[];
  entradaId!: number;
  mensajeOK: string = '';
  mensajeError: string = '';
  /*   submitted: boolean = false;
  files: any; */

  editarForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
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
      });
      console.log(this.editarForm);
    });
  }

  actualizarEntrada(form: EntradasI) {
    console.log(form);
    this.mensajeError = '';
    this.mensajeOK = '';
    this.api.putEntrada(form, this.entradaId).subscribe(
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
