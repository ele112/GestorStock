
  
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn:'root'})
export class SharedService {
  statusLogIn = new Subject();
  userLogged  = new Subject();
}


export const GlobalConfig = {



    configSmartTableUsuario:
    {
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmCreate: true
        },
        actions: { columnTitle: 'Acción'},
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmSave: true,
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
          nombre: {
            title: 'nombre',
            type: 'string',
          },
          apellidoP: {
            title: 'Apellido Paterno',
            type: 'string',
          },
          apellidoM: {
            title: 'Apellido Materno',
            type: 'string',
          },
          correo: {
            title: 'Correo',
            type: 'string',
          },
          celular: {
            title: 'Celular',
            type: 'string',
          },
          rol: {
            title: 'Rol',
            type: 'number',
          }
        }
    },
    configSmartTableProveedores: {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true
      },
      actions: { columnTitle: 'Acción'},
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        nombre: {
          title: 'Nombre',
          type: 'string',
        },
        apellidoP: {
          title: 'Apellido Paterno',
          type: 'string',
        },
        apellidoM: {
          title: 'Apellido Materno',
          type: 'string',
        },
        email: {
          title: 'Correo',
          type: 'string',
        },
        edad: {
          title: 'Celular',
          type: 'String',
        },
        rol: {
          title: 'Rol',
          type: 'number',
        }
      }
    }




}
