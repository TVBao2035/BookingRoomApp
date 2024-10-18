import React, { useCallback, useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'

import { MdDeleteForever } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';

import { openModalCreatePhoto, openModalDeletePhoto, openModalUpdatePhoto } from '../../../../hooks/redux/actions';
import { getAllPhotos, getAllRoomId } from '../../../../APIs';
import { Pagination } from '../../../../components/Pagination';
import Avatar from '../../../../components/Avatar';
import './ManagePhotoStyle.scss';
import { IoIosAddCircle } from "react-icons/io";

export default function ManagePhotos() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [listRoomId, setListRoomId] = useState([]);
    const [selectRoomId, setSelectRoomId] = useState('');
    const [controlPagination, setControlPagination] = useState({
        page: 1,
        isNext: false,
        isPrevious: false
    });

    const modalUpdatePhoto = useSelector(state => state.modalUpdatePhoto);
    const modalDeletePhoto = useSelector(state => state.modalDeletePhoto);
    const modalCreatePhoto = useSelector(state => state.modalCreatePhoto);
    const handleCreate = () => dispatch(openModalCreatePhoto());
    const handleDelete = (photoId) => dispatch(openModalDeletePhoto(photoId));

    const handleUpdate = (photo) => {
        dispatch(openModalUpdatePhoto({
            id: photo.id,
            link: photo.link,
            roomId: photo.roomId,
        }))
    }

    const handleChangeRoom = (e) => {
        setSelectRoomId(e.target.value);
    }


    const fetchApiGetAllRoomId = async () => {
        let response = await getAllRoomId();
        if (response.status === 404) {
            alert(response.message);
        } else {
            setListRoomId(response.data);
        }
    }

    useEffect(() => {
        fetchApiGetAllRoomId();
    }, []);

    const handleClickNext =() => {
        setControlPagination({
            ...controlPagination,
            page: controlPagination.page + 1
        });
        fetchApi(selectRoomId, controlPagination.page + 1);
    }

    const handleClickPrevious =() => {
        if (controlPagination.page > 1) {
            setControlPagination({
                ...controlPagination,
                page: controlPagination.page - 1
            });
            fetchApi(selectRoomId, controlPagination.page - 1);
        }
    }
    const fetchApi = async (roomId, page) => {
        let response = await getAllPhotos(roomId, 5, page);
        if (response.status === 404) {
            alert(response.message);
        } else {
            setData(response.data.photoData);
            setControlPagination({
                page: response.data.currentPage,
                isNext: response.data.isNext,
                isPrevious: response.data.isPrevious
            })
        }
    }

    useEffect(() => {
        fetchApi(selectRoomId, controlPagination.page);
    }, [selectRoomId, modalUpdatePhoto, modalDeletePhoto, modalCreatePhoto]);
    return (
        <div className='ManagePhoto'>
            <div className='mb-3 d-flex align-items-center gap-3'>
                <div className='col-3'>
                    <label htmlFor="">Select Room:</label>
                    <Form.Select
                        className=' py-1 px-2'
                        aria-label="Default select example"
                        onChange={(e) => handleChangeRoom(e)}
                    >

                        <option value="">{`All`}</option>
                        {
                            listRoomId.map(room =>
                                <option key={`RoomId-${room.id}`} value={room.id}>{`Room-${room.id}`}</option>

                            )
                        }

                    </Form.Select>
                </div>
                <div className='col'>
                    <label htmlFor=""></label>
                    <button onClick={handleCreate} className="btn  px-2 py-1 btn-primary d-flex align-items-center gap-1">
                        <IoIosAddCircle />
                        <p>Create Photo</p>
                    </button>
                </div>

            </div>
            <Table bordered className='text-center mb-2'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Link</th>
                        <th>Room ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            return (
                                <tr key={`item-${item.id}`}  >
                                    <td >{item.id}</td>
                                    <td className='d-flex align-items-center gap-3 justify-content-center'>
                                        <div className='d-flex align-items-center '>
                                            <Avatar medium src={item.link} alt="" />
                                        </div>

                                    </td>
                                    <td className='text_short'>
                                        {item.link}
                                    </td>
                                    <td >{item.roomId}</td>
                                    <td className='d-flex fs-5 justify-content-around align-items-center' >
                                        <div
                                            className='text-warning'
                                            onClick={() => handleUpdate(item)}
                                        ><PiNotePencilFill /></div>
                                        <div
                                            className='text-danger'
                                            onClick={() => handleDelete(item.id)}
                                        ><MdDeleteForever /></div>
                                    </td>
                                </tr>)
                        })
                    }

                </tbody>
            </Table>
            <Pagination
                isNext={controlPagination.isNext}
                isPrevious={controlPagination.isPrevious}
                pageNumber={controlPagination.page}
                fnNext={handleClickNext}
                fnPrevious={handleClickPrevious} />
        </div>
    )
}
