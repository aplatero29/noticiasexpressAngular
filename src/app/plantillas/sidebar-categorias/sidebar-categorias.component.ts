import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriasI } from 'src/app/modelos/listarcategorias.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-sidebar-categorias',
  templateUrl: './sidebar-categorias.component.html',
  styleUrls: ['./sidebar-categorias.component.css'],
})
export class SidebarCategoriasComponent implements OnInit {
  todasCategorias: CategoriasI[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.onSameUrlNavigation = 'reload';
    this.api.getAllCategorias().subscribe((data) => {
      this.todasCategorias = Object.values(data);
      this.todasCategorias = Object.values(this.todasCategorias[0]);
    });
  }

  verEntradasEnCategoria(id: number) {
    console.log(id);
    this.router.navigate(['categoria', id]);
  }
}
