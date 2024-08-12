import Image from "next/image";
import Logo from "/public/logo.svg";
import styles from "./HomeSearch.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { YearRangePicker } from "../YearRangePicker";
import { getFilms, getGenres } from "@/service/UploadService";
import { Star } from "@mui/icons-material";

export function HomeSearch() {
  const [loading, setLoading] = useState(true);

  const [filters, setFilter] = useState<Filters>({
    title: "",
    min_votes: "",
    min_rating: "",
    genres: "",
    year_end: "",
    year_start: "",
  });

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    getGenres().then(({ data }) => setGenres(data));
    getData(1);
  }, []);

  async function getData(newPage: number) {
    setLoading(true);
    try {
      const { data } = await getFilms(page, filters);
      setMovies(data.results);
      setPage(newPage);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPrevData() {
    if (page > 1) {
      await getData(page - 1);
    }
  }
  async function getNextData() {
    await getData(page + 1);
  }

  function editFilter(key: keyof Filters, value: string) {
    setFilter((filters) => {
      return { ...filters, [key]: value };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    getData(1);
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.main__logo}>
        <Image src={Logo} alt="SuperaFlix" fill />
      </h1>

      <form className={styles.main__form} onSubmit={handleSubmit}>
        <label>
          <input
            placeholder="Nome:"
            value={filters.title}
            onChange={(e) => editFilter("title", e.target.value)}
          />
        </label>

        <label>
          <select onChange={(e) => editFilter("genres", e.target.value)}>
            <option>Gênero:</option>
            {genres.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <YearRangePicker
          onChangeStart={(value) => editFilter("year_start", value)}
          onChangeEnd={(value) => editFilter("year_end", value)}
        />

        <label>
          <input
            placeholder="Avaliação mínima:"
            type="number"
            min={0}
            max={10}
            step={1}
            onChange={(e) => editFilter("min_rating", e.target.value)}
          />
        </label>

        <label>
          <input
            placeholder="Qtd avaliações:"
            onChange={(e) => editFilter("min_votes", e.target.value)}
            type="number"
          />
        </label>

        <button type="submit" className={styles.main__form__submit}>
          Filtrar
        </button>
      </form>

      {loading ? (
        <div className={styles["c-loader"]}>
          <div className={styles.loader} />
        </div>
      ) : (
        <div className={styles.main__table}>
          {movies.map((movie) => (
            <Link
              key={movie.movieid}
              href={`/film/${movie.title}`}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.main__table__card}>
                <strong>{movie.title}</strong>

                <p>
                  <b>Gênero:</b> {movie.genres.split("|").join(" | ")}
                </p>

                {movie.average_rating && (
                  <div className={styles.main__table__card__row}>
                    <Star sx={{ fontSize: 18 }} />
                    <p>{movie.average_rating.toFixed(2)} / 10</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button onClick={getPrevData}>Voltar</button>
        <span>{page}</span>
        <button onClick={getNextData}>Próximo</button>
      </div>
    </main>
  );
}
