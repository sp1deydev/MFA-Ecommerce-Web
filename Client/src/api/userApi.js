import axiosClient from "./axiosClient";

export const userApi = {
    getAllUsers: () => {
        return axiosClient.get('/users');
    },
    updateUser: (data) => {
        return axiosClient.put('/users/update', data);
    },
    updateRole: (data) => {
        return axiosClient.put('/users/update-role', data);
    },
    getUserById: (data) => {
        return axiosClient.get('/users/:id', data);
    },
    changePassword: (data) => {
        return axiosClient.put('/users/change-password', data);
    },
    checkPassword: (data) => {
        return axiosClient.post('/users/check-password', data);
    },
    forgotPassword: (data) => {
        return axiosClient.post('/users/forgot-password', data);
    },
    checkUsername: (data) => {
        return axiosClient.post('/users/check-username', data);
    },
    deleteUser: (data) => {
        return axiosClient.delete('/users/delete', data);
    },
    config: (data) => {
        return axiosClient.post('/users/config', data);
    },
    getConfig: () => {
        return axiosClient.get('/users/config');
    },
    getRandomUserImages: () => {
        return axiosClient.get('/users/random-user-images');
    },
    getRandomUserRelationType: () => {
        return axiosClient.get('/users/random-user-relation-type');
    },
}