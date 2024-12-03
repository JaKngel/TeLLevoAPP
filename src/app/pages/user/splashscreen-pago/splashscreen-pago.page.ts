import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen-pago',
  templateUrl: './splashscreen-pago.page.html',
  styleUrls: ['./splashscreen-pago.page.scss'],
})
export class SplashscreenPagoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['uqr']);
    }, 2000); 
  }

}
