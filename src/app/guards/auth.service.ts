import { SharedService } from '../shared/global.config';

export class isLogged{


    constructor(private sharedService: SharedService) { }

    isLoggedIn(){
        setTimeout(()=> {
            var logged =  localStorage.getItem('isLogged');
            if(!logged || logged == 'false'){
                this.sharedService.statusLogIn.next(false);
            }else{
                this.sharedService.statusLogIn.next(true)
            }
        }, 100)
    }
}