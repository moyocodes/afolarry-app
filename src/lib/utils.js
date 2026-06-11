import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Normalize a field that may be stored as an array or comma/newline-separated string
export function toArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    // split on commas or newlines
    return value
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [String(value)];
}

export function toDisplayString(value) {
  if (value == null || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") {
    const arr = toArray(value);
    return arr.length ? arr.join(", ") : value;
  }
  return String(value);
}

export function formatNaira(value) {
  if (value == null || value === "") return "—";
  const raw = String(value).replace(/[^\d.]/g, "");
  if (!raw) return "—";
  const num = parseFloat(raw);
  if (isNaN(num)) return "—";
  return "₦" + num.toLocaleString("en-NG");
}
