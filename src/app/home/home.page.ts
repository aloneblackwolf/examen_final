import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras  } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  userHome: any;
  pass: any;
  userData: any;
  idProfesor : any;
  cursos: any[] = [];


  constructor(private activeroute: ActivatedRoute, private router: Router, private auth: AuthGuard, private apiService : ApiService) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userData = this.router.getCurrentNavigation()?.extras.state;
        this.userHome = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.idProfesor = this.router.getCurrentNavigation()?.extras.state?.['id'];
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

  verDetalleCurso(cursoId: number) {
    let setData: NavigationExtras = {
      state: {
        idProfesor: this.idProfesor,
        idCurso : cursoId     
      },
      
    };
    // console.log(setData);
    
    this.router.navigate(['/detallecurso'],setData);
}


  ngOnInit() {
    this.apiService.obtenerCursosPorProfesor(this.idProfesor).subscribe(data => {
      this.cursos = data;
      console.log(this.cursos);
    });
  }

  
}
