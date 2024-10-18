import Form from 'react-bootstrap/Form';
import { RiEditBoxLine, RiArrowGoBackFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePhotoLibrary } from "react-icons/md";

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AVATAR } from '../../assets/photos/avatar';
import { getUserByEmail, updateUserAPI } from '../../APIs';
import { updateUser, updateUserName } from '../../hooks/redux/actions';
import Avatar from '../../components/Avatar';

export default function Account() {
  const getUser = useSelector(state => state.user)
  const initUser = {
    id: getUser.id,
    email: "",
    phone: "",
    name: "",
    IDentify: "",
    avatar: "",
    createdAt: ""
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(initUser);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  
  const handlClickUpdate = async() => {
    if(isUpdate){
      let response = await updateUserAPI({
        ...user,
      })
      dispatch(updateUserName(user.name));
    }
    setIsUpdate(!isUpdate);
  }
  
  
  const getDetailsUser = async (email)=> {
    let response = await getUserByEmail(email);
    if(response.status === 404){
      alert(response.message);
      return;
    }
    setUser({...response.data});
    
  }
  
  const handleChange = (e)=>{ 
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSelect = (e)=> {
    e.target.select();
  }
  
  
  useEffect(()=>{
    getDetailsUser(getUser.email);
  }, []);
  return (
    <div className='Account container'>
      <div className='d-flex flex-column justify-content-center align-content-center m-3 gap-2'>
        <div className='d-flex justify-content-center user-select-none'>
          <Avatar src={user.avatar} large/>
        </div>
        <div className="px-2 d-flex gap-4 align-items-center justify-content-center ">
          <div>
            {
              isUpdate ?
                <button onClick={handlClickUpdate} className="btn btn-primary py-1 px-4 d-flex align-items-center gap-1">
                  <FaCheck/>
                  <p className='fw-bolder'>Ok</p>
                </button> 
              : 
                <button onClick={handlClickUpdate} className="btn btn-success py-1 px-2 d-flex align-items-center gap-1">
                  <RiEditBoxLine/>
                  <p>Update</p> 
                </button>
            }
            
          </div>
        </div>
      </div>
      <div className='d-flex flex-column gap-3'>
        <div className="row">
          {
            isUpdate && 
          <div className="col-sm-12 px-2">
            <label htmlFor="">Avatar:</label>
            <button className='btn btn-primary py-1 px-2 m-2' onClick={()=>{setIsChangeAvatar(!isChangeAvatar);}}>
                  {
                    isChangeAvatar ? 
                      (
                        <div className='d-flex align-items-center gap-1'>
                          <RiArrowGoBackFill />
                          <p>Back</p>
                        </div>
                      ) : (
                        <div className='d-flex align-items-center gap-1'>
                          <MdOutlinePhotoLibrary />
                          <p>Change Avatar</p>
                        </div>
                      )
                  }
            </button>
            {
              isChangeAvatar && 
              <input  
                name='avatar' 
                onChange={(e)=>handleChange(e)} 
                onSelect={e=>handleSelect(e)}  
                value={user.avatar} 
                disabled={!isUpdate} 
                className='form-control py-1 px-2' 
                type="text"
              />
            }
          </div>
          }
        </div>
        <div className="row gap-sm-0 gap-3">
          <div className="col-sm-6 px-2">
            <label htmlFor="">Email</label>
            <input 
                value={user.email ? user.email: ""} 
                disabled={!isUpdate} 
                name='email'
                onChange={(e) => handleChange(e)}  
                className='form-control py-1 px-2' 
                type="text" />
          </div>
          <div className="col-sm-6 px-2">
            <label htmlFor="">Phone:</label>
            <input 
                value={user.phone} 
                disabled={!isUpdate} 
                name='phone'
                onChange={(e) => handleChange(e)} 
                className='form-control py-1 px-2' 
                type="text" />
          </div>
        </div>

        <div className="row gap-sm-0 gap-3">
          <div className="col-sm-6 px-2">
            <label htmlFor="">Name:</label>
            <input 
                name='name' 
                onChange={(e)=>handleChange(e)} 
                value={user.name ? user.name : ""} 
                disabled={!isUpdate} 
                className='form-control py-1 px-2' 
                type="text" />
          </div>
          <div className="col px-2">
            <label htmlFor="">IDentify:</label>
            <input 
                name='IDentify' 
                onChange={(e)=>handleChange(e)} 
                value={user.IDentify ? user.IDentify : ""} 
                disabled={!isUpdate} 
                className='form-control py-1 px-2' 
                type="text" />
          </div> 
        
        </div>

        <div className="row gap-sm-0 gap-3">
          <div className="col px-2">
            <label htmlFor="">Create Date:</label>
            <input 
                value={user.createdAt.slice(0, 10)} 
                disabled 
                className='form-control py-1 px-2' 
                type="text" 
            />
          </div>
        </div>


        <div className="row gap-sm-0 gap-3">
          <div className="col px-2">
            <label htmlFor="">Permision</label>
            <Form.Select 
              className=' py-1 px-2' 
              aria-label="Default select example" 
              disabled 
              value={getUser.permissionCode}
            >
              <option>Open this select menu</option>
              <option value="1">Admin</option>
              <option value="2">Manager</option>
              <option value="3">Customer</option>
            </Form.Select>
          </div> 
        </div>
      </div>
    </div>
  )
}
