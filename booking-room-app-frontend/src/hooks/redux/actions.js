import { ACTION_TYPE } from "./actionConstant";


export const changeLike = payload => {
    return {
        type: ACTION_TYPE.changeLike,
        payload
    }
}

export const setModalComment = payload => {
    return {
        type: ACTION_TYPE.setModalComment,
        payload
    }
}

export const openModalCreateRoomService = () => {
    return {
        type: ACTION_TYPE.openModalCreateRoomService,
    }
}
export const closeModalCreateRoomService = () => {
    return {
        type: ACTION_TYPE.closeModalCreateRoomService
    }
}




export const openModalCreateService = () => {
    return {
        type: ACTION_TYPE.openModalCreateService,
    }
}
export const closeModalCreateService = () => {
    return {
        type: ACTION_TYPE.closeModalCreateService
    }
}
export const openModalComment = (payload) => {
    return {
        type: ACTION_TYPE.openModalComment,
        payload
    }
}
export const closeModalComment = ()=> {
    return {
        type: ACTION_TYPE.closeModalComment
    }
}
export const setLoading = (payload)=>{
    return {
        type: ACTION_TYPE.setLoading,
        payload
    }
}

export const openModalCreateContract = () => {
    return {
        type: ACTION_TYPE.openModalCreateContract,
    }
}
export const closeModalCreateContract = () => {
    return {
        type: ACTION_TYPE.closeModalCreateContract
    }
}
export const openModalCreatePhoto = () => {
    return {
        type: ACTION_TYPE.openModalCreatePhoto,
    }
}
export const closeModalCreatePhoto = () => {
    return {
        type: ACTION_TYPE.closeModalCreatePhoto
    }
}
export const openModalCreateRoom = () => {
    return {
        type: ACTION_TYPE.openModalCreateRoom,
    }
}
export const closeModalCreateRoom = () => {
    return {
        type: ACTION_TYPE.closeModalCreateRoom
    }
}

export const openModalCreateUser = () => {
    return {
        type: ACTION_TYPE.openModalCreateUser,
    }
}
export const closeModalCreateUser = () => {
    return {
        type: ACTION_TYPE.closeModalCreateUser
    }
}
//----------------------------------------------------
export const openModalDeleteRoomService = (payload) => {
    return {
        type: ACTION_TYPE.openModalDeleteRoomService,
        payload
    }
}
export const closeModalDeleteRoomService = () => {
    return {
        type: ACTION_TYPE.closeModalDeleteRoomService
    }
}
export const openModalDeleteService = (payload) => {
    return {
        type: ACTION_TYPE.openModalDeleteService,
        payload
    }
}
export const closeModalDeleteService = () => {
    return {
        type: ACTION_TYPE.closeModalDeleteService
    }
}
export const openModalDeleteContract = (payload) => {
    return {
        type: ACTION_TYPE.openModalDeleteContract,
        payload
    }
}
export const closeModalDeleteContract = () => {
    return {
        type: ACTION_TYPE.closeModalDeleteContract
    }
}

export const openModalDeletePhoto = (payload) => {
    return {
        type: ACTION_TYPE.openModalDeletePhoto,
        payload
    }
}
export const closeModalDeletePhoto = () => {
    return {
        type: ACTION_TYPE.closeModalDeletePhoto
    }
}
export const openModalDeleteRoom = (payload) => {
    return {
        type: ACTION_TYPE.openModalDeleteRoom,
        payload
    }
}
export const closeModalDeleteRoom = () => {
    return {
        type: ACTION_TYPE.closeModalDeleteRoom
    }
}

export const openModalDeleteUser = (payload) => {
    return {
        type: ACTION_TYPE.openModalDeleteUser,
        payload
    }
}
export const closeModalDeleteUser = () => {
    return {
        type: ACTION_TYPE.closeModalDeleteUser
    }
}
//-------------------------------------------------------
export const openModalUpdateRoomService = (payload) => {
    return {
        type: ACTION_TYPE.openModalUpdateRoomSerivce,
        payload
    }
}
export const closeModalUpdateRoomService = () => {
    return {
        type: ACTION_TYPE.closeModalUpdateRoomSerivce
    }
}
export const openModalUpdateService = (payload) => {
    return {
        type: ACTION_TYPE.openModalUpdateService,
        payload
    }
}
export const closeModalUpdateService = () => {
    return {
        type: ACTION_TYPE.closeModalUpdateService
    }
}
export const openModalUpdateContract = (payload) => {
    return {
        type: ACTION_TYPE.openModalUpdateContract,
        payload
    }
}
export const closeModalUpdateContract = () => {
    return {
        type: ACTION_TYPE.closeModalUpdateContract
    }
}

export const openModalUpdatePhoto = (payload) => {
    return {
        type: ACTION_TYPE.openModalUpdatePhoto,
        payload
    }
}
export const closeModalUpdatePhoto = () => {
    return {
        type: ACTION_TYPE.closeModalUpdatePhoto
    }
}
export const openModalUpdateRoom = (payload) => {
    return {
        type: ACTION_TYPE.openModalUpdateRoom,
        payload
    }
}
export const closeModalUpdateRoom = () => {
    return {
        type: ACTION_TYPE.closeModalUpdateRoom
    }
}

export const openModalUpdateUser = (payload) => {
    return {
        type: ACTION_TYPE.openModalUpdateUser,
        payload
    }
}
export const closeModalUpdateUser = () => {
    return {
        type: ACTION_TYPE.closeModalUpdateUser
    }
}
export const updateUser = (payload) => {
    return {
        type: ACTION_TYPE.updateUser,
        payload
    }
}

export const updateUserName = (payload) => {
    return {
        type: ACTION_TYPE.updateUserName,
        payload
    }
}

export const openBookRoom = (payload) => {
    return {
        type: ACTION_TYPE.openBookRoom,
        payload
    }
}

export const closeBookRoom = () => {
    return {
        type: ACTION_TYPE.closeBookRoom
    }
}

