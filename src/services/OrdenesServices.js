import { API } from './config';
import { ORDENES_ENDPOINTS } from './endpoints';

export const jwtToken = localStorage.getItem("authorization");

const OrdenesServices = {
    getOrdenesSinSalida: (jwtToken) => new Promise(
        (resolve, reject) => {
            API.get(ORDENES_ENDPOINTS.ORDENES, { headers: { "Authorization": `${jwtToken}` } })
                .then(
                    res => res.data
                )
                .then(
                    data => resolve(data)
                )
                .catch(
                    err => reject(err)
                )
        }
    ),
    getResumenESOrdenes: (jwtToken) => new Promise(
        (resolve, reject) => {
            API.get(ORDENES_ENDPOINTS.RESUMEN_SEMANAL, { headers: { "Authorization": `${jwtToken}` } })
                .then(
                    res => res.data
                )
                .then(
                    data => resolve(data)
                )
                .catch(
                    err => reject(err)
                )
        }
    )
}

export default OrdenesServices;