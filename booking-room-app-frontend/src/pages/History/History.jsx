import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Form } from 'react-bootstrap';
import { MdQrCode, MdOutlineDoorSliding, MdDateRange, MdAttachMoney, MdOutlineAccessTime, MdArrowForward, MdYoutubeSearchedFor } from "react-icons/md";

import { getHistoryByUserId } from '../../APIs';
import listColor from '../../helpers/listColor';
import { formatMoneyStyle1 } from '../../helpers/formatMoney';

export default function History() {

    const [listHistories, setListHistories] = useState([]);
    const [date, setDate] = useState();
    const user = useSelector(state => state.user);


    const handleChange = (e) => {
        setDate(e.target.value);
    }
    const handleSearch = () => {
        if (date) {
            let month = parseInt(date?.split('-')[1]);
            let year = parseInt(date?.split('-')[0]);
            fetchApi(user.id, month, year);
        } else {
            fetchApi(user.id);
        }
    }
    const fetchApi = async (id, month, year) => {
        let response = await getHistoryByUserId(id, month, year);
        if (response.status === 200) {
            setListHistories(response.data);
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        fetchApi(user.id)
    }, []);
    return (
        <div className='History container px-5 mx-5'>
            <div className='d-flex gap-4 justify-content-center my-4'>
                <div className='col-3'>
                    <label htmlFor="">Select History :</label>
                    <input
                        style={{ color: listColor[parseInt(Math.random() * 10)] }}
                        onChange={(e) => handleChange(e)}
                        name="end"
                        type="month"
                        placeholder='Month'
                        className='form-control px-2 py-1'
                    />
                </div>

                <div className=' d-flex align-items-end'>
                    <button
                        className='btn fs-4 px-2 d-flex align-items-center py-1 text-white'
                        style={{ backgroundColor: listColor[parseInt(Math.random() * 10)] }}
                        onClick={handleSearch}
                    >
                        <MdYoutubeSearchedFor />
                    </button>
                </div>
            </div>
            <hr />
            {
                listHistories.map((history, index) =>
                    <div className='d-flex px-5 mx-5 my-4 row' key={`item-${index}`}>

                        <div className='d-flex gap-4 col-4'>
                            <div className='d-flex align-items-center' style={{ color: listColor[parseInt(Math.random() * 10)] }}>
                                <h3>{++index}</h3>
                            </div>
                            <div>

                            </div>
                            <div>
                                <div className=' d-flex gap-1 align-items-center'>
                                    <MdQrCode style={{ color: listColor[parseInt(Math.random() * 10)] }} />
                                    <p>Code: </p>
                                    <p className='fw-bolder' style={{ color: listColor[parseInt(Math.random() * 10)] }}>{history.id}</p>
                                </div>
                                <div className='d-flex gap-1 align-items-center'>
                                    <MdOutlineDoorSliding style={{ color: listColor[parseInt(Math.random() * 10)] }} />
                                    <p>Room Number: </p>
                                    <p className='fw-bolder' style={{ color: listColor[parseInt(Math.random() * 10)] }}>{history.roomId}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='d-flex gap-1 align-items-center'>
                                <MdAttachMoney style={{ color: listColor[parseInt(Math.random() * 10)] }} />
                                <p>Sum Of Money: </p>
                                <p className='fw-bolder' style={{ color: listColor[parseInt(Math.random() * 10)] }}>{formatMoneyStyle1(history.sumMoney)}đ</p>
                            </div>
                            <div className='d-flex gap-1 align-items-center'>
                                <MdOutlineAccessTime style={{ color: listColor[parseInt(Math.random() * 10)] }} />
                                <p>Duration: </p>
                                <p className='fw-bolder' style={{ color: listColor[parseInt(Math.random() * 10)] }}>{history.duration} Day</p>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='d-flex gap-1 align-items-center'>
                                <MdDateRange style={{ color: listColor[parseInt(Math.random() * 10)] }} />
                                <p>Start Date:</p>
                                <p className='fw-bolder' style={{ color: listColor[parseInt(Math.random() * 10)] }}>{history.startDate}</p>
                            </div>
                            <div className='d-flex gap-1 align-items-center'>
                                <MdDateRange style={{ color: listColor[parseInt(Math.random() * 10)] }} />
                                <p>End Date:</p>
                                <p className='fw-bolder' style={{ color: listColor[parseInt(Math.random() * 10)] }}>{history.endDate}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
