import axios from "axios";
const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/clone-fe17c/us-central1/api",
    baseURL:"https://amazon-api-deploy-6636.onrender.com"
});


export {axiosInstance}
