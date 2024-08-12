import Image from "next/image";
import { FileDropzone } from "../FileDropzone";
import { CheckCircle, Cancel } from "@mui/icons-material";

import Logo from "/public/logo.svg";
import styles from "./UploadData.module.scss";
import { getUploadedFiles, postUploadFile } from "@/service/UploadService";
import { useEffect, useState } from "react";

export function UploadData() {
  const [uploadedFiles, setUploadedFiles] = useState<Upload[]>([]);

  useEffect(() => {
    getUploadedFiles().then(({ data }) => setUploadedFiles(data));
  }, []);

  async function onDropFile(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => formData.append(`files`, file));

    try {
      const { data } = await postUploadFile(formData);
      setUploadedFiles([...data, ...uploadedFiles]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.main__logo}>
        <Image src={Logo} alt="SuperaFlix" fill />
      </h1>
      <p className={styles.main__subtitle}>Faça seu upload de arquivos aqui:</p>

      <FileDropzone onFilesDropped={onDropFile} />

      <ul className={styles.main__list}>
        {uploadedFiles.map((item) => (
          <li key={item.id} className={styles.main__list__option}>
            <header>
              <strong>
                {item.file_name}{" "}
                {item.processing_duration && (
                  <time>- {item.processing_duration}</time>
                )}
              </strong>

              <span className={styles.tag}>{item.status}</span>
            </header>

            <div className={styles.main__list__option__row}>
              <div className={styles.main__list__option__status}>
                <CheckCircle sx={{ fontSize: 22 }} /> {item.success_count}
              </div>
              <div
                className={`${styles.main__list__option__status} ${styles["main__list__option__status--error"]}`}
              >
                <Cancel sx={{ fontSize: 22 }} /> {item.error_count}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
