import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userValue: string = '';
  emailValue: string = '';
  passValue: string = '';
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['User', Validators.required],
      username: ['', Validators.required], // Agregar campo de nombre de usuario
    });
  }

  ngOnInit() {}

  async register() {
    try {
      const usuario = await this.authService.register(
        this.emailValue,
        this.passValue
      );
      const userCreado = usuario.user;

      if (userCreado) {
        await this.firestore.collection('usuarios').doc(userCreado.uid).set({
          uid: userCreado.uid,
          email: userCreado.email,
          pass: this.passValue,
          tipo: this.userValue,
          nombre: this.loginForm.value.username,
        });

        await this.authService.logout();

        let timerInterval: any;
        Swal.fire({
          title: 'Cargando...',
          html: 'Creando usuario',
          timer: 1500,
          timerProgressBar: true,
          heightAuto: false,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup()!.querySelector('b');
            timerInterval = setInterval(() => {
              timer!.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: 'Exito!',
              text: 'Usuario registrado correctamente',
              icon: 'success',
              confirmButtonText: 'OK',
              heightAuto: false,
            }).then(() => {
              // Redirigir al login
              this.router.navigate(['/login']);
            });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'No se puede registrar el usuario',
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
    }
  }

  async registerMultipleUsers() {
    try {
      Swal.fire({
        title: 'Cargando...',
        html: 'Registrando múltiples usuarios',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        heightAuto: false,
      });

      const response = await fetch('https://randomuser.me/api/?results=2');
      const data = await response.json();
      const users = data.results;
  
      for (const [index, user] of users.entries()) {
        const userType = index < 1 ? 'Driver' : 'User';
        const domain = userType === 'Driver' ? 'conductor.cl' : 'alumno.cl';
        const email = `${user.name.first}.${user.name.last}@${domain}`;
        const password = 'password123';

        const usuario = await this.authService.register(email, password);
        const userCreado = usuario.user;

        if (userCreado) {
          await this.firestore.collection('usuarios').doc(userCreado.uid).set({
            uid: userCreado.uid,
            email: userCreado.email,
            pass: password,
            tipo: userType,
            nombre: `${user.name.first} ${user.name.last}`,
            img: user.picture.large,
          });
          await this.authService.logout();
          console.log(`Usuario creado: ${userCreado.email}, Tipo: ${userType}`);
        }
      }
      Swal.close();
      Swal.fire({
        title: 'Éxito!',
        text: 'Usuarios registrados correctamente',
        icon: 'success',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: 'Error!',
        text: 'No se pudieron registrar los usuarios',
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false,
      });
    }
  }
}
