import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {

        if (!user) {
            setError("You must be logged in");
        } else {
            const abortCon = new AbortController();

            fetch(url, {
                signal: abortCon.signal,
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Cannot retrieve data from source");
                    }
                    return res.json()
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                }).catch((err) => {
                    if (!(err.name === "AbortError")) {
                        setError(err.message);
                        setIsPending(false);
                    }
                })
            return () => abortCon.abort();
        }
    }, [url, user]);

    return [data, isPending, error];
}

export default useFetch;