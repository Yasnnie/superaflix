import Image from "next/image";
import styles from "./FilmeDetail.module.scss";
import { Star, AccessTime, ArrowBack } from "@mui/icons-material";
import Logo from "/public/logo.svg";
import { useRouter } from "next/router";

interface Props {
  film: FilmMetaData;
}

export function FilmDetail({ film }: Props) {
  const router = useRouter();
  return (
    <main className={styles.container}>
      <div className={styles.image_container}>
        <button className={styles.goBack} onClick={() => router.back()}>
          <ArrowBack />
        </button>

        <span className={styles.bgimage} />
        {film.Poster != "N/A" && (
          <Image
            src={film.Poster}
            alt={film.Title}
            fill
            objectFit="cover"
            quality={100}
          />
        )}
      </div>
      <div className={styles.infos}>
        <h1 className={styles.logo}>
          <Image src={Logo} alt="SuperaFlix" fill />
        </h1>

        <div className={styles.row}>
          <h2>
            {film.Title} ({film.Year})
          </h2>

          <span className={styles.raiting}>
            <Star sx={{ fontSize: 18 }} /> {film.imdbRating} / 10
          </span>
        </div>

        <div className={styles["c-timer"]}>
          <AccessTime sx={{ fontSize: 19 }} />
          <p>{film.Runtime}</p>
        </div>

        <p>{film.Plot}</p>

        <p>
          <b>Genero: </b>
          {film.Genre}
        </p>
        <p>
          <b>Direção: </b>
          {film.Director}
        </p>
        <p>
          <b>Escritor: </b>
          {film.Writer}
        </p>
        <p>
          <b>Elenco: </b>
          {film.Actors}
        </p>
      </div>
    </main>
  );
}
