const Comments = ({blog, postComment, comment, setComment}) => {

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            postComment();
        }} className="comments">
            {blog && blog.comments && blog.comments.map((comment) => (
                <div className="commented-element">
                    <p className="comment">{comment.content}</p>
                    <p className="author-time-stamp">{"Posted by " + comment.author + " at " + comment.date}</p>
                </div>
            ))}
            <div>
            <textarea
                placeholder="Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required>
            </textarea>
            </div>
            <div>
                <button>Post Comment</button>
            </div>
        </form>
    )
}
export default Comments