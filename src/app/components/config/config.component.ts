import { Component, OnInit } from '@angular/core';
import { isLogged } from '../../guards/auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  color: any;
  color2: any;
  constructor(private logged: isLogged) { }

  ngOnInit() {
    this.logged.isLoggedIn();

  }

}
