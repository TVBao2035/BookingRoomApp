import { useSelector } from 'react-redux';

import { ContainerModal, ModalCreate } from '../../../components/Modal';
import { createContract, createPhotoAPI, createRoomAPI, createUserAPI } from '../../../APIs';
import { ContractCreateFields, PhotoCreateFields, RoomCreateFields, UserCreateFields } from '../Fields/createFields';
import { closeModalCreateContract, closeModalCreatePhoto, closeModalCreateRoom, closeModalCreateRoomService, closeModalCreateService, closeModalCreateUser } from '../../../hooks/redux/actions';
import { createService } from '../../../APIs/serviceAPI';
import ServiceCreateFields from '../Fields/createFields/ServiceCreateFields';
import RoomServiceCreateFields from '../Fields/createFields/RoomServiceCreateFields';
import { createRoomService } from '../../../APIs/roomServiceAPI';

export default function ModalCreateMain() {
    const modalCreateContract = useSelector(state => state.modalCreateContract);
    const modalCreateUser = useSelector(state => state.modalCreateUser);
    const modalCreateRoom = useSelector(state => state.modalCreateRoom);
    const modalCreatePhoto = useSelector(state => state.modalCreatePhoto);
    const modalCreateService = useSelector(state => state.modalCreateService);
    const modalCreateRoomService = useSelector(state => state.modalCreateRoomService);
    const listModal = [
        {
            modalCreate: modalCreateService,
            fields: ServiceCreateFields(),
            closeModalCreate: closeModalCreateService,
            createAPI: createService,
        },
        {
            modalCreate: modalCreateUser,
            fields: UserCreateFields(),
            closeModalCreate: closeModalCreateUser,
            createAPI: createUserAPI,
        },
        {
            modalCreate: modalCreateRoom,
            fields: RoomCreateFields(),
            closeModalCreate: closeModalCreateRoom,
            createAPI: createRoomAPI,
        },
        {
            modalCreate: modalCreatePhoto,
            fields: PhotoCreateFields(),
            closeModalCreate: closeModalCreatePhoto,
            createAPI: createPhotoAPI,
        },
        {
            modalCreate: modalCreateContract,
            fields: ContractCreateFields(),
            closeModalCreate: closeModalCreateContract,
            createAPI: createContract,
        },{
            modalCreate: modalCreateRoomService,
            fields: RoomServiceCreateFields(),
            closeModalCreate: closeModalCreateRoomService,
            createAPI: createRoomService
        }
    ]
    
    return (
        listModal.map(
            (modal, index) =>
                modal.modalCreate.isOpen &&
                <ContainerModal key={`modal-${index}`}>
                    <ModalCreate
                        listFields={modal.fields}
                        closeModal={modal.closeModalCreate}
                        fetchCreate={modal.createAPI}
                    />
                </ContainerModal>
        )
    )
}