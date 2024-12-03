import { Component } from '@angular/core';
import { Page } from './interfaces/page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: Page[] = [];
  public tipoUsuario?:string;
  public emailUsuario?:string;
  
  constructor() {}

  ngOnInit() {
    
  }

  configSideMenu() {
    if (this.tipoUsuario === 'admin') {
      this.appPages = [
        {title:'Dashboard',url:'/admin-dashboard',icon:'home'},
        {title:'Administración Usuarios',url:'/admin-users',icon:'people'},
        {title:'Cerrar Sesión',url:'/login',icon:'log-out'},
      ]
    } else if (this.tipoUsuario === 'usuario') {
      this.appPages = [
        {title:'Dashboard',url:'/user-dashboard',icon:'home'},
        {title:'Perfil',url:'/perfil',icon:'settings'},
        {title:'Cerrar Sesión',url:'/login',icon:'log-out'},
      ]
    } else {
      this.appPages = [
        {title:'Cerrar Sesion',url:'/login',icon:'log-in'},
      ]
    }
  }

}
