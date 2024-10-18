import React from 'react'

export default function RoomCreateFields() {

  return  [
    [
      {
        label: 'Photo ID:',
        type: 'text',
        name: 'photoId',
      },
      {
        label: 'Price:',
        type: 'text',
        name: 'price',
      }, 
      {
        label: 'People',
        type: 'number',
        name: 'numberOfPeople',
      }
    ],
    [
      {
        label: 'Description:',
        type: 'textarea',
        name: 'description',
      }
    ],
  ]
}
