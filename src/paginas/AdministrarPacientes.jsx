import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario,setMostrarFormulario] = useState(false)
  return (
    <div className="flex justify-evenly flex-col md:flex-row">
      <button type="button" className=" bg-teal-600 text-white font-bold uppercase p-3 rounded-md mx-10 mb-10
      md:hidden"
      onClick={()=>{
       return setMostrarFormulario(!mostrarFormulario)
      }}> {mostrarFormulario ?  'ocultar formulario' : 'mostrar formulario'}</button>
      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block  md:w-1/2 lg:w-2/5`} >
        <Formulario/>
      </div>

      <div>
        <ListadoPacientes/>
      </div>
    </div>
  );
};

export default AdministrarPacientes;
