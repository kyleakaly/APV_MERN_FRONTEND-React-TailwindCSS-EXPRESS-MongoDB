const Alerta = ({alerta}) => {
   
  return (
   <div className={`${alerta.error ? ' from-red-400 to-red-600' : 'from-teal-500 to-teal-600'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold mb-10 text-sm ` }>
       {alerta.msg}
       </div>
  )
}

export default Alerta