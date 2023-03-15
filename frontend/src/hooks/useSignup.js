import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://theroutine.onrender.com/api/users/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
        const jsonRes = await response.json()

        if (!response.ok) {
            setIsLoading(false);
            setError(jsonRes.error)
        } else {
            localStorage.setItem("user", JSON.stringify(jsonRes))
            dispatch({ type: "LOGIN", payload: jsonRes })
            setIsLoading(false);
        }
    }

    return [signup, isLoading, error];
}