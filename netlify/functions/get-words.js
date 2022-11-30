const { getWords } = require("../../src/support/dynamo-service");

exports.handler = async function (_event, _context) {
  const response = await getWords()
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
