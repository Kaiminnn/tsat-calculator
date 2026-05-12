export type Sex = "male" | "female";

export type CcrResult =
  | {
      ok: true;
      value: number;
      formatted: string;
    }
  | {
      ok: false;
      message: string;
    };

const parseRequiredPositiveNumber = (value: string, label: string): CcrResult | number => {
  const trimmed = value.trim();

  if (!trimmed) {
    return { ok: false, message: `${label} is required.` };
  }

  const parsed = Number(trimmed);

  if (!Number.isFinite(parsed)) {
    return { ok: false, message: `${label} must be a number.` };
  }

  if (parsed <= 0) {
    return { ok: false, message: `${label} must be greater than 0.` };
  }

  return parsed;
};

export function calculateCcr(
  ageInput: string,
  weightInput: string,
  serumCreatinineInput: string,
  sex: Sex,
): CcrResult {
  const age = parseRequiredPositiveNumber(ageInput, "Age");

  if (typeof age !== "number") {
    return age;
  }

  if (age >= 140) {
    return { ok: false, message: "Age must be less than 140." };
  }

  const weight = parseRequiredPositiveNumber(weightInput, "Weight");

  if (typeof weight !== "number") {
    return weight;
  }

  const serumCreatinine = parseRequiredPositiveNumber(
    serumCreatinineInput,
    "Serum creatinine",
  );

  if (typeof serumCreatinine !== "number") {
    return serumCreatinine;
  }

  const maleValue = ((140 - age) * weight) / (72 * serumCreatinine);
  const value = sex === "female" ? maleValue * 0.85 : maleValue;

  return {
    ok: true,
    value,
    formatted: value.toFixed(1),
  };
}
