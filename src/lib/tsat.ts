export type TsatResult =
  | {
      ok: true;
      value: number;
      formatted: string;
    }
  | {
      ok: false;
      message: string;
    };

const parseRequiredPositiveNumber = (value: string, label: string): TsatResult | number => {
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

export function calculateTsat(serumIronInput: string, tibcInput: string): TsatResult {
  const serumIron = parseRequiredPositiveNumber(serumIronInput, "Serum iron");

  if (typeof serumIron !== "number") {
    return serumIron;
  }

  const tibc = parseRequiredPositiveNumber(tibcInput, "TIBC");

  if (typeof tibc !== "number") {
    return tibc;
  }

  const value = (serumIron / tibc) * 100;

  return {
    ok: true,
    value,
    formatted: value.toFixed(1),
  };
}
