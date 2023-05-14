import axios from 'axios';

// const http = axios.create({
//     baseURL: 'http://localhost:9000'
// });
export default {
    getAllProducts(){
        return axios.get(`/products`);
    },
    getProductDetails(id){
        return axios.get(`/products/${id}`);
    }
}