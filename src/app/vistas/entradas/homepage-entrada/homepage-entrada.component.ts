import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { Router } from '@angular/router';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { NgxPaginationModule } from "ngx-pagination";
import { CategoriasI } from 'src/app/modelos/listarcategorias.interface';

@Component({
  selector: 'app-homepage-entrada',
  templateUrl: './homepage-entrada.component.html',
  styleUrls: ['./homepage-entrada.component.css'],
})
export class HomepageEntradaComponent implements OnInit {
  entradas: EntradasI[] = [];
  page: number = 1;
  pageSize: number = 6;
  /* itemsPorPagina: number = 5 */
  /* paginacion: any = []; */
  /*   categorias: CategoriasI[] = []; */

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getAllEntradas(this.page, this.pageSize).subscribe((data) => {
      /***************  NO TOCAR -----  TRANSFORMA EL JSON EN UN ARRAY, Y NUEVAMENTE OTRO ARRAY */
      this.entradas = Object.values(data);
      /* this.paginacion = Object.values(this.entradas)
      
      console.log(this.paginacion[2]) */
      console.log(this.entradas);
      console.log(this.entradas[0]);
      this.entradas = Object.values(this.entradas[0]);
      /************************ */
      this.parseFechas();
    });

    /*     this.api.getAllCategorias().subscribe((data) => {
      this.categorias = Object.values(data);
      this.categorias = Object.values(this.categorias[0]);
    }); */
  }

  parseFechas() {
    this.entradas.forEach((entrada) => {
      entrada.created_at = new Date(entrada.created_at).toLocaleDateString(
        'es-ES'
      );
    });
  }

  entradaInfo(id: number) {
    console.log(id);
    this.router.navigate(['entrada', id]);
  }

  

  /*   verEntradasEnCategoria(id: number) {
    console.log(id);
    this.router.navigate(['categoria', id])
  } */
}
