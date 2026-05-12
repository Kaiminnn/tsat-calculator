"use client";

import { FormEvent, useMemo, useState } from "react";
import { calculateTsat } from "@/lib/tsat";
import styles from "./page.module.css";

export default function Home() {
  const [serumIron, setSerumIron] = useState("");
  const [tibc, setTibc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => calculateTsat(serumIron, tibc), [serumIron, tibc]);
  const errorMessage = result.ok ? null : result.message;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.header} aria-labelledby="page-title">
          <p className={styles.eyebrow}>Medical calculator</p>
          <h1 id="page-title">TSAT Calculator</h1>
          <p>
            Enter serum iron and TIBC to calculate transferrin saturation as a
            percentage.
          </p>
        </section>

        <form className={styles.calculator} onSubmit={handleSubmit} noValidate>
          <label className={styles.field}>
            <span>Serum iron</span>
            <div className={styles.inputWrap}>
              <input
                inputMode="decimal"
                name="serumIron"
                onChange={(event) => setSerumIron(event.target.value)}
                placeholder="80"
                type="text"
                value={serumIron}
              />
              <span aria-hidden="true">ug/dL</span>
            </div>
          </label>

          <label className={styles.field}>
            <span>TIBC</span>
            <div className={styles.inputWrap}>
              <input
                inputMode="decimal"
                name="tibc"
                onChange={(event) => setTibc(event.target.value)}
                placeholder="320"
                type="text"
                value={tibc}
              />
              <span aria-hidden="true">ug/dL</span>
            </div>
          </label>

          <button type="submit">Calculate TSAT</button>
        </form>

        <section className={styles.result} aria-live="polite">
          {submitted && result.ok ? (
            <>
              <span className={styles.resultLabel}>TSAT</span>
              <strong>{result.formatted}%</strong>
            </>
          ) : submitted && errorMessage ? (
            <p className={styles.error}>{errorMessage}</p>
          ) : (
            <p className={styles.placeholder}>Result will appear here.</p>
          )}
        </section>
      </main>
    </div>
  );
}
