import React from 'react'

export default function ServiceUpdateFields() {
  return [
      [
          {
              label: 'Service ID:',
              type: 'text',
              name: 'id',
              disabled: true
          },
          {
              label: 'Service Name:',
              type: "text",
              name: 'name'
          },
      ],
  ]
}
