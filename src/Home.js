import {useState, useEffect} from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [search, setSearch] = useState('');
    let {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs')
    const navigate = useNavigate();

    const handleDelete = () =>{
        blogs.map(blog => fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => console.log("blog: " + blog.title + "Successfully deleted")
        ))
        navigate('/create')
     }

    return (
        <div className = "home">
            <form className="search-bar">
                <input type="search" placeholder="Search..."
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            {error && <div>{error}</div>}
            {isPending && <div> Loading......</div>}
            {blogs && search ==='' && <BlogList blogs={blogs} title="All Blogs!" />}
            {blogs && search !=='' && <BlogList blogs={blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))} title="All Blogs!" />}
            <button onClick={handleDelete}>Remove ALL</button>
        </div>
    );
}
export default Home;