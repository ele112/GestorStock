import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { SharedService } from '../../../shared/global.config'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user = {
    usuario: '',
    cargo  : ''
  }
  items: NbMenuItem[] = [
    {
      title: 'Productos',
      link: '/Productos',
      icon: 'shopping-bag-outline',
    },
    {
      title: 'Usuarios',
      link: '/Usuarios',
      icon: 'people-outline',
    },
    {
      title: 'Configuración',
      link: '/Config',
      icon: 'settings-2-outline',
    },
   ];

  constructor(private sharedService: SharedService) {
    this.sharedService.userLogged.subscribe((data: any) => {
      var user = data[0];
      console.log(user);
      this.user.usuario = user['nombre']+' '+user['apellidoP']+' '+user['apellidoM']
      var rol = user['rol'];
      this.user.cargo   = rol == 1 ? 'Administrador' : rol == 2 ? 'Vendedor' : 'Bodeguero';
      document.getElementById('user').innerHTML = `<p>${this.user.usuario}</p>`
      console.log(this.user.usuario, this.user.cargo)
    });
   }

  ngOnInit() {
  }

}
