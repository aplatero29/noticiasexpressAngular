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
    this.getUser();
    console.log(this.rolDeUsuario);
  }

  getUser() {
    this.api.getUsuario().subscribe((data) => {
      console.log(data);
      this.rolDeUsuario = data.rol;
      this.idDeUsuario = data.id;
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

  logout() {
    this.api.cerrarSesion();
    window.location.reload();
  }
}
