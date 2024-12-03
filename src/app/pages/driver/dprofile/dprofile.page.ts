import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje'; // Importamos la interfaz Viaje
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-dprofile',
  templateUrl: './dprofile.page.html',
  styleUrls: ['./dprofile.page.scss'],
})
export class DprofilePage implements OnInit {
  driverData: Usuario | undefined; 
  loading: boolean = true;
  trips: Viaje[] = []; 
  viajeActivo: Viaje | null = null; 
  
  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadDriverData();
  }

  loadDriverData() {
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        // Cargar los datos del chofer
        this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe((data) => {
          this.driverData = data as Usuario;
          this.loading = false; 
        });

        // Cargar los viajes del chofer, filtrando por el conductorId
        this.firestore.collection('viajes', ref => ref.where('conductorId', '==', user.uid))
          .valueChanges()
          .subscribe((trips) => {
            this.trips = trips as Viaje[];
            this.checkViajeActivo();  // Comprobar si tiene un viaje activo
          });
      } else {
        this.loading = false; 
      }
    });
  }

  checkViajeActivo() {
    const viajeActivo = this.trips.find(viaje => viaje.estado === 'activo');
    if (viajeActivo) {
      this.viajeActivo = viajeActivo; // Cargar el viaje activo en la variable
    } else {
      this.viajeActivo = null; // No hay viajes activos
    }
  }
  

  // Método para cerrar sesión
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            await this.authService.logout();
            await this.clearBiometricData();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  // Limpiar los datos biométricos al cerrar sesión
  async clearBiometricData() {
    try {
      await NativeBiometric.deleteCredentials({ server: 'login' });
    } catch (error) {
      console.error('Error al eliminar los datos biométricos:', error);
    }
  }
}
