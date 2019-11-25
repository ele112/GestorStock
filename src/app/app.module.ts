import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, 
         NbMenuModule, NbContextMenuModule,
         NbActionsModule, NbSidebarModule,
         NbCardModule, NbTabsetModule,
         NbDialogModule, NbInputModule,
         NbButtonModule, NbToastrModule ,
         NbSelectModule, NbPopoverModule,
         NbSidebarService, NbIconModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HeaderComponent } from './components/_layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SpreadSheetsModule } from "@grapecity/spread-sheets-angular";
import { MenuComponent } from './components/_layout/menu/menu.component';
import { CrudProductosComponent } from './components/home/crud-productos/crud-productos.component';
import { CrudCategoriasComponent } from './components/home/crud-categorias/crud-categorias.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudProveedoresComponent } from './components/crud-proveedores/crud-proveedores.component';
import { ConfigComponent } from './components/config/config.component';
import { DataBase } from './db/database';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GlobalService } from './services/global.service';
import { NbToastrService } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberDirective } from './directives/only-numbers.directive';
import { NgxLoadingModule } from 'ngx-loading';
import { LoginComponent } from './components/login/login.component';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { isLogged } from './guards/auth.service';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    CrudProductosComponent,
    CrudCategoriasComponent,
    CrudUsuarioComponent,
    CrudProveedoresComponent,
    ConfigComponent,
    NumberDirective,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NgxLoadingModule.forRoot({}),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    NbPopoverModule,
    NbLayoutModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbActionsModule,
    NbSidebarModule,
    NbCardModule,
    NbTabsetModule,
    NbDialogModule.forRoot(),
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbToastrModule.forRoot(),
    SpreadSheetsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ColorPickerModule

  ],
  providers: [NbSidebarService, DataBase, GlobalService, NbToastrService, isLogged],
  bootstrap: [AppComponent]
})
export class AppModule { }
