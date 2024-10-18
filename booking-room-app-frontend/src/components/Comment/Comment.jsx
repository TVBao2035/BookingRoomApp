import { useState } from 'react';
import './commentStyle.scss';
import Avatar from '../Avatar'
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { changeLike, openModalComment } from '../../hooks/redux/actions';
import { createLike, deleteLike } from '../../APIs/likeAPI';
export default function Comment({id, src, name, message, liked, amountLikes, children, notComment=true}) {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const handleOpenModalComment = () => {
        dispatch(openModalComment(id));
    }
    const handleShow = () => {
        setShow(!show);
    }
    console.log({liked, amountLikes});
    const handleClickLike = async () => {
        let res;
        if(liked){
            res = await deleteLike({ userId: user.id, commentId: id });
        }else{
            res = await createLike({userId: user.id, commentId: id});
        }

        if(res.status===404){
            alert(res.message);
            return;
        }
        dispatch(changeLike(true));
    }
  return (
      <div className={'Comment ps-2 pb-2 position-relative'}>
            <div className='d-flex gap-2 '>
                <div className='pt-2'>
                    <Avatar src={src} small />
                </div>
                <div className='d-flex flex-column'>
                    <div className='fw-bolder'>
                        <p className='name_lable'>{name}</p>
                    </div>
                    <div>
                        <p className='comment_title'>{message}</p>
                    </div>
                    <div className='d-flex gap-3 pt-1 '>
                        <div
                            className='d-flex cursor_pointer align-items-center user-select-none'
                            onClick={handleClickLike}
                            onDoubleClick={()=>{}}
                        >
                            {
                              liked ? <AiFillLike className='text-primary cursor_pointer' /> : <AiOutlineLike className='cursor_pointer text-secondary' />
                            }
                            <p className={`number_lable ps-1 ${liked ? "text-primary" : 'text-secondary'}`}>
                              {amountLikes > 1 ? `${amountLikes} likes` : `${amountLikes} like`} 
                            </p>
                        </div>
                        {
                            notComment&&
                            <div 
                                  className={`d-flex cursor_pointer align-items-center gap-1 user-select-none
                                    ${children && children.length > 0 ? "text-primary" : "text-secondary"}
                                    `}
                                onClick={()=>handleOpenModalComment()}
                            >
                                <FaRegCommentDots />
                                <p className='number_lable '>
                                    comments
                                </p>
                            </div>
                        }

                        {
                            children && children.length>0 &&
                            <div className='d-flex align-items-center gap-1 text-secondary' onClick={handleShow}>
                                <p>{
                                    show ? (
                                        <div className='d-flex cursor_pointer align-items-center'>
                                            <p className='number_lable'>less</p>
                                            <MdExpandLess/>
                                        </div>
                                        ): (
                                            <div className='d-flex cursor_pointer align-items-center'>
                                            <p className='number_lable'>more</p>
                                            <MdExpandMore/>
                                        </div>
                                    )
                                }</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {
                children && show && 
                <div className=' border-start border-dark ps-2 pb-2 ms-sm-5 mt-2 ms-3 '>
                {
                   children
                }
                </div>
            }
    </div>
  )
}
