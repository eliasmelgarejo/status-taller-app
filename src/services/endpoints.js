
const ORDENES_ENDPOINTS = {
    ORDENES: '/api/ordenes', //ordenes sin salida para pruebas
    ORDENES_POR_SUCURSAL: '/api/ordenesporsucursal', //ordenes por sucursal
    RESUMEN_SEMANAL: '/api/resumensemana', //resumen semanal
    SUCURSALES: '/api/sucursales',
}

const ACCOUNT_ENDPOINTS = {
    LOGIN: '/auth',
    LOGOUT: '/logout',
    ACCOUNT: '/account',
}

const ROUTES_ENDPOINTS = {
    HOME: '/home',
    DASHBOARD: '/dashboard',
    ESTADISTICAS: '/estadisticas',
    HELLO: '/hello',
}

export {
    ORDENES_ENDPOINTS,
    ACCOUNT_ENDPOINTS,
    ROUTES_ENDPOINTS,
}