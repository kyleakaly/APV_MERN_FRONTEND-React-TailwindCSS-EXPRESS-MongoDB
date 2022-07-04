import AdminNav from "../components/AdminNav";
import Alerta from "../components/alerta"
import { useState } from "react"
import useAuth from '../hooks/useAuth'



const CambiarPassword = () => {

  const {  guardarPassword } = useAuth()

  const eliminaralerta = () =>{
    setTimeout(() => {
      setAlerta({})
    }, 3000);
  }

  const [password,setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo : ''
  })
    
    const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()



    if(Object.values(password).some(campo => campo === '')) {

        setAlerta({
            msg:'los 2 campos son obligatorios',
            error:true
        })
        eliminaralerta()
       
        return
      }

      if(password.pwd_nuevo.length < 6){

        setAlerta({
          msg:'la nueva contrasena debe ser minimo de 6 caracteres',
          error:true
      })
      eliminaralerta()
     
      return

      }

     const respuesta = await  guardarPassword(password)

     setAlerta(respuesta)

     setInterval(() => {
      setAlerta({})
     }, 6000);


}

const { msg } = alerta

  return (
   <>
   <AdminNav/>
   <h2 className=" font-black text-3xl text-center mt-10">cambiar Password</h2>
    <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className=" text-teal-600 font-bold  "> Password aqui</span></p>

    <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 ">

                {msg && <Alerta alerta={alerta} />}

                    <form onSubmit={handleSubmit} >
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input type="password"
                                className="border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                                name="pwd_actual"
                                placeholder="Escribe tu password Actual"
                                onChange={ (e) => setPassword({
                                  ...password,
                                  [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3 mt-5">
                            <label className="uppercase font-bold text-gray-600">Password Nuevo </label>
                            <input type="password"
                                className="border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                                name="pwd_nuevo"
                                placeholder="Escribe tu password Nuevo"
                                onChange={ (e) => setPassword({
                                  ...password,
                                  [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        
                        <div className="my-3">
                            <input type="submit"
                                value="Actualizar password"
                                className=" cursor-pointer hover:bg-teal-800 bg-teal-600 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 " />
                        </div>
                    </form>
                </div>
            </div>

   </>
  )
};

export default CambiarPassword