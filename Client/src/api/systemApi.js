import axiosClient from "./axiosClient";

export const systemApi = {
    config: (data) => {
        return axiosClient.post('/system/config', data);
    },
    update: (data) => {
        return axiosClient.post('/system/update', data);
    },
    getSystemConfig: () => {
        return axiosClient.get('/system/');
    },
}