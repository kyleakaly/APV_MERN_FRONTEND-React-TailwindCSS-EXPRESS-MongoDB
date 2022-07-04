//rutas publicas
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/authLayout'
import ConfirmarCuenta from './paginas/confirmarCuenta'
import Login from './paginas/login'
import NuevoPasword from './paginas/NuevoPasword'
import OlvidarPassword from './paginas/olvidarPassword'
import Registrar from './paginas/registrar'

import { AuthProvider } from './context/authProvider'
import { PacientesProvider } from './context/PacientesProvider'
//rutas protegidas

import AdministrarPacientes from './paginas/AdministrarPacientes'
import RutaProtegida from './layout/RutaProtegida'
import CambiarPassword from './paginas/CambiarPassword'
import EditarPefil from './paginas/EditarPefil'




function App() {

  //en vite es diferente que en node para escodenr una variable en node se usa process.env.nombredelavariable
  //intalando un paquete llamado dotenv

  //en vite es diferente se llama con import.meta.env.nombre de la variable
  //tambien en vite siempre que tengas variables de entorno tiene que iniciar con VITE_

  return (
    <BrowserRouter>

      {/* para que nuestro estado funcione globalmente tenemos que encapsular nuestros elementos */}
      <AuthProvider>
        <PacientesProvider>
        <Routes>
          {/* element sera la pagina principal si adentro de la ruta principal le pones raute puede crear
        fiferentes rauter y todas quedaran con esa ruta al inicio  */}

          <Route path='/' element={<AuthLayout />}>
            {/* index se encargara de decir este es el primer componente y el principal de la url  */}
            <Route index element={<Login />} />
            {/* path definimos las rutas url que se veran */}
            <Route path='Confirmar/:id' element={<ConfirmarCuenta />} />
            <Route path='OlvidarPassword' element={<OlvidarPassword />} />
            <Route path='OlvidarPassword/:token' element={<NuevoPasword />} />
            <Route path='registrar' element={<Registrar />} />
          </Route>


          <Route path="/admin" element={<RutaProtegida/>}>
          <Route index element={<AdministrarPacientes />} />
          <Route path='perfil' element={<EditarPefil/>} />
          <Route path='cambiar-password' element={<CambiarPassword/>} />


          </Route>



        </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
