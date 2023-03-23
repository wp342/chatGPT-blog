import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Create = () => {

    const [chatGPT, setChatGPT] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author}
        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(blog)}).then(()=>{
                console.log('new blog added');
                setIsPending(false);
                navigate('/');
        })

    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Generate Using Chat GPT?</label>
                <input type="checkbox"
                value = {chatGPT}
                onChange={(e) => setChatGPT(e.target.value)}

                />
                <label>Blog Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:</label>
                <textarea
                    value={body}
                    onChange = {(e) => setBody(e.target.value)}
                    required
                ></textarea>
                <label>Blog Author:</label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange = {(e) => setAuthor(e.target.value)}
                />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>adding Blog...</button>}
            </form>
        </div>
    );
}
export default Create;