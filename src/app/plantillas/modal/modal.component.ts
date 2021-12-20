import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  entrada: EntradasI[] = [];
  entradaId: number = 0;
  imagenSrc: string = '';
  updateForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  });
  enviado: boolean = false;
  imagePreview!: string;

  @Input() id: any;

  constructor(private api: ApiService, private activeRouter: ActivatedRoute) {}

  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.patchValue({
        fileSource: file,
      });
    }
  }

  onSubmit(form: EntradasI) {
    this.enviado = true;
    // stop here if form is invalid
    /* if (this.registerForm.invalid) {
      return;
    } */
    //True if all the fields are filled
    if (this.enviado) {
      alert('Great!!');
    }
  }
}
