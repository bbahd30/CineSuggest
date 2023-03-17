import axios from 'axios'

const baseURL = "https://api.themoviedb.org/3"

const TOKEN = process.env.REACT_APP_CINESUGGEST_APP_TOKEN;

const headers = {
    Authorization: "bearer " + TOKEN,
}

export const FetchMovies = (url, params) =>
{
    try
    {
        return axios
            .get((baseURL + url),
                {
                    headers: { ...headers },
                    params
                })
    }
    catch (error)
    {
        alert(error)
        return error
    }
}