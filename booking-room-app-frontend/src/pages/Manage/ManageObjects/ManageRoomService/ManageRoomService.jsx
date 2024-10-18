import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import { PiNotePencilFill } from 'react-icons/pi'
import { Pagination } from '../../../../components/Pagination'
import { getAllRoomService } from '../../../../APIs/roomServiceAPI'
import { useDispatch, useSelector } from 'react-redux'
import { openModalCreateRoomService, openModalDeleteRoomService, openModalUpdateRoomService } from '../../../../hooks/redux/actions'

export default function ManageRoomService() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const modalUpdateRoomService = useSelector(state => state.modalUpdateRoomService);
    const modalCreateRoomService = useSelector(state => state.modalCreateRoomService);
    const modalDeleteRoomService = useSelector(state => state.modalDeleteRoomService);
    const handlePrevious = () => {
        if (page - 1 > 0)
            setPage(page - 1);
    }
    const handleCreate = () => {
        dispatch(openModalCreateRoomService());
    }
    const handleUpdate = (item) => {
        dispatch(openModalUpdateRoomService({
            id: item.id,
            serviceId: item.serviceId,
            roomId: item.roomId
        }))
    }
    const handleDelete = (id) => {
        dispatch(openModalDeleteRoomService(id));
    }
    const handleNext = () => {
        setPage(page + 1);
    }
    
    const fetchApi = async (page) => {
        const response = await getAllRoomService(page, 5);
        if(response.status === 200){
            setData(response.data);
            return;
        }

        alert(response.message);
    }
    useEffect(()=>{
        fetchApi(page);
    }, [page, modalCreateRoomService, modalDeleteRoomService, modalUpdateRoomService])
  return (
      <div>
          <div className='mb-3 d-flex gap-2'>
              <button
                  onClick={handleCreate}
                  className="btn  px-2 py-1 btn-primary d-flex align-items-center gap-1">
                  <IoIosAddCircle />
                  <p>Create Room Service</p>
              </button>
          </div>
          <Table bordered className='text-center mb-2'>
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Service ID</th>
                      <th>Room ID</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      data?.roomService?.map((item) => {
                          return (
                              <tr key={`item-${item.id}`}  >
                                  <td >{item.id}</td>
                                  <td>
                                      {item.serviceId}
                                  </td>
                                  <td>
                                      {item.roomId}
                                  </td>
                                  <td className='d-flex fs-5 justify-content-around align-items-center' >
                                      <div
                                          className='text-warning'
                                          onClick={() => handleUpdate(item)}
                                      ><PiNotePencilFill /></div>
                                      <div
                                          className='text-danger'
                                          onClick={() => handleDelete(item.id)}
                                      ><MdDeleteForever /></  div>
                                  </td>
                              </tr>)
                      })
                  }

              </tbody>
          </Table>
          <Pagination
              isNext={data.isNext}
              isPrevious={data.isPrevious}
              pageNumber={data.currentPage}
              fnNext={handleNext}
              fnPrevious={handlePrevious}
          />
      </div>
  )
}
