import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import ClienteAxios from '../config/axios'
const OlvidarPassword = () => {

  const [email, setEmail] = useState('');
  const [alerta,setAlerta] = useState({});

  const handleSubmit = async (e) => {

    e.preventDefault()
    if(email === '' || email.length < 6){
      setAlerta({msg: 'El Email es obligatorio', error:true})
       setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    try {

      const{data} = await ClienteAxios.post('/veterinarios/olvide-password', {email})
     

      setAlerta({msg: data.msg})


    } catch (error) {
      setAlerta({msg:error.response.data.msg, error : true})

     
    }
  }

  const{msg} = alerta

  return (
    <>

<div >
        <h1 className=" text-teal-600 font-black text-6xl ">restablece tu cuenta de
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

<div className=' mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

{ msg && <Alerta
        alerta={alerta}
        />}
        <form
        onSubmit = {handleSubmit}
        >

        <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input type="email"
              placeholder="Introduce tu Email "
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input type="submit"
            value="Restablecer contrasena"
            className="  my-0 mx-auto bg-teal-600 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10 " />

          </form>

          <nav className=" mt-10 lg:flex lg:justify-between">
        <Link to="/" className=" block text-center my-5 text-gray-500 "> tienes cuenta iniciar sesion</Link>
        <Link to="/registrar" className=" block text-center my-5 text-gray-500 ">no tienes cuenta registrarme</Link>
      </nav>

          </div>


  
    </>
  )
}

export default OlvidarPassword