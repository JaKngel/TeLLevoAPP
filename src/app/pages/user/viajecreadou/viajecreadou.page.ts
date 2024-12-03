import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Viaje } from 'src/app/interfaces/viaje'; // Asegúrate de tener la interface `Viaje`
import Swal from 'sweetalert2'; // Si deseas mostrar un mensaje después de cancelar

@Component({
  selector: 'app-viajecreadou',
  templateUrl: './viajecreadou.page.html',
  styleUrls: ['./viajecreadou.page.scss'],
})
export class ViajecreadouPage implements OnInit {
  start: string | null = null;
  end: string | null = null;
  viajeId: string | null = null;
  viaje: Viaje | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Añade el Router
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    // Capturamos la ID del viaje desde los parámetros de la URL
    this.route.paramMap.subscribe(params => {
      this.viajeId = params.get('id');
      if (this.viajeId) {
        this.obtenerDatosViaje(this.viajeId);
      }
    });
  }

  obtenerDatosViaje(viajeId: string) {
    this.firestore
      .collection('viajes')
      .doc(viajeId)
      .get()
      .toPromise()
      .then(doc => {
        if (doc?.exists) {
          const viajeData = doc.data() as Viaje;
          this.viaje = viajeData;
          this.start = `${viajeData.inicio.latitude}, ${viajeData.inicio.longitude}`;
          this.end = `${viajeData.fin.latitude}, ${viajeData.fin.longitude}`;
        } else {
          console.log('Viaje no encontrado');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos del viaje:', error);
      });
  }

  cancelarViaje() {
    if (this.viajeId) {
      this.firestore.collection('viajes').doc(this.viajeId).update({
        estado: 'cancelado'
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Viaje Cancelado',
          text: 'El viaje ha sido cancelado exitosamente.',
          timer: 2000,
          showConfirmButton: false,
          heightAuto: false
        });
        setTimeout(() => {
          this.router.navigate(['/dprofile']);
        }, 2000);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cancelar',
          text: 'Hubo un problema al cancelar el viaje.',
          footer: `Detalles: ${error.message}`,
          heightAuto: false
        });
      });
    }
  }

  terminarViaje() {
    if (this.viajeId) {
      this.firestore.collection('viajes').doc(this.viajeId).update({
        estado: 'terminado'
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Viaje Terminado',
          text: 'El viaje se ha marcado como terminado exitosamente.',
          timer: 2000,
          showConfirmButton: false,
          heightAuto: false
        });
        setTimeout(() => {
          this.router.navigate(['/uprofile']);
        }, 2000);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al terminar',
          text: 'Hubo un problema al marcar el viaje como terminado.',
          footer: `Detalles: ${error.message}`,
          heightAuto: false
        });
      });
    }
  }
}
