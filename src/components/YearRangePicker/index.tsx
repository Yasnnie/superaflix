import React, { useState } from "react";
import styles from "./YearRangePicker.module.scss";

interface Props {
  onChangeStart: (value: string) => void;
  onChangeEnd: (value: string) => void;
}

export function YearRangePicker({ onChangeStart, onChangeEnd }: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i);

  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);

  const handleStartYearChange = (e: any) => {
    const value = e.target.value;
    const newStartYear = parseInt(value);
    onChangeStart(value);
    setStartYear(newStartYear);
  };

  const handleEndYearChange = (e: any) => {
    const value = e.target.value;
    const newEndYear = parseInt(value);
    onChangeEnd(value);
    setEndYear(newEndYear);
  };

  return (
    <label>
      <div className={styles.row}>
        <select value={startYear} onChange={handleStartYearChange}>
          <option value={""}>De:</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <span />

        <select value={endYear} onChange={handleEndYearChange}>
          <option value={""}>Até:</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}
