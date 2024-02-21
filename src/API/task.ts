import axios from 'axios';
//https://arn.pem-sa.com.mx
export const taskClient = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://arn.pem-sa.com.mx',
    headers:{
        "Content-type": "application/json",
    }
});