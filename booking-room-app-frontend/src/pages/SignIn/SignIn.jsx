import './signInStyle.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logOut, signIn } from '../../APIs';
import { setLoading, updateUser } from '../../hooks/redux/actions';
import timeOut from '../../helpers/timeOut';
export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initResponse = {
    emailError: false,
    passwordError: false,
    message: "",
  }

  const [email, setEmail] = useState("truongvanbao@gmail.com");
  const [password, setPassword] = useState('12345');
  const [response, setResponse] = useState(initResponse);
  const user = useSelector(state => state.user);
  console.log({ email, password });
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = () => {
    setResponse(initResponse);
  }

  const handleBlur = (e) => {
    if (e.target.value.length === 0) {
      setResponse({
        ...response,
        [`${e.target.name}Error`]: true,
        message: `${e.target.name.toUpperCase()} is not blank!!`
      });
    }

    if (!(/^([A-Za-z0-9\.])+\@([A-Za-z0-9])+\.([A-Za-z]{2,4})$/).test(e.target.value) && e.target.name === 'email') {
      setResponse({
        ...response,
        emailError: true,
        message: 'Email is invalid!'
      });
    }

  }

  const handleSubmit = async () => {
    await fecthApi();
  }

  const fecthApi = async () => {
    let getResponse = await signIn(email, password);
    if (getResponse?.status === 404 || getResponse?.status === 400) {
      setResponse({
        emailError: getResponse.data === "email" ? true : false,
        passwordError: getResponse.data === "password" ? true : false,
        message: getResponse.message
      });
    } else if (getResponse?.status === 200) {
      setResponse(initResponse);
      navigate('/');
      dispatch(updateUser({
        token: getResponse?.data?.token,
        email: getResponse?.data?.email,
        name: getResponse?.data?.name,
        phone: getResponse?.data?.phone,
        permissionCode: getResponse?.data?.groupId,
        id: getResponse?.data?.id,
        avatar: getResponse?.data?.avatar,
        isLoading: true
      }));
      localStorage.setItem('isLogin', JSON.parse(true));
      await timeOut(4000);
      dispatch(setLoading(false));
    }
  }

  const handleLogOut = async () => await logOut();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLogin'))) {
      navigate('/');
    } else {
      localStorage.clear('isLogin');
      handleLogOut();
    }
  }, []);

  return (
    <div className='SignIn d-flex justify-content-center mt-sm-5 pt-5'>
      <div className='container-sm d-flex flex-column flex-sm-row justify-content-center gap-3 mt-sm-5 pt-5'>
        <div className='d-flex flex-column py-sm-5 py-3 align-items-center col-sm-4'>
          <h2>Sign In</h2>
          <h2>Booking Room</h2>
        </div>

        <div className='col-sm-8 d-flex flex-column gap-4 align-items-center'>
          <div className='d-flex flex-column gap-3 col-10'>
            <div className='d-flex flex-column gap-2'>
              <label htmlFor="" className=''>Email</label>
              <input className='form-control px-2 py-1'
                type="text"
                placeholder='Enter your Email or Phone Number'
                value={email}
                name='email'
                onChange={(e) => handleChangeEmail(e)}
                onClick={handleClick}
                onBlur={(e) => handleBlur(e)}
              />
              <span className={response.emailError ? "input_wrong text-danger" : "text-danger"}>{response.message}</span>
            </div>

            <div className='d-flex flex-column gap-2'>
              <label htmlFor="" className=''>Password</label>
              <input className='form-control px-2 py-1'
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => handleChangePassword(e)}
                name='password'
                onClick={handleClick}
                onBlur={(e) => handleBlur(e)}
              />
              <span className={response.passwordError ? "input_wrong text-danger" : "text-danger"}>{response.message}</span>
            </div>
          </div>

          <div className='block_control d-flex flex-column align-items-center gap-3'>
            <button onClick={handleSubmit} className='btn btn-warning px-2 py-1 fw-semibold'>Submit</button>
            <Link to='/signup' >Sign Up</Link>
            <Link to='/' >Without Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
