import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';  
import { GeoPoint } from '@angular/fire/firestore';

@Component({
  selector: 'app-editar-viaje',
  templateUrl: './editar-viaje.page.html',
  styleUrls: ['./editar-viaje.page.scss'],
})
export class EditarViajePage implements OnInit {
  id: string = '';
  editViajeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private location: Location  
  ) {
    this.editViajeForm = this.formBuilder.group({
      nombreInicio: ['', [Validators.required]],
      nombreFin: ['', [Validators.required]],
      inicio: [[], [Validators.required]],
      fin: [[], [Validators.required]],
      asientosDisponibles: [0, [Validators.required, Validators.min(0)]],
      usuariosInscritos: [[], []],
      conductorId: ['', [Validators.required]],
      estado: ['activo', [Validators.required]]
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.cargarData();
  }

  cargarData() {
    this.firestore.collection('viajes').doc(this.id).get().toPromise()
      .then((viaje) => {
        if (viaje) {
          const ViajeData = viaje?.data() as Viaje;
          this.editViajeForm.patchValue({
            nombreInicio: ViajeData.nombreInicio,
            nombreFin: ViajeData.nombreFin,
            inicio: [ViajeData.inicio.latitude, ViajeData.inicio.longitude],
            fin: [ViajeData.fin.latitude, ViajeData.fin.longitude],
            asientosDisponibles: ViajeData.asientosDisponibles,
            usuariosInscritos: ViajeData.usuariosInscritos,
            conductorId: ViajeData.conductorId,
            estado: ViajeData.estado
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cargar los datos del viaje.',
          footer: `Detalles: ${error.message}`,
          heightAuto:false,
        });
      });
  }

  async updateViaje() {
    if (this.editViajeForm.valid) {
      const formValue = this.editViajeForm.value;
      const updatedViaje: Partial<Viaje> = {
        nombreInicio: formValue.nombreInicio,
        nombreFin: formValue.nombreFin,
        inicio: new GeoPoint(formValue.inicio[0], formValue.inicio[1]),
        fin: new GeoPoint(formValue.fin[0], formValue.fin[1]),
        asientosDisponibles: formValue.asientosDisponibles,
        usuariosInscritos: formValue.usuariosInscritos,
        conductorId: formValue.conductorId,
        estado: formValue.estado
      };

      await this.firestore.collection('viajes').doc(this.id).update(updatedViaje)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: 'Los datos del viaje se han actualizado correctamente.',
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
            text: 'Hubo un problema al actualizar los datos del viaje.',
            footer: `Detalles: ${error.message}`,
            heightAuto:false,
          });
        });
    }
  }
}
