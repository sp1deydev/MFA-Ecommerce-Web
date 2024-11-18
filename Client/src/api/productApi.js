import axiosClient from "./axiosClient";

export const productApi = {
    getAllProducts: (data) => {
        return axiosClient.get('/products', {params: data});
    },
    updateProduct: (data) => {
        return axiosClient.put('/products', data);
    },
    deleteProduct: (data) => {
        return axiosClient.delete('/products', {params: data});
    },
    createProduct: (data) => {
        return axiosClient.post('/products', data);
    },

}