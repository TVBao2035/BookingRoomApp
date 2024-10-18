import { Table } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserFriends, FaUserAlt, FaUserCog } from "react-icons/fa";
import './ManageUserStyle.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {  getUserByGroupId } from '../../../../APIs';
import { openModalCreateUser, openModalDeleteUser, openModalUpdateUser } from '../../../../hooks/redux/actions';
import Avatar from '../../../../components/Avatar';
import Pagination from '../../../../components/Pagination/Pagination';

export default function ManageUser() {
    const initGroup = [
        {
            id: 1,
            name: "Admin",
            icon: <FaUserCog /> 
        },
        {
            id: 2,
            name: "Manager",
            icon: <FaUserAlt />
        },
        {
            id: 3,
            name: "Customer",
            icon: <FaUserFriends />
        }
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const modalUpdateUser = useSelector(state => state.modalUpdateUser);
    const modalDeleteUser = useSelector(state => state.modalDeleteUser);
    const modalCreateUser = useSelector(state => state.modalCreateUser);
    const getUser = useSelector(state => state.user);

    const [page, setPage] = useState(1)
    const [data, setData] = useState([]);
    const [group, setGroup] = useState(3);

    const handleCreate = ()=> {
        dispatch(openModalCreateUser());
    }

    const handleDelete =(user)=> {
        dispatch(openModalDeleteUser({
            id: user.id,
            email: user.email
        }))
    }
    const handleUpdate = (user) => {
        dispatch(openModalUpdateUser({
            id: user.id,
            avatar: user.avatar,
            groupId: user.groupId,
            IDentify: user.IDentify,
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
        }))
    }

    const handleNext = () => {
        setPage(page+1);
    }
    const handlePrevious = () => {
        if((page-1) > 0){
            setPage(page-1);
        }
    }

    const fetchAPI = async (groupId, page)=> {
        let response = await getUserByGroupId(groupId, 5, page);
        if(response.status === 200){
            setData(response.data);
        }
        else{
            navigate('/manage');
            alert(response.message);
            
        }
    }
    useEffect(()=> {
        if (getUser.permissionCode <= 2 && getUser.permissionCode > 0 && JSON.parse(localStorage.getItem('isLogin')))
            fetchAPI(group, 1);
        else
            navigate('/');
    }, [group])
    useEffect(()=> {
       if(getUser.permissionCode <= 2 && getUser.permissionCode > 0 && JSON.parse(localStorage.getItem('isLogin'))) 
           fetchAPI(group, page);
       else
           navigate('/');
    }, [modalUpdateUser, modalDeleteUser, modalCreateUser, page]);
  return (
    <div className='ManageUser d-flex flex-column gap-3'>
        <div>
            <button 
                className="btn  px-2 py-1 btn-primary d-flex align-items-center gap-1"
                onClick={handleCreate}
            >
                <IoIosAddCircle />
                <p>Create User</p>
            </button>
        </div>
        <div className='d-flex gap-4'>
            {
                initGroup.map(groupItem => (
                    <div key={`group-${groupItem.id}`}>
                        <button 
                            className={groupItem.id == group ? 'btn btn-success px-2 py-1 d-flex gap-2 align-items-center' : 'btn btn-outline-secondary px-2 py-1 d-flex gap-2 align-items-center'}
                            onClick={()=>setGroup(groupItem.id)}
                        >
                            {
                                groupItem.icon
                            }
                            <p>{groupItem.name}</p>
                        </button>
                    </div>

                ))
            }
           
        </div>

        <Table bordered hover className='text-center'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Avatar</th>
                    <th>Permission</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>IDentify</th>
                    <th>Date Create</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.users?.map((item) => {
                        return (
                            <tr key={`item-${item.id}`}>
                                <td>{item.id}</td>
                                <td><Avatar src={item.avatar} small/></td>
                                <td>{item.groupId === 2 ? "Manager" : (item.groupId === 3 ? "Customer" : "Admin")}</td>
                                <td className='text_short'>{item.name}</td>
                                <td className='text_short'>{item.email}</td>
                                <td className='text_short'>{item.phone}</td>
                                <td className='text_short'>{item.IDentify}</td>
                                <td>{item.createdAt}</td>
                                <td className='d-flex fs-5 justify-content-around align-items-center' >
                                    <div 
                                        className='text-warning h-100' 
                                        onClick={() => handleUpdate(item)}
                                    ><PiNotePencilFill /></div>
                                    <div 
                                        className='text-danger h-100' 
                                        onClick={() =>handleDelete(item)}
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
