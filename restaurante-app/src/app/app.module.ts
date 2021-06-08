import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { LoginComponent } from './login/login.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ProductosComponent } from './productos/productos.component';
import { FormEmpleadosComponent } from './empleados/form-empleados/form-empleados.component';
import { FormProductosComponent } from './productos/form-productos/form-productos.component';
import { MesaComponent } from './mesas/mesa/mesa.component';
import { interceptorProvider } from './security/interceptors/prod-interceptor.service';
import { ProdGuardService as guard } from './security/guards/prod-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MesasComponent } from './mesas/mesas.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'mesas', component: MesasComponent, canActivate: [guard], data: { expectedRol: ['jefe', 'empleado']}},
  {path: 'mesas/:id', component: MesaComponent, canActivate: [guard], data: { expectedRol: ['jefe', 'empleado']}},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [guard], data: { expectedRol: ['jefe', 'empleado']}},
  {path: 'empleados', component: EmpleadosComponent, canActivate: [guard], data: { expectedRol: ['jefe', 'empleado']}},
  {path: 'empleados/formEmpleados', component: FormEmpleadosComponent, canActivate: [guard], data: { expectedRol: ['jefe']}},
  {path: 'empleados/formEmpleados/:id', component: FormEmpleadosComponent, canActivate: [guard], data: { expectedRol: ['jefe']}},
  {path: 'productos', component: ProductosComponent, canActivate: [guard], data: { expectedRol: ['jefe', 'empleado']}},
  {path: 'productos/formProductos', component: FormProductosComponent, canActivate: [guard], data: { expectedRol: ['jefe']}},
  {path: 'productos/formProductos/:id', component: FormProductosComponent, canActivate: [guard], data: { expectedRol: ['jefe']}}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ConfiguracionComponent,
    LoginComponent,
    EmpleadosComponent,
    ProductosComponent,
    FormEmpleadosComponent,
    FormProductosComponent,
    MesaComponent,
    MesasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
