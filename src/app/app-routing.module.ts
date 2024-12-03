import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splashscreen',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./pages/auth/splashscreen/splashscreen.module').then(m => m.SplashscreenPageModule)
  },
  {
    path: 'splashscreen-driver',
    loadChildren: () => import('./pages/user/splashscreen-driver/splashscreen-driver.module').then(m => m.SplashscreenDriverPageModule)
  },
  {
    path: 'splashscreen-pago',
    loadChildren: () => import('./pages/user/splashscreen-pago/splashscreen-pago.module').then(m => m.SplashscreenPagoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/auth/recovery/recovery.module').then(m => m.RecoveryPageModule)
  },
  {
    path: 'uprofile',
    loadChildren: () => import('./pages/user/uprofile/uprofile.module').then(m => m.UprofilePageModule)
  },
  {
    path: 'umap',
    loadChildren: () => import('./pages/user/umap/umap.module').then(m => m.UmapPageModule)
  },
  {
    path: 'aprofile',
    loadChildren: () => import('./pages/admin/aprofile/aprofile.module').then(m => m.AprofilePageModule)
  },
  {
    path: 'uaccount',
    loadChildren: () => import('./pages/user/uaccount/uaccount.module').then(m => m.UaccountPageModule)
  },
  {
    path: 'uzonas',
    loadChildren: () => import('./pages/user/uzonas/uzonas.module').then(m => m.UzonasPageModule)
  },
  {
    path: 'qr-code-generado',
    loadChildren: () => import('./pages/qr-code-generado/qr-code-generado.module').then(m => m.QrCodeGeneradoPageModule)
  },
  {
    path: 'splashscreen-tomando-viaje',
    loadChildren: () => import('./pages/splashscreen-tomando-viaje/splashscreen-tomando-viaje.module').then(m => m.SplashscreenTomandoViajePageModule)
  },
  {
    path: 'viaje-en-curso:/viajeId',
    loadChildren: () => import('./pages/user/viaje-en-curso/viaje-en-curso.module').then(m => m.ViajeEnCursoPageModule)
  },
  {
    path: 'viajecreadou/:id',
    loadChildren: () => import('./pages/user/viajecreadou/viajecreadou.module').then( m => m.ViajecreadouPageModule)
  },
  {
    path: 'viajee:/id',
    loadChildren: () => import('./pages/user/viajee/viajee.module').then( m => m.ViajeePageModule)
  },
  {
    path: 'editar-usuario/:uid',
    loadChildren: () => import('./pages/admin/editar-usuario/editar-usuario.module').then(m => m.EditarUsuarioPageModule)
  },
  {
    path: 'daccount',
    loadChildren: () => import('./pages/driver/daccount/daccount.module').then(m => m.DaccountPageModule)
  },
  {
    path: 'ddestino',
    loadChildren: () => import('./pages/driver/ddestino/ddestino.module').then(m => m.DdestinoPageModule)
  },
  {
    path: 'dprofile',
    loadChildren: () => import('./pages/driver/dprofile/dprofile.module').then(m => m.DprofilePageModule)
  },
  {
    path: 'viajecreado/:id',
    loadChildren: () => import('./pages/viajecreado/viajecreado.module').then(m => m.ViajecreadoPageModule)
  },
  {
    path: 'udatos',
    loadChildren: () => import('./pages/user/udatos/udatos.module').then(m => m.UdatosPageModule)
  },
  {
    path: 'viaje-en-curso',
    loadChildren: () => import('./pages/user/viaje-en-curso/viaje-en-curso.module').then(m => m.ViajeEnCursoPageModule)
  },
  {
    path: 'ddatos',
    loadChildren: () => import('./pages/driver/ddatos/ddatos.module').then(m => m.DdatosPageModule)
  },
  {
    path: 'editar-viaje/:id',
    loadChildren: () => import('./pages/admin/editar-viaje/editar-viaje.module').then( m => m.EditarViajePageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/admin//users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/admin/viajes/viajes.module').then( m => m.ViajesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}