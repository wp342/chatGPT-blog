import {useParams} from "react-router-dom";
import useFetch from "./useFetch";
import {useNavigate} from "react-router-dom";

const BlogDetails = () => {
    const {id} = useParams()
    const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id)
    console.log(blog)
    const navigate = useNavigate();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() =>
            navigate('/')
        )
    }
    return (
        <div className="blog-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {blog &&
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    {blog.picURL && (
                        <img src={blog.picURL} width="512" height="512" alt="new" />
                    )}
                </article>
            }
            <button onClick={handleClick}>Delete</button>
        </div>
    );
}
export default BlogDetails