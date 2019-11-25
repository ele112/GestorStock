import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudProveedoresComponent } from './components/crud-proveedores/crud-proveedores.component';
import { ConfigComponent } from './components/config/config.component';
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './components/login/login.component'
const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'Productos', component: HomeComponent },
  { path: 'Usuarios', component: CrudUsuarioComponent },
  // { path: 'Proveedores', component: CrudProveedoresComponent },
  { path: 'Config', component: ConfigComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
