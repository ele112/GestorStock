import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DataBase} from '../../../db/database';
import { GlobalService } from 'src/app/services/global.service';
import { CategoriaModel } from '../../../model/categoria.model'

@Component({
  selector: 'app-crud-categorias',
  templateUrl: './crud-categorias.component.html',
  styleUrls: ['./crud-categorias.component.scss']
})
export class CrudCategoriasComponent implements OnInit {
  @ViewChild('refModalAgregarCategoria', /* TODO: add static flag */ null) mdl: TemplateRef<any>;

  categorias: any[] = []
  refMdlDialog: any;
  editCat: boolean;
  tmpId: number;
  constructor(private dialogService: NbDialogService, 
    private services: GlobalService,
    private serviceDB: DataBase, ) { 
      
    }

  ngOnInit() {
    this.editCat = false;
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.serviceDB.obtenerCategorias().then((val) => {
      console.log(val)
      if(val['status']){
        this.categorias = val['data'];
      }
      
    }).catch((err) => {
      this.services.showToast('top-right', 'Error', err.message, 'danger');
      console.log(err);
    })
  }

  openC(ac, info?){
    if(ac == 'new'){
      this.editCat = false;
      this.refMdlDialog = this.dialogService.open(this.mdl);
    }else{
      this.editCat = true;
      this.tmpId = info.id;
      this.refMdlDialog = this.dialogService.open(this.mdl);
      document.getElementById('nombreProducto')['value'] = info.nombre; 


    }
    

  }

  save(){
    var categoria = document.getElementById('nombreProducto')['value'];
    if(categoria == ''){
      this.services.dialogAlert('','Debe ingresar un nombre', 'warning');
      return;
    }
    if(categoria.length < 3){
      this.services.dialogAlert('','El nombre no es valido, minimo 3 caracteres', 'warning');
      return;
    }


    var c = new CategoriaModel();
    c.id = this.services.customNumber();
    c.nombre = categoria;
    c.tipo = '';
    if(this.editCat){

      this.serviceDB.modificarCategoria(this.tmpId, c).then((val) => {
        this.tmpId = null;
        if(val['status']){
          this.refMdlDialog.close();
          this.services.dialogAlert('', val['message'], 'success');
          this.obtenerCategorias();
          return;
        }
        this.services.dialogAlert('', val['message'], 'error');
      });

    }else{
      
      this.serviceDB.agregarCategoria(c).then((val) => {
        if(val['status']){
          this.refMdlDialog.close();
          this.services.dialogAlert('', val['message'], 'success');
          this.obtenerCategorias();
          return;
        }
        this.services.dialogAlert('', val['message'], 'error');
      });
      
    }

  }

  delete(){
    this.serviceDB.eliminarCategoria(this.tmpId).then((val) => {
      this.tmpId = null;
      if(val['status']){
        this.refMdlDialog.close();
        this.services.dialogAlert('', val['message'], 'success');
        this.obtenerCategorias();
        return;
      }
      this.services.dialogAlert('', val['message'], 'error');
    })
  }


}
