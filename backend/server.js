const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

// ================= MYSQL =================
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "agendar_citas"
});

conexion.connect(err => {
  if (err) return console.error("Error MySQL:", err);
  console.log("✅ Conectado a MySQL");
});

// ================= LOGIN =================
app.post("/login", (req, res) => {

    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";

    conexion.query(sql, [correo, password], (err, results) => {

        if (err) {
            console.error(err);
            return res.json({ mensaje: "Error en el servidor" });
        }

        if (results.length > 0) {

            const usuario = results[0];

            res.json({
                mensaje: "Login exitoso",
                rol: usuario.rol_id
            });

        } else {
            res.json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

    });

});

// ================= REGISTRO =================
app.post("/registrar-usuario", async (req, res) => {

  const { nombres, apellidos, correo, telefono, password, rol_id } = req.body;

  const hash = await bcrypt.hash(password, 10);

  conexion.query(
    "INSERT INTO usuarios (rol_id,nombres,apellidos,correo,telefono,password_hash,estado) VALUES (?,?,?,?,?,?,?)",
    [rol_id || 2, nombres, apellidos, correo, telefono, hash, "ACTIVO"],
    (err) => {
      if (err) return res.send("Error registro");
      res.send("Usuario registrado");
    }
  );
});

// ================= CITAS =================
app.post("/guardar-cita", (req, res) => {

  const {
    paciente_id,
    medico_id,
    especialidad_id,
    fecha,
    hora_inicio,
    hora_fin,
    estado,
    motivo,
    creado_por
  } = req.body;

  const sql = `
    INSERT INTO citas 
    (paciente_id, medico_id, especialidad_id, fecha, hora_inicio, hora_fin, estado, motivo, creado_por)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexion.query(sql, [
    paciente_id,
    medico_id,
    especialidad_id,
    fecha,
    hora_inicio,
    hora_fin,
    estado || "CONFIRMADA",
    motivo,
    creado_por
  ], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).send("Error al guardar cita");
    }

    res.send("Cita guardada correctamente");
  });
});

// ================= OBTENER CITAS =================
app.get("/citas", (req, res) => {

  conexion.query("SELECT * FROM citas", (err, results) => {
    if (err) return res.status(500).send("Error");
    res.json(results);
  });
});

// ================= SERVIDOR =================
app.listen(3001, () => {
  console.log("🚀 API en http://localhost:3001");
});