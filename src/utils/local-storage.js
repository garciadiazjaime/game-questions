const key = '@words'

function saveWord(word, definition) {
  if (!word || !Array.isArray(definition) || !definition.length) {
    return
  }

  var data = JSON.parse(localStorage.getItem(key)) || {};

  if (!data[word]) {
    data[word] = definition.slice(0, 3)
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function getAllWords() {
  var data = JSON.parse(localStorage.getItem(key)) || {};

  return data
}

export {
  saveWord,
  getAllWords
}
