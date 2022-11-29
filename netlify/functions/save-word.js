const { saveWord } = require("../../src/support/dynamo-service");

exports.handler = async function (event, _context) {
  const {
    word = "efimero",
    lang = "es",
    meaning = ["Pasajero, de corta duración."],
  } = JSON.parse(event.body || "{}");

  const response = await saveWord(word, lang, meaning)
    .then((resp) => resp)
    .catch((error) => error);

  const statusCode = !response || response.errorMessage ? 400 : 201;

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
