import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getAllContract } from '../../../../APIs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { openModalCreateContract, openModalDeleteContract, openModalUpdateContract } from '../../../../hooks/redux/actions';
import Pagination from '../../../../components/Pagination/Pagination';

export default function ManageContract() {
    const getUser = useSelector(state => state.user);
    const modalUpdateContract = useSelector(state => state.modalUpdateContract);
    const modalDeleteContract = useSelector(state => state.modalDeleteContract);
    const modalCreateContract = useSelector(state => state.modalCreateContract);

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchApi = async (page=1) => {
        let response = await getAllContract(5, page);
        if (response.status === 200) {
            setData(response.data);
        } else {
            navigate('/manage');
            alert(response.message);
        }
    }
    const handleCreate = () => dispatch(openModalCreateContract());
    const handleDelete = (contractId) => dispatch(openModalDeleteContract(contractId));
    const handlePrevious = () => {
        if((page-1)> 0){
            setPage(page-1);
        }
    }
    const handleNext = () => {
        setPage(page+1)
    }
    const handleUpdate = (contract) => {
        dispatch(openModalUpdateContract({
            id: contract.id,
            userId: contract.User.id,
            name: contract.User.name,
            email: contract.User.email,
            phone: contract.User.phone,
            roomId: contract.Room.id,
            price: contract.Room.price,
            sumMoney: contract.sumMoney,
            startDate: contract.startDate,
            endDate: contract.endDate,
        }))
    }
    useEffect(() => {
        if (getUser.permissionCode <= 2 && getUser.permissionCode > 0)
            fetchApi(page);
        else
            navigate('/');
    }, [modalUpdateContract, modalDeleteContract, modalCreateContract, page]);
    return (
        <div>
            <div className='mb-2'>
                <button onClick={handleCreate} className="btn  px-2 py-1 btn-primary d-flex align-items-center gap-1">
                    <IoIosAddCircle />
                    <p>Create Contract</p>
                </button>
            </div>
            <Table bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Room Id</th>
                        <th>Price</th>
                        <th>Sum Money</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.contracts?.map((item) => {
                            return (
                                <tr key={`item-${item.id}`}>
                                    <td>{item.id}</td>
                                    <td>{item.User.id}</td>
                                    <td>{item.User.name}</td>
                                    <td>{item.User.email}</td>
                                    <td>{item.User.phone}</td>
                                    <td>{item?.Room?.id}</td>
                                    <td>{item.Room?.price}</td>
                                    <td>{item.sumMoney}</td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td className='d-flex fs-5 justify-content-around align-items-center' >
                                        <div
                                            className='text-warning h-100'
                                            onClick={() => handleUpdate(item)}
                                        ><PiNotePencilFill /></div>
                                        <div
                                            className='text-danger h-100'
                                            onClick={() => handleDelete(item.id)}
                                        ><MdDeleteForever /></div>
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
