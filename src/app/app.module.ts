import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { SidebarCategoriasComponent } from './plantillas/sidebar-categorias/sidebar-categorias.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { HttpResponseInterceptor } from './interceptors/http/http.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './plantillas/sidebar/sidebar.component';
import { ModalComponent } from './plantillas/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardUsuariosComponent } from './vistas/dashboard-usuarios/dashboard-usuarios.component';
import { EditarUsuarioComponent } from './vistas/usuarios/editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './vistas/usuarios/nuevo-usuario/nuevo-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarCategoriasComponent,
    routingComponents,
    SidebarComponent,
    ModalComponent,
    DashboardUsuariosComponent,
    EditarUsuarioComponent,
    NuevoUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    /* JwtHelperService, */
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
