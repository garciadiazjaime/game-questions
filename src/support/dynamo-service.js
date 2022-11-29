const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.saveWord = (word, lang, meaning) => {
  if (!word || !lang || !Array.isArray(meaning) || !meaning.length) {
    return;
  }

  const batch = [
    {
      PutRequest: {
        Item: {
          word,
          lang,
          meaning: JSON.stringify(meaning),
          created: new Date().toJSON(),
          updated: new Date().toJSON(),
        },
      },
    },
  ];

  const params = {
    RequestItems: {
      word: batch,
    },
  };

  return documentClient
    .batchWrite(params)
    .promise()
};
