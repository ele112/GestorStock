import { Component } from '@angular/core';
import { SharedService } from './shared/global.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Admin';
  logged: boolean = true;


  constructor(private sharedService: SharedService){
    this.sharedService.statusLogIn.subscribe((data: boolean) => {
      this.logged = data
    });
    const firstTime = localStorage.getItem('first');
    console.log(firstTime)
    if(!firstTime){
      localStorage.setItem('first', 'true');
      const data = {
        "productos": [
          {"tipo": "nuevo"},
          {"tipo": "-", "stock": "10", "color": '#75FF33', "codigo": "123", 
          "sku": "344", "precio": 1000, "img": null, "titulo": "Reloj ITC 2gh", "categoria": "Computación", "id": "1", "descripcion": ""  
          },
          {"tipo": "-", "stock": "10", "color": '#75FF33', "codigo": "3212", 
          "sku": "344", "precio": 1000, "img": null, "titulo": "Mouse ITC 2gh", "categoria": "Computación", "id": "2", "descripcion": ""  
          },
          {"tipo": "-", "stock": "13", "color": '#75FF33', "codigo": "2132", 
          "sku": "12", "precio": 3000, "img": null, "titulo": "Teclado pc",     "categoria": "Computación", "id": "3", "descripcion": "" 
          },
          {"tipo": "-", "stock": "100", "color": '#75FF33', "codigo": "4433", 
          "sku": "00", "precio": 3000, "img": null,   "titulo": "Teclado pc", "categoria": "Computación", "id": "4", "descripcion": "" 
          }
        ],
        "categorias": [
          {tipo: "nuevo"},
          { tipo: '', nombre: 'Computación', id: 1},
          { tipo: '', nombre: 'Electrónica', id: 2},
          { tipo: '', nombre: 'Celulares',   id: 3},
          { tipo: '', nombre: 'Televisión',  id: 4} ],
        "usuarios": [
          {id: 1, nombre: 'JUANITO', apellidoP: 'Perez', apellidoM: 'Pereira', correo: 'juan@gmail.com', celular: '+5691234', rol: '1', foto: '', pass: 'jperez'},
          {id: 2, nombre: 'Pedro', apellidoP: 'Jorquera', apellidoM: 'Santiago', correo: 'pedro@gmail.com', celular: '+5691234', rol: '2', foto: '', pass: 'pjorquera'},
          {id: 3, nombre: 'Miguel', apellidoP: 'Muñoz', apellidoM: 'Luna', correo: 'miguel@gmail.com', celular: '+5691234', rol: '3', foto: '', pass: 'mmuñoz'}
        ],
        "proveedores": [],
        "config": {}
      }
      localStorage.setItem('data', JSON.stringify(data));
    }

  }


  ngOnInit(){
    // this.logged = true;
    // this.sharedService.statusLogIn.subscribe((data: boolean) => {
    //   this.logged = data
    //   console.log(this.logged);
    // });

  }


}
