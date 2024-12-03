import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailValue?: string;
  passValue?: string;
  loginForm: FormGroup;
  userValue?: string;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  async login() {
    try {
      const email = this.emailValue;
      const pass = this.passValue;

      const usuarioLog = await this.authService.login(email as string, pass as string);

      if (usuarioLog.user) {
        await this.handleSuccessfulLogin(usuarioLog.user.uid);
      }
    } catch (error) {
      this.showError('Credenciales no válidas!');
    }
  }

  async loginWithGoogle() {
    try {
      const usuarioLog = await this.authService.loginWithGoogle();
  
      if (usuarioLog && usuarioLog.user) {
        const uid = usuarioLog.user.uid;
        await this.checkAndSetUser(uid, usuarioLog.user.email, usuarioLog.user.displayName);
        await this.handleSuccessfulLogin(uid);
      } else {
        throw new Error('Error al obtener el usuario de Google.');
      }
    } catch (error: any) {
      this.showError(error.message || 'Error desconocido.');
    }
  }
  
  async loginWithGithub() {
    try {
      const usuarioLog = await this.authService.loginWithGithub();
      if (usuarioLog && usuarioLog.user) {
        const uid = usuarioLog.user.uid;
        await this.checkAndSetUser(uid, usuarioLog.user.email, usuarioLog.user.displayName);
        await this.handleSuccessfulLogin(uid);
      } else {
        throw new Error('Error al obtener el usuario de GitHub.');
      }
    } catch (error: any) {
      this.showError(error.message || 'Error desconocido.');
    }
  }

  private async handleSuccessfulLogin(uid: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando......',
      duration: 2000
    });

    await loading.present();

    const usuario = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
    const userData = usuario?.data() as Usuario;

    await loading.dismiss();
    this.loginForm.reset();

    const navigationMap: { [key: string]: string } = {
      'User': '/uprofile',
      'Driver': '/dprofile',
      'Admin': '/aprofile'
    };

    this.router.navigate([navigationMap[userData.tipo] || '/aprofile']);
  }



  private async checkAndSetUser(uid: string, email: string | null, displayName: string | null) {
    const usuarioDoc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();

    if (usuarioDoc && !usuarioDoc.exists) {
      await this.firestore.collection('usuarios').doc(uid).set({
        uid: uid,
        email: email,
        tipo: this.userValue || 'User',
        nombre: displayName
      });
    } else {
      const userData = usuarioDoc?.data() as Usuario;

      if (!userData.tipo) {
        await this.firestore.collection('usuarios').doc(uid).update({
          tipo: this.userValue || 'User',
        });
      }
    }
  }

  private showError(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      heightAuto: false,
    });
  }
}