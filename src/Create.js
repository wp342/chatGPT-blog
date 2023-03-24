import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import randomWords from "random-words";

const Create = () => {

    const [chatGPT, setChatGPT] = useState(false);
    const [batchGenerate, setBatchGenerate] = useState(false);
    const [random, setRandom] = useState(false);
    const [subject, setSubject] = useState('');
    const [batchSize, setBatchSize] = useState(0);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const authToken = "Bearer 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"
    const randomWords = require('random-words');
    const fetchGPTEndpoint = (authToken, prompt) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", authToken);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "model": "text-davinci-003",
            "prompt": prompt,
            "temperature": 0,
            "max_tokens": 1000
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("https://api.openai.com/v1/completions", requestOptions)
            .then(response => response.json())
            .then((result) => {
                return result.choices[0].text;
            })
            .catch(error => console.log('error', error));
    }

    const fetchBlogEndpoint = (blog) => {
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
        })
    }


    const callGPTEndpoints = async (title) => {
        const bodyPrompt = "As an expert journalist generate a 250 tokens or under blog that is based on the title" + title + " and include the subject " + randomWords(1).toString() + " make sure the output does not start with two break points"
        const authorPrompt = "Based on a blog titled " + title + " think of an appropriate author name and just give back the name and nothing else"
        const body = await fetchGPTEndpoint(authToken, bodyPrompt)
        const author = await fetchGPTEndpoint(authToken, authorPrompt)
        return {title, body, author};
    }
    // const handleBatchSubmit = async (e) => {
    //     let Titles;
    //     if ((subject === '' || batchSize <= 0) && random === false){
    //         setError(true);
    //         setIsPending(false);
    //         return;
    //     }
    //     if (random) {
    //         const randomTitlePrompt = "As an Expert Journalist generate " + batchSize + " Random blog Titles based on one of the following words " + randomWords(batchSize).toString() + " and display nothing else"
    //         Titles = await fetchGPTEndpoint(authToken, randomTitlePrompt)
    //     } else {
    //         const titlePrompt = "As an Expert Journalist generate " + batchSize + " blog Titles on the subject of " + subject + " and display nothing else"
    //         Titles = await fetchGPTEndpoint(authToken, titlePrompt)
    //     }
    //     const splitTitles = Titles.split(/\n+\d+\./);
    //     splitTitles.shift();
    //     await splitTitles.map(async ti => {
    //         let blog = await callGPTEndpoints(ti);
    //         await fetchBlogEndpoint(blog)
    //     })
    //     setIsPending(false);
    //     navigate('/');
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        // setError(false);
        let blog;
        // if (batchGenerate) {
        //     await handleBatchSubmit()
        // } else {
            if (chatGPT) {
                blog = await callGPTEndpoints(title)
            } else {
                blog = {title, body, author}
            }

            fetchBlogEndpoint(blog)
            setIsPending(false);
            navigate('/');

        }
    // }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Generate Using Chat GPT?</label>
                <input type="checkbox"
                       onChange={() => setChatGPT(!chatGPT)}
                />

                {/*{chatGPT && <>*/}
                {/*    <label>Batch Generate?</label>*/}
                {/*    <input type="checkbox"*/}
                {/*           onChange={() => setBatchGenerate(!batchGenerate)}*/}
                {/*    />*/}
                {/*</>}*/}
                {!batchGenerate && <>
                    <label>Blog Title:</label>
                    <input
                        type="text"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </>
                }
                {!chatGPT && <> <label>Blog Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                    <label>Blog Author:</label>
                    <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    /> </>
                }
                {batchGenerate &&
                    <>
                        <label>Random Subjects? </label>
                        <input type="checkbox"
                               onChange={() => setRandom(!random)}
                        />
                        <label> If above not ticked please specify the subject you require the blogs to be based
                            on: </label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />

                    <label> BatchSize: </label>
                    <input
                        type="number"
                        required
                        value={batchSize}
                        onChange={(e) => setBatchSize(e.target.value)}
                    />
                </>}

                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>adding Blog...</button>}
                {error && <p> Please choose a Subject or a greater BatchSize!</p>}
            </form>
        </div>
    );
}
export default Create;