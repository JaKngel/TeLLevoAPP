import { GeoPoint } from '@angular/fire/firestore';

export interface Viaje {
  id: string;
  nombreInicio: string; 
  nombreFin: string; 
  inicio: GeoPoint;  
  fin: GeoPoint;         
  asientosDisponibles: number;   
  usuariosInscritos: string[];   
  conductorId: string;
  estado: 'activo' | 'terminado' | 'cancelado';
}
