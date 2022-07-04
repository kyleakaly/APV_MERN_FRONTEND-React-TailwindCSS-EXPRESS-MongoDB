import axios from "axios";

//axios tiene un metodo en el cual podemos crear un enlace principal donde le podemos mandar todas las peticiones

const ClienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_URL_BACKEND}/api`
})

export default ClienteAxios