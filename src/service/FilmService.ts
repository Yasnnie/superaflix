import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const baseUrl = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export async function searchFilm(filmTitle: string) {
  return axios.get(`${baseUrl}&t=${filmTitle}&plot=full`);
}

export async function searchAll(text: string) {
  return axios.get(`${baseUrl}&s=${text}`);
}
