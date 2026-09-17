// Captured once per build. Astro evaluates this module during `astro build`, so the
// value is the moment the deployed bundle was produced, not the moment a page is viewed.
const builtAt = new Date();

const monthsPt = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthsEs = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/** ISO date for `<time datetime>`, in UTC. */
export const buildDateIso = builtAt.toISOString().slice(0, 10);

/** Human label matching the "28 ago 2026" style the site already used. */
/** @type {{ pt: string, en: string, es: string }} */
export const buildDateLabel = {
  pt: `${builtAt.getUTCDate()} ${monthsPt[builtAt.getUTCMonth()]} ${builtAt.getUTCFullYear()}`,
  en: `${builtAt.getUTCDate()} ${monthsEn[builtAt.getUTCMonth()]} ${builtAt.getUTCFullYear()}`,
  es: `${builtAt.getUTCDate()} ${monthsEs[builtAt.getUTCMonth()]} ${builtAt.getUTCFullYear()}`,
};
