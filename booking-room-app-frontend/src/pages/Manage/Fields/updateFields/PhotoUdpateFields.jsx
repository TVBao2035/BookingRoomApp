import React, { memo, useEffect, useState } from 'react'
import { getAllRoomId } from '../../../../APIs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PhotoUdpateFields() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const modalUpdatePhoto = useSelector(state => state.modalUpdatePhoto);

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
  
    }, [modalUpdatePhoto]);

    return [
        [
            {
                label: 'Photo ID:',
                type: 'text',
                name: 'id',
                disabled: true
            },
            {
                label: 'Room ID:',
                type: "select",
                listOptions: [...listRoom],
                name: 'roomId'
            },
        ],
        [
            {
                label: 'Link:',
                type: 'text',
                name: 'link'
            }
        ]
    ]
}