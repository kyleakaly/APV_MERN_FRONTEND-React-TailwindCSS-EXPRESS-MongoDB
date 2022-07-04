import { Link } from "react-router-dom"
//definir el state
import { useState } from "react"
import Alerta from "../components/alerta"
import ClienteAxios from "../config/axios"

const Registrar = () => {

  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repetirPassword,setrepetirPassword] = useState('')
  const [alerta,setAlerta] = useState({})

  const handleSubmit = async (e) =>{
e.preventDefault();
//validar formulario en el frontend
//forma sencilla de validar formulario
if([nombre,email,password,repetirPassword].includes('')){
setAlerta({msg:'hay campos vacios', error : true})
sacarelmensaje()
return
}

if(password !== repetirPassword){
  setAlerta({msg:'las contrasenas no son iguales', error : true})
  sacarelmensaje()
return
}

if(password.length < 6){
  setAlerta({msg:'el password es muy corto', error : true})
  sacarelmensaje()
  return
}

 function sacarelmensaje() {
  setTimeout(() => {
    setAlerta({}) 
  }, 3000);
} 

// crear el usuario en la api

try {
  await ClienteAxios.post('/veterinarios', {nombre,email,password})
setAlerta({
  msg: 'revisa tu email' , error: false
})

sacarelmensaje()

} catch (error) {
  setAlerta({
    msg: error.response.data.msg,
    error:true,

  })
  sacarelmensaje()
}


  }

  const {msg} = alerta

  return (
    <>
      <div >
        <h1 className=" text-teal-600 font-black text-6xl ">Crea Tu Cuenta y Administra
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className=' mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        
      { msg && <Alerta
        alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">nombre</label>
            <input type="text" value={nombre}
              onChange={ e => setNombre(e.target.value)}
              placeholder="Nombre "
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              
            />
          </div>

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
            <label className="uppercase text-gray-600 block text-xl font-bold">password</label>
            <input type="password"
            value={password}
            onChange={ e => setPassword(e.target.value)}
              placeholder="Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
            <input type="password"
            value={repetirPassword}
            onChange={ e => setrepetirPassword(e.target.value)}
              placeholder="Repetir Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>

          <input type="submit"
            value="Iniciar Sesion"
            className="  my-0 mx-auto bg-teal-600 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10 " />


        </form>

        <nav className=" mt-10 lg:flex lg:justify-between">
        <Link to="/" className=" block text-center my-5 text-gray-500 "> tienes cuenta iniciar sesion</Link>
        <Link to="/OlvidarPassword" className=" block text-center my-5 text-gray-500 ">Olvidaste tu contrasena</Link>
      </nav>

      </div>

    </>
  )
}

export default Registrar