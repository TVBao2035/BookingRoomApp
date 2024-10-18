import React, { useEffect, useState } from 'react'
import { getAllGroup } from '../../../../APIs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserCreateFields() {
  const [listGroup, setListGroup] = useState([]);
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const modalUpdateUser = useSelector(state => state.modalUpdateUser);
  const listGroupNameId = listGroup.map(group => {
    return {
      title: group.groupName,
      value: group.id
    }
  })

  const fetchApiGetAllGroup = async () => {
    let response = await getAllGroup();
    if (response.status === 404) {
      alert(response.message);
    } else {
      setListGroup(response.data);
    }
  }
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('isLogin')) || !user || !user?.token || user.permissionCode > 2)
      return navigate('/');

    fetchApiGetAllGroup();
  }, [modalUpdateUser]);
  return  [
            [
              {
                label: 'User Email:',
                type: 'text',
                name: 'email',
              },
              {
                label: 'User Phone:',
                type: 'text',
                name: 'phone',
              },
              {
                label: 'User Group Id:',
                type: 'select',
                listOptions: [...listGroupNameId],
                name: 'groupId',
              }
            ],
            [
              {
                label: 'User Name:',
                type: 'text',
                name: 'name',
              },
              {
                label: 'User IDentify:',
                type: 'text',
                name: 'IDentify',
              }
            ],
            [
              {
                label: 'Avatar:',
                type: 'text',
                name: 'avatar',
              },
              {
                label: 'Password:',
                type: 'text',
                name: 'password',
              },

            ]
  ]
}
