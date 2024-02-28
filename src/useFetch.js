import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(()=>{
    
    const abortFetch = new AbortController();
    
    setTimeout(() => {
        fetch(url, {signal: abortFetch.signal})
        .then(res =>{
            if (!res.ok) {
                throw Error("Failed to fetch resource")
            }
            return res.json();
        })
        .then(data =>{
            setResponseData(data);
            setErrorMessage(null);
            setIsLoading(false);
        })
        .catch(error =>{
            if (error.name !== "AbortError") {
                setErrorMessage(error.message);
                setIsLoading(false);
            }
        })
    }, 1000);
    return ()=> abortFetch.abort();
  }, [url]);

    return { responseData, isLoading, errorMessage }
}

export default useFetch;