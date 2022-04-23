import { API } from './config';
import { ORDENES_ENDPOINTS } from './endpoints';

export const jwtToken = localStorage.getItem("authorization");

const OrdenesServices = {
    getOrdenesSinSalida: () => new Promise(
        (resolve, reject) => {
            // API.get(ORDENES_ENDPOINTS.ORDENES, { headers: { "Authorization": `${jwtToken}` } })
            API.get(ORDENES_ENDPOINTS.ORDENES)
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
    getResumenESOrdenes: () => new Promise(
        (resolve, reject) => {
            // API.get(ORDENES_ENDPOINTS.RESUMEN_SEMANAL, { headers: { "Authorization": `${jwtToken}` } })
            API.get(ORDENES_ENDPOINTS.RESUMEN_SEMANAL)
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