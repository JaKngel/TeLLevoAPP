import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor(
    private router: Router,
    private authServices: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.validarLogin();
    }, 2000); 
  }
  
  async validarLogin() {
    this.authServices.isLogged().subscribe(async (user) => {
      if (user) {
        try {
          // Intentar verificar con la huella digital
          await this.checkHuellaDigital();
  
          // Obtener datos del usuario
          const usuario = await this.firestore.collection('usuarios').doc(user.uid).get().toPromise();
          const userData = usuario?.data() as Usuario;
  
          // Redirigir según el tipo de usuario
          if (userData.tipo === 'User') {
            this.router.navigate(['/uprofile']);
          } else if (userData.tipo === 'Driver') {
            this.router.navigate(['/dprofile']);
          } else {
            this.router.navigate(['/aprofile']);
          }
        } catch (error) {
          console.error('Error durante la autenticación biométrica:', error);
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  
  async checkHuellaDigital() {
    try {
      await NativeBiometric.verifyIdentity({
        reason: 'Por favor, autentícate para continuar',
        title: 'Autenticación Biométrica',
        subtitle: 'Usa tu huella digital o Face ID',
        description: 'Coloca tu huella en el sensor para ingresar.',
      });
    } catch (error) {
      console.error('Error en la autenticación biométrica:', error);
      throw error;
    }
  }
}