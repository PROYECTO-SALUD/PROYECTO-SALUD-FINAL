import  { useState } from 'react';
import { useNavigate } from 'react-router-dom'; //Sirve para cambiar de pagina desde codigo
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import  axios  from 'axios';
const Login = () => {
    const navigate = useNavigate(); //Prepara la funcion para enviar al usuario de Login a otra pagina
    // 1. Estados para guardar lo que el usuario escribe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        // Aqui se concta con el archivo usuarioApi.js mas adelante
        console.log("Intentando ingresar:", email, password);
        try {
            const respuesta = await axios.post('http://localhost:3000/api/usuario/login', {
                correo: email,
                password: password
            });
            if (respuesta.status === 200) {
                alert("¡Conexion exitosa: Bienvenido.");
            console.log("Respuesta:", respuesta.data);
            }
        } catch (error) {
            console.log("Error completo:", error.response?.data || error.message);
                alert("Error de conexion. Revisa el correo y la contraseña que esten en la base de datos.");
            }
        };
    

return (
    //Usamos PrimeFlex para centrar todo en la pantalla
    <div className= 'flex align-items-center justify-content-center'
    style={{
        backgroundImage: "url('/imagenes/fondo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0
    }}>
    <Card className='shadow-8' style={{ width: '22rem', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.92)' }}>
        <div className='flex flex-column align-items-center mb-4'>
            <img src='/imagenes/logo.png' alt='Logo Agenda Salud' style={{ width: '150px' }} />
            <h2 className='text-900 font-bold mt-3 mb-0'>BIENVENIDOS</h2>
            <p className='text-600 font-mediun'>Agenda Salud</p>
        </div>

        <form onSubmit={handleLogin} className='flex flex-column gap-3'>
            <div className='flex flex-column gap-2'>
                <label htmlFor='email' className='text-sm font-bold'>Correo Electronico</label>
                    <InputText
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='usuario @correo.com'
                    className='w-full'
                />
            </div>
            
            <div className='flex flex-column gap-2'>
                <label htmlFor='password'title='Contraseña' className='text-sm font-bold'>Contraseña</label>
                    <Password id='password' value={password} onChange={(e) => setPassword(e.target.value)}
                    toggleMask feedback={false} className='w-full' inputClassName='w-full p-inputtext-sm' 
                />
            </div>



            <div className='flex flex-column gap-2 mt-2'>
                <Button
                label='Ingresar'
                onClick={handleLogin} 
                className='w-full'
                style={{
                    background: 'linear-gradient(to right, #89cff0 0%, #b3e5fc 100%)',
                    border: ' none',
                    color: '#455a64',
                    fontWeight: 'bold'
                }}
            />

            <Button
                type="button"
                label='Registrarse' 
                onClick={() => navigate('/registro')} //Ruta de navegacion para pasar al registro
                className='w-full mt-2'
                style={{
                    background: ' linear-gradient(to right, #e1bee7 0%, #f3e5f5 100%)',
                    border: 'none',
                    color: '#455a64',
                    fontWeight: 'bold'
                }}
            />

            </div>
            <div className='text-center mt-2'>
                <a href='#' className='text-xs no-underline text-primary font-bold'>¿Olvidaste tu contraseña?</a>
            </div>
        </form>
    </Card>
    </div>
);
};

export default Login;