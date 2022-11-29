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

module.exports.search = (word, lang) => {
  if (!word) {
    return;
  }

  const { ref, key } = dictionaries[lang];

  const url = `https://dictionaryapi.com/api/v3/references/${ref}/json/${encodeURIComponent(
    word
  )}?key=${key}`;

  return fetch(url);
};
