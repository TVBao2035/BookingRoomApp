import axios from '../setUpAxios';

export const deleteService = async (id) => {
    return await axios.delete(`/service/delete/${id}`);
}

export const updateService = async ({id, name}) => {
    return await axios.put(`/service/update`, { id: Number(id), name: name });
}

export const createService = async (name) => {
    return await axios.post(`/service/create`, { name })
}

export const getAllService = async (page = 1, limit = 5) => {
    return await axios.get(`/service?page=${page}&limit=${limit}`);
}

export const getAllServiceWithIdName = async () => {
    return await axios.get('/service/getAllServiceWithIdName');
}