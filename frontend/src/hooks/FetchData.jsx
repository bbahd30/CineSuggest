import { useEffect, useState } from "react";
import { FetchMovies } from "../Api/movieApi";

export const FetchData = (url) =>
{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        setLoading("Loading...")
        setData(null)
        setError(null)
    })
  return (
    <div>
          
    </div>
  )
}
