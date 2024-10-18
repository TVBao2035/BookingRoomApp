import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { openModalCreateService, openModalDeleteService, openModalUpdateService } from '../../../../hooks/redux/actions';
import { getAllService, updateService} from '../../../../APIs/serviceAPI';
import { Pagination } from '../../../../components/Pagination';
export default function ManageService() {
  const dispatch = useDispatch();
  const modalCreateService = useSelector(state => state.modalCreateService);
  const modalUpdateService = useSelector(state => state.modalUpdateService);
  const modalDeleteService = useSelector(state => state.modalDeleteService);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const handleCreate = () => {
    dispatch(openModalCreateService())
  }

  const handlePrevious = () => {
    if(page-1 > 0 )
      setPage(page-1);
  }

  const handleNext = () => {
    setPage(page+1);
  }


  const handleUpdate = async(item) => {
    dispatch(openModalUpdateService({id: item.id, name: item.name}));
  }
  const handleDelete = async (id) => {
    dispatch(openModalDeleteService(id));
  }

  const fetchAPI = async (page) => {
    let response = await getAllService(page, 5);

    if(response.status === 200){
      setData(response.data);
      return;
    }

    alert(response.message);
  }
  useEffect(() => {
    fetchAPI(page);
  }, [modalCreateService, modalDeleteService, modalUpdateService,page])

  return (
    <div>
      <div className='mb-3 d-flex gap-2'>
        <button
            onClick={handleCreate}
            className="btn  px-2 py-1 btn-primary d-flex align-items-center gap-1">
          <IoIosAddCircle />
          <p>Create Service</p>
        </button>
      </div>
      <Table bordered className='text-center mb-2'>
        <thead>
          <tr>
            <th>Service Id</th>
            <th>Service Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.services?.map((item) => {
              return (
                <tr key={`item-${item.id}`}  >
                  <td >{item.id}</td>
                  <td>
                    {item.name}
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
