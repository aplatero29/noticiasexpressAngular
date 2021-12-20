import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  idDeUsuario: number = 0;
  rolDeUsuario: string = ''; //Atributo ENUM para los roles

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getUser();
    } else {
      this.goToLogin()
    }
  }

  getUser() {
    this.api.getUsuario().subscribe((data) => {

      this.rolDeUsuario = data.rol;
      this.idDeUsuario = data.id;
      sessionStorage.setItem('id', this.idDeUsuario.toString());
    });
  }

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

  cerrarSesion() {
    this.api.cerrarSesion();
    if (this.router.url == '/' || this.router.url == '/entradas')
      window.location.reload();
    else '';
  }
}
