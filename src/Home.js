import {useState} from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import {useNavigate} from "react-router-dom";
import {blogDeleteRequest, blogPostRequest} from "./Requests";
import {FiHeart} from "react-icons/fi";

const Home = () => {
    const [search, setSearch] = useState('');
    const [liked, setLiked] = useState(false);
    let {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs')
    const navigate = useNavigate();

    const handleLike = (blog) => {
        blog.liked = !blog.liked;
        blogDeleteRequest(blog.id)
            .then(() => {
                    blogPostRequest(blog)
                    navigate('/')
                }
            );
    }

    // const handleClick = () => {
    //     setLiked(!liked)
    // }

    return (
        <div className="home">
            <h2>All Blogs</h2>
            <form className="search-bar-heart">

                <input type="search" placeholder="Search..."
                       type="text"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                />
                <div className="global-heart">
                    {liked === false && <FiHeart onClick={()=>setLiked(!liked)} className="heart-unliked"/>}
                    {liked && <FiHeart onClick={()=>setLiked(!liked)} className="heart-liked"/>}
                </div>
            </form>
            {error && <div>{error}</div>}
            {isPending && <div> Loading......</div>}
            {blogs && <BlogList blogs={blogs.filter(blog => {
                let isInSearch = true;
                let isLiked = true;
                if (search !== '') {
                    isInSearch = blog.title.toLowerCase().includes(search.toLowerCase())
                }
                if (liked) {
                    isLiked = blog.liked
                }
                return isInSearch && isLiked
            })} title="All Blogs!" handleLike={handleLike}/>}
        </div>
    );
}
export default Home;