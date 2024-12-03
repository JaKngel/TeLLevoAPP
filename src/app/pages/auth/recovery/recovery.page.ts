import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {
  email:string='';
  constructor(private authSevice: AuthService) { }

  ngOnInit() {
  }
  async recoveryPassword(){
    try {
      await this.authSevice.recoveryPassword(this.email);
      let timerInterval: any;
        Swal.fire({
          title: "Cargando...",
          html: "Enviando correo",
          timer: 1500,
          timerProgressBar: true,
          heightAuto:false,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup()!.querySelector("b");
            timerInterval = setInterval(() => {
              timer!.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: 'Exito!',
              text: 'Correo enviado correctamente',
              icon: 'success',
              confirmButtonText: 'OK',
              heightAuto: false,
              
            });
          }
        });

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'No se puede enviar el correo',
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
    }
  }

}
