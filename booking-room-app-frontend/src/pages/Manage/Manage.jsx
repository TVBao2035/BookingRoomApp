import './manageStyle.scss';
import { FaUsers } from "react-icons/fa";
import { MdRoomPreferences, MdManageHistory, MdOutlineMiscellaneousServices, MdOutlineElectricalServices } from "react-icons/md";
import { RiContractFill } from "react-icons/ri";
import { IoMdPhotos } from "react-icons/io";
import { SiStatista } from "react-icons/si";

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


import { ManageUser, ManageRoom, ManagePhotos, ManageContract, ManageStatistic, ManageHistories, ManageService, ManageRoomService } from './ManageObjects';
import { ModalCreateMain, ModalDeleteMain, ModalUpdateMain } from './ModalSetup';

import { useNavigate } from 'react-router-dom';

export default function Manage() {
    const [currentTabs, setCurrentTabs] = useState(1);

    const Tabs = [
        {
            id: 1,
            title: <div className='d-flex align-items-center gap-2'><MdRoomPreferences /> <p>Room</p></div>,
            isAdmin: false
        },
        {
            id: 2,
            title: <div className='d-flex align-items-center gap-2'><FaUsers /> <p>User</p></div>,
            isAdmin: true
        },
        {
            id: 3,
            title: <div className='d-flex align-items-center gap-2'><IoMdPhotos /> <p>Photo</p></div>,
            isAdmin: true
        },
        {
            id: 4,
            title: <div className='d-flex align-items-center gap-2'><MdOutlineMiscellaneousServices /> <p>Service</p></div>,
            isAdmin: false,
        },
        {
            id: 5,
            title: <div className='d-flex align-items-center gap-2'><MdOutlineElectricalServices /> <p>Room Service</p></div>,
            isAdmin: false
        },
        {
            id: 6, 
            title: <div className='d-flex align-items-center gap-2'><RiContractFill /> <p>Contract</p></div>, 
            isAdmin: false
        },
        {
            id: 7,
            title: <div className='d-flex align-items-center gap-2'><SiStatista /> <p>Statistics</p></div>,
            isAdmin: true
        },
        {
            id: 8,
            title: <div className='d-flex align-items-center gap-2'><MdManageHistory /> <p>Histories</p></div>,
            isAdmin: false
        },
    ]

    const MangePages = [
        {
            id: 1,
            component: <ManageRoom />
        },
        {
            id: 2,
            component: <ManageUser />
        },
        {
            id: 3,
            component: <ManagePhotos />
        },
        {
            id: 4,
            component: <ManageService/>
        },
        {
            id: 5,
            component: <ManageRoomService />
        }, 
        {
            id: 6,
            component: <ManageContract />
        }, 
        {
            id: 7,
            component: <ManageStatistic />
        },
        {
            id: 8,
            component: <ManageHistories />
        },
    ]

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    
    useEffect(() => {
        if(!JSON.parse(localStorage.getItem('isLogin')) || !user || !user?.token || user.permissionCode > 2) 
           return navigate('/');
    }, []);

  return (
    <>
        <div className='Manage w-100 d-flex justify-content-center position-relative'>
            <div className="container d-flex flex-column gap-5">
                <div className='d-flex'>
                    <div className='d-flex  gap-3 justify-content-start  px-2 py-1 fw-medium'>
                        {
                            Tabs.map(tab => 
                            (
                                ((user.permissionCode=== 1 && tab.isAdmin) || !tab.isAdmin) && 
                                <div 
                                    key={`tab-${tab.id}`} 
                                    onClick={() => setCurrentTabs(tab.id)}
                                    className={currentTabs === tab.id ? ' block border-primary border-bottom  px-2 py-1 text-primary fw-medium' : ' px-2 py-1 text-secondary fw-medium'}
                                >{tab.title}</div>)
                            )
                        }
                    </div>
                </div>
                <div>
                    {
                          MangePages.map(table => <div key={`table-${table.id}`}>{table.id === currentTabs && table.component}</div>)
                    }
                </div>

            </div>
        </div>
        
            <ModalUpdateMain/>
            <ModalDeleteMain/>
            <ModalCreateMain />
 
    </>
  )
}
