import axios from "axios";

const baseUrl = import.meta.env.VUE_APP_API_URL || "http://192.168.1.3:3001/api";


const tablesServices = {
    get: (endpoint) => axios.get(baseUrl + '/tables' + endpoint),
    create: (endpoint, data) => axios.post(baseUrl + '/tables' + endpoint, data),
};

export default tablesServices;