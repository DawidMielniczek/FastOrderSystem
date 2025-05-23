import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);

    const restData = await response.json();

    if(!response.ok){
        throw new Error(restData.message || 'Something went wrong...');
    }

    return restData;
}

export default function useHttp(url, config){
    
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const sendRequest = useCallback(async function sendRequest(url, config){
        setIsLoading(true);
        try{
            const resData = sendHttpRequest();
            setData(resData);
        }
        catch(error){
            setError(error.message || 'Something went wrong.');
        }
        setIsLoading(false);
    },[url, config]);

    useEffect(()=>{
        if(config && config.method === 'GET'){
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest
    }
}