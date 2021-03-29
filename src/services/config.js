import axios from 'axios';
import { apiUrl } from './../config.json';

const API = axios.create({
    baseURL: apiUrl,
});

export { API }
