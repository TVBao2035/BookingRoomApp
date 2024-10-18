import {useEffect, useState } from 'react'
import { getAllRoomId } from '../../../../APIs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ContractUpdateFields() {
    
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const modalUpdateContract = useSelector(state => state.modalUpdateContract);

    const [listRoomId, setListRoomId] = useState([]);

    const fetchApiGetAllRoomId = async () => {
        let response = await getAllRoomId();
        if (response.status === 404) {
            setListRoomId([])
        } else {
            setListRoomId(response.data);

        }
    }

    const listRoom = listRoomId.map((item) => {
        return {
            title: `Room-${item.id}`,
            value: item.id
        }
    });
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('isLogin')) || !user || !user?.token || user.permissionCode > 2)
            return navigate('/');

        fetchApiGetAllRoomId();
    }, [modalUpdateContract]);


    return  [
        [
            {
                label: 'Contract ID:',
                type: 'text',
                name: 'id',
                disabled: true,
            },
            {
                label: 'Room ID:',
                type: 'select',
                name: 'roomId',
                listOptions: [...listRoom],
            },
        ],
        [
            {
                label: "User ID:",
                type: "text",
                name: 'userId',
                disabled: true,
            },
            {
                label: "User Name:",
                type: "text",
                name: 'name',
                disabled: true,
            }
        ],
        [
            {
                label: "User Email:",
                type: "text",
                name: 'email',
                disabled: true,
            },
            {
                label: "User Phone:",
                type: "text",
                name: 'phone',
                disabled: true,
            }
        ],
        [
            {
                label: "Sales(%):",
                type: "number",
                name: 'sales',
            },
            {
                label: 'Sum Of Money :',
                type: 'text',
                name: 'sumMoney',
                disabled: true
            }
        ],
        [
            {
                label: "Start Date :",
                type: "date",
                name: 'startDate'
            },
            {
                label: 'End Date :',
                type: 'date',
                name: 'endDate',
            }
        ]
    ]
}