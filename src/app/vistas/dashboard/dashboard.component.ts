import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  entradas: EntradasI[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getAllEntradas(1).subscribe((data) => {
      /***************  NO TOCAR -----  TRANSFORMA EL JSON EN UN ARRAY, Y NUEVAMENTE OTRO ARRAY */
      this.entradas = Object.values(data);
      console.log(this.entradas[0]);
      this.entradas = Object.values(this.entradas[0]);
      /************************ */
      this.parseFechas();

      this.comprobarToken();
    });
  }

  comprobarToken() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
  }

  parseFechas() {
    this.entradas.forEach((entrada) => {
      entrada.created_at = new Date(entrada.created_at).toLocaleString('es-ES');
      entrada.updated_at = new Date(entrada.updated_at).toLocaleString('es-ES');
    });
  }
}
