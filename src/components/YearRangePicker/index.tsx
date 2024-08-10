import React, { useState } from "react";
import styles from "./YearRangePicker.module.scss";

export function YearRangePicker() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i);

  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);

  const handleStartYearChange = (e: any) => {
    const newStartYear = parseInt(e.target.value);
    if (newStartYear <= endYear) {
      setStartYear(newStartYear);
    }
  };

  const handleEndYearChange = (e: any) => {
    const newEndYear = parseInt(e.target.value);
    if (newEndYear >= startYear) {
      setEndYear(newEndYear);
    }
  };

  return (
    <label>
      Data:
      <div className={styles.row}>
        <select value={startYear} onChange={handleStartYearChange}>
          <option value={0}></option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <span />

        <select value={endYear} onChange={handleEndYearChange}>
          <option value={0}></option>
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
