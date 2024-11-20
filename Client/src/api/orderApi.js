import axiosClient from "./axiosClient";

export const orderApi = {
    getAllOrders: (data) => {
        return axiosClient.get('/orders', {params: data});
    },
    getOrderByUserId: (data) => {
        return axiosClient.get('/orders/get-by-userid', {params: data});
    },
    updateStatus: (data) => {
        return axiosClient.post('/orders/update', data);
    },
    deleteOrder: (data) => {
        return axiosClient.post('/orders/delete', data);
    },
    create: (data) => {
        return axiosClient.post('/orders', data);
    },
}