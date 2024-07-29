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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
      setData([]);
    }

    const sendRequest = useCallback(
      async function sendRequest(data) {
        setIsLoading(true);
        try {
          const resData = await sendHttpRequest(url, { ...config, body: data });
          setData(resData);
        } catch (error) {
          console.log("GOT AN ERROR");
          setError(error.message || "A problem occured");
        }

        setIsLoading(false);
      },
      [url, config]
    );

    useEffect(() => {
        if (config.method === "GET") {
          sendRequest();
        }
    }, [sendRequest, config.method]);

    return {
      data,
      isLoading,
      error,
      sendRequest,
      clearData,
      setError
    };
}