import axios from '../setUpAxios'

export const refresh = async()=>{
    return await axios.get('user/refresh');
}

export const signIn = async(email, password)=>{
    return await axios.post('/user/signIn', 
                            {
                                email: email, 
                                password: password
                            }); 
}

export const signUp = async (data)=> {
    return await axios.post('/user/signUp', data);
}

export const logOut = async()=>{
    return await axios.get('user/logOut');
}

export const deleteUserAPI = async (id) => {
    return await axios.delete(`/user/delete/${id}`)
}

export const updateUserAPI = async(data)=>{
    return await axios.put('/user/update', data);
}
export const createUserAPI = async (data) => {
    data.groupId = data.groupId ?  Number(data.groupId) : 3;
    return await axios.post('/user/create', data);
}
export const getUserByEmail = async (email) => {
    return await axios.post('/user/findUserByEmail',{ email: email});
}

export const getUserByGroupId = async (groupId, limit=5, page) => {
    return await axios.get(`/user/findUserByGroupId/${groupId}?limit=${limit}&page=${page}`)
}

export const getDetailsUser = async(id, )=>{

    return await axios.get(`/user/${id}`);
}
export const getAllUser = async (limit, page)=>{
    return await axios.get(`/user?limit=${limit}&page=${page}`);
}



export const getAllRoom = async ({sort='id', type='asc', isNotHired=0, allPhotos=0, notPhoto=1, limit=5, page=1}) => {
    return await axios.get(`/room?sort=${sort}&type=${type}&isNotHired=${isNotHired}&allPhotos=${allPhotos}&notPhoto=${notPhoto}&limit=${limit}&page=${page}`);
}
export const getAllRoomId = async()=> {
    return await axios.get('/room/getAllRoomId');
}
export const getDetailsRoom = async (id) => {
    return await axios.get(`/room/${id}`);
}
export const updateRoomAPI = async(data) => {
    console.log("AIOS>>", data);
    return await axios.put(`/room/update`, data);
}
export const deleteRoomAPI = async(roomId) => {
    return await axios.delete(`/room/delete/${roomId}`);
}
export const createRoomAPI = async (data) => {
    return await axios.post(`/room/create/`, data);
}



export const getAllContract = async (limit=5, page=1) =>{ 
    return await axios.get(`/contract?limit=${limit}&page=${page}`);
}

export const getContractByUserId = async (id) => {
    return await axios.get(`/contract/user/${id}`)
}

export const deleteContract = async (id) => {
    return await axios.delete(`/contract/delete/${id}`);
}

export const createContract = async ({userId, roomId, startDate, endDate, sales, email, phone}) => {
 
    return await axios.post('/contract/create', {userId, roomId, startDate, endDate, sales, email, phone})
}

export const updateContractAPI = async ({id, roomId, startDate, endDate, sales})=> {
    return await axios.put(`/contract/update/${id}`, { roomId, startDate, endDate, sales});
}


export const getAllPhotos = async (roomId,limit, page)=> {
    return await axios.get(`/photo?roomId=${roomId}&limit=${limit}&page=${page}`);
}
export const updatePhotoAPI = async(data) => {
    return await axios.put(`/photo/update`, data);
}
export const deletePhotoAPI = async (id) => {
    return await axios.delete(`/photo/delete/${id}`);
}
export const createPhotoAPI = async (data) => {
    return await axios.post(`/photo/create`, data)
}


export const getAllGroup = async () => {
    return await axios.get(`/group`);
}


export const getAllHistory = async ({ limit=5, page=1, date=""}) => {
    return await axios.get(`/history?limit=${limit}&page=${page}&date=${date}`);
}
export const getHistoryByUserId = async (id, month="", year="") => {
    return await axios.get(`/history/user/${id}?month=${month}&year=${year}`);
}
export const getRevenueOfAllRoomsEachMonth = async (year) => {
    return await axios.get(`/history/getRevenueOfAllRoomsEachMonth/${year}`);
}

export const getRevenueOfEachRoom = async () => {
    return await axios.get(`/history/getRevenueOfEachRoom`);
}

