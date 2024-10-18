import React, { useEffect, useState } from 'react'
import { getAllRoomId } from '../../../../APIs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ContractCreateFields() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const modalCreateContract = useSelector(state => state.modalCreateContract);

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
  }, [modalCreateContract]);

  return  [
    [
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

      },
      {
        label: "User Email:",
        type: "text",
        name: 'email',

      },
      {
        label: "User Phone:",
        type: "text",
        name: 'phone',

      }
    ],
    [
      {
        label: "Sales(%):",
        type: "number",
        name: 'sales',
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
