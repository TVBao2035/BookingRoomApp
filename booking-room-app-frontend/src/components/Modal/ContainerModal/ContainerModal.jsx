import './containerModal.scss';

import React from 'react';

export default function ContainerModal({children}) {
  return (
    <div className='ContainerModal position-fixed d-flex justify-content-center align-items-center top-0 left-0 w-100 h-100 z-1'>
        {children}
    </div>
  )
}
