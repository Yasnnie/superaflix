import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export async function postUploadFile(data: FormData) {
  return baseAxios.post("/upload/", data);
}

export async function getUploadedFiles() {
  return baseAxios.get("/uploaded-files/");
}

export async function getFilms(page: number, filters: Filters) {
  let query = "";

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return baseAxios.get(`/movies/search/?page=${page}${query}`);
}

export async function getGenres() {
  return baseAxios.get("/genres/");
}
