export const getWords = () => {
  const payload = {};

  return fetch("/.netlify/functions/get-words", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};

export const searchWord = (word, lang) => {
  const payload = {
    word,
    lang,
  };

  return fetch("/.netlify/functions/search-word", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};

export const saveWord = (word, lang, meaning) => {
  if (!word || !lang || !Array.isArray(meaning) || !meaning.length) {
    return;
  }

  const payload = {
    word,
    lang,
    meaning,
  };

  return fetch("/.netlify/functions/save-word", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
};
