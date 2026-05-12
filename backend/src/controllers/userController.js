const User = require('../models/userModel');
// 1. Login / Buscar por email
loginUser = async (req, res) => {
    try {
        const { correo } = req.body;
        const user = await User.findByEmail(correo);
        if (!correo) {
            return res.status(404).json({ mensaje: "El correo es obligatorio" });
        }
        if (user.length === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(user[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor al buscar usuario" });
    }
};

// 2. Recuperar contraseña / Validar si el correo existe
recuperarContrasena = async (req, res) => {
    try {
        // Obtenemos el correo que llega desde el frontend
        const { correo } = req.body;

        // Validamos que el correo no venga vacío
        if (!correo) {
            return res.status(400).json({ mensaje: "El correo es obligatorio" });
        }

        // Buscamos el usuario por correo
        const user = await User.findByEmail(correo);

        // Si no existe ningún usuario con ese correo
        if (user.length === 0) {
            return res.status(404).json({ mensaje: "El correo no está registrado" });
        }


    // Si el correo existe, generamos un código aleatorio de 6 dígitos
        const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000);
        
        // Por ahora lo mostramos en consola para probar
        console.log("Código de recuperación:", codigoRecuperacion);
        // Guardamos el código en la base de datos
        await User.guardarCodigoRecuperacion(correo, codigoRecuperacion);
        
        // Si el correo existe, respondemos correctamente
        return res.status(200).json({
            mensaje: "Correo encontrado. Código generado correctamente.",
            codigo: codigoRecuperacion
        });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor al recuperar contraseña" });
    }
};

// 3.Obtener los usuarios (GET)
        getAllUser = async (req, res) => {
            try {
                const users = await User.findAll();
                res.json(users);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error al obtener la lista de usuarios" });
        }
;}
        
    
// 4. Crear usuario (POST)
 createUser = async (req, res) => {
    try {
        const id = await User.create(req.body);
        res.status(201).json({ mensaje: "Usuario creado con exito", id_usuario: id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};

// 5. Actualizar usuario (PUT)
 updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.update(id, req.body);
        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
     } catch (error) {
        res.status(500).json({ error: error.message });
     }
};
// 4. Eliminar usuario (DELETE)
 deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.delete(id);
        res.json({ mensje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6.Validar código de recuperación
validarCodigoRecuperacion = async (req, res) => {
    try {
        // Obtenemos el código enviado desde el frontend
        const { codigo } = req.body;

        // Validamos que el código no venga vacío
        if (!codigo) {
            return res.status(400).json({ mensaje: "El código es obligatorio" });
        }

        // Buscamos si existe un usuario con ese código
        const user = await User.findByCodigoRecuperacion(codigo);

        // Si no existe ningún usuario con ese código
        if (!user) {
            return res.status(404).json({ mensaje: "Código inválido o vencido" });
        }

        // Si el código existe
        return res.status(200).json({
            mensaje: "Código validado correctamente"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error en el servidor al validar el código" });
    }
};

// Exportacion para las rutas
module.exports = {
    loginUser,
    recuperarContrasena,
    validarCodigoRecuperacion,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
};



