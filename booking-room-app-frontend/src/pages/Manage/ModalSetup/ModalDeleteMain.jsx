import { useSelector } from 'react-redux';
import { closeModalDeleteContract, closeModalDeletePhoto, closeModalDeleteRoom, closeModalDeleteRoomService, closeModalDeleteService, closeModalDeleteUser } from '../../../hooks/redux/actions';
import { deleteContract, deletePhotoAPI, deleteRoomAPI, deleteUserAPI } from '../../../APIs';
import { ContainerModal, ModalDelete } from '../../../components/Modal';
import { deleteService } from '../../../APIs/serviceAPI';
import { deleteRoomService } from '../../../APIs/roomServiceAPI';

export default function ModalDeleteMain() {
    console.log(`Modal Delete main`);
    const modalDeleteContract = useSelector(state => state.modalDeleteContract);
    const modalDeleteUser = useSelector(state => state.modalDeleteUser);
    const modalDeleteRoom = useSelector(state => state.modalDeleteRoom);
    const modalDeletePhoto = useSelector(state => state.modalDeletePhoto);
    const modalDeleteService = useSelector(state => state.modalDeleteService);
    const modalDeleteRoomService = useSelector(state => state.modalDeleteRoomService);
    const listModal = [
        {
            modalDelete: modalDeleteService,
            closeModalDelete: closeModalDeleteService,
            deleteAPI: deleteService,
            message: <p>{`Do you want to Delete Service With ID : ${useSelector(state => state.modalDeleteService.id)}?`}</p>
        },
        {
            modalDelete: modalDeleteUser,
            closeModalDelete: closeModalDeleteUser,
            deleteAPI: deleteUserAPI,
            message: (
                <div>
                    <p> {`Do you want to Delete ?`} </p>
                    <p className='fw-bolder'> {`* User ID:  ${useSelector(state => state.modalDeleteUser.id)}`} </p>
                    <p className='fw-bolder'> {`* Email: ${useSelector(state => state.modalDeleteUser.email)}`} </p>
                </div>)
        },
        {
            modalDelete: modalDeleteRoom,
            closeModalDelete: closeModalDeleteRoom,
            deleteAPI: deleteRoomAPI,
            message: <p>{`Do you want to Delete Room Number: ${useSelector(state => state.modalDeleteRoom.id)}?`}</p>,
        },
        {
            modalDelete: modalDeletePhoto,
            closeModalDelete: closeModalDeletePhoto,
            deleteAPI: deletePhotoAPI,
            message: <p>{`Do you want to Delete Photo: ${useSelector(state => state.modalDeletePhoto.id)}?`}</p>,
        },
        {
            modalDelete: modalDeleteContract,
            closeModalDelete: closeModalDeleteContract,
            deleteAPI: deleteContract,
            message: <p> {`Do you want to Delete Contract:  ${useSelector(state => state.modalDeleteContract.id)}?`}</p>,
        },
        {
            modalDelete: modalDeleteRoomService,
            closeModalDelete: closeModalDeleteRoomService,
            deleteAPI: deleteRoomService,
            message: <p> {`Do you want to Delete Room Service:  ${useSelector(state => state.modalDeleteRoomService.id)}?`}</p>,
        },
    ]

    return (
        listModal.map((modal, index) => (
            modal.modalDelete.isOpen &&
            <ContainerModal key={`modal-${index}`}>
                <ModalDelete
                    closeModal={modal.closeModalDelete}
                    message={modal.message}
                    data={modal.modalDelete}
                    fetchDelete={modal.deleteAPI}
                />
            </ContainerModal>
        ))
    )
}