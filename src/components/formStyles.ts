const CONTROL =
  "block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-600";

export function controlClass(invalid = false): string {
  return `${CONTROL} ${invalid ? "border-red-600" : "border-slate-300"}`;
}

export const LABEL_CLASS = "mb-1 block text-sm font-medium text-slate-700";
export const ERROR_CLASS = "mt-1 text-sm text-red-700";
