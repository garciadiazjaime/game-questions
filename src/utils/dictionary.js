export const search = async (term) => {
  if (!term) {
    return;
  }

  const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(
    term
  )}?key=process.env.DICTONARY_TOKEN`;

  const response = await fetch(url);

  return response.json();
};
