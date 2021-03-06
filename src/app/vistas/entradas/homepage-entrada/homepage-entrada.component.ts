import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { Router } from '@angular/router';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';

@Component({
  selector: 'app-homepage-entrada',
  templateUrl: './homepage-entrada.component.html',
  styleUrls: ['./homepage-entrada.component.css'],
})
export class HomepageEntradaComponent implements OnInit {
  entradas: EntradasI[] = [];
  page: number = 1;
  pageSize: number = 10;
  

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getAllEntradas(this.page, this.pageSize).subscribe((data) => {
      /***************  NO TOCAR -----  TRANSFORMA EL JSON EN UN ARRAY, Y NUEVAMENTE OTRO ARRAY */
      this.entradas = Object.values(data);

      
      
      this.entradas = Object.values(this.entradas[0]);
      /************************ */
      this.parseFechas();
      
    });
  }

  parseFechas() {
    this.entradas.forEach((entrada) => {
      entrada.created_at = new Date(entrada.created_at).toLocaleDateString(
        'es-ES'
      );
    });
  }

  entradaInfo(id: number) {
    
    this.router.navigate(['entrada', id]);
  }
}
