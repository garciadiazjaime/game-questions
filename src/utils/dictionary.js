import stubData from '../../stubs/dictonary'

async function search(term, lang) {
  if (!term) {
    return ''
  }

  if (process.env.NODE_ENV !== 'production') {
    return stubData
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${term}?key=process.env.DICTONARY_TOKEN`
  const response = await fetch(url)

  return await response.json()
}

export {
  search
}
