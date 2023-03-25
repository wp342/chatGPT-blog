export const blogPostRequest = (blog) => {
    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(blog)
    }).then(() => {
        console.log('blog list updated');
    })
}

export const blogDeleteRequest = async (id) => {
    await fetch('http://localhost:8000/blogs/' + id, {
        method: 'DELETE'
    })
}
export const dallERequest = (authToken, prompt) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authToken);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({"prompt": prompt, "n": 1, "size": "1024x1024"});

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://api.openai.com/v1/images/generations", requestOptions)
        .then(response => response.json())
        .then((result) => {
            //console.log(result.data[0].url)
            return result.data[0].url;
        })
        .catch(error => console.log('error', error));
}

export const fetchGPTEndpoint = (authToken, prompt) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", authToken);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "model": "text-davinci-003",
        "prompt": prompt,
        "temperature": 0.8,
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