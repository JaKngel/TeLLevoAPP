import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Viaje } from 'src/app/interfaces/viaje'; // Importamos la interfaz Viaje
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-uprofile',
  templateUrl: './uprofile.page.html',
  styleUrls: ['./uprofile.page.scss'],
})
export class UprofilePage implements OnInit {
  userData: any;
  loading: boolean = true; // Estado de carga
  viajes: Viaje[] = [];
  viajeActivo: Viaje | null = null;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        // Cargar los datos del usuario
        this.firestore.collection('usuarios').doc(user.uid).valueChanges().subscribe((data) => {
          this.userData = data;
        });

        // Cargar los viajes del usuario
        this.firestore.collection('viajes', ref => ref.where('usuariosInscritos', 'array-contains', user.uid))
          .valueChanges()
          .subscribe((trips) => {
            this.viajes = trips as Viaje[];
            this.checkViajeActivo();  // Verificar si tiene un viaje activo
            this.loading = false; // Cambiar el estado de carga a false después de obtener todos los datos
          });
      } else {
        this.loading = false; // Si no hay usuario, cambiar el estado de carga
      }
    });
  }

  checkViajeActivo() {
    const viajeActivo = this.viajes.find(viaje => viaje.estado === 'activo');
    if (viajeActivo) {
      this.viajeActivo = viajeActivo; // Si tiene un viaje activo, lo asignamos
    } else {
      this.viajeActivo = null; // Si no tiene viaje activo
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
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
