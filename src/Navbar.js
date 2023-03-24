import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className ="navbar">
            <h1> The Chat-GPT Blog</h1>
            <div className="links">
                <Link to= "/">Home</Link>
                <Link className="new-blog" to="/create" style={{
                    color: "white",
                    backgroundColor: '#50C878',
                    borderRadius: '8px'
                }}>New Blog</Link>
            </div>
        </nav>
    );
}
export default Navbar;