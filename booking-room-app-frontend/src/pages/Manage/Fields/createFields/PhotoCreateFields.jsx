import React, { useEffect, useState } from 'react'
import { getAllRoomId } from '../../../../APIs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function PhotoCreateFields() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const modalCreatePhoto = useSelector(state => state.modalCreatePhoto);

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
  }, [modalCreatePhoto]);


  return [
    [

      {
        label: 'Room ID:',
        type: "select",
        listOptions: [...listRoom],
        name: 'roomId'
      },
      {
        label: 'Link:',
        type: 'text',
        name: 'link'
      }
    ]
  ]
}
