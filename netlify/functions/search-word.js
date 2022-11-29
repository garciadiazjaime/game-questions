const { search } = require("../../src/support/dictionary-service");

exports.handler = async function (event, _context) {
  const { term = "efimero", lang = "es" } = JSON.parse(event.body || "{}");

  const response = await search(term, lang)
    .then((resp) => resp)
    .catch(() => {});

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
