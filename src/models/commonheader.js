export const URL_BASE = "https://api.livecoinwatch.com";
export const HEADER_BASE = {
  headers: {
    "content-type": "application/json",
    "x-api-key": `${import.meta.env.VITE_API_KEY}`,
  },
  method: "POST",
}