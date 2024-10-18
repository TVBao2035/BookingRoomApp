import './headerStyle.scss';
import logo from '../../logo.svg';
import { LuLogOut } from "react-icons/lu";
import { MdOutlineManageAccounts, MdOutlineAccountCircle } from "react-icons/md";

import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavItem } from 'react-bootstrap';

import { Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar';
import { initState } from '../../hooks/redux/reducers';
import { setLoading, updateUser } from '../../hooks/redux/actions';
import { ContainerModal, ModalBookRoom } from '../Modal';
import timeOut from '../../helpers/timeOut';

export default function Header() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user);
    const modalBookRoom = useSelector( state => state.bookingRoom)

    const handleLogOut = async () => {
        dispatch(updateUser({...initState.user, isLoading: true})); // update redux
        await timeOut(4000);
        dispatch(setLoading(false));
        navigator('/signin');
        localStorage.clear('isLogin');
    }
    
  return (
    <>
        <div className='Header d-flex justify-content-center mb-4'>
            <div className='container-lg d-flex flex-column flex-sm-row align-items-sm-center gap-sm-3'>
                  {/*======  Branch  ========= */}
                <Link to={'/'} className='col-md-3 col-sm-4 col-12 d-flex align-items-center justify-content-center text-white text-decoration-none'>
                    <img src={logo} alt="" />
                    <p className='fs-3'>BOOKING ROOM</p>
                </Link>
       
                <div className='d-flex justify-content-end  col-md-8 col-sm-7 col-12'>

                      {/*======  NavBar  ========= */}
                      <div className='col-md-8 col-1 d-flex fw-bolder justify-content-md-end align-items-center text-white h-sm-100  icon_menu'>
                          {/*======  Menu Responsive  ========= */}
                        <NavDropdown className='list_menu--responsive d-md-none ms-2'  >
                            {
                                  user.name && <NavItem className='text-center py-1'>
                                                <Link to="account">Account</Link>
                                            </NavItem>
                            }
                            {
                                user.permissionCode !== 3 &&
                                <>
                                    <NavItem className='text-center py-1'>
                                        <Link className={"text-warning"} to='manage'>Manage</Link>
                                    </NavItem>
                                </>
                            }
                       
                            <NavItem className='text-center py-1'>
                                <Link to=''>Home</Link>
                            </NavItem>
                            <NavItem className='text-center py-1'>
                                <Link  to='/contract'>Contract</Link>
                            </NavItem>
                              <NavItem className='text-center py-1'>
                                  <Link to='/history'>History</Link>
                              </NavItem>
                            <NavItem className='text-center py-1'>
                                <Link to='/signin' onClick={handleLogOut}>{user.name ? "Log out" : "Sign in"}</Link>
                                </NavItem>
                        </NavDropdown>   

                          {/*======  Menu Main  ========= */}
                        <nav className='col-sm-12 list_menu d-md-flex d-none flex-sm-row justify-content-end align-items-center flex-column gap-md-0 gap-sm-1 gap-2 h-sm-100 text-center '>
                            <NavLink className={"col-sm-2 text-white"} to=''>Home</NavLink>
                            <NavLink className={"col-sm-2 text-white"} to='/contract'>Contract</NavLink>
                            <NavLink className={"col-sm-2 text-white"} to='/history'>History</NavLink>
                            {
                                user.name ? 
                                (
                                <div className='d-flex gap-2 align-items-center '>
                                    <NavDropdown as={"nav"} className='item_account text-white' title={user.name}>
                                        <NavItem className='text-center py-1'>
                                            <Link 
                                                className={"text-warning d-flex justify-content-center gap-2 align-items-center"} 
                                                to='account'
                                            ><MdOutlineAccountCircle className='fs-5' />  Account</Link>
                                        </NavItem>
                                        {
                                                user.permissionCode !== 3 && 
                                                    <>
                                                    <NavItem className='text-center py-1'>
                                                        <Link 
                                                            className={"text-warning d-flex justify-content-center gap-2 align-items-center"} 
                                                            to='manage'
                                                        > <MdOutlineManageAccounts className='fs-5'/> Manage </Link>
                                                    </NavItem>
                                                    </>
                                        }
                                        
                                        <NavItem className='text-center py-1'>
                                            <Link onClick={handleLogOut} className={"text-warning d-flex justify-content-center gap-2 align-items-center"} to='/signin'>
                                                <LuLogOut />
                                                Log out
                                            </Link>
                                        </NavItem>
                                    </NavDropdown>
                                    <Link to={"account"}>
                                        <Avatar small src={user?.avatar}/>
                                    </Link>
                                </div>
                                ) : <NavLink className={"col-sm-2 text-white"} to='/signin'>Signin</NavLink>
                            }
                        </nav>
                    </div>
                </div>  
            </div>
        </div>
        {
            modalBookRoom.isOpen &&
            <ContainerModal>
                  <ModalBookRoom/>
            </ContainerModal>
        }
        <div className='d-flex justify-content-center'>
            <Outlet/>
        </div>
    </>
  );
}
