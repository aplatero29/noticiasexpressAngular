import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  tipoDeUsuario: string | null = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    //if (localStorage.getItem('token')) {
      this.tipoDeUsuario = localStorage.getItem('rol') //this.getRol();
      console.log(this.tipoDeUsuario) 
    //}
  }

 /*  getRol(): string {
    if (localStorage.getItem('rol')) {
      return localStorage.getItem('rol');
    }
    return '';
  } */

  goToLogin() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
  }

  goToRegistro() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['registro']);
    }
  }

   logout() {
    this.api.cerrarSesion();
    window.location.reload();
  }
}
