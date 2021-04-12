import { API } from './config';
import { ACCOUNT_ENDPOINTS } from './endpoints';

const LoginServices = {
    getLogin: (username, password) => new Promise(
        (resolve, reject) => {
            API.get(ACCOUNT_ENDPOINTS.LOGIN + '?username=' + username + '&password=' + password)
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

export default LoginServices;