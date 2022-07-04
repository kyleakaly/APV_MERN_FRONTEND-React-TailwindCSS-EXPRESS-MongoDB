import {Outlet} from 'react-router-dom'
// rafce permite crear toda la estructura basico de un componente
const AuthLayout = () => {
  return (
    <>

      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
      <Outlet />
      </main>
      
    </>
  )
};

export default AuthLayout