import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';  

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  uid: string = '';
  editUserForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private location: Location  
  ) {
    this.editUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      img: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('uid') as string;
    this.cargarData();
  }

  cargarData() {
    this.firestore.collection('usuarios').doc(this.uid).get().toPromise()
      .then((user) => {
        if (user) {
          const userData = user?.data() as Usuario;
          this.editUserForm.patchValue({
            email: userData.email,
            nombre: userData.nombre,
            tipo: userData.tipo,
            img: userData.img
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cargar los datos del usuario.',
          footer: `Detalles: ${error.message}`
        });
      });
  }

  async updateUser() {
    if (this.editUserForm.valid) {
      await this.firestore.collection('usuarios').doc(this.uid).update(this.editUserForm.value)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'Los datos del usuario se han actualizado correctamente.',
            timer: 2000,
            showConfirmButton: false,
            heightAuto:false,
          }).then(() => {
            this.location.back();  
          });
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Hubo un problema al actualizar los datos del usuario.',
            footer: `Detalles: ${error.message}`
          });
        });
    }
  }
}
