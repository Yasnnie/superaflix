import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const httpClient = axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=${API_KEY}`,
});

export async function searchFilm(filmTitle: string) {
  return httpClient.get(`&t=${filmTitle}`);
}
