import Image from "next/image";
import { FileDropzone } from "../FileDropzone";
import { CheckCircle, Cancel } from "@mui/icons-material";

import Logo from "/public/logo.svg";
import styles from "./UploadData.module.scss";

export function UploadData() {
  return (
    <main className={styles.main}>
      <h1 className={styles.main__logo}>
        <Image src={Logo} alt="SuperaFlix" fill />
      </h1>
      <p className={styles.main__subtitle}>Faça seu upload de arquivos aqui:</p>

      <FileDropzone onFilesDropped={(file) => console.log(file)} />

      <ul className={styles.main__list}>
        {[1, 2, 3, 4, 5].map((item) => (
          <li key={item} className={styles.main__list__option}>
            <strong>
              Arquivo {item} <time>(1m)</time>
            </strong>

            <div className={styles.main__list__option__row}>
              <div className={styles.main__list__option__status}>
                <CheckCircle sx={{ fontSize: 22 }} /> 4
              </div>
              <div
                className={`${styles.main__list__option__status} ${styles["main__list__option__status--error"]}`}
              >
                <Cancel sx={{ fontSize: 22 }} /> 4
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
