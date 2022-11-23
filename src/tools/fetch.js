export const ajax = async (url_base, endpoint, header, options = null) => {
  const fetchCall = await fetch(
    `${url_base}${endpoint}`,
    options
      ? { ...header, body: JSON.stringify(options) }
      : { ...header }
  );

  if (!fetchCall.ok)
    return new Error(console.log("Error en llamado a fetch: ", fetchCall));
    
  const res = await fetchCall.json();
  return res;
};

export const fetcher = (...args) => fetch(...args).then(fetch(res => res.json()));