import axios from 'axios';

const configAxios = axios.create({
    baseURL: "http://localhost:4000/mdb",
    withCredentials: true
});

export default configAxios;     