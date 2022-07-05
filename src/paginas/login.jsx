import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import Alerta from "../components/Alerta"
import ClienteAxios from '../config/axios'


const Login = () => {

  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const [alerta,setAlerta] =useState({})

  const{setAuth} = useAuth()

  //hook que utilizamos para que podamos redireccionar al usuario
const navigate = useNavigate()


const handleSubmit = async (e) =>{
  e.preventDefault();

  if([email,password].includes('')){
    setAlerta({msg: 'todos los campos son obligatorios', error:true})
    return
  }

  try {

    const {data} = await ClienteAxios.post('/veterinarios/login',{email,password})
    localStorage.setItem('token', data.token)
    setAuth(data) 
    navigate('/admin')
    
  } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error:true
    })
  }

}

const {msg} = alerta

  return (
    <>

   
    <div >
      <h1 className=" text-teal-600 font-black text-6xl ">Inicia Sesion y Administra tus  
      <span className="text-black"> Pacientes</span>
     </h1>
     </div>
    <div className=' mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
    { msg && <Alerta
        alerta={alerta}
        />}

      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
          <input type="email" 
          value={email}
          onChange={ e => setEmail(e.target.value)}
          placeholder="Email de registro"
className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
          />
        </div>

        <div className="my-5">
          <label  className="uppercase text-gray-600 block text-xl font-bold">Password</label>
          <input type="password" 
          value={password}
          onChange = {e=>setPassword(e.target.value)}
          placeholder="tu password"
        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
          />
        </div>
        <input type="submit"
        value="Iniciar Sesion"
        className="  bg-teal-600 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-teal-500 md:w-auto px-10" />
        

      </form>
      <nav className=" mt-10 lg:flex lg:justify-between">
        <Link to="/registrar" className=" block text-center my-5 text-gray-500 "> No Tienes una cuenta gistrate</Link>
        <Link to="/OlvidarPassword" className=" block text-center my-5 text-gray-500 ">Olvidaste tu contrasena</Link>
      </nav>
    </div>
 
    </>
  )
}

export default Login
