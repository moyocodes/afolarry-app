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

// Normalize a vehicle record into an array of vehicle entries ({ make, chassisNo, dutyFee }).
// Supports both the newer `vehicles: [...]` array shape and the legacy flat
// (single make/chassisNo/dutyFee per record) shape used by older documents.
export function getVehicleEntries(record) {
  if (!record) return [];
  if (Array.isArray(record.vehicles) && record.vehicles.length) return record.vehicles;
  if (record.make || record.chassisNo || record.dutyFee) {
    return [{ make: record.make, chassisNo: record.chassisNo, dutyFee: record.dutyFee }];
  }
  return [];
}

export function formatNaira(value) {
  if (value == null || value === "") return "—";
  const raw = String(value).replace(/[^\d.]/g, "");
  if (!raw) return "—";
  const num = parseFloat(raw);
  if (isNaN(num)) return "—";
  return "₦" + num.toLocaleString("en-NG");
}
