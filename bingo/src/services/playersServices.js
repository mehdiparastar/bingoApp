import axios from "axios";

const baseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:3001/api";

const playersServices = {
    get: (endpoint) => axios.get(baseUrl + '/players' + endpoint),
    create: (endpoint, data) => axios.post(baseUrl + '/players' + endpoint, data),
};

export default playersServices;