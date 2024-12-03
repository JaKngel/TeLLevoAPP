import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { NativeBiometric } from 'capacitor-native-biometric';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-aprofile',
  templateUrl: './aprofile.page.html',
  styleUrls: ['./aprofile.page.scss'],
})
export class AprofilePage implements OnInit {
  driverData: Usuario | undefined; 
  loading: boolean = true;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe((data) => {
          this.driverData = data as Usuario;
          this.loading = false; 
          });
        }
    });
  }

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

  async clearBiometricData() {
    try {
      await NativeBiometric.deleteCredentials({ server: 'login' });
    } catch (error) {
      console.error('Error al eliminar los datos biométricos:', error);
    }
  }


}

