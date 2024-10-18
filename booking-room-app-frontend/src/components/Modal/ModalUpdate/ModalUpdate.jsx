import { IoMdClose } from "react-icons/io";
import { Form } from 'react-bootstrap';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ModalUpdate({ listFields, data, closeModal, fetchUpdate }) {
    var initInformantion = {
    }
    listFields.forEach((fields)=> {
        fields.forEach(field => {
            initInformantion = {
                ...initInformantion,
                [field.name]: data[field.name]
            }
        })
    });


    const dispatch = useDispatch();
    const [information, setInformation] = useState(initInformantion);

    const handleChange = (e) => {
        setInformation({
            ...information,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async () => {
            let response = await fetchUpdate(information)
          
            if(response.status === 404){
                alert(response.message)
            }
            else{
                alert(response.message)
                dispatch(closeModal());
            }
            
       
    }
    const handleClose = () => {
        dispatch(closeModal());
    }
    
  return (
    <div className='ModalUpdate w-75 bg-white px-4 py-4 d-flex flex-column gap-3'>
          <div className='row gap-3'>
                <div className='col d-flex justify-content-lg-between fs-5'>
                    <p>Update</p>
                    <IoMdClose onClick={handleClose} />
                </div>
                <hr />
          </div>
          {
            listFields.map((fields, index) => (
              <div className='row gap-3' key={`item-${index}`}>
                    {
                        fields.map(field => (
                            <div className='col' key={`field-${field.name}`}>
                                <label htmlFor="">{field.label}</label>
                                {
                                    field.type === 'select' ? 
                                    (
                                        <Form.Select 
                                            className=' py-1 px-2' 
                                            aria-label="Default select example"
                                            onChange={e => handleChange(e)}
                                            name={field.name}
                                            value={information[field.name]}
                                            >
                                            <option value={null}>Select</option>
                                            {
                                                field.listOptions.map((option) => 
                                                    <option key={option.title} value={option.value}>{option.title}</option>
                                                )
                                            }
                                           
                                        </Form.Select>
                                    ) :
                                    (
                                        field.type !== 'textarea' ? 
                                        <input 
                                            className='form-control py-1 px-2'
                                            disabled={field?.disabled}
                                            onChange={e => handleChange(e)}
                                            type={field.type}
                                            name= {field.name}
                                            value={field.type === 'file' ? '' : information[field.name]}
                                        /> :
                                        <textarea 
                                            className='form-control py-1 px-2'
                                            name={field.name}
                                            value={information[field.name]}
                                            onChange={e => handleChange(e)}
                                        ></textarea>
                                )
                                }
                            </div>
                        ))
                    }
                  
              </div>
            ))
          }
          <div className='row gap-3'>
            <div className='col d-flex justify-content-center'>
                <button 
                    className='btn btn-primary py-1 px-2'
                    onClick={handleUpdate}
                  >Update</button>
            </div>
          </div>
    </div>
  )
}
