import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasI } from 'src/app/modelos/listarcategorias.interface';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-ver-entradas',
  templateUrl: './ver-entradas.component.html',
  styleUrls: ['./ver-entradas.component.css'],
})
export class VerEntradasComponent implements OnInit {
  categoria: CategoriasI[] = [];
  entradas: EntradasI[] = [];
  categoriaId!: number;

  constructor(
    private api: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.categoriaId = +params['id'];
    });

    this.api.getEntradasPorCategoria(this.categoriaId).subscribe((data) => {
      this.categoria = Object.values(data);
      console.log(this.categoria);
      console.log(this.categoria[1]);
      this.entradas = Object.values(this.categoria[1]);
      console.log(this.entradas);

      this.parseFechas();
      console.log(this.entradas);
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
    console.log(id);
  }
}
