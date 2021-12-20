import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-dashboard-entradas',
  templateUrl: './dashboard-entradas.component.html',
  styleUrls: ['./dashboard-entradas.component.css'],
})
export class DashboardEntradasComponent implements OnInit {
  entradas: EntradasI[] = [];
  usuario!: UsuariosI;
  vacio: boolean = false
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private alertas: AlertasService
  ) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem('id')!;
    this.getEntradas(id);
  }

  getEntradas(id: string | number) {
    if (localStorage.getItem('rol') == 'Autor') {
      //console.log('autor');
      this.api.getEntradasPorUsuario(id).subscribe((data) => {
        /***************  NO TOCAR -----  TRANSFORMA EL JSON EN UN ARRAY, Y NUEVAMENTE OTRO ARRAY */
        
        this.entradas = Object.values(data);
        console.log(this.entradas[0]);
        this.entradas = Object.values(this.entradas[0]);
        /************************ */
        this.parseFechas();
        if (this.entradas.length == 0) {
          this.vacio = true
        }
      });
    }
    if (localStorage.getItem('rol') == 'Admin') {
      this.api.getAllEntradas(this.page, this.pageSize).subscribe((data) => {
        /***************  NO TOCAR -----  TRANSFORMA EL JSON EN UN ARRAY, Y NUEVAMENTE OTRO ARRAY */
        this.entradas = Object.values(data);
        console.log(this.entradas[0]);
        this.entradas = Object.values(this.entradas[0]);
        /************************ */
        this.parseFechas();
        console.log(this.entradas);
      });
    }
    console.log(this.entradas);
  }

  parseFechas() {
    this.entradas.forEach((entrada) => {
      entrada.created_at = new Date(entrada.created_at).toLocaleString('es-ES');
      entrada.updated_at = new Date(entrada.updated_at).toLocaleString('es-ES');
    });
  }

  eliminarEntrada(id: number | string) {
    this.api.deleteEntrada(id).subscribe((data) => {
      this.modalService.dismissAll();
      this.alertas.showSuccess('Completado', data.message);
      this.ngOnInit();
    });
  }
  
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
