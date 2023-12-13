// Importación de módulos y componentes requeridos
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular'; // Importa el componente de alerta de Ionic
import { Animation, createAnimation } from '@ionic/angular'; // Importa la animación de Ionic
import { ApiService } from '../services/api.service'; // Importa el servicio para realizar llamadas a la API
import { usuario } from '../modelo/usuario'; // Importa el modelo de usuario
import { Router } from '@angular/router'; // Importa el enrutador de Angular

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})

export class RestablecerPage {
  private typeuser!: usuario;

  // Definición de variables y formulario
  textBtn = "INGRESAR";
  textUser = "Usuario";
  desUser = "Ingrese usuario";
  usuario = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  });

  // Función para buscar un usuario
  searchUser() {
    try {
      // Realiza una llamada a la API para restablecer la contraseña
      this.consumoapi.restablecer(this.usuario.value.username!).subscribe(
        (response) => {
          // Maneja la respuesta de la API
          this.typeuser = response.body as unknown as usuario;
          if (response.status == 200) {
            console.log('Estado: ',true, 'Codigo: ', response.status);

            this.presentAlertCorrect();
            this.usuario.reset(); // Limpia el formulario
          } else {
            // Respuesta no es 200, muestra una alerta de error
            console.log('Estado: ', false, 'Codigo: ',response.status);
            this.presentAlert();
            this.animateInput('nombre');
          }
        },
        (error) => {
          console.error('Correo ingresado no existe: ', error);
          this.presentAlert(); // Muestra una alerta de error en caso de error
          this.animateInput('nombre');
        });
    } catch (error) {
      console.error('Correo ingresado no existe: ', error);
      this.presentAlert(); // Muestra una alerta de error en caso de error
      this.animateInput('nombre');
    }
  }
  
  // Función para mostrar una alerta de error
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error Restablecer',
      subHeader: 'Información:',
      message: 'Usuario ingresado no existe',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  // Función para mostrar una alerta de éxito al restablecer la contraseña
  async presentAlertCorrect() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      subHeader: 'Información:',
      message: 'Se le enviará un correo para restablecer contraseña, revise su bandeja de entrada.',
      buttons: ['Aceptar'],
    });
    await alert.present();
    this.router.navigate(['/login']);
  }

  // Constructor para inicializar servicios y dependencias
  constructor(private router: Router, private consumoapi: ApiService, private alertController: AlertController) {}

  // Método ejecutado en la inicialización de la página
  ngOnInit() {}

  // Función para animar un campo de entrada
  animateInput(elementId: string) {
    const inputEl = document.getElementById(elementId)!;
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

    // Limpia el campo después de la animación
    this.usuario.reset();
  }

  // redirectToVerificationPage() {
  //   this.router.navigate(['/cambiopass']); // Ajusta según tu configuración de rutas
  // }
}
