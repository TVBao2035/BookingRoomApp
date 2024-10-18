import { ContractUpdateFields, PhotoUpdateFields, RoomUpdateFields, UserUpdateFields } from '../Fields/updateFields'
import { closeModalUpdateContract, closeModalUpdatePhoto, closeModalUpdateRoom, closeModalUpdateRoomService, closeModalUpdateService, closeModalUpdateUser } from '../../../hooks/redux/actions'
import { updateContractAPI, updatePhotoAPI, updateRoomAPI, updateUserAPI } from '../../../APIs'
import { useSelector } from 'react-redux';
import { ContainerModal, ModalUpdate } from '../../../components/Modal';
import ServiceUpdateFields from '../Fields/updateFields/ServiceUpdateFields';
import { updateService } from '../../../APIs/serviceAPI';
import RoomServiceUpdateFields from '../Fields/updateFields/RoomServiceUpdateFields';
import { updateRoomService } from '../../../APIs/roomServiceAPI';


export default  function ModalUpdateMain() {
    const modalUpdateContract = useSelector(state => state.modalUpdateContract);
    const modalUpdateUser = useSelector(state => state.modalUpdateUser);
    const modalUpdateRoom = useSelector(state => state.modalUpdateRoom);
    const modalUpdatePhoto = useSelector(state => state.modalUpdatePhoto);
    const modalUpdateService = useSelector(state => state.modalUpdateService);
    const modalUpdateRoomService = useSelector(state => state.modalUpdateRoomService);
    const listModal = [
        {
            modalUpdate: modalUpdateUser,
            fields: UserUpdateFields(),
            closeModalUpdate: closeModalUpdateUser,
            updateAPI: updateUserAPI,
        },
        {
            modalUpdate: modalUpdateRoom,
            fields: RoomUpdateFields(),
            closeModalUpdate: closeModalUpdateRoom,
            updateAPI: updateRoomAPI,
        },
        {
            modalUpdate: modalUpdatePhoto,
            fields: PhotoUpdateFields(),
            closeModalUpdate: closeModalUpdatePhoto,
            updateAPI: updatePhotoAPI,
        },
        {
            modalUpdate: modalUpdateContract,
            fields: ContractUpdateFields(),
            closeModalUpdate: closeModalUpdateContract,
            updateAPI: updateContractAPI,
        },
        {
            modalUpdate: modalUpdateService,
            fields: ServiceUpdateFields(),
            closeModalUpdate: closeModalUpdateService,
            updateAPI: updateService,
        },
        {
            modalUpdate: modalUpdateRoomService,
            fields: RoomServiceUpdateFields(),
            closeModalUpdate: closeModalUpdateRoomService,
            updateAPI: updateRoomService,
        }

    ]

    return (
        <>
        {
            listModal.map((modal, index) =>
                modal.modalUpdate.isOpen &&
                <ContainerModal key={`modal-${index}`}>
                    <ModalUpdate
                        listFields={modal.fields}
                        data={modal.modalUpdate}
                        closeModal={modal.closeModalUpdate}
                        fetchUpdate={modal.updateAPI}
                        />
                </ContainerModal>

            )
        }
        </>
    )
}
