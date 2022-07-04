//con useContext podemos extraer los datos y necesitamos importar el context a identificar
import {useContext} from 'react'
import PacientesContext from '../context/PacientesProvider'

const usePacientes = () =>{
    //hacer disponibles los valores de los provider
return useContext(PacientesContext)
}

export default usePacientes