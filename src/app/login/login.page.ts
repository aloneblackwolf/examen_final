import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { usuario } from '../modelo/usuario';
import { perfil } from '../modelo/perfil';
import { AuthGuard } from '../guard/auth.guard';
import { ApiService } from '../services/api.service';
import { Animation, createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  private typeuser!: usuario;

  textBtn = "INGRESAR";
  textUser = "Usuario";
  textPass = "Contraseña";
  desUser = "ingrese usuario";
  desPass = "ingrese contraseña";
  usuario = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
    password: new FormControl('',[Validators.required, Validators.minLength(5),Validators.maxLength(30)]),
  });

  apiLogin() {
    try {
      this.consumoapi.login(this.usuario.value.username!, this.usuario.value.password!).subscribe(
        (response) => {
          this.typeuser = response.body as unknown as usuario;
          console.log("{Usuario Autenticado, Codigo: " + response.status +"}");
          if (response.status == 200) {
            let setData: NavigationExtras = {
              state: {
                id: this.typeuser.id,
                user: this.typeuser.user,
                correo: this.typeuser.correo,
                nombre: this.typeuser.nombre,
                tipoPerfil: this.typeuser.tipoPerfil,
                carrera: this.typeuser.carrera
              }
            };
  
  
            if (this.typeuser.tipoPerfil === 1) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/home'], setData);
            }
  
            if (this.typeuser.tipoPerfil === 2) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/home-alumno'], setData);
            }
          } else {
            // Respuesta no es 200
            this.presentAlert();
            this.animateInput('nombre');
            this.animateInput('contrasena');
          }
        },
        (error) => {
          console.error('Error en inicio de sesión:', error);
          this.presentAlert(); 
          // Mostrar el mensaje de alerta en caso de error
          this.animateInput('nombre');
          this.animateInput('contrasena');
          
        });
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      this.presentAlert(); // Mostrar el mensaje de alerta en caso de error
    
      this.animateInput('nombre');
      this.animateInput('contrasena');
    }
  }

  
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Información:',
      message: 'Usuario o contraseña son incorrectos',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
  


  constructor(private router: Router, private auth:AuthGuard, private consumoapi:ApiService, private alertController :AlertController) {}

  ngOnInit() {}


  animateInput(elementId: string) {
    const inputEl = document.getElementById(elementId)!;
    console.log(inputEl);
  
    const inputAnimation: Animation = createAnimation()
      .addElement(inputEl)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'translateX(0)' },
        { offset: 0.2, transform: 'translateX(-7%)' },
        { offset: 0.5, transform: 'translateX(0)' },
        { offset: 0.7, transform: 'translateX(7%)' },
        { offset: 1, transform: 'translateX(0)' },
      ]);
  
    inputAnimation.play();
  
    // Restablece los valores de los campos del formulario a vacío después de la animación
    this.usuario.reset();
  }
  


}

