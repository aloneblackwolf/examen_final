import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../modelo/usuario';
import { alumnos } from '../modelo/alumnos';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Definición de opciones HTTP comunes para las solicitudes
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) }

  // URL base de la API a la que se realizarán las solicitudes
  url: string = 'http://127.0.0.1:5000/';

  //url: string = 'https://t6qpsftq-5000.brs.devtunnels.ms/';
  // Método para iniciar sesión
  public login(usuario: string, pass: string): Observable<HttpResponse<usuario>> {
    // Crea un objeto 'body' con los datos de usuario y contraseña
    const body = {
      user: usuario,
      password: pass
    };

    // Realiza una solicitud POST a la ruta 'login' de la API
    // Se espera una respuesta que se deserializará como un objeto 'usuario'
    return this.http.post<usuario>(this.url + "login", body, { ...this.httpOptions, observe: 'response' });
  }


  public restablecer(usuario: string): Observable<HttpResponse<usuario>> {
    // Crea un objeto 'body' con los datos de usuario
    const body = {
      user: usuario
    };

    // Realiza una solicitud POST a la ruta 'login' de la API
    // Se espera una respuesta que se deserializará como un objeto 'usuario'
    return this.http.post<usuario>(this.url + "restablecer", body, { ...this.httpOptions, observe: 'response' });
  }

  /// Obtener cursos
  public obtenerCursosPorProfesor(profesorId: number): Observable<any> {
    return this.http.get<any>(this.url + 'profesores/' + profesorId + '/cursos', this.httpOptions);
  }

  //Obtener alumnos por curso
  public obtenerAlumnosPorCurso(profesorId: number, cursoId: number): Observable<alumnos[]> {
    return this.http.get<alumnos[]>(this.url + 'profesores/' + profesorId + '/cursos/' + cursoId + '/alumnos', this.httpOptions);
  }

  // Método para actualizar la contraseña
  public actualizarPassword(username: string, nuevaPassword: string): Observable<any> {
    // Crea un objeto 'body' con el nombre de usuario y la nueva contraseña
    const body = {
      username: username,
      nueva_password: nuevaPassword
    };

    // Realiza una solicitud PUT a la ruta 'usuarios/actualizar-password' de la API
    // No se espera un cuerpo de respuesta específico
    return this.http.put<any>(this.url + 'usuarios/actualizar-password', body, this.httpOptions);
  }

  public registrarAsistencia(body: any): Observable<any> {
    return this.http.post<any>(this.url + 'registrar_asistencia', body, this.httpOptions);
  }
  

   // Se define una variable de tipo HttpClient
  constructor(private http: HttpClient) {
  }

  
}

