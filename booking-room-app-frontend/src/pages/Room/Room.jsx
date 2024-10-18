import './roomStyle.scss';
import { FaStar, FaDollarSign, FaSortAmountUp } from "react-icons/fa";
import { CiWifiOn } from "react-icons/ci";
import { MdFamilyRestroom } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { GoNumber } from "react-icons/go";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaArrowDownShortWide, FaGetPocket, FaClock } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { TbListDetails, TbBrandBooking } from "react-icons/tb";


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getAllRoom } from '../../APIs'; 
import { openBookRoom } from '../../hooks/redux/actions';
import listColor from '../../helpers/listColor';
import autoRenderIcon from '../../helpers/autoRenderIcon';

export default function Room() {
  const initMenu = [
  {
    id: 1,
    sort: 'id',
    type: 'asc',
    name: (
      <div className='d-flex align-items-center gap-2 fs-6'>
        <FaSortAmountUp /> 
        <GoNumber />
      </div>
    )
  },
  {
    id: 2,
    sort: 'id',
    type: 'desc',
    name: (
      <div className='d-flex align-items-center gap-2 fs-6'>
        <FaArrowDownShortWide />
        <GoNumber />
      </div>
    )
  
  },
  {
    id: 3,
    sort: 'price',
    type: 'asc',
    name: (
      <div className='d-flex align-items-center gap-2 fs-6'>
        <FaSortAmountUp />
        <RiMoneyDollarCircleFill />
      </div>
    )
  },
  {
    id: 4,
    sort: 'price',
    type: 'desc',
    name: (
      <div className='d-flex align-items-center gap-2 fs-6'>
        <FaArrowDownShortWide />
        <RiMoneyDollarCircleFill />
      </div>
    )
  }
  ]
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [roomList, setRoomList] = useState();
  const dispatch = useDispatch();
  const [sort, setSort] = useState({
    id: 1,
    sort: 'id',
    type: 'asc',
    name: <FaArrowDownShortWide/>
  });
  
  const menu = initMenu.filter(e => e.id === sort.id);
  const [isNotHired, setisNotHired] = useState(false);
  
 
  const fetchAPI = async (sort, type, isNotHired) => {
    let res = await getAllRoom({sort, type, isNotHired, notPhoto: 0, limit: 100, page: 1});
    if(res.status === 404){
      alert(res.message);
      return;
    }
    setRoomList(res.data)
  }

  const handleBooking = (id, price) => {
  
    dispatch(openBookRoom({
      roomId: id,
      price: price
    }))
  }
  useEffect(()=>{
    fetchAPI(sort.sort, sort.type, isNotHired ? 1 : 0);
  }, [isNotHired, sort]);
  

  console.log(roomList);

  return (
    <div className='Room d-flex justify-content-center w-100 user-select-none'>
     
      <div className='container'>
        <nav className='d-sm-flex gap-2 py-2'>
          <div className='d-flex gap-1 col-sm-4'>
            <label style={{ color: listColor[parseInt(Math.random() * 10)] }} 
                  htmlFor=""
                  className='fw-bolder border px-2 py-1 rounded-2'
            >Search: </label>
            <input className='form-control px-2 mb-1 mb-sm-0 ms-1 ms-sm-0' />
            <div className=' rounded-1 border fw-bolder fs-5 d-flex align-items-center p-1' style={{color: listColor[parseInt(Math.random() * 10)]}}>
              <FiSearch />
            </div>
          </div> 
          <div className='d-flex gap-1'>
            {
              initMenu.map(item => item.id !== sort.id  &&  <li key={`btn-${item.id}`}>
                                  <button
                                    className={'btn btn-outline-secondary px-2 py-1'}
                                    onClick={()=>setSort(item)}
                                  >{item.name}</button>
                                </li>)
            }
          </div>
        </nav>
        <nav className='d-flex gap-2 ps-4 py-2 border border-1 d-flex align-items-center'>
          <p>Sort By: </p>
          <li>
            <button className={isNotHired ? 'btn btn-primary text-white px-2 py-1' : 'btn btn-outline-primary px-2 py-1'}
              onClick={() => setisNotHired(!isNotHired)}>Not Hire</button>
          </li>
          {
            menu.map(item => <li key={`btn-${item.id}`}>
              <button
                className={item.id === sort.id ? 'btn btn-success text-white px-2 py-1' : 'btn btn-outline-secondary px-2 py-1'}
              >{item.name}</button>
            </li>)
          }
            
        </nav>

        <div className='row mt-3'>
            <div className='col d-flex flex-wrap'>
              {
                roomList?.length === 0 ? (
                  <div className='col-12 fw-medium'>
                    <p className='fs-3'>--- Not Room!!! ---</p>
                  </div>
                ) :
                roomList && roomList?.rooms?.map(room => 
                  <div key={`room-${room.id}`} className=" col-xl-4  col-sm-6 col-12 d-flex gap-1 room_item px-2 py-2 ">
                    <div className='col position-relative  rounded-2 overflow-hidden'>
                      <img src={room.Photos[0].link} alt="" className='w-100 h-100' />
                      {
                        room.Contract &&
                        <div className='position-absolute modal_hired w-100 h-100 top-0 d-flex align-items-start justify-content-start  rounded-2'>
                          <div className='text-center fw-bold branch_hire text-white px-2 py-1 d-flex align-items-center gap-1'>
                            <FaClock />
                            <p>Hired</p>
                          </div>
                        </div>
                      }
                    </div>
                    <div className='col d-flex flex-column gap-1 justify-content-between'>
                      <div className='d-flex flex-column gap-2'>
                        <h4>Room.{room.id}</h4>
                        <div className=' d-flex gap-1 align-items-center price fw-bolder text-danger'><FaDollarSign /> <p> {room.price}đ /day</p></div>
                        <div className='fs-6 d-flex align-items-center gap-1'><FaStar className='text-warning'/><p >5.0</p></div>
                        <div className='d-flex gap-1'><MdFamilyRestroom className='text-primary'/><p>For {room.numberOfPeople} people</p></div>
                        <div className='d-flex gap-3 fs-6 text-success'>
                          <div className='d-flex gap-1'>
                            <CiWifiOn/><p>Free Wifi</p>
                          </div>
                          <div className='d-flex gap-1'>
                            <IoRestaurantOutline /><p>Free Buffer</p>
                          </div>
                        </div>
                      </div>
                      <div className='gap-1 d-flex justify-content-end '>
                        <Link to={`/details?room=${room.id}`} className='btn btn-info btn_details py-1 px-2 d-flex align-items-center gap-1'>
                          <TbListDetails/>
                          <p>Details</p>
                        </Link>
                        {
                          !room.Contract &&
                          <button className={ 'btn btn-warning py-1 px-2 d-flex align-items-center gap-1'}
                                  onClick={() => handleBooking(room.id, room.price)}
                          >
                              <TbBrandBooking className='text-white fs-5'/>
                              <p>Book</p>
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                )
              }
            
            </div>
        </div>
      </div>
    </div>
  )
}
