import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

// Página para cambiar la contraseña
const CambiarContrasena = () => {
    // Estado para guardar la nueva contraseña
    const [nuevaContrasena, setNuevaContrasena] = useState('');

    // Estado para confirmar la nueva contraseña
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    return (
        <div>
            {/* Título temporal para verificar que la página funciona */}
            <h1>Cambiar Contraseña</h1>
        </div>
    );
};

// Exportamos la página
export default CambiarContrasena;