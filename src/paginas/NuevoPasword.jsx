import { useState, useEffect } from "react"
import { useParams,Link } from 'react-router-dom'
import Alerta from "../components/Alerta"
import ClienteAxios from "../config/axios"


const NuevoPasword = () => {


  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido,setTokenvalido] = useState(false)
  const [cuentaconfirmada,setCuentaConfirmada] = useState(false)

  //useparams() nos da el token de la url
  const params = useParams()
  const { token } = params



    //useEffect se ejecutara cuando el componente se cargue

    useEffect(() => {

      const comprobarToken = async () => {
        try {

          await ClienteAxios(`/veterinarios/olvide-password/${token}`)
          setAlerta({
            msg: 'Coloca tu Nuevo Password'
          })

          setTokenvalido(true)

        } catch (error) {
          setAlerta({
            msg: 'hubo un error con el enlace',
            error: true
          })
        }
      }

      comprobarToken()
      //cuando le ponemos los corchetes al final[] le estamos diciendo que se ejecute una sola vez
    }, [])

const handlesSubmit = async (e) =>{
e.preventDefault();


if(password.length < 6){
  setAlerta({msg: 'el password debe de ser de 6 o mas caracteres',error:true}
  )
  return
}

try {

  const url = `/veterinarios/olvide-password/${token}`
  const { data } = await ClienteAxios.post(url,{password});
  

  setAlerta({
    msg: data.msg
  })
  setCuentaConfirmada(true)
} catch (error) {
  setAlerta({
    msg:error.response.data.msg,
    error: true
  })
}

}


  

  const { msg } = alerta


  return (
    <>

      <div >
        <h1 className=" text-teal-600 font-black text-6xl ">Restablece tu password y no pierdas los datos de
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className=' mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

      {msg && <Alerta
        alerta={alerta}
      />}

{tokenValido && (
  <>
  <form onSubmit={handlesSubmit} >
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">password</label>
          <input type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
          />
        </div>

        <input type="submit"
          value="Cambiar contrasena"
          className="  my-0 mx-auto bg-teal-600 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10 " />
      </form>
{cuentaconfirmada &&(
  <Link to="/" className=" block text-center my-5 text-gray-500 "> iniciar sesion</Link>
)}

</>
)}
      
      </div>
    </>
  )
}

export default NuevoPasword
