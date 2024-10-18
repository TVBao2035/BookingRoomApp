import './detailsStyle.scss';
import { CiWifiOn } from "react-icons/ci";
import { IoRestaurantOutline, IoCarSportOutline } from "react-icons/io5";
import { MdFamilyRestroom, MdOutlineCoffeeMaker } from "react-icons/md";
import { LiaSmokingBanSolid } from "react-icons/lia";
import { RiFridgeLine } from "react-icons/ri";
import { PiWashingMachine } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { FaStar } from "react-icons/fa";

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, } from 'react-router-dom';

import { getDetailsRoom } from '../../APIs'
import { openBookRoom } from '../../hooks/redux/actions';
import ContainerComment from '../../components/ContainerComment';
import autoRenderIcon from '../../helpers/autoRenderIcon';




export default function Details() {

    const dispatch = useDispatch();
    const location = useLocation();
    const roomId = location.search.split('=')[1];
    const [room, setRoom] = useState();
    const [mainPhoto, setMainPhoto] = useState();
   
    const fetchAPI = async (roomId) => {
        let res = await getDetailsRoom(roomId);
        if (res.status === 404) {
            alert(res.message);
            return;
        }

        setRoom(res.data);
        setMainPhoto(res.data.Photos[0])

    };

    useEffect(() => {
        fetchAPI(roomId);
    }, [])

    const handleBookRoom = (id, price) => {
        dispatch(openBookRoom({
            roomId: id,
            price: price
        }))
    }

    return (
        <div className='Details'>
            <div className="container-sm row d-flex gap-3">
                <div className='col-sm-6 col-12 overflow-hidden d-flex flex-column gap-2'>
                    <div className="w-100 main_photo rounded-4 overflow-hidden">
                        <img src={mainPhoto?.link} alt="" />
                    </div>
                    <div className="list_images d-flex overflow-x-scroll overflow-y-hidden gap-1 flex-wrap flex-sm-nowrap justify-content-sm-between justify-content-around  border px-2 py-1">
                        {
                            room?.Photos.map(photo =>
                                <div className='position-relative' key={`photo-${photo.id}`} onClick={() => setMainPhoto(photo)}>
                                    <img src={photo.link} width={100} height={100} alt="" />
                                    {
                                        mainPhoto?.id === photo.id &&
                                        <div className='position-absolute modal_img w-100 h-100 top-0 text-white fs-1 d-flex align-items-center justify-content-center'>
                                            <MdCheck />
                                        </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='col d-flex flex-column gap-sm-5 px-2 px-sm- mt-4'>
                    <div className='d-flex flex-column gap-4'>
                        <div className='d-flex flex-column gap-2'>
                            <h3 className='fs-3'>{`Room . ${room?.id}`}</h3>
                            <div className='d-flex align-items-center gap-2'><FaStar className='text-warning' /><p>5.0</p></div>
                            <div className='d-flex align-items-center gap-2'><MdFamilyRestroom className='text-primary' /><p>For {room?.numberOfPeople} People</p></div>
                        </div>
                        <div>
                            <div className='d-flex align-items-center text-warning'>
                                <TbFileDescription className='fs-6' />
                                <p className=''>Description:</p>
                            </div>
                            <p>{room?.description}</p>
                        </div>
                        <h1 className='fs-5 text-danger mb-1 mb-sm-0'>Price: {room?.price}đ/day</h1>
                    </div>
                    <div>
                        <ul className='d-flex list-unstyled gap-4 flex-wrap text-success'>
                            {
                                room?.Services.map(service => (
                                    <li className='d-flex align-items-center gap-2'>
                                        {
                                            autoRenderIcon(service.id)
                                        }
                                        <p>{service.name}</p>
                                    </li>

                                ))
                            }
                          
                        </ul>
                    </div>
                    <div className='text-start mt-1 mt-sm-0'>
                        {
                            room?.Contract ? (
                                <div className="btn btn-secondary px-4 py-2 fw-bolder">Hiring</div>
                            ) : (
                                <div 
                                    onClick={() => handleBookRoom(room?.id, room?.price)} 
                                    className="btn btn-info px-4 py-2 fw-bolder text-white">Book Now</div>
                            )
                        }
                    </div>
                </div>
                <hr />
            </div>
            {/* comment */}
            <ContainerComment roomId={roomId}/>
        </div>
    )
}
