import './modalBookRoom.scss';
import { IoMdClose } from "react-icons/io";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createContract } from '../../../APIs';
import { formatDate } from '../../../helpers/timeFront';
import { closeBookRoom } from '../../../hooks/redux/actions';
import { formatMoneyStyle1 } from '../../../helpers/formatMoney';

export default function ModalBookRoom() {
    const user = useSelector(state => state.user);
    const modalBookingRoom = useSelector(state => state.bookingRoom);
    const startDate = formatDate(new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear());
    const endDate = formatDate(new Date().getDate() + 1, new Date().getMonth() + 1, new Date().getFullYear());
    const navigate = useNavigate();
    console.log(modalBookingRoom);
    const initInformantion = {
        userId: user.id,
        roomId: modalBookingRoom.roomId,
        startDate: null,
        endDate: null
    }


    const [information, setInformation] = useState(initInformantion);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(closeBookRoom())
    };


    const handleChange = (e) => {
        setInformation({
            ...information,
            [e.target.name]: e.target.value
        })
    }

    const handleBooking = async () => {
        const duration = Math.ceil((new Date(information.endDate).getTime() - new Date(information.startDate).getTime()) / (24 * 60 * 60 * 1000));

        if (duration > 0) {
            console.log(information);
            let response = await createContract(information);
            if (response.status === 404) {
                alert(response.message);
                return;
            }

            dispatch(closeBookRoom());
            navigate('/contract');
        } else {
            alert("You have to choose more one day");
        }
    }


    return (
        <div className='ModalBookRoom rounded-3 w-75 bg-white px-4 py-4 d-flex flex-column gap-4'>
            <div className='row gap-3'>
                <div className='col d-flex justify-content-lg-between fs-5 fw-bold'>
                    <p>{`Booking [ Room . ${modalBookingRoom.roomId} ]`}</p>
                    <IoMdClose onClick={() => closeModal()} />
                </div>
            </div>


            <div className='row gap-3'>
                <div className='col'>
                    <label htmlFor="">- Start:</label>
                    <input type="date"
                        className='form-control py-1 px-2'
                        name='startDate'
                        onChange={e => handleChange(e)}
                        min={startDate}


                    />
                </div>
                <div className='col'>
                    <label htmlFor="">- End:</label>
                    <input type='date'
                        className='form-control py-1 px-2'
                        name='endDate'
                        min={endDate}
                        onChange={e => handleChange(e)}
                    />
                </div>
            </div>

            <div className='row gap-3'>
                <div className='col text-center'>
                    <button className='btn btn-primary px-4 py-1'
                        onClick={handleBooking}
                    >Book</button>
                    <p>
                        {
                            information.startDate
                                && information.endDate
                                && Math.ceil(
                                    (new Date(information.endDate).getTime() - new Date(information.startDate).getTime())
                                    / (24 * 60 * 60 * 1000)) > 0
                                ? `Total: 
                        ${formatMoneyStyle1(Math.ceil(
                                    (new Date(information.endDate).getTime() - new Date(information.startDate).getTime())
                                    / (24 * 60 * 60 * 1000))
                                    * modalBookingRoom.price)}đ/
                        ${Math.ceil((new Date(information.endDate).getTime() - new Date(information.startDate).getTime())
                                        / (24 * 60 * 60 * 1000))} days` : ""
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
