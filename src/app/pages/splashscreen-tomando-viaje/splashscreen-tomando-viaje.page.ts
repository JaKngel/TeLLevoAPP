import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen-tomando-viaje',
  templateUrl: './splashscreen-tomando-viaje.page.html',
  styleUrls: ['./splashscreen-tomando-viaje.page.scss'],
})
export class SplashscreenTomandoViajePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/viaje-en-curso']);
    }, 2000); // Espera 2 segundos antes de redirigir
  }
}