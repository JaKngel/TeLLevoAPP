import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Viaje } from 'src/app/interfaces/viaje';
import { GeoPoint } from '@angular/fire/firestore';


declare var MapboxGeocoder: any;

@Component({
  selector: 'app-ddestino',
  templateUrl: './ddestino.page.html',
  styleUrls: ['./ddestino.page.scss'],
})
export class DdestinoPage implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/navigation-night-v1';
  start: [number, number] | null = null;
  end: [number, number] | null = null;
  startMarker?: mapboxgl.Marker;
  endMarker?: mapboxgl.Marker;
  routeLayer: mapboxgl.Layer | undefined;
  showCreateTripButton: boolean = false;
  availableSeats: number = 1; // Nueva propiedad para los asientos disponibles
  startName: string | null = null;
  endName: string | null = null;

  constructor(
    private router: Router, 
    private http: HttpClient,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    if (!this.map) {
      setTimeout(() => this.buildMap(), 500);
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'map',
      style: this.style,
      center: [-70.578693, -33.598618],
      zoom: 16,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    const geocoderStart = new MapboxGeocoder({
      accessToken: environment.mapboxKey,
      mapboxgl: mapboxgl,
      placeholder: 'Buscar lugar de inicio...',
      zoom: 14,
      proximity: { longitude: -70.578693, latitude: -33.598618 },
    });

    const geocoderEnd = new MapboxGeocoder({
      accessToken: environment.mapboxKey,
      mapboxgl: mapboxgl,
      placeholder: 'Buscar lugar de destino...',
      zoom: 14,
      proximity: { longitude: -70.578693, latitude: -33.598618 },
    });

    this.map.addControl(geocoderStart, 'top-left');
    this.map.addControl(geocoderEnd, 'bottom-left');

    geocoderStart.on('result', (e: any) => {
      const coords = e.result.geometry.coordinates as [number, number];
      this.startName = e.result.text; // Guardar el nombre del lugar de inicio
      this.updateStart(coords);
    });

    geocoderEnd.on('result', (e: any) => {
      const coords = e.result.geometry.coordinates as [number, number];
      this.endName = e.result.text; // Guardar el nombre del lugar de destino
      this.updateEnd(coords);
    });
  }

  updateStart(coords: [number, number]) {
    this.start = coords;
    if (this.startMarker) this.startMarker.remove();
    this.startMarker = new mapboxgl.Marker({ color: 'green' })
      .setLngLat(coords)
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Inicio</h3>'))
      .addTo(this.map);
    this.updateRoute();
  }

  updateEnd(coords: [number, number]) {
    this.end = coords;
    if (this.endMarker) this.endMarker.remove();
    this.endMarker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat(coords)
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Destino</h3>'))
      .addTo(this.map);
    this.updateRoute();
  }

  updateRoute() {
    if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer.id);
      this.map.removeSource(this.routeLayer.id);
    }

    if (this.start && this.end) {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.start[0]},${this.start[1]};${this.end[0]},${this.end[1]}?geometries=geojson&access_token=${environment.mapboxKey}`;

      this.http.get(url).subscribe((data: any) => {
        const route = data.routes[0].geometry;

        this.map.addSource('route', {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: route },
        });
        this.routeLayer = {
          id: 'route',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        };

        this.map.addLayer(this.routeLayer as mapboxgl.AnyLayer);
        this.showCreateTripButton = true;
      });
    }
  }

  async createTrip() {
    if (!this.start || !this.end) {
      console.error('Start or end coordinates are missing');
      return;
    }
  
    const nuevoDestino: Viaje = {
      id: '',
      inicio: new GeoPoint(this.start[1], this.start[0]),
      nombreInicio: this.startName || '', // Asignar el nombre del lugar de inicio
      fin: new GeoPoint(this.end[1], this.end[0]),
      nombreFin: this.endName || '', // Asignar el nombre del lugar de destino
      conductorId: '',
      asientosDisponibles: this.availableSeats, 
      usuariosInscritos: [],
      estado: 'activo',
    };
  
    const user = await this.afAuth.currentUser;
    if (!user) {
      console.error('User not authenticated');
      return;
    }
  
    nuevoDestino.conductorId = user.uid;
  
    try {
      const docRef = await this.firestore.collection('viajes').add(nuevoDestino);
      nuevoDestino.id = docRef.id;  // Asignar el ID generado por Firestore al objeto
    
      // Actualizar el documento con el ID correcto
      await this.firestore.collection('viajes').doc(docRef.id).update({ id: docRef.id });
    
      console.log('Viaje creado:', nuevoDestino);
    
      // Redirigir a la página /viajecreado/ID del viaje usando la misma lógica de tu ejemplo
      this.router.navigate(['/viajecreado', docRef.id]);  // Usamos el ID como parte de la ruta
    } catch (error) {
      console.error('Error al crear el viaje: ', error);
    }

  }
}