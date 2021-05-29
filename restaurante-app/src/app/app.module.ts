import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { VistaComponent } from './vista/vista.component';
import { ConfiguracionComponent } from './vista/configuracion/configuracion.component';
import { LoginComponent } from './login/login.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ProductosComponent } from './productos/productos.component';
import { FormEmpleadosComponent } from './empleados/form-empleados/form-empleados.component';
import { FormProductosComponent } from './productos/form-productos/form-productos.component';
import { MesaComponent } from './vista/mesa/mesa.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'vista', component: VistaComponent},
  {path: 'vista/mesa', component: MesaComponent},
  {path: 'vista/configuracion', component: ConfiguracionComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleados/formEmpleados', component: FormEmpleadosComponent},
  {path: 'empleados/formEmpleados/:id', component: FormEmpleadosComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/formProductos', component: FormProductosComponent},
  {path: 'productos/formProductos/:id', component: FormProductosComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VistaComponent,
    ConfiguracionComponent,
    LoginComponent,
    EmpleadosComponent,
    ProductosComponent,
    FormEmpleadosComponent,
    FormProductosComponent,
    MesaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
