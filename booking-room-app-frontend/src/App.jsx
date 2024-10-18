import './App.scss';
import './variables.scss'
import Header from './components/Header';
import {  Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { Home, SignIn, SignUp, Contract, Room, Loading, Account, Manage, Details, History} from './pages';


import { useSelector, useDispatch } from 'react-redux';
import { setLoading, updateUser } from './hooks/redux/actions';
import { useEffect } from 'react';
import { refresh } from './APIs';
import timeOut from './helpers/timeOut';


function App() {  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    
    let red_list = ['/signin', '/signup'];
    let white_list = ['/', '/details'];
    red_list = red_list.concat(white_list);
    
    if (!red_list.includes(location.pathname) && (!JSON.parse(localStorage.getItem('isLogin')) && !user.token)){
      navigate('/signin');
      return
    }

    if (!red_list.includes(location.pathname) 
      || (JSON.parse(localStorage.getItem('isLogin')) 
      && white_list.includes(location.pathname)))
      fecthApi(user.token);
    

   
  }, []);


  const fecthApi = async (token) => {
    let getUser = await refresh(token);
    if (getUser?.status === 404) {
      alert(getUser?.message);
    }
    else {
      dispatch(updateUser({
        token: getUser?.data?.token,
        email: getUser?.data?.email,
        name: getUser?.data?.name,
        phone: getUser?.data?.phone,
        permissionCode: getUser?.data?.groupId,
        id: getUser?.data?.id,
        avatar: getUser?.data.avatar,
        isLoading: true
      }));
      await timeOut(2000);
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="App">
        <Routes>
          <Route 
            path='/' 
            element={localStorage.getItem('isLogin') ? (user.isLoading ? <Loading /> : <Header />) : <Header />}
          >
              <Route path='' element={<Room/>} />
              <Route path='contract' element={<Contract />} />
              <Route path='account' element={<Account />} />
              <Route path='manage' element={<Manage/>} />
              <Route path='history' element={<History />} />
              <Route path='details' element={<Details/>}/>
          </Route> 
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
   
    </div>
  );
}

export default App;
