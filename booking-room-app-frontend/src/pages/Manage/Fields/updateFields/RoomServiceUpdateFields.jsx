import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllRoomId } from '../../../../APIs';
import { getAllRoomService } from '../../../../APIs/roomServiceAPI';
import { getAllServiceWithIdName } from '../../../../APIs/serviceAPI';

export default function RoomServiceUpdateFields() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [listServiceIdName, setListServiceIdName] = useState([]);
  const [listRoomId, setListRoomId] = useState([]);
  const modalUpdateRoomService = useSelector(state => state.modalUpdateRoomService);


  const fetchApiGetAllRoomId = async () => {
    let response = await getAllRoomId();
    if (response.status === 404) {
      setListRoomId([])
    } else {
      setListRoomId(response.data);

    }
  }

  const fetchApiGetAllRoomService = async () => {
    let response = await getAllServiceWithIdName();
    if (response.status === 404) {
      setListServiceIdName([])
    } else {
      setListServiceIdName(response.data);

    }
  }
  const listService = listServiceIdName.map(item => {
    return {
      title: item.name,
      value: item.id
    }
  })
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
    fetchApiGetAllRoomService();
  }, [modalUpdateRoomService]);
  return [
    [
      {
        label: 'ID:',
        type: 'text',
        name: 'id',
        disabled: true
      },
      {
        label: 'Service ID:',
        type: 'select',
        name: 'serviceId',
        listOptions: listService
      },
      {
        label: 'Room ID:',
        type: 'select',
        name: 'roomId',
        listOptions: listRoom
      },
    ]
  ]
}