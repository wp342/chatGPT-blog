import {Link} from "react-router-dom";
import {FiHeart} from "react-icons/fi"


const BlogList = ({blogs, handleLike}) => {

    return (
        <div className="blog-list">
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <div>
                        <Link to={'/blogs/' + blog.id}>
                            <h2>{blog.title}</h2>
                            <p>
                                written by: {blog.author}
                            </p>

                        </Link>
                    </div>
                    <div>
                        {blog.liked === false && <FiHeart onClick={() => handleLike(blog)} className="heart-unliked"/>}
                        {blog.liked && <FiHeart onClick={() => handleLike(blog)} className="heart-liked"/>}
                    </div>

                </div>
            ))}
        </div>
    );
}
export default BlogList;