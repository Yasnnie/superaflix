import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AttachFile } from "@mui/icons-material";
import styles from "./FileDropzone.module.scss";

type Props = {
  onFilesDropped: (files: File[]) => void;
};

export function FileDropzone({ onFilesDropped }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesDropped(acceptedFiles);
    },
    [onFilesDropped]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
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
  );
}
