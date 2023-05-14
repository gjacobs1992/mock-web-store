import axios from 'axios';

// const http = axios.create({
//     baseURL: 'http://localhost:9000'
// });
export default {
    getCart(){
        return axios.get(`/cart`);
    },
    removeItem(id){
        return axios.delete(`/cart/items/${id}`);
    },
    clearCart(){
        return axios.delete(`/cart`);
    },
    addItemToCart(item){
        return axios.post(`/cart/items`, item);
    }
}