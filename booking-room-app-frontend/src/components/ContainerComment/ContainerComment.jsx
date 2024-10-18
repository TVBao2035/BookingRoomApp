import React, { useEffect, useState } from 'react'
import autoRenderComment from '../../helpers/autoRenderComment'
import { closeModalComment, setModalComment } from '../../hooks/redux/actions';
import { IoMdSend, IoMdClose } from "react-icons/io";
import { createCommnet, getAllCommentFirst } from '../../APIs/commentAPI';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineLike, AiOutlineSend, AiFillLike } from "react-icons/ai";
import Comment from '../Comment';

export default function ContainerComment({roomId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const changeLike = useSelector(state => state.changeLike);
    const modalComment = useSelector(state => state.modalComment);
    const [commnetText, setCommentText] = useState('');
    const [mainText, setMainText] = useState('');
    const [listComment, setListComment] = useState([]);

    const handleCloseModalComment = () => {
        setCommentText('');
        dispatch(closeModalComment());
    }
    const handleSend = async () => {
        let response = await createCommnet({
            message: commnetText,
            userId: user.id,
            roomId: roomId,
            commentId: modalComment.commentId
        })

        if (response.status === 404) {
            alert(response.message);
        }
        getCommentFirst(roomId);
        handleCloseModalComment();
    }
    const getCommentFirst = async (roomId) => {
        let res = await getAllCommentFirst(roomId);
        if (res.status === 404) {
            alert(res.message);
            return;
        }
        setListComment(res.data);
    }
    const handleCreateComment = async()=>{
        let response = await createCommnet({
            message: mainText,
            roomId: roomId,
            userId: user.id,
            commentId: 0
        })
        if(response.status === 404){
            alert(response.message);
            return;
        }
        getCommentFirst(roomId);
        setMainText('');
    }

    useEffect(() => {
        getCommentFirst(roomId);
    }, [changeLike])
  return (
      <div className='container mt-3 mb-2'>
          <div>
              <div className='d-flex row gap-2 align-items-center'>
                    <div className='col-sm-1 col-3 text-end text-sm-start'>
                        <p className='fs-sm-5 fs-6'>Comments</p>
                    </div>
                    <div className='col'>
                        <input 
                            type="text"
                            className="form-control"
                            onChange={(e) => setMainText(e.target.value)}
                            value={mainText}
                        />
                    </div>
                    <div className='col-1 text-secondary d-flex align-items-center'
                        onClick={handleCreateComment}
                    >
                        <AiOutlineSend />
                    </div>
              </div>
              {/* All Comment */}
              <div className='px-4 d-flex gap-2 mt-3 flex-column'>
                  {
                      listComment && listComment?.map(comment =>
                          <Comment
                              key={`comment-${comment.id}`}
                              id={comment.id}
                              src={comment?.User?.avatar}
                              name={comment?.User?.name}
                              message={comment.message}
                              liked={comment.likes.some(like => like.userId === user.id)}
                              amountLikes={comment?.likes?.length}
                          >
                              {
                                  comment.children.map(child => autoRenderComment(child, 6, user.id))
                              }
                          </Comment>
                      )
                  }

              </div>
          </div>
          {modalComment.isOpen &&
              <div className='modal_comment position-fixed left-0 bottom-0 mb-2 bg-white row w-100 gap-2 pb-0 '>
                  <div className='col'>
                      <input
                          type="text"
                          className='form-control px-2 py-1'
                          onChange={(e) => setCommentText(e.target.value)}
                          value={commnetText}
                      />
                  </div>
                  <div
                      className={`col-1 fs-5 cursor_pointer d-flex align-items-center ${commnetText ? 'text-primary' : 'text-secondary'}`}
                      onClick={handleSend}
                  >
                      <IoMdSend />
                  </div>
                  <div
                      className='modal_icon--close cursor_pointer col-2 fs-5 d-flex align-items-center text-secondary'
                      onClick={handleCloseModalComment}
                  >
                      <IoMdClose />
                  </div>
              </div>
          }
      </div>
  )
}
