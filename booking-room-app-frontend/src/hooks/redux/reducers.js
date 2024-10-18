import { ACTION_TYPE } from "./actionConstant";

export const initState = {
    user: {
        token: null,
        email: null,
        name: null,
        phone: null,
        avatar: null,
        permissionCode: null,
        id: null,
        isLoading: true
    },
    bookingRoom: {
        roomId: null,
        isOpen: false,
        price: 0
    },
    changeLike: {
        isClick: false
    },
    modalComment: {
        isOpen: false,
        commentId: null,
    },
    modalUpdateUser: {
        isOpen: false,
        id: '',
        avatar: '',
        groupId: '',
        IDentify: '',
        name: '',
        email: '',
        phone: '',
    },
    modalUpdateRoom:{
        isOpen: false,
        id: '', 
        description: '',
        numberOfPeople: "",
        photoId: '',
    },
    modalCreateService: {
        isOpen: false,
    },
    modalUpdatePhoto: {
        isOpen: false,
        id: '',
        link: '',
        roomId: '',
    },
    modalUpdateContract: {
        isOpen: false,
        id: '',
        userId: '',
        name: "",
        email: "", 
        phone: "", 
        roomId: "", 
        price: "", 
        sumMoney: "", 
        startDate: "",
        endDate: "",
    },
    modalDeleteUser: {
        isOpen: false,
        id: '',
        email: '',
  
    },
    modalDeleteRoomService: {
        isOpen: false,
        id: '',
    },
    modalDeleteRoom: {
        isOpen: false,
        id: '',
    },
    modalDeletePhoto: {
        isOpen: false,
        id: '',
    },
    modalDeleteContract: {
        isOpen: false,
        id: '',
    },
    modalCreateUser: {
        isOpen: false,
    },
    modalCreateRoom: {
        isOpen: false,
    },
    modalCreateRoomService: {
        isOpen: false,
    },
    modalCreatePhoto: {
        isOpen: false,
    },
    modalCreateContract: {
        isOpen: false,
    },
    modalDeleteService: {
        isOpen: false,
        id: null,
    },
    modalUpdateService: {
        isOpen: false,
        id: null,
        name: null
    },
    modalUpdateRoomService: {
        isOpen: false,
        id: null,
        serviceId: null,
        roomId: null
    }
}

export default function rootReducer(state = initState, action) {
    console.log(action);
    switch (action.type) {
        case ACTION_TYPE.closeModalCreateRoomService:
            return {
                ...state,
                modalCreateRoomService: {
                    isOpen: false,
                }
            }
        case ACTION_TYPE.openModalCreateRoomService:
            return {
                ...state,
                modalCreateRoomService: {
                    isOpen: true,
                }
            }
        case ACTION_TYPE.closeModalDeleteRoomService:
            return {
                ...state,
                modalDeleteRoomService: {
                    isOpen: false,
                    id: null,
                }
            }
        case ACTION_TYPE.openModalDeleteRoomService:
            return {
                ...state,
                modalDeleteRoomService: {
                    isOpen: true,
                    id: action.payload,
                }
            }
        case ACTION_TYPE.closeModalUpdateRoomSerivce:
            return {
                ...state,
                modalUpdateRoomService: {
                    isOpen: false,
                    id: null,
                    serviceId: null,
                    roomId: null
                }
            }
        case ACTION_TYPE.openModalUpdateRoomSerivce:
            return {
                ...state,
                modalUpdateRoomService: {
                    isOpen: true,
                    id: action.payload.id,
                    serviceId: action.payload.serviceId,
                    roomId: action.payload.roomId
                }
            }
        
        case ACTION_TYPE.closeModalUpdateService:
            return {
                ...state,
                modalUpdateService: {
                    isOpen: false,
                    id: null,
                    name: null
                }
            }
        case ACTION_TYPE.openModalUpdateService:
            return {
                ...state,
                modalUpdateService: {
                    isOpen: true,
                    id: action.payload.id,
                    name: action.payload.name
                }
            }
        case ACTION_TYPE.openModalDeleteService:
            return {
                ...state,
                modalDeleteService: {
                    isOpen: true,
                    id: action.payload
                }
            }
        case ACTION_TYPE.closeModalDeleteService:
            return {
                ...state,
                modalDeleteService: {
                    isOpen: false,
                    id: null
                }
            }
        case ACTION_TYPE.closeModalCreateService:
            return {
                ...state,
                modalCreateService: {
                    isOpen: false,
                }
            }
        case ACTION_TYPE.openModalCreateService:
            return {
                ...state,
                modalCreateService: {
                    isOpen: true,
                }
            }
        case ACTION_TYPE.changeLike:
            return{
                ...state,
                changeLike: {
                    isClick: action.payload
                }
            }
        case ACTION_TYPE.setModalComment:
            return {
                ...state,
                modalComment: {
                    isOpen: action.payload.isOpen,
                    commentId: action.payload.commentId
                }
            }
        case ACTION_TYPE.closeModalComment:
            return {
                ...state,
                modalComment: {
                    isOpen: false,
                    commentId: null
                }
            }
        case ACTION_TYPE.openModalComment:
            return {
                ...state,
                modalComment: {
                    isOpen: true,
                    commentId: action.payload
                }
            }
        case ACTION_TYPE.setLoading:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoading: action.payload
                }
            }
        case ACTION_TYPE.closeModalCreateContract:
            return {
                ...state,
                modalCreateContract: {
                    isOpen: false
                }
            }
        case ACTION_TYPE.openModalCreateContract:
            return {
                ...state,
                modalCreateContract: {
                    isOpen: true
                }
            }
        case ACTION_TYPE.closeModalCreatePhoto:
            return {
                ...state,
                modalCreatePhoto: {
                    isOpen: false
                }
            }
        case ACTION_TYPE.openModalCreatePhoto:
            return {
                ...state,
                modalCreatePhoto: {
                    isOpen: true
                }
            }
        case ACTION_TYPE.closeModalCreateRoom:
            return {
                ...state,
                modalCreateRoom: {
                    isOpen: false
                }
            }
        case ACTION_TYPE.openModalCreateRoom:
            return {
                ...state,
                modalCreateRoom: {
                    isOpen: true
                }
            }
        case ACTION_TYPE.closeModalCreateUser:
            return {
                ...state,
                modalCreateUser: {
                    isOpen: false
                }
            }
        case ACTION_TYPE.openModalCreateUser:
            return {
                ...state,
                modalCreateUser: {
                    isOpen: true
                }
            }
        case ACTION_TYPE.openModalDeleteUser:
            return {
                ...state,
                modalDeleteUser: {
                    isOpen: true,
                    id: action.payload.id,
                    email: action.payload.email
                }
            }
        case ACTION_TYPE.closeModalDeleteUser:
            return {
                ...state,
                modalDeleteUser: {
                    isOpen: false,
                    id: '',
                    email: '',
                }
            }
        case ACTION_TYPE.openModalDeleteRoom:
            return {
                ...state,
                modalDeleteRoom: {
                    isOpen: true,
                    id: action.payload,
                }
            }
        case ACTION_TYPE.closeModalDeleteRoom:
            return {
                ...state,
                modalDeleteRoom: {
                    isOpen: false,
                    id: '',
                }
            }
        case ACTION_TYPE.openModalDeletePhoto:
            return {
                ...state,
                modalDeletePhoto: {
                    isOpen: true,
                    id: action.payload,
                }
            }
        case ACTION_TYPE.closeModalDeletePhoto:
            return {
                ...state,
                modalDeletePhoto: {
                    isOpen: false,
                    id: '',
                }
            }
        case ACTION_TYPE.openModalDeleteContract:
            return {
                ...state,
                modalDeleteContract: {
                    isOpen: true,
                    id: action.payload,
                }
            }
        case ACTION_TYPE.closeModalDeleteContract:
            return {
                ...state,
                modalDeleteContract: {
                    isOpen: false,
                    id: '',
                }
            }
        case ACTION_TYPE.closeModalUpdateContract:
            return {
                ...state,
                modalUpdateContract: {
                    ...state.modalUpdateContract,
                    isOpen: false,
                    id: '',
                    userId: '',
                    name: "",
                    email: "",
                    phone: "",
                    roomId: "",
                    price: "",
                    sumMoney: "",
                    startDate: "",
                    endDate: "",
                }
            }
        case ACTION_TYPE.openModalUpdateContract:
            return {
                ...state,
                modalUpdateContract: {
                    ...state.modalUpdateContract,
                    isOpen: true,
                    id: action.payload.id,
                    userId: action.payload.userId,
                    name: action.payload.name,
                    email: action.payload.email,
                    phone: action.payload.phone,
                    roomId: action.payload.roomId,
                    price: action.payload.price,
                    sumMoney: action.payload.sumMoney,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate,
                }
            }
        case ACTION_TYPE.closeModalUpdatePhoto:
            return {
                ...state,
                modalUpdatePhoto: {
                    ...state.modalUpdatePhoto,
                    isOpen: false,
                    id: '',
                    link: '',
                    roomId: '',
                }
            }
        case ACTION_TYPE.openModalUpdatePhoto:
            return {
                ...state,
                modalUpdatePhoto: {
                    ...state.modalUpdatePhoto,
                    isOpen: true,
                    id: action.payload.id,
                    link: action.payload.link,
                    roomId: action.payload.roomId,
                }
            }
        case ACTION_TYPE.closeModalUpdateRoom:
            return {
                ...state,
                modalUpdateRoom: {
                    ...state.modalUpdateRoom,
                    isOpen: false,
                    id: '',
                    description: '',
                    numberOfPeople: "",
                    photoId: '',
                }
            }
        case ACTION_TYPE.openModalUpdateRoom:
            return {
                ...state,
                modalUpdateRoom: {
                    ...state.modalUpdateRoom,
                    isOpen: true,
                    id: action.payload.id,
                    description: action.payload.description,
                    photoId: action.payload.photoId,
                    numberOfPeople: action.payload.numberOfPeople                  
                }
            }
        case ACTION_TYPE.closeModalUpdateUser:
            return {
                ...state,
                modalUpdateUser: {
                    ...state.modalUpdateUser,
                    isOpen: false,
                    id: '',
                    avatar: '',
                    groupId: '',
                    IDentify: '',
                    name: '',
                    email: '',
                    phone: '',
                }
            }
        case ACTION_TYPE.openModalUpdateUser:
            return{
                ...state,
                modalUpdateUser: {
                    ...state.modalUpdateUser,
                    isOpen: true,
                    id: action.payload.id,
                    avatar: action.payload.avatar,
                    groupId: action.payload.groupId,
                    IDentify: action.payload.IDentify,
                    name: action.payload.name,
                    email: action.payload.email,
                    phone: action.payload.phone,
                }
            }
        
        case ACTION_TYPE.updateUser:
            return {
                ...state,
                user: {
                    ...action.payload
                }
            }
        case ACTION_TYPE.updateUserName:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload
                }
            }
        case ACTION_TYPE.openBookRoom:
            return {
                ...state,
                bookingRoom: {
                    roomId: action.payload.roomId,
                    isOpen: true,
                    price: action.payload.price
                }
            }
        case ACTION_TYPE.closeBookRoom:
            return{
                ...state,
                bookingRoom: {
                    roomId: null,
                    isOpen: false,
                    price: 0
                }
            }
        default:
            return {
                ...state
            }
    }
}