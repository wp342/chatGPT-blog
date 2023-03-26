import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1> The Chat-GPT Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link className="new-blog" to="/create">New Blog</Link>
            </div>
        </nav>
    );
}
export default Navbar;