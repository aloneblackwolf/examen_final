import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage {

  userData: any;

  constructor(private activeroute: ActivatedRoute, private router: Router, private auth: AuthGuard) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userData = this.router.getCurrentNavigation()?.extras.state;
      }
    });
  }


  logout(): void {
    // Establece la autenticación en falso
    this.auth.setAuthenticationStatus(false);
    console.log("Logout Exitoso");
    

    // Navega a la página de inicio
    this.router.navigate(['/login']);
  }

}
