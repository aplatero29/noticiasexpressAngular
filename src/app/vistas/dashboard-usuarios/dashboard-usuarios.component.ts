import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-dashboard-usuarios',
  templateUrl: './dashboard-usuarios.component.html',
  styleUrls: ['./dashboard-usuarios.component.css'],
})
export class DashboardUsuariosComponent implements OnInit {
  usuarios: UsuariosI[] = [];
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private alertas: AlertasService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.api.getAllUsuarios().subscribe((data) => {
      this.usuarios = Object.values(data);
      this.usuarios = Object.values(this.usuarios[0]);
      this.parseDatos();
    });
  }

  parseDatos() {
    this.usuarios.forEach((usuario) => {
      usuario.email = this.maskEmail(usuario.email);
      usuario.created_at = new Date(usuario.created_at).toLocaleString('es-ES');
      usuario.updated_at = new Date(usuario.updated_at).toLocaleString('es-ES');
    });
  }

  maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    const { length: len } = name;
    const maskedName = name[0] + '******' + name[len - 1];
    const maskedEmail = maskedName + '@' + domain;
    return maskedEmail;
  }

  eliminarUsuario(id: number | string) {
    this.api.deleteUsuario(id).subscribe((data) => {
      this.modalService.dismissAll();
      this.alertas.showSuccess('Completado', data.message);
      this.ngOnInit();
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
