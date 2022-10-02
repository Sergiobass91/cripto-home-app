const URL_BASE = "https://api.livecoinwatch.com";
const HEADER_BASE = {
  headers: {
    "content-type": "application/json",
    "x-api-key": `${import.meta.env.VITE_API_KEY}`,
  },
  method: "POST",
};

export const ajax = async (endpoint, options = null) => {
  const fetchCall = await fetch(
    `${URL_BASE}${endpoint}`,
    options
      ? { ...HEADER_BASE, body: JSON.stringify(options) }
      : { ...HEADER_BASE }
  );

  if (!fetchCall.ok)
    return new Error(console.log("Error en llamado a fetch: ", fetchCall));
    
  const res = await fetchCall.json();
  return res;
};
