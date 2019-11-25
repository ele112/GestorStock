import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import  {GlobalConfig} from '../../shared/global.config';
import { isLogged } from '../../guards/auth.service';

@Component({
  selector: 'app-crud-proveedores',
  templateUrl: './crud-proveedores.component.html',
  styleUrls: ['./crud-proveedores.component.scss']
})
export class CrudProveedoresComponent implements OnInit {
  settings = GlobalConfig.configSmartTableProveedores;
  data = [
    {
      id: 1,
      firstName: 'Mark',
      lastName: 'Otto',
      username: '@mdo',
      email: 'mdo@gmail.com',
      age: '28',
    }, {
      id: 2,
      firstName: 'Jacob',
      lastName: 'Thornton',
      username: '@fat',
      email: 'fat@yandex.ru',
      age: '45',
    }, {
      id: 3,
      firstName: 'Larry',
      lastName: 'Bird',
      username: '@twitter',
      email: 'twitter@outlook.com',
      age: '18',
    }, {
      id: 4,
      firstName: 'John',
      lastName: 'Snow',
      username: '@snow',
      email: 'snow@gmail.com',
      age: '20',
    }, {
      id: 5,
      firstName: 'Jack',
      lastName: 'Sparrow',
      username: '@jack',
      email: 'jack@yandex.ru',
      age: '30',
    }, {
      id: 6,
      firstName: 'Ann',
      lastName: 'Smith',
      username: '@ann',
      email: 'ann@gmail.com',
      age: '21',
    }, {
      id: 7,
      firstName: 'Barbara',
      lastName: 'Black',
      username: '@barbara',
      email: 'barbara@yandex.ru',
      age: '43',
    }]
  source: LocalDataSource = new LocalDataSource();

  constructor( private logged: isLogged) { 
    this.source.load(this.data);

  }

  ngOnInit() {
    this.logged.isLoggedIn();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    console.log(event);
    event.confirm.resolve();
  }

  onCreateConfirm(event): void{
    console.log(event);
  }

}
