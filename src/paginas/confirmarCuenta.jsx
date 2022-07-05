// nos permite leer los parametros de la url useParams
import { useParams,Link } from "react-router-dom"
//useffect ejecuta un codigo una vez que el contenido este listo es como el domcontentloaded
import {useEffect, useState} from 'react'
import Alerta from "../components/Alerta"
//con axios podemos hacer peticiones a las url con nuestra api
import ClienteAxios from "../config/axios";


const ConfirmarCuenta = () => {

  
  const[cuentaConfirmada,setCuentaConfirmada] = useState(false)
  const[cargando,setCargando] = useState(true)
  const[alerta,SetAlerta] = useState({})

  const params = useParams();
 const {id} = params

 //siempre es un callback
 //como dependencia le ponemos un array vacio para que se ejecute 1 sola vez
 //utilizaremos axio una vez mas
useEffect(()=>{
const confirmarCuenta = async () =>{
  try {


//cuando queremos crear variables de entorno en vite necesitamos usar import.meta.env.VITE_nombrevariable
//en node con express instalamos dotenv y con process.env.nombrevariable
    //respuesta que nos dara siempre axios

    
    const {data} = await ClienteAxios(`/veterinarios/confirmar/${id}`)
    setCuentaConfirmada(true);
    SetAlerta({
      msg: data.msg,
      error:false
    })
    
  } catch (error) {
  SetAlerta({
    msg:error.response.data.msg,
    error:true
  })
  }
  setCargando(false)
}
confirmarCuenta()
},[])


  return (
    <>
   <div >
        <h1 className=" text-teal-600 font-black text-6xl ">Confirma tu cuenta y comienza a administrar tus clientes
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className=' mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        
    {!cargando && 
    <Alerta
      alerta={alerta}
      />}

      {cuentaConfirmada && (
         <Link to="/" className=" block text-center my-5 text-gray-500 "> Iniciar sesion</Link>
      )}
      </div>

    </>
  )
}

export default ConfirmarCuenta





