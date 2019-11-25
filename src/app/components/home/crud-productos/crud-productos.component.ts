import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DataBase } from '../../../db/database';
import { GlobalService } from '../../../services/global.service';
import { ProductoModel } from '../../../model/producto.model';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

interface temporalDataMdl {
  id: number;
  accion: string;
  foto: string;
}


@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.scss']
})

export class CrudProductosComponent implements OnInit {
  @ViewChild('refModalModificar', /* TODO: add static flag */ null) mdl: TemplateRef<any>;
  public loadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public imagePath;
  imgURL: any;
  public message: string;
  refDialog: any;
  productos = [{ tipo: 'nuevo' }]
  temporalInfoMdlObject: temporalDataMdl;
  validatorMsjErr: string = '';
  categorySelected: string = '';
  categorias: any[] = [];
  selectedItem: any = null;
  loading: boolean;
  constructor(private dialogService: NbDialogService,
    private serviceDB: DataBase, private services: GlobalService) {


  }

  ngOnInit() {
    this.loading = false;
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  // ngAfterViewChecked(){
  //   this.obtenerCategorias();
  // }
  obtenerProductos() {
    this.serviceDB.obtenerProductos().then((values) => {
      if (values['status']) {
        this.productos = values['data'];
      }
    }, (err) => {
      this.services.showToast('top-right', 'Error', err.message, 'danger');
      console.log(err);
    });
  }


  openProduct(item, accion) {
    this.temporalInfoMdlObject = { id: item.id, accion, foto: item.img }
    item.img ?  this.temporalInfoMdlObject.foto = item.img : null;
    console.log(this.temporalInfoMdlObject.id)
    this.refDialog = this.dialogService.open(this.mdl, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
    if (accion == 'edit') {
      document.getElementById('nombreProducto')['value'] = item.titulo || '';
      document.getElementById('codigoProducto')['value'] = item.codigo || '';
      document.getElementById('sku')['value'] = item.sku || '';
      document.getElementById('stock')['value'] = item.stock || '';
      document.getElementById('precioProducto')['value'] = item.precio || '';
      document.getElementById('descripcionProducto')['value'] = item.descripcion || '';
      this.selectedItem = item.categoria
      // document.getElementById('foto')['value'] = item.nombre;
      // if(this.validarForm()){

      // }

    }
  }

  validarForm(): boolean {
    var valido = true;
    this.validatorMsjErr = '';

    const titulo = document.getElementById('nombreProducto')['value'];
    const codigo = document.getElementById('codigoProducto')['value'];
    const stock = document.getElementById('stock')['value'];
    const precioProducto = document.getElementById('precioProducto')['value'];
    const categoria = this.selectedItem;
    if (titulo.toString().length < 4) {
      valido = false;
      this.validatorMsjErr += ' - Titulo ingresado no es valido <br>';
    }
    if (codigo.toString().length < 2) {
      valido = false;
      this.validatorMsjErr += ' - Código ingresado no es valido <br>';

    }
    if (!categoria) {
      valido = false;
      this.validatorMsjErr += ' - Categoría ingresado no es valida <br>';

    }
    if (stock == '' || parseInt(stock) < 1) {
      valido = false;
      this.validatorMsjErr += ' - Stock ingresado no es valido <br>'

    }
    if (precioProducto == '' || parseInt(precioProducto) < 10) {
      valido = false;
      this.validatorMsjErr += ' - Precio ingresado no es valido <br>'

    }

    return valido;

  }

  obtenerCategorias() {
    this.serviceDB.obtenerCategorias().then((val) => {
      if (val['status']) {
        this.categorias = val['data'];
      }

    }).catch((err) => {
      this.services.showToast('top-right', 'Error', err.message, 'danger');
      console.log(err);
    })
  }

  save() {
    const ac = this.temporalInfoMdlObject.accion;
    if (!this.validarForm()) {
      console.log(this.validatorMsjErr)
      // this.services.showToast('top-right', 'Validacion', this.validatorMsjErr, 'warning');
      this.services.dialogAlert('', this.validatorMsjErr, '');
    } else {
      console.log(this.productos);
      const titulo = document.getElementById('nombreProducto')['value'];
      const codigo = document.getElementById('codigoProducto')['value'];
      const sku = document.getElementById('sku')['value'];
      const stock = parseInt(document.getElementById('stock')['value']);
      const precio = document.getElementById('precioProducto')['value'];
      const descripcion = document.getElementById('descripcionProducto')['value'];
      const categoria = this.selectedItem;
      const minimo = 5;
      const medio = 10;

      var p = new ProductoModel()
      p.tipo = '-';
      p.stock = stock;
      p.color = stock <= minimo ? '#E03030' : stock <= medio ? '#F0E613' : '#75FF33';
      p.codigo = codigo;
      p.sku = sku;
      p.precio = precio;
      p.img = this.temporalInfoMdlObject.foto ? this.temporalInfoMdlObject.foto : null;
      p.titulo = titulo;
      p.categoria = categoria;
      p.id = this.services.customNumber();
      p.descripcion = descripcion;
      this.loading = true;
      if (ac == 'edit') {
        const idP = this.temporalInfoMdlObject.id;
        p.id = idP; 
        this.serviceDB.modificarProducto(idP, p).then((val)=> {
          this.temporalInfoMdlObject = {accion: null, id: null, foto: null}
          this.refDialog.close();
          this.obtenerProductos();
          this.loading = false;
          // this.imgURL = null;
          // this.temporalInfoMdlObject.foto = null;
          this.services.dialogAlert('', val['message'], 'success')
        }).catch((err) => {
          console.log(err);
          this.loading = false;
        });
      } else {
        this.validarExiste(p.sku, p.codigo).then((v) => {
          if(v){
            this.loading = false;
            this.services.dialogAlert('','El codigo o sku ya existe', 'warning');
            return;
          }
          this.serviceDB.agregarProducto(p).then((val) => {
            this.temporalInfoMdlObject = {accion: null, id: null, foto: null}
            this.refDialog.close();
            this.obtenerProductos();
            this.loading = false;
            this.services.dialogAlert('', val['message'], 'success')


          }).catch(()=> {
            this.loading = false;
          })        
        })

      }

    }

  }
  delete(){
    this.loading = true;
    var id = this.temporalInfoMdlObject.id;
    this.serviceDB.eliminarProducto(id).then((val) => {
      this.loading = false;
      this.temporalInfoMdlObject = {accion: null, id: null, foto: null}
      if(val['status']){
        this.obtenerProductos();
        this.refDialog.close();
        this.services.dialogAlert('', val['message'], 'success')
        return;
      }
      this.services.dialogAlert('', val['message'], 'error');
      
    })
  }

  validarExiste(sku, codigo){
     return new Promise((resolve, reject) => {
       if(sku == ''){
         resolve(false)
       }
      this.serviceDB.existeCodigo(codigo).then((val) => {
          if(val['data']){
            resolve(true);
          }else{

            this.serviceDB.existeSku(sku).then((v) => {

              if(v['data']){
                resolve(true)
              }else{
                resolve(false)
              }
              
            })
          }
      })

     }) 
  }

  format(name):string {

    var s = name.split('.');
    var a = s[s.length -1];
    return a;
  }

  preview(files){
    const nameFile = files[0]['name'];
    const format   = this.format(nameFile).toLowerCase();
    console.log(format)
    if (files.length === 0)
      return;
    
    if(format != 'png' && format != 'jpg' && format != 'jpeg'){
      this.message = 'El formato de la imagen no es aceptado'
      this.services.showToast('top-right', 'Imagen', this.message, 'warning');
      return;
    }


    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Imagen no soportada";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.temporalInfoMdlObject.foto = this.imgURL;
    }
  }

}
