"use client";

import { FormEvent, useMemo, useState } from "react";
import { calculateCcr, Sex } from "@/lib/ccr";
import { calculateTsat } from "@/lib/tsat";
import styles from "./page.module.css";

export default function Home() {
  const [serumIron, setSerumIron] = useState("");
  const [tibc, setTibc] = useState("");
  const [tsatSubmitted, setTsatSubmitted] = useState(false);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [serumCreatinine, setSerumCreatinine] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [ccrSubmitted, setCcrSubmitted] = useState(false);

  const tsatResult = useMemo(() => calculateTsat(serumIron, tibc), [serumIron, tibc]);
  const tsatErrorMessage = tsatResult.ok ? null : tsatResult.message;
  const ccrResult = useMemo(
    () => calculateCcr(age, weight, serumCreatinine, sex),
    [age, weight, serumCreatinine, sex],
  );
  const ccrErrorMessage = ccrResult.ok ? null : ccrResult.message;

  const handleTsatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTsatSubmitted(true);
  };

  const handleCcrSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCcrSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.header} aria-labelledby="page-title">
          <p className={styles.eyebrow}>Medical calculator</p>
          <h1 id="page-title">TSAT and CCr Calculator</h1>
          <p>
            Calculate transferrin saturation and estimated creatinine clearance
            from common lab values.
          </p>
        </section>

        <div className={styles.calculatorGrid}>
          <section className={styles.calculatorCard} aria-labelledby="ccr-title">
            <div className={styles.cardHeader}>
              <h2 id="ccr-title">CCr</h2>
              <p>Cockcroft-Gault estimate</p>
            </div>

            <form className={styles.calculator} onSubmit={handleCcrSubmit} noValidate>
              <label className={styles.field}>
                <span>Age</span>
                <div className={styles.inputWrap}>
                  <input
                    inputMode="decimal"
                    name="age"
                    onChange={(event) => setAge(event.target.value)}
                    placeholder="60"
                    type="text"
                    value={age}
                  />
                  <span aria-hidden="true">years</span>
                </div>
              </label>

              <label className={styles.field}>
                <span>Weight</span>
                <div className={styles.inputWrap}>
                  <input
                    inputMode="decimal"
                    name="weight"
                    onChange={(event) => setWeight(event.target.value)}
                    placeholder="70"
                    type="text"
                    value={weight}
                  />
                  <span aria-hidden="true">kg</span>
                </div>
              </label>

              <label className={styles.field}>
                <span>Serum creatinine</span>
                <div className={styles.inputWrap}>
                  <input
                    inputMode="decimal"
                    name="serumCreatinine"
                    onChange={(event) => setSerumCreatinine(event.target.value)}
                    placeholder="1.0"
                    type="text"
                    value={serumCreatinine}
                  />
                  <span aria-hidden="true">mg/dL</span>
                </div>
              </label>

              <fieldset className={styles.sexGroup}>
                <legend>Sex</legend>
                <label>
                  <input
                    checked={sex === "male"}
                    name="sex"
                    onChange={() => setSex("male")}
                    type="radio"
                    value="male"
                  />
                  <span>Male</span>
                </label>
                <label>
                  <input
                    checked={sex === "female"}
                    name="sex"
                    onChange={() => setSex("female")}
                    type="radio"
                    value="female"
                  />
                  <span>Female</span>
                </label>
              </fieldset>

              <button type="submit">Calculate CCr</button>
            </form>

            <section className={styles.result} aria-live="polite">
              {ccrSubmitted && ccrResult.ok ? (
                <>
                  <span className={styles.resultLabel}>CCr</span>
                  <strong>
                    {ccrResult.formatted}
                    <small>mL/min</small>
                  </strong>
                </>
              ) : ccrSubmitted && ccrErrorMessage ? (
                <p className={styles.error}>{ccrErrorMessage}</p>
              ) : (
                <p className={styles.placeholder}>Result will appear here.</p>
              )}
            </section>
          </section>

          <section className={styles.calculatorCard} aria-labelledby="tsat-title">
            <div className={styles.cardHeader}>
              <h2 id="tsat-title">TSAT</h2>
              <p>Transferrin saturation</p>
            </div>

            <form className={styles.calculator} onSubmit={handleTsatSubmit} noValidate>
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
              {tsatSubmitted && tsatResult.ok ? (
                <>
                  <span className={styles.resultLabel}>TSAT</span>
                  <strong>{tsatResult.formatted}%</strong>
                </>
              ) : tsatSubmitted && tsatErrorMessage ? (
                <p className={styles.error}>{tsatErrorMessage}</p>
              ) : (
                <p className={styles.placeholder}>Result will appear here.</p>
              )}
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}
