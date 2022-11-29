const { v4: uuidv4 } = require("uuid");


exports.handler = async function (event, _context) {
  const data = JSON.parse(event.body)
  console.log(JSON.stringify(data, null, 2))


  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
