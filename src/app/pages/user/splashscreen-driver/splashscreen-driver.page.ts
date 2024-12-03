import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen-driver',
  templateUrl: './splashscreen-driver.page.html',
  styleUrls: ['./splashscreen-driver.page.scss'],
})
export class SplashscreenDriverPage implements OnInit {
  start: string | null = null;
  end: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.start = params['start'];
      this.end = params['end'];
    });

    setTimeout(() => {
      this.router.navigate(['/viajecreado'], { queryParams: { start: this.start, end: this.end } });
    }, 2000); // Espera 2 segundos antes de redirigir
  }
}