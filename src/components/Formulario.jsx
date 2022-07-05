import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [fecha, setFecha] = useState('')
  const [id,setId] = useState(null)

  const[alerta, setAlerta] = useState({})

  const { guardarPaciente, paciente } = usePacientes()

useEffect(()=>{
  if(paciente?.nombre){
    setNombre(paciente.nombre)
    setPropietario(paciente.propietario)
    setEmail(paciente.email)
    setSintomas(paciente.sintomas)
    setFecha(paciente.fecha)
    setId(paciente._id)
  }

},[paciente])

  const handleSubmit = (e) => {
    e.preventDefault()

    //validar el forulario
    if([nombre,propietario,email,fecha,sintomas].includes('')){
      setAlerta({
        msg: 'todos los campos son obligatorios',
        error:true
      })
      return
    }

  
    guardarPaciente({nombre,propietario,email,fecha,sintomas, id})
    setAlerta({
      msg: 'guardado correctamente'
    })
    setNombre('')
    setPropietario('')
    setEmail('')
    setSintomas('')
    setFecha('')
    setId('')



  }

  const {msg} = alerta

  return (
    <>
    <h2 className=" font-black text-3xl text-center">Administrador de Pacientes</h2>
      <p className="  text-xl mt-5 mb-8 text-center ">Anade tus pacientes  y {''}
          <span className=" text-teal-600 font-bold  text-center block">Administralos</span></p>


      <form onSubmit={handleSubmit} className=" bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" >
        <div className=" mb-5">
          <label htmlFor="nombre" className=" text-gray-700 uppercase font-bold"> Nombre de Mascota</label>

          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre de la mascota"
            className=" border-teal-500 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

        </div>

        <div className=" mb-5">
          <label htmlFor="propietario" className=" text-gray-700 uppercase font-bold"> Nombre del Propietario</label>

          <input
            id="propietario"
            type="text"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
            placeholder="Nombre de la mascota"
            className=" border-teal-500 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

        </div>

        <div className=" mb-5">
          <label htmlFor="email" className=" text-gray-700 uppercase font-bold"> Email</label>

          <input
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Nombre de la mascota"
            className=" border-teal-500 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

        </div>

        <div className=" mb-5">
          <label htmlFor="fecha" className=" text-gray-700 uppercase font-bold"> fecha</label>

          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            className=" border-teal-500 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

        </div>

        <div className=" mb-5">
          <label htmlFor="sintomas" className=" text-gray-700 uppercase font-bold"> Sintomas</label>

          <textarea
            id="sintomas"
            value={sintomas}
            placeholder="Sintomas de la Mascota"
            onChange={e => setSintomas(e.target.value)}
            className=" border-teal-500 border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />

        </div>

        <input type="submit" value={id ? 'guardar cambios ' : 'Agregar Pacientes' } className=" text-center bg-teal-600 w-full p-3 text-white font-bold hover:bg-teal-800 cursor-pointer transition-colors"  />


      </form>

      { msg && <Alerta
        alerta={alerta}
        />}

    </>
  )
}

export default Formulario
