import axios from '../setUpAxios';

export const deleteLike = async({userId, commentId}) => {
    return await axios.delete(`/like/delete?userId=${userId}&commentId=${commentId}`);
}

export const createLike = async({userId, commentId}) => {
    return await axios.post(`/like/create`, {userId, commentId});
}