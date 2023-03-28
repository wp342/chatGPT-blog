import {useParams} from "react-router-dom";
import useFetch from "./useFetch";
import {useNavigate} from "react-router-dom";
import {blogDeleteRequest, blogPostRequest} from "./Requests"
import {FiHeart} from "react-icons/fi";
import {useState, useEffect} from "react";
import Comments from "./Comments";

const BlogDetails = () => {
    const {id} = useParams()
    const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id);
    const {data: blogs, isBlogsPending, blogsError} = useFetch('http://localhost:8000/blogs');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const date = new Date();

    const handleLike = (blog) => {
        blog.liked = !blog.liked;
        blogDeleteRequest(blog.id)
            .then(() => {
                    blogPostRequest(blog)
                    navigate('/blogs/' + id)
                }
            );
    }

    const postComment = () => {
        const current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
        const current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        const date_time = current_time + " " + current_date;

        blog.comments.push({content:comment, author:"User", date:date_time})
        blogDeleteRequest(blog.id)
            .then(() => {
                    blogPostRequest(blog)
                    setComment('');
                    navigate('/blogs/' + id)
                }
            );
    }

    const handleClick = () => {
        blogDeleteRequest(blog.id)
            .then(() =>
                navigate('/')
            )
    }

    const incDecPage = (command) => {
       const index = blogs.findIndex((blog)=>blog.id === parseInt(id));
       setComment('');
        try{
        if (command === "increment"){
            navigate('/blogs/' + blogs[index+1].id)

        }else if (command === "decrement"){
            navigate('/blogs/' + blogs[index-1].id)
        }}catch (e){
            console.log("Theres a problem")
        }
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {blog &&
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div className="navigation-like">
                        <button className="previous-button" onClick={()=>incDecPage("decrement")}>Previous</button>
                        {blog.liked === false && <FiHeart onClick={() => handleLike(blog)} className="heart-unliked"/>}
                        {blog.liked && <FiHeart onClick={() => handleLike(blog)} className="heart-liked"/>}
                        <button className="next-button" onClick={()=>incDecPage("increment")}>Next</button>
                    </div>
                    <div>
                        {
                            blog.body.trim()
                        }
                    </div>
                    {blog.picURL && (
                        <img src={blog.picURL} width="512" height="512" alt="new"/>
                    )}
                </article>
            }
            {blog && <Comments blog={blog} postComment={postComment} comment={comment} setComment={setComment}/>}
            <button onClick={handleClick}>Delete</button>
        </div>
    );
}
export default BlogDetails