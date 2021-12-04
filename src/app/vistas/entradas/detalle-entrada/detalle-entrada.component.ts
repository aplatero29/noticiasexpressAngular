import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasI } from 'src/app/modelos/listarentradas.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-detalle-entrada',
  templateUrl: './detalle-entrada.component.html',
  styleUrls: ['./detalle-entrada.component.css'],
})
export class DetalleEntradaComponent implements OnInit {
  entradaId!: number;
  entrada: EntradasI[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.entradaId = +params['id'];
    });

    this.api.getEntrada(this.entradaId).subscribe((data) => {
      console.log(data);
      this.entrada = Object.values(data);
      this.parseFechas();
      console.log(this.entrada);
    });
  }

  parseFechas() {
    this.entrada.forEach((entrada) => {
      entrada.created_at = new Date(entrada.created_at).toLocaleDateString(
        'es-ES',
        { dateStyle: 'full' }
      );
    });
  }

  verEntradasEnCategoria(id: number) {
    console.log(id);
    this.router.navigate(['categoria', id]);
  }
}
