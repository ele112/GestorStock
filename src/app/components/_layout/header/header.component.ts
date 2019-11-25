import { Component, OnInit } from '@angular/core';
import { DataBase } from '../../../db/database'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items = [
    {
      title: 'Logout',
    },
  ];
  constructor(private service: DataBase) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.service.logout();
  }

}
