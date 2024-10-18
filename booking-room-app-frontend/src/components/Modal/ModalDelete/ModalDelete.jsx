import { IoMdClose } from "react-icons/io";

import React from 'react';

import { useDispatch } from 'react-redux';

export default function ModalDelete({data, message, closeModal, fetchDelete}) {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal())

  const handleDelete = async (id) => {
    let response = await fetchDelete(id);
    if(response.status === 404){
      alert(response.message);
      return;
    }
    // create a modal display delete Success
    alert(response.message);
    dispatch(closeModal())
  }
  return (
      <div className='ModalUpdate w-75 bg-white px-4 py-4 d-flex flex-column gap-3'>
          <div className='row gap-3'>
              <div className='col d-flex justify-content-lg-between fs-5'>
                  <p>Delete</p>
                  <IoMdClose onClick={handleClose} />
              </div>
              <hr />
          </div>
         <div>
            {message}
         </div>
          <div className='row gap-3'>
              <div className='col d-flex justify-content-end gap-2' >
                <button
                  className='btn btn-danger py-1 px-2'
                onClick={() => handleDelete(data.id)}
                >Delete</button>
                <button
                  className='btn btn-secondary py-1 px-2'
                  onClick={handleClose}
                >
                    Cancle
                </button>
              </div>
          </div>
      </div>
  )
}
