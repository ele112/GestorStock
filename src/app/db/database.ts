import { HttpClient } from '@angular/common/http'; 
import { ProductoModel } from '../model/producto.model';
import { CategoriaModel } from '../model/categoria.model';
import { of as observableOf, Observable } from 'rxjs';
import { UserModel } from '../model/usuario.model';
import { SharedService } from '../shared/global.config';



export class DataBase {



    constructor(private http: HttpClient, private sharedService: SharedService){

    }


    // private cargarStorage(): Observable<any>{
    //     return observableOf(JSON.parse(localStorage.getItem('data')));
    // }
    private cargarStorage(): Observable<any>{
        return observableOf(JSON.parse(localStorage.getItem('data')));
    }

    /**
     * CRUD PRODUCTOS
     */
    public obtenerProductos(){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var productos = data['productos'];
                    resolve({status: true, message: 'OK', data: productos });
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})
            })
            // const productos = DataBaseJSON['productos'];
            // resolve(productos);
        })
    }
    public modificarProducto(id: number, producto: ProductoModel){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var productos = data['productos']
                    const index = productos.findIndex(e => id == e.id);
                    productos[index] = producto;
                    console.log(productos[index])
                    data['productos'] = productos;
                    localStorage.setItem('data', JSON.stringify(data));
                    console.log(data);
                    setTimeout(()=> {resolve({status: true, message: 'Producto actualizado' })},2000)
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })

    }
    public eliminarProducto(id: number){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var productos = data['productos'];
                    var index = productos.findIndex(e => id == e.id);
                    if(index != 0){
                        productos.splice(index, 1);
                    }
                    data['productos'] = productos;
                    localStorage.setItem('data', JSON.stringify(data));
                    setTimeout(()=> {resolve({status: true, message: 'Producto eliminado con exito' })},2000)
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public agregarProducto(producto: ProductoModel){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var productos = data['productos'];
                    productos.push(producto);
                    data['productos'] = productos;
                    localStorage.setItem('data', JSON.stringify(data));
                    setTimeout(()=> {resolve({status: true, message: 'Producto agregado', data: 0 }) },2000)
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})
            })
        })
    }

    
    /**
     * CRUD CATEGORIAS
     */
    public obtenerCategorias(){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var categorias = data['categorias'];
                    resolve({status: true, message: 'OK', data: categorias });
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})                
            })
        });
    }
    public modificarCategoria(id: number, categoria: CategoriaModel){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var categorias = data['categorias']
                    const index = categorias.findIndex(e => id == e.id);
                    categorias[index] = categoria;
                    data['categorias'] = categorias;
                    localStorage.setItem('data', JSON.stringify(data));
                    resolve({status: true, message: 'Categoria actualizado' });
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public eliminarCategoria(id: number){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var categorias = data['categorias']
                    const index = categorias.findIndex(e => id == e.id);
                    if(index != 0){
                        categorias.splice(index, 1);
                    }
                    data['categorias'] = categorias;
                    localStorage.setItem('data', JSON.stringify(data));
                    resolve({status: true, message: 'Categoria eliminado con exito' })
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public agregarCategoria(categoria: CategoriaModel){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var categorias = data['categorias'];
                    categorias.push(categoria);
                    data['categorias'] = categorias;
                    localStorage.setItem('data', JSON.stringify(data));
                    resolve({ status: true, message: 'Categoria agregada', data: 0 })
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
//     return new Promise((resolve, reject) => {
//         this.cargarStorage().subscribe((data) => {
//             if(data){
//                 var productos = data['productos'];
//                 productos.push(producto);
//                 data['productos'] = productos;
//                 localStorage.setItem('data', JSON.stringify(data));
//                 setTimeout(()=> {resolve({status: true, message: 'Producto agregado', data: 0 }) },2000)
//                 return;
//             }
//             reject({status: false, message: 'Ocurrió un error al obtener la informacion'})
//         })
//     })
// }

    /**
     * CRUD USUARIOS
     */
    public obtenerUsuarios() {
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if (data) {
                    const usuarios = data['usuarios'];
                    resolve({ status: true, message: 'OK', data: usuarios });
                    return;
                }
                reject({ status: false, message: 'Ocurrió un error al obtener la informacion' })

            })
        })
    }
    public modificarUsuario(id: number, usuario: UserModel){
        return new Promise((resolve, reject) => {
            console.log(usuario)
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var usuarios = data['usuarios']
                    const index = usuarios.findIndex(e => id == e.id);
                    usuarios[index] = usuario;
                    data['usuarios'] = usuarios;
                    localStorage.setItem('data', JSON.stringify(data));
                    resolve({status: true, message: 'Usuario actualizado' });
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public eliminarUsuario(id: number){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var usuarios = data['usuarios']
                    const index = usuarios.findIndex(e => id == e.id);
                    console.log(index)
                    usuarios.splice(index, 1);
                    data['usuarios'] = usuarios;
                    localStorage.setItem('data', JSON.stringify(data));
                    resolve({status: true, message: 'Usuario eliminado con exito' })
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public agregarUsuario(usuario: UserModel){
        // VERIFICAR QUE EL USUARIO QUE ESTA EDITANDO SEA ADMINISTRADOR
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var usuarios = data['usuarios'];
                    usuarios.push(usuario);
                    data['usuarios'] = usuarios;
                    localStorage.setItem('data', JSON.stringify(data));
                    resolve({ status: true, message: 'Usuario agregada', data: 0 })
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })      
    }

    /**
     * CRUD PROVEEDORES
     */
    public obtenerProveedores(){
      return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){

                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public modificarProveedor(id: number){
      return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){

                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public eliminarProveedor(id: number){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var usuarios = data['usuarios']
                    const index = usuarios.findIndex(e => id == e.id);
                    if(index != 0){
                        usuarios.splice(index, 1);
                    }
                    data['usuarios'] = usuarios;
                    localStorage.setItem('data', JSON.stringify(data));
                    resolve({status: true, message: 'Usuario eliminado con exito' })
                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }
    public agregarProveedor(proveedor){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){

                    return;
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

            })
        })
    }

    public existeSku(sku){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var productos = data['productos'];
                    var el = productos.filter((e) =>{ return e.sku == sku});
                    const existe = el.length > 0 ? true : false;
                    resolve({status: true, message: 'Producto encontrado', data: existe });
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})
            })
        })
    }

    public existeCodigo(codigo){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var productos = data['productos'];
                    var el = productos.filter((e) =>{ return e.codigo == codigo});
                    const existe = el.length > 0 ? true : false;
                    resolve({status: true, message: 'Producto encontrado', data: existe });
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})
            })
        })
    }

    public existeUsuario(user, pass){
        return new Promise((resolve, reject) => {
            this.cargarStorage().subscribe((data) => {
                if(data){
                    var usuarios = data['usuarios'];
                    var el = usuarios.filter((e) =>{ return e.correo == user});
                    const existe = el.length > 0 ? true : false;
                    if(!existe){
                        resolve({status: false, message: 'Usuario no existe', data: false });
                    }else{
                        if(pass == el[0].pass){
                            resolve({status: true, message: 'OK', data: el });                            
                        }else{
                            resolve({status: false, message: 'Contraseña no valida', data: false });

                        }
                    }
                }
                reject({status: false, message: 'Ocurrió un error al obtener la informacion'})
            })
        })
    }

    // public getUser(id){
    //     return new Promise((resolve, reject) => {
    //         this.cargarStorage().subscribe((data) => {
    //             if(data){
    //                 var usuarios = data['usuarios']
    //                 const index = usuarios.findIndex(e => id == e.id);
    //                 resolve({status: true, message: 'Usuario eliminado con exito' })
    //                 return;
    //             }
    //             reject({status: false, message: 'Ocurrió un error al obtener la informacion'})

    //         })
    //     })
    // }
    public userActive(user){
        localStorage.setItem('userActive', JSON.stringify(user));
    }
    public loggin(){
        localStorage.setItem('isLogged', 'true');
    }
    public logout(){
        localStorage.setItem('isLogged', 'false');
        this.sharedService.statusLogIn.next(false);        
    }


}