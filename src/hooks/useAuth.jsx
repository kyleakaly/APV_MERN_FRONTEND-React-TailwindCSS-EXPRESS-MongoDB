//con useContext podemos extraer los datos y necesitamos importar el context a identificar
import {useContext} from 'react'
import AuthContext from '../context/authProvider'

const useAuth = () =>{
    //hacer disponibles los valores de los provider
return useContext(AuthContext)
}

export default useAuth