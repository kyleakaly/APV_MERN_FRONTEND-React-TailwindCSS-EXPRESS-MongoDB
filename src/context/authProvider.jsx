//authProvider basicamente es donde viene todo el estado global de la aplicacion
//create contenxt nos permitira  crear de forma global el estado en diferenetes liugares de la aplicacion
import {useState,useEffect,createContext} from 'react'
import ClienteAxios from '../config/axios'

const AuthContext = createContext()

//crearemos un componente que tendra como hizo todos los componenetes de nuestra app
//para saber que lo que esta en capsulado en el provider son hijos de el existe un props reservado y especial que se 
//llama children podemos hacer un destructurin o hacerlodirrectamente
//const {childreb} = props o ({children})
const AuthProvider = ({children}) =>{

    const [cargando,setCargando] = useState(true)
const [auth,setAuth] = useState({})


useEffect(()=>{
    const autenticarUsuario = async () =>{
        const token = localStorage.getItem('token')
if(!token) {
    setCargando(false)
    return
}

const config = {
    //los headers se envian antes de toda la peticion y es la autorizacion
    headers: {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
    }
}

try {
    const {data} = await ClienteAxios('/veterinarios/perfil', config)
    setAuth(data)
} catch (error) {
    console.log(error.response.data.msg)
    setAuth({})
}

setCargando(false)

}
    autenticarUsuario()
},[])

const cerrarSesion = () =>{
    localStorage.removeItem('token')
    setAuth({})
}

const actualizarPerfil = async (datos) =>{
    const token = localStorage.getItem('token')
    if(!token) {
        setCargando(false)
        return
    }
    
    const config = {
        //los headers se envian antes de toda la peticion y es la autorizacion
        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    }

    try {
        const url = `/veterinarios/perfil/${datos._id}`
        const {data} = await ClienteAxios.put(url,datos,config)

        return{
            msg: 'Almacenado Correctamente'
        }

    } catch (error) {
     return {
        msg: error.response.data.msg,
        error: true
     }
    }

}

    const guardarPassword = async (datos) =>{

        const token = localStorage.getItem('token')
    if(!token) {
        setCargando(false)
        return
    }
    
    const config = {
        //los headers se envian antes de toda la peticion y es la autorizacion
        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    }

    try {

        const url = '/veterinarios/actualizar-password'
        const {data} = await ClienteAxios.put(url,datos,config)
      

        return {
            msg: data.msg
        }
        
    } catch (error) {
       
            return{
                msg:error.response.data.msg,
                error:true
            }
          
    }

    }

    return(
        //authprovider retornara el context
        <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            actualizarPerfil,
            guardarPassword
        }}
        >

            {children}

        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext
