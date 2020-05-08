<script>
  import { onMount } from 'svelte';

  import WebSql from '../utils/web-sql'

  let webSql = null
  let definitions = []
  let flashcard

  function getDefinitions(words) {
    if (!words || !words.rows || !words.rows.length) {
      return []
    }
    
    const response = []
    for (let i = 0; i < words.rows.length; i++) { 
      const item = words.rows.item(i)
      response.push({
        word: item.word,
        definition: JSON.parse(item.definition)
      })
    }

    return response
  }

  function setFlashCard() {
    const randomIndex = Math.floor(Math.random() * definitions.length);
    flashcard = definitions[randomIndex]
  }

  onMount(async () => {
    webSql = WebSql()

    const words = await webSql.getAllWords()

    definitions = getDefinitions(words)

    setFlashCard()
  });
</script>

<style>
  h1 {
    text-transform: capitalize;
    margin: 0px;
  }

  a {
    display: block;
    text-align: center;
    font-size: 30px;
    padding: 6px;
    border: 1px solid #ff3e00;
    text-decoration: none;
  }
</style>

<section>
  {#if flashcard}
    <h1>{flashcard.word}</h1>
    <br />
    {#each flashcard.definition as { definition, example }}
      {definition}
      <br /><br />
      {#if example}
        <b>Ejemplo:</b>
        {example}
      {/if}
    {/each}
  {/if}

  <a href="/flashcards" on:click={setFlashCard}>Next</a>
</section>
