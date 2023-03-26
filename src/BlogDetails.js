import {useParams} from "react-router-dom";
import useFetch from "./useFetch";
import {useNavigate} from "react-router-dom";
import {blogDeleteRequest, blogPostRequest} from "./Requests"
import {FiHeart} from "react-icons/fi";
import {useState, useEffect} from "react";

const BlogDetails = () => {

    const {id} = useParams()
    const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id)
    const navigate = useNavigate();
    const handleLike = (blog) => {
        blog.liked = !blog.liked;
        blogDeleteRequest(blog.id)
            .then(() => {
                    blogPostRequest(blog)
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

    // const handleNewLines = (body) =>{
    //    body.trim()
    //     return newbody;
    // }
    return (
        <div className="blog-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {blog &&
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.liked === false && <FiHeart onClick={()=>handleLike(blog)} className="heart-unliked"/>}
                        { blog.liked && <FiHeart onClick={()=>handleLike(blog)} className="heart-liked"/>}
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
            <button onClick={handleClick}>Delete</button>
        </div>
    );
}
export default BlogDetails