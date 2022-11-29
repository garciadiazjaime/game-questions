const fetch = require("node-fetch");

const dictionaries = {
  en: {
    ref: "collegiate",
    key: process.env.EN_DICTONARY_TOKEN,
  },
  es: {
    ref: "spanish",
    key: process.env.ES_DICTONARY_TOKEN,
  },
};

module.exports.search = async (term, lang) => {
  if (!term) {
    return;
  }

  const { ref, key } = dictionaries[lang];

  const url = `https://dictionaryapi.com/api/v3/references/${ref}/json/${encodeURIComponent(
    term
  )}?key=${key}`;

  return fetch(url);
};
