import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiopass',
  templateUrl: './cambiopass.page.html',
  styleUrls: ['./cambiopass.page.scss'],
})
export class CambiopassPage {
  textNewPass = "Nueva Pass:";
  textUser = "Usuario: ";
  desUsuario = "Ingrese usuario";
  textConfirmPass = "Confirme Pass";
  desUser = "Ingrese Contraseña";
  desPass = "Confirme Contraseña";

  verificationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
  });

  actualizarContrasena() {
    // Obtener valores del formulario
    const username = this.verificationForm.get('username')?.value as string;
    const newPassword = this.verificationForm.get('newPassword')?.value as string;
    const confirmPassword = this.verificationForm.get('confirmPassword')?.value as string;


    // Validar longitud de las contraseñas
  if (!this.validarLongitudContrasena(newPassword) || !this.validarLongitudContrasena(confirmPassword)) {
    // Mostrar mensaje de error si la longitud no es válida
    this.presentAlert('Error', 'El largo de la contraseña no es válido. Debe tener entre 6 y 12 caracteres.');
    // Limpiar campos
    this.verificationForm.get('newPassword')?.setValue('');
    this.verificationForm.get('confirmPassword')?.setValue('');
    return;
  }
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      // Contraseñas no coinciden
      this.presentAlert('Error', 'Las contraseñas ingresadas no coinciden');
      // Limpiar campos
      this.verificationForm.get('newPassword')?.setValue('');
      this.verificationForm.get('confirmPassword')?.setValue('');
      return;
    }


    // Llamar al servicio para actualizar la contraseña solo si las contraseñas coinciden
  this.consumoapi.actualizarPassword(username, newPassword).subscribe(
    (response) => {
      // Contraseña actualizada correctamente
      console.log('Accion Exitosa: ', 'Código: 200');


      this.presentAlert('Acción Exitosa', 'Cambio de contraseña realizado correctamente..');

      // Redirigir al login
      this.router.navigate(['/login']);
    },
    (error) => {
      // Mostrar mensaje de error en caso de cualquier problema
      console.error('Error al actualizar contraseña', error);
      this.presentAlert('Error', 'El usuario ingresado no existe en los registros...');
    }
  );

  }

  // Función para presentar alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  // Función para validar la longitud de la contraseña
private validarLongitudContrasena(contrasena: string): boolean {
  const longitudMinima = 6;
  const longitudMaxima = 12;
  return contrasena.length >= longitudMinima && contrasena.length <= longitudMaxima;
}

  constructor(
    private consumoapi: ApiService,
    private alertController: AlertController,
    private router: Router
  ) {}
}
