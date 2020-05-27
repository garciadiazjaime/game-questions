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

async function getWords() {
  const body = JSON.stringify({
    query: `{
      words(first:100){
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

function saveTodos(todos) {
  if (!Array.isArray(todos) || !todos.length) {
    return
  }

  const body = JSON.stringify({
    query: `mutation Add($todos: [String]!) {
      addTodos(todos: $todos) {
        state
      }
    }`,
    variables: {
      todos,
    }
  })

  return fetchHandler(`process.env.API_URL/graphiql`, body)  
}

function deleteTodo(id) {
  if (!id) {
    return
  }

  const body = JSON.stringify({
    query: `mutation Delete($id: String!) {
      deleteTodo(id: $id) {
        _id
      }
    }`,
    variables: {
      id,
    }
  })

  return fetchHandler(`process.env.API_URL/graphiql`, body)  
}

function getTodos() {
  const body = JSON.stringify({
    query: `{
      todo {
        _id
        todo
        state
      }
    }`,
  })

  return fetchHandler(`process.env.API_URL/graphiql`, body)
}

function updateTodo(todo) {
  if (!todo || !todo._id) {
    return
  }

  const body = JSON.stringify({
    query: `mutation Update($_id: String!, $state: Boolean, $todo: String) {
      updateTodo(_id: $_id, state: $state, todo: $todo) {
        _id
      }
    }`,
    variables: todo
  })

  return fetchHandler(`process.env.API_URL/graphiql`, body)  
}

export {
  saveWord,
  saveTodos,
  getWords,
  getTodos,
  deleteTodo,
  updateTodo
}
