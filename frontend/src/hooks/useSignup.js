import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(false);

        const response = await fetch('https://theroutine.onrender.com/api/users/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
        const jsonRes = await response.json()
        console.log("sdasdas", jsonRes.error);

        if (jsonRes.error) {
            setSuccess(false);
            setIsLoading(false);
            setError(jsonRes.error);
        } else {
            localStorage.setItem("user", JSON.stringify(jsonRes))
            dispatch({ type: "LOGIN", payload: jsonRes })
            setSuccess(true)
            setError(false)
            setIsLoading(false);
        }
    }
    return [signup, isLoading, error, success];
}