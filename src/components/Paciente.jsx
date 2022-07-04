import usePacientes from "../hooks/usePacientes"

const Paciente = ({ paciente }) => {

  const { setEdicion, eliminarPaciente } = usePacientes()

  const { email, fecha, nombre, propietario, sintomas, _id } = paciente

  const formatiarFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    //utilizar una api de javascript de las nuevas para utilizar un formato
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(nuevaFecha)
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-5 rounded-xl">
      <p className=" font-bold uppercase text-teal-600 my-2">Nombre:
        <span className=" pl-2 normal-case font-semibold text-black"> {nombre}</span>
      </p>
      <p className=" font-bold uppercase text-teal-600 my-2">propietario:
        <span className=" pl-2 normal-case font-semibold text-black"> {propietario}</span>
      </p>
      <p className=" font-bold uppercase text-teal-600 my-2">email:
        <span className=" pl-2 normal-case font-semibold text-black"> {email}</span>
      </p>
      <p className=" font-bold uppercase text-teal-600 my-2">fecha:
        <span className=" pl-2 normal-case font-semibold text-black"> {formatiarFecha(fecha)}</span>
      </p>
      <p className=" font-bold uppercase text-teal-600 my-2">sintomas:
        <span className=" pl-2 normal-case font-semibold text-black"> {sintomas}</span>
      </p>
      <div className="flex justify-between flex-col my-5 md:flex-row gap-3">
        <button
          type="button"
          className="py-2 px-10 bg-teal-600 hover:bg-teal-700 text-white uppercase font-bold rounded-lg"
          onClick={()=>setEdicion(paciente)}>
          Editar
        </button>

        <button
          type="button"
          onClick={()=>eliminarPaciente(_id)}
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg">
          Eliminar
        </button>

      </div>
    </div>
  )
}

export default Paciente