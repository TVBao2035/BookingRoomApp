import axios from '../setUpAxios';

export const getAllCommentFirst = async (roomId) => {
    return await axios.get(`/comment/room/${roomId}`);
} 

export const getAllCommentChild = async (commentId) => {
    return await axios.get(`/comment/${commentId}`);
}

export const createCommnet = async({message, userId, roomId, commentId}) => {
    return await axios.put(`/comment/create`, {
        message, userId, commentId, roomId
    })
}