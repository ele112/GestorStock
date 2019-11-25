
import { NbToastrService } from '@nebular/theme';
import Swal from 'sweetalert2'



export class GlobalService {



    constructor(private toastrService: NbToastrService) { }

    public showToast(position, titulo, message, status?) {

        var config = status ? { status, position } : { position };
        console.log(config)
        this.toastrService.show(
            message,
            titulo,
            config
            // status ? { position, status } : { position }
        );
    }


    public dialogAlert(title, msg, type) {
        Swal.fire({
            title,
            type,
            html:
                `<label class="txt-alert">${msg}</label>`,
            confirmButtonText:
                '<label class="txt-alert">Aceptar</label>',
        })
    }

    public confirmAlert(title, msg, type) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                title: title,
                type: type,
                html: `<label class="txt-alert">${msg}</label>`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText:  '<label class="txt-alert">Cancelar</label>',
                confirmButtonText: '<label class="txt-alert">Aceptar</label>'
            }).then((result) => {
                if (result.value) {
                    resolve(true);
                }else{resolve(false)}
            })

        })
    }


    customNumber() {
        var min = 1;
        var max = 100;
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
        return random;
    }



    // public dialogAlert(){
    //     Swal.fire({
    //     title: '<strong>HTML <u>example</u></strong>',
    //     type: 'info',
    //     html:
    //         'You can use <b>bold text</b>, ' +
    //         '<a href="//sweetalert2.github.io">links</a> ' +
    //         'and other HTML tags',
    //     showCloseButton: true,
    //     showCancelButton: true,
    //     focusConfirm: false,
    //     confirmButtonText:
    //         '<i class="fa fa-thumbs-up"></i> Great!',
    //     confirmButtonAriaLabel: 'Thumbs up, great!',
    //     cancelButtonText:
    //         '<i class="fa fa-thumbs-down"></i>',
    //     cancelButtonAriaLabel: 'Thumbs down'
    //     })
    // }
}