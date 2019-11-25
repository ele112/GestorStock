import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { isLogged } from '../../guards/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 

  constructor(public http: HttpClient, private logged: isLogged) { }

  ngOnInit() {
    this.logged.isLoggedIn();
  }


  handleFileInput(ev){
    // const formData = new FormData();
    // formData.append('file', ev);
    console.log(ev);

    // this.http.post('url/to/your/api', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('SUCCESS !!');
    //   })
  }
}
