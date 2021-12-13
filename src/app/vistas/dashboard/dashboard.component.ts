import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rolUsuario: string = '';
  entradas: EntradasI[] = [];
  usuario!: UsuariosI;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.comprobarToken();
    this.getEntradas();
  }

  getEntradas() {
    if (this.rolUsuario == 'Autor') {
      //console.log('autor');
      this.api.getEntradasPorUsuario(this.usuario.id);
    }
    if (this.rolUsuario == 'Admin') {
      this.api.getAllEntradas(1, 10).subscribe((data) => {
        /***************  NO TOCAR -----  TRANSFORMA EL JSON EN UN ARRAY, Y NUEVAMENTE OTRO ARRAY */
        this.entradas = Object.values(data);
        console.log(this.entradas[0]);
        this.entradas = Object.values(this.entradas[0]);
        /************************ */
        this.parseFechas();
      });
    }
  }

  comprobarToken() {
    if (localStorage.getItem('rol')) {
      //TODO: ADD ROL RECOGNITION
      this.api.getUsuario().subscribe((data) => {
        console.log(data.rol);
        this.rolUsuario = data.rol;
      });
    } else {
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
