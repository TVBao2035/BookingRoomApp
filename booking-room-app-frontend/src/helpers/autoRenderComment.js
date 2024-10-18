import Comment from "../components/Comment";

const autoRenderComment = (data, loop, userId) => {
    loop--;
    return (
        <Comment
            key={`comment-${data.id}`}
            id={data.id}
            src={data?.User?.avatar}
            name={data?.User?.name}
            message={data.message}
            liked={data.likes.some(like => like.userId === userId)}
            amountLikes={data?.likes?.length}
            notComment={loop !== 0}
        >
            {
                data.children?.length > 0 &&
                data.children.map(child => autoRenderComment(child, loop, userId))
            }
        </Comment>
    )
}

export default autoRenderComment;