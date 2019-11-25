import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { GlobalConfig} from '../../shared/global.config';
import { DataBase} from '../../db/database';
import { GlobalService } from 'src/app/services/global.service';
import { UserModel } from '../../model/usuario.model';
import { isLogged } from '../../guards/auth.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.scss']
})
export class CrudUsuarioComponent implements OnInit {
  // settings = GlobalConfig.configSmartTableUsuario;
  settings = GlobalConfig.configSmartTableUsuario;
  data = []
  source: LocalDataSource = new LocalDataSource();
  mnsjError: string;
  constructor(private serviceDB: DataBase, private logged: isLogged, private services: GlobalService) { 

    

  }

  ngOnInit() {
    this.logged.isLoggedIn();
    this.mnsjError = '';
    this.obtenerUsuarios();
  }

  onDeleteConfirm(event): void {
    this.services.confirmAlert('','¿Esta seguro que desea eliminar este usuario?', 'warning').then((v) => {
      console.log(v);
      if(!v){
        event.confirm.reject();
        return;
      }
      this.serviceDB.eliminarUsuario(event.data.id).then((val) => {
        console.log(val)
        if(val['status']){
          this.services.dialogAlert('', val['message'], 'success');
          this.obtenerUsuarios();
          event.confirm.resolve();
          return;
        }
        this.services.dialogAlert('', val['message'], 'error');
      })

    })
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }

  obtenerUsuarios(){
    this.serviceDB.obtenerUsuarios().then((val) => {
      console.log(val)
      if(val['status']){
        this.source.load(val['data']);
        // this.categorias = val['data'];
      }

    }).catch((err) => {
      this.services.showToast('top-right', 'Error', err.message, 'danger');
      console.log(err);
    })
  }

  onEditConfirm(event): void {
    console.log(event);
    var valido = this.validar(event.newData);
    if(valido){
      var data = event.newData;
      var u = new UserModel();
      console.log(u)
      u.id             = data['id'] ;
      u.nombre         = data['nombre'];
      u.apellidoP      = data['apellidoP'];
      u.apellidoM      = data['apellidoM'];
      u.celular        = data['celular'];
      u.correo         = data['correo'];
      u.rol            = data['rol'];
      
      this.save('edit', u, event.data.id);
      event.confirm.resolve();

      
    }else{
      this.services.dialogAlert('', this.mnsjError, 'warning')
    }
  }

  onCreateConfirm(event): void{
    console.log(event);
    var valido = this.validar(event.newData);
    if(valido){
      // this.serviceDB.agregarUsuario
      var data = event.newData;
      var u = new UserModel();
      u.id = this.services.customNumber();
      u.nombre         = data['nombre'];
      u.apellidoP      = data['apellidoP'];
      u.apellidoM      = data['apellidoM'];
      u.celular        = data['celular'];
      u.correo         = data['correo'];
      u.rol            = data['rol']
      this.save('new', u);
      event.confirm.resolve();

    }else{
      this.services.dialogAlert('', this.mnsjError, 'warning')
    }

  }


  save(ac, usuario: UserModel, id?){

    if(ac == 'new'){
      this.serviceDB.agregarUsuario(usuario).then((val) => {
        if(val['status']){
          this.services.dialogAlert('', val['message'], 'success');
          this.obtenerUsuarios();
          return;
        }
        this.services.dialogAlert('', val['message'], 'error');
      })
    }else{ 
      // console.log(id)
      // console.log(usuario)
      this.serviceDB.modificarUsuario(id, usuario ).then((val) => {
        if(val['status']){
          this.services.dialogAlert('', val['message'], 'success');
          this.obtenerUsuarios();
          return;
        }
        this.services.dialogAlert('', val['message'], 'error');
      });

    }
  }



  validar(data){
    var valido = true;
    this.mnsjError = '';
    if(data['nombre'] == '' || data['nombre'].length < 3){
      this.mnsjError += ' - Nombre ingresado no es valido <br>'
      valido = false;
    }
    if(data['apellidoP'] == '' || data['apellidoP'].length < 3){
      this.mnsjError += ' - Apellido Paterno ingresado no es valido <br>'
      valido = false;
    }
    if(data['apellidoM'] == '' || data['apellidoM'].length < 3){
      this.mnsjError += ' - Apellido Materno ingresado no es valido <br>'
      valido = false;
    }

    //regex
    if(data['correo'] == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data['correo'])) ){
      this.mnsjError += ' - Correo ingresado no es valido <br>'
      valido = false;
    }

    //Validar solo numero
    if(data['celular'] == '' || isNaN(data['celular']) || data['celular'].length > 9 ){
      this.mnsjError += ' - Numero ingresado no es valido <br>'
      valido = false;
    }

    if(data['rol'] == '' || parseInt(data['rol']) > 3 || parseInt(data['rol']) < 1){
      this.mnsjError += ' - Rol ingresado no es valido <br>'
      valido = false;
    }

    return valido;
  }
}
