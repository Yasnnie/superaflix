import Image from "next/image";
import Logo from "/public/logo.svg";
import styles from "./HomeSearch.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export function HomeSearch() {
  const router = useRouter();
  const [text, setText] = useState("");

  function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/film/${text}`);
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.main__logo}>
        <Image src={Logo} alt="SuperaFlix" fill />
      </h1>

      <form className={styles.main__form} onSubmit={handleOnSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Pesquisar</button>
      </form>
    </main>
  );
}
