import { useEffect, useState } from "react";
import { fetchMovies } from "../Api/movieApi";

export const fetchDataFunction = (url) =>
{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        setLoading("Loading...")
        setData(null)
        setError(null)

        fetchMovies(url)
            .then((response) =>
            {
                setLoading(false)
                setData(response)
            })
            .catch((error) =>
            {
                setLoading(false)
                setError(error.message)
        })
    })
  return (
    <div>
          
    </div>
  )
}
