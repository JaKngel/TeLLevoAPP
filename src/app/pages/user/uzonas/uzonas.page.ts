import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-uzonas',
  templateUrl: './uzonas.page.html',
  styleUrls: ['./uzonas.page.scss'],
})
export class UzonasPage implements OnInit {
  destinos: Viaje[] = []; // Lista de viajes activos

  constructor(private router: Router, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerDestinosActivos();
  }

  // Obtener los destinos activos
  obtenerDestinosActivos() {
    this.firestore
      .collection<Viaje>('viajes', (ref) => ref.where('estado', '==', 'activo'))
      .valueChanges({ idField: 'id' }) // Incluye el ID del documento
      .subscribe(
        (data) => {
          this.destinos = data;
        },
        (error) => {
          console.error('Error al cargar los destinos:', error);
        }
      );
  }

  // Método para unirse a un viaje
  tomarViaje(destino: Viaje) {
    // Verificar si el viaje tiene asientos disponibles
    if (destino.asientosDisponibles <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Viaje lleno',
        text: 'No hay asientos disponibles en este viaje.',
        heightAuto: false,
      });
      return;
    }

    // Redirigir a la página de viaje en curso, pasando el viajeId y las coordenadas como parámetros
    this.router.navigate(['/viaje-en-curso'], {
      queryParams: {
        viajeId: destino.id, 
      },
    });
  }
}
