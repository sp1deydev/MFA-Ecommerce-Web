import axiosClient from "./axiosClient";

export const categoryApi = {
    getAllCategories: () => {
        return axiosClient.get('/categories/');
    },
    getCategoryCount: () => {
        return axiosClient.get('/categories/count');
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