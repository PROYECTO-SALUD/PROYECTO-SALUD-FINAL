// ================== NAVEGACIÓN ==================
function irCitas(){
    window.location.href = "citas.html";
}
function logout(){
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}


// ================== LOGIN (SIN BACKEND) ==================
function login(){

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    if(!correo || !password){
        alert("Completa todos los campos");
        return;
    }

    let rol = 2;

    if(correo === "admin@gmail.com"){
        rol = 1;
    } else if(correo === "doctor@gmail.com"){
        rol = 3;
    }

    localStorage.setItem("usuario", JSON.stringify({
        correo,
        rol
    }));

    if(rol == 1){
        window.location.href = "panel_administracion.html";
    } 
    else if(rol == 2){
        window.location.href = "menu.html";
    } 
    else {
        window.location.href = "panel_medico.html";
    }
}


// ================== REGISTRO ==================
function registrar(){

    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;

    if(!nombres || !apellidos || !correo || !password){
        alert("Completa los campos obligatorios");
        return;
    }

    localStorage.setItem("usuario", JSON.stringify({
        correo,
        rol
    }));

    alert("Registro exitoso");

    window.location.href = "menu.html";
}


// ================== AGENDAR CITA ==================
function agendarCita(){

    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    if(!fecha || !hora){
        alert("Completa los campos");
        return;
    }

    localStorage.setItem("fecha", fecha);
    localStorage.setItem("hora", hora);

    alert("Cita agendada correctamente");

    window.location.href = "confirmacion.html";
}


// ================== CREAR CITA (ADMIN) ==================
function crearCita(e){
    e.preventDefault();

    const nombre = document.getElementById("nombrePaciente").value;
    const fecha = document.getElementById("fechaCita").value;
    const hora = document.getElementById("horaCita").value;
    const doctor = document.getElementById("doctorCita").value;
    const estado = document.getElementById("estadoCita").value;

    if(!nombre || !fecha || !hora || !doctor){
        alert("Completa todos los campos");
        return;
    }

    alert("Cita guardada correctamente");
    location.reload();
}


// ================== RECUPERAR ==================
function recuperar(){
    const correo = document.getElementById("correo").value;

    if(!correo){
        alert("Ingresa tu correo");
        return;
    }

    alert("Se envió un enlace de recuperación");
}


// ================== PANEL MÉDICO ==================
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formulario-horario");
    const input = document.querySelector("#nuevoHorario");
    const lista = document.querySelector(".lista-horarios");

    if(form && input && lista){

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const hora = input.value;

            if(!hora){
                alert("Selecciona un horario");
                return;
            }

            const li = document.createElement("li");
            li.textContent = hora;

            lista.appendChild(li);

            input.value = "";
        });
    }

});


// ================== MOSTRAR USUARIO ==================
document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if(usuario){
        const nombre = document.getElementById("nombreUsuario");
        if(nombre){
            nombre.textContent = usuario.correo;
        }
    }

});

// ==================== OJITO VER CONTRASEÑA ===============

function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.querySelector(".toggle-password");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
//===================FIN OJITO ocultar/ mostrar CONTRASEÑA ======================