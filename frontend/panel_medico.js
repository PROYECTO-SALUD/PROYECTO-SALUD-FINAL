// panel_medico.js (REEMPLAZA TODO POR ESTO)

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formulario-horario");
    const input = document.querySelector("#nuevoHorario");
    const lista = document.querySelector(".lista-horarios");

    const API = "http://localhost:3000/horarios";
    const medico = "Dr. Juan Pérez";

    // =========================
    // CARGAR HORARIOS
    // =========================
    async function cargarHorarios() {
        try {
            const res = await fetch(`${API}?medico=${encodeURIComponent(medico)}`);
            const data = await res.json();

            lista.innerHTML = "";

            data.forEach(item => {
                const li = document.createElement("li");

                li.innerHTML = `
                    Hora: ${item.hora} | Fecha: ${item.fecha}
                    <button onclick="eliminarHorario(${item.id})">X</button>
                `;

                lista.appendChild(li);
            });

        } catch (error) {
            console.error("Error cargando horarios:", error);
        }
    }

    cargarHorarios();

    // =========================
    // GUARDAR HORARIO
    // =========================
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const hora = input.value;
        const fecha = new Date().toISOString().split("T")[0];

        if (!hora) {
            alert("Selecciona una hora primero");
            return;
        }

        try {
            await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hora: hora,
                    fecha: fecha,
                    medico: medico
                })
            });

            input.value = "";
            cargarHorarios();

        } catch (error) {
            console.error("Error enviando horario:", error);
        }
    });

    // =========================
    // ELIMINAR HORARIO
    // =========================
    window.eliminarHorario = async (id) => {
        try {
            await fetch(`${API}/${id}`, {
                method: "DELETE"
            });

            cargarHorarios();

        } catch (error) {
            console.error("Error eliminando:", error);
        }
    };

});