import Image from "next/image";
import Logo from "/public/logo.svg";
import styles from "./HomeSearch.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { searchAll } from "@/service/ApiService";
import Link from "next/link";
import { YearRangePicker } from "../YearRangePicker";

export function HomeSearch() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [posters, setPosters] = useState<Poster[]>([]);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    if (text) {
      try {
        const { data } = await searchAll(text);
        console.log(data);
        setPosters(data.Search);
      } catch (err) {}
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.main__logo}>
        <Image src={Logo} alt="SuperaFlix" fill />
      </h1>

      <form className={styles.main__form} onSubmit={handleOnSubmit}>
        <YearRangePicker />
        <label>
          <span>Categoria:</span>

          <select>
            <option></option>
            <option>Terror</option>
            <option>Ação</option>
            <option>Comédia</option>
          </select>
        </label>

        <label>
          <span>Avaliação mínima:</span>

          <input type="number" min={0} max={10} step={1} />
        </label>

        <label>
          <span>Qtd avaliações:</span>

          <input type="number" />
        </label>

        <button type="submit" className={styles.main__form__submit}>
          Filtrar
        </button>
      </form>

      <div className={styles.main__table}>
        {posters.map((item) => (
          <Link
            key={item.imdbID}
            href={`/film/${item.imdbID}`}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.main__table__card}>
              <div className={styles["main__table__card__c-img"]}>
                {item.Poster != "N/A" && (
                  <Image src={item.Poster} alt={item.Title} fill />
                )}
              </div>
              <p>{item.Title}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
