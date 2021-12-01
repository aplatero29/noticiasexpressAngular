import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { EditarEntradaComponent } from './vistas/entradas/editar-entrada/editar-entrada.component';
import { NuevaEntradaComponent } from './vistas/entradas/nueva-entrada/nueva-entrada.component';
import { HomepageEntradaComponent } from './vistas/entradas/homepage-entrada/homepage-entrada.component';
//import { homedir } from 'os';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'entradas/editar', component: EditarEntradaComponent },
  { path: 'entradas/nueva', component: NuevaEntradaComponent },
  { path: 'entradas', component: HomepageEntradaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  DashboardComponent,
  EditarEntradaComponent,
  NuevaEntradaComponent,
  HomepageEntradaComponent,
];
