import axios from '../setUpAxios';
export const getAllRoomService = async(page, limit) => {
    return await axios.get(`/roomService?page=${page}&limit=${limit}`);
}

export const createRoomService = async ({serviceId, roomId}) => {
    return await axios.post(`/roomService`, { serviceId, roomId });
}

export const deleteRoomService = async (id) => {
    return await axios.delete(`/roomService/${id}`);
}


export const updateRoomService = async ({id, serviceId, roomId}) => {
    return await axios.put(`/roomService/${id}`, {serviceId, roomId});
}