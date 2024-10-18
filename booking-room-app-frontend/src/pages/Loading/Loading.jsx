import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import animations from '../../assets/animations';
import './loading.scss';
export default function Loading() {
  // const user = useSelector((state) => state.user);
  // const navigator = useNavigate();
  // useEffect(() => {
  //   if (!user.token) navigator('/signin')
  // }, [user])
  return (
    <div className='Loading d-flex flex-column user-select-none justify-content-center align-items-center'>
      <img className='icon_loading' src={animations.loadingTikTok} alt="" />
      <img className='text_loading' src={animations.textLoading} alt="" />
    </div>
  )
}
