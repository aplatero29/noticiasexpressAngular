import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { UsuariosI } from 'src/app/modelos/listarusuarios.interface';
import { ApiService } from '../../servicios/api/api.service';

@Component({
  selector: 'app-dashboard-entradas',
  templateUrl: './dashboard-entradas.component.html',
  styleUrls: ['./dashboard-entradas.component.css'],
})
export class DashboardEntradasComponent implements OnInit {
  rolUsuario: string = '';
  bool!: boolean;
  entradas: EntradasI[] = [];
  usuario!: UsuariosI;
  p: number = 1;
  itemsPorPagina: number = 5;

  @Input() id = 0;

  constructor(
    private api: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem('id')!;
    this.getEntradas(id);
  }

  /* comprobarToken() {
    //if (localStorage.getItem('rol')) {
    //TODO: ADD ROL RECOGNITION
    this.api.getUsuario().subscribe((data) => {
      console.log(data);
      this.rolUsuario = data.rol;
      this.usuario = data;
      console.log(this.usuario);
      if (this.rolUsuario == 'Admin') this.bool = true;
      if (this.rolUsuario == 'Autor') this.bool = true;
      console.log(this.bool);
      console.log(2);
    });
    console.log(3);
    // } else {
    /* console.log('hey')
      this.router.navigate(['login']);
    }
  }*/

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
      });
    }
    if (localStorage.getItem('rol') == 'Admin') {
      this.api.getAllEntradas(this.p, this.itemsPorPagina).subscribe((data) => {
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

  abrirDetalles(id: any){
    
  }
}
