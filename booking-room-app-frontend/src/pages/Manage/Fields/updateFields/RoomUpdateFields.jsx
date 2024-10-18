import React, { memo } from 'react'

export default  function RoomUpdateFields() {

    return [
        [
            {
                label: 'Number:',
                type: 'text',
                name: 'id',
                disabled: true
            },
            {
                label: 'Photo ID:',
                type: 'text',
                name: 'photoId',
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
