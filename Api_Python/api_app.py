from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import string
import smtplib
from email.mime.text import MIMEText


app = Flask(__name__)
CORS(app)


usuarios = [
    {
        "id": 1,
        "user": "nicolas",
        "password": "nico1234",
        "nombre": "Nicolas Muñoz",
        "perfil":  1,
        "correo": "nica.munoz@profesor.duoc.cl",
        "carrera": "Ingeniería en Informática"
    },
    {
        "id": 2,
        "user": "francisco",
        "password": "franci1234",
        "nombre": "Francisco Riquelme Pérez",
        "perfil":  2,
        "correo": "franci.riquelmep@duocuc.cl",
        "carrera": "Ingeniería en Informática"
    },
    {
        "id": 3,
        "user": "samira",
        "password": "sami1234",
        "nombre": "Samira Awad",
        "perfil":  2,
        "correo": "sa.awad@duocuc.cl",
        "carrera": "Ingeniería en Informática"
    },
    {
        "id": 4,
        "user": "ficticio",
        "password": "ficti1234",
        "nombre": "Ficticio Persona",
        "perfil":  2,
        "correo": "ficticio.pe@duocuc.cl",
        "carrera": "Ingeniería en Informática"
    },
]

alumnos = [
    {
        "id": 1,
        "nombre": "Samira Awad",
        "carrera": "Ingeniería en Informática",
        "asignaturas": [
            {
                "id": 1,
                "nombre": "Matemáticas",
                "codigo": "MAT1587",
                "seccion": "013V",
                "profesor": "Cristian Calderon",
            },
            {
                "id": 2,
                "nombre": "Programación App Móviles",
                "codigo": "PGY4121",
                "seccion": "015V",
                "profesor": "Nicolas Muñoz",
            },
            {
                "id": 3,
                "nombre": "Arquitectura",
                "codigo": "ASY4131",
                "seccion": "018V",
                "profesor": "Bastián Silva",
            }
        ]
    },
    {
        "id": 2,
        "nombre": "Francisco Riquelme",
        "carrera": "Ingeniería en Informática",
        "asignaturas": [
            {
                "id": 1,
                "nombre": "Arquitectura",
                "codigo": "ASY4131",
                "seccion": "018V",
                "profesor": "Bastián Silva",
                
            },
            {
                "id": 2,
                "nombre": "Programación App Móviles",
                "codigo": "PGY4121",
                "seccion": "015V",
                "profesor": "Nicolas Muñoz",
            }
        ]
    }
]


profesores = [
    {
        "id": 1,
        "nombre": "nicolas",
        "cursos": [
            {
                "id": 1,
                "nombre": "Matemáticas",
                "codigo": "MAT1587",
                "seccion": "013V",
                "alumnos": [
                    {"id": 2, "nombre": "Francisco Riquelme", "status": 0},
                    {"id": 3, "nombre": "Samira Awad", "status": 0},
                    {"id": 4, "nombre": "María Rios", "status": 0},
                    {"id": 5, "nombre": "Andres Pérez", "status": 0}
                ]
            },
            {
                "id": 2,
                "nombre": "Programación App Móviles",
                "codigo": "PGY4121",
                "seccion": "015V",
                "alumnos": [
                    {"id": 2, "nombre": "Francisco Riquelme", "status": 0},
                    {"id": 3, "nombre": "Samira Awad", "status": 0},
                    
                ]
            },
            {
                "id": 3,
                "nombre": "Arquitectura",
                "codigo": "ASY4131",
                "seccion": "018V",
                "alumnos": [
                    {"id": 3, "nombre": "Samira Awad", "status": 0},
                    {"id": 4, "nombre": "Ficticio Persona", "status": 0},
                    {"id": 2, "nombre": "María Rios", "status": 0}
                ]
            }
        ]
    }
]


def enviar_correo(usuario):
    load_dotenv()
    servidor_correo = 'smtp.gmail.com'
    puerto = 587
    remitente = os.getenv('MAIL_USER')
    clave_correo = os.getenv('MAIL_PASSWORD')

    msg = MIMEMultipart()
    msg['Subject'] = 'Restablecimiento de Contraseña'
    msg['From'] = remitente
    msg['To'] = usuario["correo"]

    with open('index.html', 'r') as archivo:
        html = archivo.read()

    # Reemplaza variables en el HTML
    html = html.replace('{{ usuario }}', f'{usuario["user"]}')
    msg.attach(MIMEText(html, 'html'))

    # Configuración del servidor de correo y envío
    server = smtplib.SMTP(servidor_correo, puerto)
    server.starttls()
    server.login(remitente, clave_correo)

    server.sendmail(remitente, usuario["correo"], msg.as_string())
    server.quit()

@app.route('/restablecer', methods=['POST'])
def restablecer():
    data = request.get_json()
    username = data.get('user')

    usuario = next((u for u in usuarios if u["user"] == username), None)

    if usuario:
        enviar_correo(usuario)
        return jsonify({'mensaje': 'Correo de restablecimiento enviado correctamente'})
    else:
        return jsonify({'error': 'Usuario no encontrado'}), 401
    
    
    

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('user')
    password = request.json.get('password')
    
    usuario = next((u for u in usuarios if u["user"] == username and u["password"] == password), None)
    
    if usuario:
        return jsonify({
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "user": usuario["user"],
            "correo": usuario["correo"],
            "tipoPerfil": usuario["perfil"],
            "carrera": usuario["carrera"]
        }), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401


@app.route('/profesores', methods=['GET'])
def obtener_profesores():
    return jsonify(profesores), 200

@app.route('/profesores/<int:profesor_id>/cursos', methods=['GET'])
def obtener_cursos_profesor(profesor_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    return jsonify(profesor["cursos"]), 200

@app.route('/profesores/<int:profesor_id>/cursos/<int:curso_id>/alumnos', methods=['GET'])
def obtener_alumnos_curso(profesor_id, curso_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    curso = next((c for c in profesor["cursos"] if c["id"] == curso_id), None)
    if not curso:
        return jsonify({"message": "Curso no encontrado"}), 404
    return jsonify(curso["alumnos"]), 200


@app.route('/usuarios/actualizar-password', methods=['PUT'])
def actualizar_password():
    data = request.get_json()
    username = data.get('username')
    nueva_password = data.get('nueva_password')

    usuario = next((u for u in usuarios if u["user"] == username), None)

    if usuario:
        # Actualizar la contraseña del usuario
        usuario['password'] = nueva_password
        return jsonify({'mensaje': 'Contraseña actualizada correctamente'}), 200
    else:
        # Si el usuario no existe, devolver un código de error
        abort(404, description='Usuario no encontrado')
        


@app.route('/registrar_asistencia', methods=['POST'])
def registrar_asistencia():
    alumno_id = request.json.get('alumno_id')
    codigo = request.json.get('codigo')
    seccion = request.json.get('seccion')
    fecha = request.json.get('fecha')
    for profesor in profesores:
        for curso in profesor["cursos"]:
            if curso["codigo"] == codigo and curso["seccion"] == seccion:
                for alumno in curso["alumnos"]:
                    if alumno["id"] == alumno_id:
                        alumno["status"] = 1  # 1 es para presente
                        return jsonify({"message": "Asistencia registrada"}), 200

    return jsonify({"message": "No se pudo registrar la asistencia"}), 400


if __name__ == '__main__':
    app.run(debug=True)
