import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardEntradasComponent } from './vistas/dashboard-entradas/dashboard-entradas.component';
import { EditarEntradaComponent } from './vistas/entradas/editar-entrada/editar-entrada.component';
import { NuevaEntradaComponent } from './vistas/entradas/nueva-entrada/nueva-entrada.component';
import { HomepageEntradaComponent } from './vistas/entradas/homepage-entrada/homepage-entrada.component';
import { DetalleEntradaComponent } from './vistas/entradas/detalle-entrada/detalle-entrada.component';
import { VerEntradasComponent } from './vistas/categorias/ver-entradas/ver-entradas.component';
import { RegisterComponent } from './vistas/register/register.component';
import { UsuarioDetalleComponent } from './vistas/usuario-detalle/usuario-detalle.component';
import { PaginaNoEncontradaComponent } from './vistas/errores/pagina-no-encontrada/pagina-no-encontrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'entradas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'usuario/:id', component: UsuarioDetalleComponent },
  { path: 'dashboard/entradas', component: DashboardEntradasComponent },
  { path: 'dashboard/entradas/editar/:id', component: EditarEntradaComponent },
  { path: 'dashboard/entradas/nuevo', component: NuevaEntradaComponent },
  { path: 'entradas', component: HomepageEntradaComponent },
  { path: 'entrada/:id', component: DetalleEntradaComponent },
  { path: 'categoria/:id', component: VerEntradasComponent },
  { path: '**', component: PaginaNoEncontradaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  UsuarioDetalleComponent,
  /////////////////////////
  HomepageEntradaComponent,
  VerEntradasComponent,
  DetalleEntradaComponent,
  DashboardEntradasComponent,
  EditarEntradaComponent,
  NuevaEntradaComponent,
  /////////////////////////
  PaginaNoEncontradaComponent,
];
