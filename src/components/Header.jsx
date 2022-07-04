import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const {cerrarSesion} = useAuth()
  return (
    <header className=" py-10 bg-teal-600">
        <div className=" container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className=" text-center font-bold text-2xl text-teal-100">Administrador de Pacientes de  {''}
        <span className=" text-white">Veterinaria</span>
        </h1>

        <nav className=' flex flex-col md:flex-row gap-4 mt-4 md:mt-0'>
<Link to='/admin' className=' text-white text-center text-m mr-2 uppercase font-bold '>Pacientes</Link>
<Link to='/admin/perfil' className=' text-white text-center text-m ml-2 font-bold uppercase'>Perfil</Link>

<button onClick={cerrarSesion} type='button' className='text-white text-center text-m ml-2 font-bold uppercase'>Cerrar sesion</button>
        </nav>
        </div>
    </header>
  )
}

export default Header