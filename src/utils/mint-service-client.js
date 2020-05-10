async function fetchHandler(url, body) {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  }

  const response = await fetch(url, payload)

  return response.json()
}

function saveWord(term, data) {
  if (!term || !Array.isArray(data) || !data.length) {
    return
  }

  const definitions = data.map(item => ({
    definition: item.definition,
    example: item.example
  }))

  const body = JSON.stringify({
    query: `mutation Add($term: String!, $definitions: [DefinitionInput]!) {
      add(term: $term, definitions: $definitions) {
        _id
      }
    }`,
    variables: {
      definitions,
      term
    }
  })

  return fetchHandler(`process.env.API_URL/word/graphiql`, body)
}

async function getAllWords() {
  const body = JSON.stringify({
    query: `{
      words{
        term
        definitions {
          definition
          example
        }
      }
    }`,
  })

  return fetchHandler(`process.env.API_URL/word/graphiql`, body)
}

export {
  saveWord,
  getAllWords
}
