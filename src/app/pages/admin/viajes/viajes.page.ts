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
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  driverData: Usuario | undefined; 
  loading: boolean = true;
  trips: any[] = [];

  usuarios: any[] = []; 
  viajes: any[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.config();
  }



  async config(){
    await this.firestore.collection('viajes').valueChanges().subscribe(viaje => {
      this.viajes = viaje;
    });
  }

  editarViaje(id:string) {
    this.router.navigate(['/editar-viaje',id]);
  }

}

