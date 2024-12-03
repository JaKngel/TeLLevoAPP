import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-viaje-en-curso',
  templateUrl: './viaje-en-curso.page.html',
  styleUrls: ['./viaje-en-curso.page.scss'],
})
export class ViajeEnCursoPage implements OnInit {

  qrValue = ''; // ID del viaje escaneado
  resultadoQR = '';
  viajeId: string | null = null;
  start: string | null = null;
  end: string | null = null;
  manualQR: string = '';
  usuarioId: string = ''; // ID del usuario logueado

  constructor(
    private authServices: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private platform: Platform,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }

    // Obtener el UID del usuario logeado y asignarlo a usuarioId
    this.authServices.isLogged().subscribe(user => {
      if (user) {
        this.usuarioId = user.uid;  // Guardar el ID del usuario logueado
      }
    });

    // Obtener el ID del viaje desde los parámetros de la ruta usando paramMap
    this.viajeId = this.route.snapshot.paramMap.get('viajeId');
    console.log('Viaje ID:', this.viajeId); // Verificar el ID del viaje

    if (this.viajeId) {
      this.obtenerDetallesViaje(this.viajeId);
    }
  }

  // Función para obtener los detalles del viaje desde Firestore
  obtenerDetallesViaje(viajeId: string) {
    this.firestore.collection('viajes').doc(viajeId).valueChanges().subscribe(data => {
      console.log('Datos del viaje:', data); // Verificar los datos del viaje
      if (data) {
        this.start = (data as any).inicio;
        this.end = (data as any).fin;
      }
    });
  }

  // Función para abrir la cámara y escanear el código QR
  async openCamera() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanner-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensFacing: LensFacing.Back
      }
    });

    await modal.present();

    // Después de leer el QR
    const { data } = await modal.onDidDismiss();

    if (data?.barcode?.displayValue) {
      this.qrValue = data.barcode.displayValue;  // El valor del QR es el ID del viaje
      this.unirseAViaje(this.qrValue);  // Pasamos el ID del viaje al método de unirse
    }
  }

  // Función para manejar el envío del código QR manual
  onSubmitManualQR() {
    if (this.manualQR) {
      this.qrValue = this.manualQR; // Asignamos el valor manual al qrValue (ID del viaje)
      this.unirseAViaje(this.qrValue); // Procedemos con el viaje con el QR ingresado
    } else {
      console.error('Por favor ingresa un código QR válido');
    }
  }

  // Función para unirse al viaje
  unirseAViaje(viajeId: string) {
    if (!this.usuarioId) {
      Swal.fire({
        icon: 'warning',
        title: 'Usuario no identificado',
        text: 'No se ha encontrado el usuario logueado. Intenta nuevamente.',
        heightAuto: false,
      });
      return;
    }

    if (!this.qrValue) {
      Swal.fire({
        icon: 'warning',
        title: 'Código QR vacío',
        text: 'Por favor ingresa o escanea un código QR válido.',
        heightAuto: false,
      });
      return;
    }

    this.firestore.collection('viajes').doc(viajeId).get().subscribe(doc => {
      const viaje = doc.data() as Viaje;
      if (viaje) {
        if (viaje.asientosDisponibles > 0) {
          // Verificamos si el usuario ya está inscrito
          if (!viaje.usuariosInscritos.includes(this.usuarioId)) {
            viaje.usuariosInscritos.push(this.usuarioId); // Agregar al usuario a la lista de inscritos
            viaje.asientosDisponibles--; // Reducir los asientos disponibles

            // Actualizamos el viaje en Firestore
            this.firestore.collection('viajes').doc(viajeId).update({
              usuariosInscritos: viaje.usuariosInscritos,
              asientosDisponibles: viaje.asientosDisponibles
            }).then(() => {
              Swal.fire({
                icon: 'success',
                title: '¡Unido al viaje!',
                text: 'Te has unido con éxito al viaje.',
                heightAuto: false,
              });
              this.router.navigate(['/uprofile']); // Redirigir al perfil
            }).catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error al unirse al viaje',
                text: 'Hubo un problema al actualizar el viaje. Intenta nuevamente.',
                heightAuto: false,
              });
              console.error('Error al unirse al viaje:', error);
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Ya estás inscrito',
              text: 'Ya estás inscrito en este viaje.',
              heightAuto: false,
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Viaje lleno',
            text: 'No hay asientos disponibles en este viaje.',
            heightAuto: false,
          });
        }
      }
    });
  }
}
