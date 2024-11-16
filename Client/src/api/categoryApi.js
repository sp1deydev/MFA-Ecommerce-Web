import axiosClient from "./axiosClient";

export const categoryApi = {
    getAllCategories: () => {
        return axiosClient.get('/categories/');
    },
    create: (data) => {
        return axiosClient.post('/categories/', data);
    },
    update: (data) => {
        return axiosClient.put('/categories/', data);
    },
    delete: (data) => {
        return axiosClient.post('/categories/delete', data);
    }
}