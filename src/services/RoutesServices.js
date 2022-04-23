import { API } from './config';
import { ROUTES_ENDPOINTS } from './endpoints';

export const jwtToken = localStorage.getItem("authorization");


const RoutesServices = {
    getHome: (jwtToken) => new Promise(
        (resolve, reject) => {
            API.get(ROUTES_ENDPOINTS.HELLO, { headers: { "Authorization": `${jwtToken}` } })
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
    getDashboard: (jwtToken) => new Promise(
        (resolve, reject) => {
            API.get(ROUTES_ENDPOINTS.DASHBOARD, { headers: { "Authorization": `${jwtToken}` } })
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
    getEstadisticas: (jwtToken) => new Promise(
        (resolve, reject) => {
            API.get(ROUTES_ENDPOINTS.ESTADISTICAS, { headers: { "Authorization": `${jwtToken}` } })
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

}

// export default RoutesServices;