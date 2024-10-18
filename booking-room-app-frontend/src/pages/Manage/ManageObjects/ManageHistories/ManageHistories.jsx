import React, { useEffect, useState } from 'react'
import { getAllHistory, getHistoryByUserId } from '../../../../APIs';
import {
    MdQrCode, MdOutlineDoorSliding, MdDateRange, MdAttachMoney,
    MdOutlineAccessTime, MdYoutubeSearchedFor, MdOutlinePermIdentity,
    MdDriveFileRenameOutline, MdOutlineMail, MdOutlineSmartphone
} from "react-icons/md";
import listColor from '../../../../helpers/listColor';
import { useSelector } from 'react-redux';
import { formatMoneyStyle1 } from '../../../../helpers/formatMoney';
import { Table } from 'react-bootstrap';
import { Pagination } from '../../../../components/Pagination';
import './ManageHistories.scss';
export default function ManageHistories() {
    const [listHistories, setListHistories] = useState();
    const [date, setDate] = useState();
    const user = useSelector(state => state.user);
    const [controlPagination, setControlPagination] = useState({
        page: 1,
        isNext: false,
        isPrevious: false
    });
    const handleChange = (e) => {
        setDate(e.target.value);
    }

    const handleSearch = () => {
        fetchApi(controlPagination.page, date);
    }

    const handleClickNext = () => {
        setControlPagination({
            ...controlPagination,
            page: +controlPagination.page + 1
        })
        fetchApi(+controlPagination.page + 1, date);
    }

    const handleClickPrevious = () => {
        if (controlPagination.page > 1) {
            setControlPagination({
                ...controlPagination,
                page: +controlPagination.page - 1
            })
        }
        fetchApi(+controlPagination.page - 1, date);
    }

    const fetchApi = async (page, date) => {
        let response = await getAllHistory({ page, date });
        if (response.status === 200) {
            setListHistories(response.data);
            setControlPagination({
                page: response.data.currentPage,
                isNext: response.data.isNext,
                isPrevious: response.data.isPrevious,
            })
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        fetchApi()
    }, []);

    return (
        <div className='container ManageHistories'>
            <div className='d-flex gap-4 justify-content-center my-2'>
                <div className='col-2'>
                    <label htmlFor="">Select History :</label>
                    <input
                        style={{ color: listColor[parseInt(Math.random() * 10)] }}
                        onChange={(e) => handleChange(e)}
                        name="end"
                        type="month"
                        placeholder='Month'
                        className='form-control px-2 py-1'
                    />
                </div>
                <div className=' d-flex align-items-end'>
                    <button
                        className='btn fs-4 px-2 d-flex align-items-center py-1 text-white'
                        style={{ backgroundColor: listColor[parseInt(Math.random() * 10)] }}
                        onClick={handleSearch}
                    >
                        <MdYoutubeSearchedFor />
                    </button>
                </div>
            </div>
            <hr />
            <Table bordered hover className='text-center'>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Number Room</th>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Phone</th>
                        <th>Sum Money</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listHistories?.data?.map((history) => {
                            return (
                                <tr key={`history-${history.id}`}>
                                    <td>{history.id}</td>
                                    <td>{history.roomId}</td>
                                    <td>{history.User.id}</td>
                                    <td className='text_short'>{history.User.name}</td>
                                    <td className='text_short'>{history.User.email}</td>
                                    <td className='text_short'>{history.User.phone}</td>
                                    <td className='text_short'>{formatMoneyStyle1(history.sumMoney)}đ</td>
                                    <td>{history.startDate}</td>
                                    <td>{history.endDate}</td>
                                </tr>)
                        })
                    }
                </tbody>
            </Table>
            <Pagination
                isNext={controlPagination.isNext}
                isPrevious={controlPagination.isPrevious}
                pageNumber={controlPagination.page}
                fnNext={handleClickNext}
                fnPrevious={handleClickPrevious} />
        </div>
    )
}
