import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllRoom } from '../../../../APIs';
import Avatar from '../../../../components/Avatar';
import { openModalCreateRoom, openModalDeleteRoom, openModalUpdateRoom } from '../../../../hooks/redux/actions';

import { MdDeleteForever, MdOutlinePublic, MdOutlinePublicOff } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import './ManageRoomStyle.scss';

import { Table } from 'react-bootstrap'
import Pagination from '../../../../components/Pagination/Pagination';
import autoRenderIcon from '../../../../helpers/autoRenderIcon';

export default function ManageRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [data, setData] = useState();
    const [publicRoom, setPublicRoom] = useState(true);

    const user = useSelector(state => state.user);
    const modalUpdateRoom = useSelector(state => state.modalUpdateRoom);
    const modalDeleteRoom = useSelector(state => state.modalDeleteRoom);
    const modalCreateRoom = useSelector(state => state.modalCreateRoom);

    const fetchApi = async ( page=1) => {
        let response =  [];
        const limit = 5;
        if(publicRoom){
            response = await getAllRoom({ allPhotos: 1, notPhoto: 0, limit: limit, page: page });
        }else{
            response = await getAllRoom({ notPhoto: 1, limit: limit, page: page })
        }
      
        if (response.status === 200) {
            setData(response.data);
        } else {
            navigate('/manage');
            alert(response.message);
        }
    }

    const handleCreate =()=> dispatch(openModalCreateRoom());

    const handleDelete =(id) => {
        dispatch(openModalDeleteRoom(id))
    }

    const handleUpdate = (room) => {
        dispatch(openModalUpdateRoom({
            id: room.id,
            description: room.description,
            photoId: room.photoId,
            numberOfPeople: room.numberOfPeople,
            listImagines: [...room.Photos],
        }))
    }

    const handleNext = () => {
        setPage(page+1);
    }

    const handlePrevious = () => {
        if((page-1)>0){
            setPage(page-1);
        }
    }
    useEffect(()=> {
        if (user.permissionCode <= 2 && user.permissionCode > 0)
            fetchApi(1);
        else
            navigate('/');
    }, [publicRoom]);

    useEffect(()=>{
        if (user.permissionCode <= 2 && user.permissionCode > 0)
            fetchApi(page);
        else
            navigate('/');
    }, [modalUpdateRoom, modalDeleteRoom, modalCreateRoom, page])
  return (
    <div className='ManageRoom'>
        
        <div className= 'mb-3 d-flex gap-2'>
            <button onClick={handleCreate} className="btn  px-2 py-1 btn-primary d-flex align-items-center gap-1">
                <IoIosAddCircle />
                <p>Create Room</p>
            </button>
            <button onClick={() => setPublicRoom(!publicRoom)} className={publicRoom ? "btn btn-success px-2 py-1" : "btn btn-danger px-2 py-1" }>
              {
                publicRoom ? 
                <p className='d-flex align-items-center gap-2'><MdOutlinePublic />  {`Public Room`}</p> 
                : <p className='d-flex align-items-center gap-2'><MdOutlinePublicOff />  {`Private Room`}</p> 
              }
            </button>
        </div>
       
    {
        publicRoom ? 
        (  
            <Table bordered className='text-center'>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Id</th>
                        <th>Imagines</th>
                        <th>Services</th>
                        <th>Description</th>
                        <th>People</th>
                        <th>photoId</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.rooms?.map((item) => {
                            return (
                                <tr key={`item-${item.id}`}>
                                    <td
                                        className='d-flex align-items-center py-0' 
                                        style={{color: item.Contract ? 'red' : 'green', fontWeight: '500'}}
                                    >{item.Contract ? "HIRED" : "EMPTY"}</td>
                                    <td className='pt-3'>{item.id}</td>
                                    <td className='d-flex align-items-center gap-3'>
                                        <div className='d-flex align-items-center gap-2 p-2'>
                                            { 
                                                item?.Photos?.map(photo => <Avatar key={`photo-${photo.id}`} small src={photo.link}/>)
                                            }
                                        </div>
                                    
                                    </td>
                                    <td>
                                        <div className='d-flex flex-wrap align-items-center gap-2 p-2'>
                                            {
                                                item?.Services?.map(service => (
                                                    <div className='d-flex text-success gap-1'>
                                                        {
                                                            autoRenderIcon(service.id)
                                                        }
                                                        <p style={{fontSize: "10px"}}>{service.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td className='text_description pt-3' style={{fontSize: "12px"}}>{item.description}</td>
                                    <td className='pt-3  '>{item.numberOfPeople}</td>
                                    <td className='pt-3 '>{item.photoId}</td>
                                    <td className='d-flex fs-5 justify-content-around align-items-center' >
                                        <div 
                                            className='text-warning d-flex align-content-center p-2'
                                            onClick={() => handleUpdate(item)}
                                        ><PiNotePencilFill /></div>
                                        
                                        <div 
                                            className='text-danger d-flex align-content-center p-2'
                                            onClick={()=> handleDelete(item.id)}
                                        ><MdDeleteForever /></div>
                                    </td>
                                </tr>)
                        })
                    }

                </tbody>
            </Table>
        ):(
            <Table bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Services</th>
                        <th>Description</th>
                        <th>photoId</th>
                        <th>People</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.rooms?.map((item) => {
                            return (
                                <tr key={`item-${item.id}`}>
                                    <td>{item.id}</td>
                                    <td>
                                        <div className='d-flex flex-wrap align-items-center gap-2 p-2'>
                                            {
                                                item?.Services?.map(service => (
                                                    <div className='d-flex text-success gap-1'>
                                                        {
                                                            autoRenderIcon(service.id)
                                                        }
                                                        <p style={{ fontSize: "10px" }}>{service.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td style={{ fontSize: "12px" }}>{item.description}</td>
                                    <td>{item.photoId}</td>
                                    <td>{item.numberOfPeople}</td>
                                    <td className='d-flex fs-5 justify-content-around align-items-center' >
                                        <div
                                            className='text-warning d-flex align-content-center p-2'
                                            onClick={() => handleUpdate(item)}
                                        ><PiNotePencilFill /></div>
                                        <div
                                            className='text-danger d-flex align-content-center p-2'
                                            onClick={() => handleDelete(item.id)}
                                        ><MdDeleteForever /></div>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </Table>
        )
    }
    <Pagination 
        isNext={data?.isNext}
        isPrevious={data?.isPrevious}
        pageNumber={data?.currentPage}
        fnNext={handleNext}
        fnPrevious={handlePrevious}
    />
    </div>
  )
}
