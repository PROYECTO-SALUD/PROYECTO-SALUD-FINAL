import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import Login from './pages/usuario/Login';
import Registro from './pages/usuario/Registro';

// Creamos componentes rapidos para probar que las rutas funcionen
const AdminPanel = () => <div className='p-5'><h1>Panel de Administracion</h1><p>Bienvenido dueño del centro medico.</p></div>;
const MedicoPanel = () => <div className='p-5'><h1>Panel del Medico</h1><p>Ver Citas e Historias Clinicas.</p></div>;
const PacientePanel = () => <div className='p-5'><h1>Panel del Paciente</h1><p>Aqui se agendaran citas medicas.</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTA 1: El inicio. Todo el que llegue entra por el Login */}
        <Route path='/' element={<Login />} />

        {/* RUTA 2: El Login oficial */}
        <Route path='/login' element={<Login />} />

        {/* RUTA 3: La oficina del Administrador */}
        <Route path='/admin' element={<AdminPanel />} />

        {/* RUTA 4: El consultorio del Medico */}
        <Route path='/medico' element={<MedicoPanel />} />

        {/* RUTA: La sala de espera del Paciente*/}
        <Route path='/paciente' element={<PacientePanel />} />

        {/* RUTA: Registro Usuario*/}
        <Route path='/registro' element={<Registro />} />

        {/* Siempre debe ir al final. REGLA DE SEGURIDAD: Si alguien escribe una ruta que no existe, lo mandamos al Login */}
        <Route path='*' element={<Navigate to='/login' />} />


      </Routes>
    </Router>
  );
}

export default App;