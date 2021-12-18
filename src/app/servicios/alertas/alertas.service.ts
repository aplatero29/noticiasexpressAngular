import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertasService {
  constructor(private toast: ToastrService) {}

  showSuccess(titulo: string, texto: string) {
    this.toast.success(texto, titulo);
  }

  showError(titulo: string, texto: string) {
    this.toast.error(texto, titulo);
  }
}
