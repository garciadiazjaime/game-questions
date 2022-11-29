export const search = (term, lang) => {
  const payload = {
    term,
    lang,
  };

  return fetch("/.netlify/functions/search-word", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};
