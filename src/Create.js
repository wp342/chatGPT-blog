import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {dallERequest, fetchGPTEndpoint, blogPostRequest} from "./Requests";

const Create = () => {

    const [chatGPT, setChatGPT] = useState(false);
    const [batchGenerate, setBatchGenerate] = useState(false);
    const [subject, setSubject] = useState('');
    const [batchSize, setBatchSize] = useState(0);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const authToken = <INSERT OPENAI API KEY HERE>
    const callGPTEndpoints = async (title) => {
        const bodyPrompt = "As an expert journalist generate a 250 tokens or under blog that is based on the title" + title
        const authorPrompt = "Based on a blog titled " + title + " think of an appropriate author name and just give back the name and nothing else"
        const body = await fetchGPTEndpoint(authToken, bodyPrompt)
        const author = await fetchGPTEndpoint(authToken, authorPrompt)
        const picURL = await dallERequest(authToken, title)
        const liked = false;
        return {title, body, author, picURL, liked};
    }
    const handleBatchSubmit = async (e) => {
        let Titles;
        let prompt;
        if (subject === '') {
            prompt = "As an Expert Journalist generate " + batchSize + " Random blog Titles and display nothing else"
        } else {
            prompt = "As an Expert Journalist generate " + batchSize + " blog Titles on the subject of " + subject + " and display nothing else"
        }

        Titles = await fetchGPTEndpoint(authToken, prompt)

        const splitTitles = Titles.split(/\n+\d+\./);
        splitTitles.shift();
        splitTitles.map(async ti => {
            let blog = await callGPTEndpoints(ti)
            await blogPostRequest(blog)
        })
        setIsPending(false);
        navigate('/');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        let blog;
        if (batchGenerate) {
            await handleBatchSubmit();
        } else {
            if (chatGPT) {
                blog = await callGPTEndpoints(title)
            } else {
                const picURL = await dallERequest(authToken, title)
                const liked = false;
                blog = {title, body, author, picURL, liked}
            }

            blogPostRequest(blog)
            setIsPending(false);
            navigate('/');

        }
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Generate Using Chat GPT?</label>
                <input type="checkbox"
                       onChange={() => setChatGPT(!chatGPT)}
                />

                {chatGPT && <>
                    <label>Batch Generate?</label>
                    <input type="checkbox"
                           onChange={() => setBatchGenerate(!batchGenerate)}
                    />
                </>}
                {chatGPT === false &&
                    <>
                        <input
                            placeholder="Blog Title.."
                            type="text"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Blog Body..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        ></textarea>
                        <input
                            placeholder="Blog Author.."
                            type="text"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </>
                }
                {chatGPT && batchGenerate === false &&
                    <>
                        <input
                            placeholder="Blog Title.."
                            type="text"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </>
                }
                {batchGenerate && chatGPT &&
                    <>
                        <input
                            placeholder="Batch Subject.."
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />

                        <label> BatchSize: </label>
                        <select
                            required
                            value={batchSize}
                            onChange={(e) => setBatchSize(e.target.value)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </>
                }

                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>adding Blog...</button>}
            </form>
        </div>
    );
}
export default Create;