const { search } = require("../../src/support/dictionary-service");

exports.handler = async function (event, _context) {
  const { word = "efimero", lang = "es" } = JSON.parse(event.body || "{}");

  const response = await search(word, lang)
    .then((resp) => resp.json())
    .catch(() => {});

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
