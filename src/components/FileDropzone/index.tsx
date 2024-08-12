import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { AttachFile } from "@mui/icons-material";
import styles from "./FileDropzone.module.scss";

type Props = {
  onFilesDropped: (files: File[]) => void;
};

export function FileDropzone({ onFilesDropped }: Props) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setError(
          "Alguns arquivos são muito grandes. O tamanho máximo é de 430 MB."
        );
      } else {
        setError(null);
      }
      onFilesDropped(acceptedFiles);
    },
    [onFilesDropped]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    maxSize: 430 * 1024 * 1024, // Limite de 430 MB em bytes
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${styles.container} ${
          isDragActive && styles["container--selected"]
        }`}
      >
        <input {...getInputProps()} />
        <AttachFile sx={{ fontSize: 30 }} />
        {isDragActive ? (
          <p>Solte os arquivos aqui...</p>
        ) : (
          <p>Arraste e solte os arquivos aqui, ou clique para selecionar</p>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}{" "}
    </>
  );
}
