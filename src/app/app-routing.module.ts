import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./home-alumno/home-alumno.module').then( m => m.HomeAlumnoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then( m => m.RestablecerPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./errors/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'detallecurso',
    loadChildren: () => import('./detallecurso/detallecurso.module').then( m => m.DetallecursoPageModule),
  },
  {
    path: 'cambiopass',
    loadChildren: () => import('./cambiopass/cambiopass.module').then( m => m.CambiopassPageModule)
  },
  {
    path: 'scanner-qr',
    loadChildren: () => import('./scanner-qr/scanner-qr.module').then( m => m.ScannerQrPageModule)
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  },
  
 
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
