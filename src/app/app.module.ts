import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { SidebarComponent } from './plantillas/sidebar/sidebar.component';
/* import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { EditarEntradaComponent } from './vistas/entradas/editar-entrada/editar-entrada.component';
import { NuevaEntradaComponent } from './vistas/entradas/nueva-entrada/nueva-entrada.component';
import { HomepageEntradaComponent } from './vistas/entradas/homepage-entrada/homepage-entrada.component'; */

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PaginacionComponent } from './plantillas/paginacion/paginacion.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './vistas/register/register.component';
import { UsuarioDetalleComponent } from './vistas/usuario-detalle/usuario-detalle.component';
import { PaginaNoEncontradaComponent } from './vistas/errores/pagina-no-encontrada/pagina-no-encontrada.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    routingComponents,
    PaginaNoEncontradaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    /* JwtHelperService, */
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
