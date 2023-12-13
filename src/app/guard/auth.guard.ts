import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  // Método para establecer el estado de autenticación
  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  // Método canActivate para controlar el acceso a rutas protegidas
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verificar si el usuario está autenticado
    if (this.isAuthenticated) {
      return true; // Usuario autenticado, permitir el acceso.
    } else {
      // Usuario no autenticado, redirigir a la página de inicio de sesión.
      return this.router.createUrlTree(['/login']);
    }
  }
}

