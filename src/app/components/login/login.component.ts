import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/global.config'
import { DataBase } from 'src/app/db/database';
import { GlobalService } from '../../services/global.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private sharedService: SharedService, private service: GlobalService, private serviceDB: DataBase) { }

  ngOnInit() {
  }



  ingresar(){ 
    // this.sharedService.statusLogIn.next(true)
    var user = document.getElementById('user')['value'];
    var pass = document.getElementById('pass')['value'];
    if(user == 'admin' && pass == 'admin'){
      this.serviceDB.loggin();
      this.sharedService.statusLogIn.next(true)
    }else{
      this.serviceDB.existeUsuario(user, pass).then((val) =>{
        console.log(val)
        if(val['status']){
          this.serviceDB.loggin();
          this.sharedService.userLogged.next(val['data']);
          this.serviceDB.userActive(val['data']);
          setTimeout(() =>{ this.sharedService.statusLogIn.next(true) }, 500)
         

        }else{
          this.service.dialogAlert('', val['message'], 'warning');
        }
      })
    }

  }

}
