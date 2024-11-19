import axiosClient from "./axiosClient";

export const cartApi = {
    getCartData: () => {
        return axiosClient.get('/carts');
    },
    updateCart: (data) => {
        return axiosClient.post('/carts/update', data);
    },
    deleteProduct: (data) => {
        return axiosClient.post('/carts/delete', data);
    },
    addToCart: (data) => {
        return axiosClient.post('/carts/add', data);
    },

}