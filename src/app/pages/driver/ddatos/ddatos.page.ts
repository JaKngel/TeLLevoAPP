import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-ddatos',
  templateUrl: './ddatos.page.html',
  styleUrls: ['./ddatos.page.scss'],
})
export class DdatosPage implements OnInit {
  userForm: FormGroup;
  selectedImage: File | null = null;
  userId?: string;

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      placaVehiculo: ['', [Validators.required]],
      tipoVehiculo: ['', [Validators.required]],
      img: [''],
    });
  }

  ngOnInit() {
    this.verifyUser();
  }

  verifyUser() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadUserData();
      } else {
        console.log('No hay usuario logueado');
      }
    });
  }

  loadUserData() {
    this.firestore
      .collection('usuarios')
      .doc(this.userId)
      .get()
      .toPromise()
      .then((user) => {
        if (user?.exists) {
          const userData = user.data() as Usuario;
          this.userForm.patchValue({
            nombre: userData.nombre,
            apellido: userData.apellido,
            telefono: userData.telefono,
            placaVehiculo: userData.placaVehiculo,
            tipoVehiculo: userData.tipoVehiculo,
            img: userData.img,
          });
        }
      })
      .catch((error) => {
        this.showAlert(
          'error',
          'Error',
          'Error al cargar los datos del usuario.',
          error.message
        );
      });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  async updateUser() {
    if (this.selectedImage) {
      const filePath = `usuarios/${new Date().getTime()}_${
        this.selectedImage.name
      }`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.userForm.patchValue({ img: url });
              this.saveUserData();
            });
          })
        )
        .subscribe();
    } else {
      this.saveUserData();
    }
  }

  saveUserData() {
    if (this.userId) {
      const updatedData = this.userForm.value;
      Object.keys(updatedData).forEach((key) => {
        if (!updatedData[key]) {
          delete updatedData[key];
        }
      });

      this.firestore
        .collection('usuarios')
        .doc(this.userId)
        .update(updatedData)
        .then(() => {
          this.showAlert(
            'success',
            'Actualización exitosa',
            'Datos actualizados correctamente.',
            '',
            2000
          );
        })
        .catch((error) => {
          this.showAlert(
            'error',
            'Error al actualizar',
            'Hubo un problema al actualizar los datos.',
            error.message
          );
        });
    } else {
      this.showAlert('error', 'Error', 'No se pudo obtener el ID del usuario.');
    }
  }

  private showAlert(
    icon: any,
    title: string,
    text: string,
    footer: string = '',
    timer: number = 0
  ) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      footer: footer,
      timer: timer,
      showConfirmButton: timer === 0,
      heightAuto: false,
    });
  }
}