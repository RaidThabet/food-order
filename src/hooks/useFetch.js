/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error("Something went wrong.")
    }

    return resData;
}

export default function useFetch(url, config) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "A problem occured");
      }

      setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    return {
      data,
      isLoading,
      error,
    };
}