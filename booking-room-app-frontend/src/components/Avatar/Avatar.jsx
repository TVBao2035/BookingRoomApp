import React from 'react'
import { AVATAR } from '../../assets/photos/avatar';
import './avatar.scss';
export default function Avatar({src= AVATAR, medium, large, small, smaller}) {
  return (
    <div className='Avatar'>
        <img 
            className={
                        `
                        ${medium && 'medium'} 
                        ${large && 'large'}
                        ${small && 'small'}
                        ${smaller && 'smaller'}
                        `
                    } 
            src={src} alt="" />
    </div>
  )
}
