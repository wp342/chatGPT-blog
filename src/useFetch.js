//custom hooks in react always start with the 'use' word
import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() =>{
        fetch(url)
            .then(res =>{
                if (!res.ok){
                    throw Error('Could Not Fetch Data')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false)
                setError(null)
            })
            .catch((err) => {
                setIsPending(false)
                setError(err.message)
            })
    },[url]);

    return {data, isPending, error}
}

export default useFetch;