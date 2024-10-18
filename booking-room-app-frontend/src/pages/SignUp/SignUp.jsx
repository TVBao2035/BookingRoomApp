import './signUpStyle.scss';
import { Form } from 'react-bootstrap';

import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { signUp } from '../../APIs';

export default function SignUp() {

    const initData = {
        name: "",
        password: "",
        cofirm_Password: "",
        phone: "",
        email: "",
        avatar: "",
    }

    const initError = {
        email: false,
        password: false,
        cofirm_Password: false,
        name: false,
        phone: false,
    }

    const initMessages = {
        email: "",
        password: "",
        cofirm_Password: "",
        name: "",
        phone: ""
    }

    const [error, setError] = useState(initError);
    const [messages, setMessages] = useState(initMessages);
    const [data, setData] = useState(initData);
    const [check, setCheck] = useState("up");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let checkBlank = Object.values(data).some(e => e.length !== 0); // kiểm tra tất cả các trường đều có data
        let checkError = Object.values(error).every(e => e === false); // kiểm tra tất cả các trường đều không error

        const { cofirm_Password, ...user} = data;
        
        if (checkError && checkBlank && cofirm_Password === user.password){  // Call API

            let response = await signUp(user);
            if (response.status === 200) {
                setData(initData);
                navigate('/signin');
            } else if(response.status === 400 || response.status === 409) { 
                // Catch Error on Server
                setError({
                    ...error,
                    [response.data]: true
                });

                setMessages({
                    ...messages,
                    [response.data]: response.message
                })
            }else{
                alert(response.message);
            }
        }else {
            let tempErr = {...error}; // copy data to avoid re-render app
            let tempMess = { ...messages };// copy data to avoid re-render app
         
            Object.entries(data).forEach(e => {
                if (e[1].length === 0 && e[0] !== 'avatar') { // Notification to the error fields

                    tempErr = {...tempErr, [e[0]]: true};
                    tempMess = {...tempMess, [e[0]]: `You didn't enter the ${e[0].toUpperCase()} field`};
                }
            })
            setError({...tempErr});
            setMessages({...tempMess});        
            
        }
      
    }

   

    const handleChange = (e)=> {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
      
    }

    const handleCheck = (e)=>{
        setCheck(e.target.value);
        setData({
            ...data,
            avatar: ""
        })
    }

    const handleBlur = (e) => {
        if(e.target.value.length === 0){
            setError({
                ...error,
               [e.target.name]: true
            });
    
            setMessages({
                ...messages,
                [e.target.name]: `${e.target.name.toUpperCase()} is not blank!!`
            });
        }
        if (e.target.name === 'email' && !(/^([A-Za-z0-9\.])+\@([A-Za-z0-9])+\.([A-Za-z]{2,4})$/).test(e.target.value)){
            setError({
                ...error,
                email: true
            });

            setMessages({
                ...messages,
                email: `EMAIL is invalid!`
            });
        }

        if(e.target.name === 'phone' && e.target.value.length !== 10){
            setError({
                ...error,
                phone: true
            });

            setMessages({
                ...messages,
                phone: `PHONE is invalid!`
            });
        }

        if (e.target.name === 'cofirm_Password' && e.target.value !== data.password) {
            console.log("ERRR");
            setError({
                ...error,
                cofirm_Password: true
            });

            setMessages({
                ...messages,
                cofirm_Password: `Password is not match`
            });
        }
    }

    const handleClick = (e) => {
        console.log("CHECK HANDL");
        setError({
            ...error,
            [e.target.name]: false
        });

        setMessages({
            ...messages,
            [e.target.name]: ""
        });
    }
  return (
      <div className='SignUp d-flex justify-content-center'>
          <div className='container-sm d-flex flex-column flex-sm-row justify-content-center gap-3 mt-sm-3 '>
              <div className='d-flex flex-column justify-content-center align-items-center  col-sm-4'>
                  <h2>Sign Up</h2>
                  <h2>Booking Room</h2>
                  <h4>Create Your Account</h4>
              </div>

              <div className='col-sm-8 d-flex flex-column gap-4 align-items-center'>
                    <div className='d-flex flex-column gap-2 col-10'>
                    {/* avatar field */}
                        <div className='d-flex flex-column gap-1'>
                            <label htmlFor="" className=''>Photo</label>
                           
                            <Form.Select className=' py-1 px-2' aria-label="Default select example" value={check} onChange={(e)=>handleCheck(e)} >
                                <option value={"up"}>Up File</option>
                                <option value={"past"}>Past Link</option>
                            </Form.Select>
                            {
                                (
                                    check === "up" ? (
                                        <input className='form-control px-2 py-1'
                                            type="file"
                                            name='avatar'
                                            placeholder='Enter your Email'
                                            value={data.avatar}
                                            onChange={(e) => handleChange(e)}
                                            onClick={(e)=>handleClick(e)}
                                            onBlur={(e)=>handleBlur(e)}
                                        />
                                    ):
      
                                      <input className='form-control px-2 py-1'
                                          type="text"
                                          name='avatar'
                                          placeholder='Enter your Link Photo'
                                          value={data.avatar}
                                        onChange={(e) => handleChange(e)}
                                        onClick={(e)=>handleClick(e)}
                                        onBlur={(e)=>handleBlur(e)}
                                      />
                                )
                            }
                           
                        </div>
                    {/* name field */}
                        <div className='d-flex flex-column gap-1'>
                            <label htmlFor="" className=''>Name</label>
                            <input className='form-control px-2 py-1'
                                  type="text"
                                  name='name'
                                  placeholder='Enter your Email or Phone Number'
                                  value={data.name}
                                  onChange={(e) => handleChange(e)}
                                  onClick={(e)=>handleClick(e)}
                                  onBlur={(e)=>handleBlur(e)}
                            />
                            <span className={error.name ? "input_wrong text-danger" : "text-danger"}>{messages.name}</span>
                        </div>
                    {/* email field */}
                        <div className='d-flex flex-column gap-1'>
                            <label htmlFor="" className=''>Email</label>
                            <input className='form-control px-2 py-1'
                                    type="text"
                                    name='email'
                                    placeholder='Enter your Email'
                                    value={data.email}
                                    onChange={(e) => handleChange(e)}
                                    onClick={(e)=>handleClick(e)}
                                    onBlur={(e)=>handleBlur(e)}
                            />
                            <span className={error.email ? "input_wrong text-danger" : "text-danger"}>{messages.email}</span>
                        </div>
                    {/* phone field */}
                        <div className='d-flex flex-column gap-1'>
                            <label htmlFor="" className=''>Phone</label>
                            <input className='form-control px-2 py-1'
                                type="text"
                                name='phone'
                                placeholder='Enter your Phone'
                                value={data.phone}
                                onChange={(e) => handleChange(e)}
                                onClick={(e)=>handleClick(e)}
                                onBlur={(e)=>handleBlur(e)}
                            />
                            <span className={error.phone ? "input_wrong text-danger" : "text-danger"}>{messages.phone}</span>
                        </div>
                    {/* password field */}
                        <div className='d-flex flex-column gap-1'>
                            <label htmlFor="" className=''>Password</label>
                            <input className='form-control px-2 py-1'
                                    type="password"
                                    name='password'
                                    placeholder='Enter your Email or Phone Number'
                                    value={data.password}
                                    onChange={(e) =>handleChange(e)}
                                    onClick={(e)=>handleClick(e)}
                                    onBlur={(e)=>handleBlur(e)}
                            />
                            <span className={error.password ? "input_wrong text-danger" : "text-danger"}>{messages.password}</span>
                        </div>
                    {/* cofirm password field */}
                      <div className='d-flex flex-column gap-1'>
                          <label htmlFor="" className=''>Cofirm Password</label>
                          <input className='form-control px-2 py-1'
                              type="password"
                              name='cofirm_Password'
                              placeholder='Enter your cofirm password'
                              value={data.cofirm_Password}
                              onChange={(e) => handleChange(e)}
                              onClick={(e) => handleClick(e)}
                              onBlur={(e) => handleBlur(e)}
                          />
                          <span className={error.cofirm_Password ? "input_wrong text-danger" : "text-danger"}>{messages.cofirm_Password}</span>
                      </div>
                    </div>

                    <div className='block_control d-flex flex-column align-items-center gap-3'>
                        <button onClick={handleSubmit} className='btn btn-warning px-2 py-1 fw-medium'>Register</button>
                        <Link to='/signin' >Sign In</Link>
                    </div>
              </div>
          </div>
      </div>
  )
}
