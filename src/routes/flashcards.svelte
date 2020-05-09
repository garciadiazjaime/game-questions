<script>
  import { onMount } from 'svelte';

  import { getAllWords } from '../utils/local-storage'

  let definitions = {}
  let flashcard = {}

  function setFlashCard() {
    const words =  Object.keys(definitions)
    const randomIndex = Math.floor(Math.random() * words.length);
    flashcard = {
      word: words[randomIndex],
      definitions: definitions[words[randomIndex]]
    }
  }

  onMount(async () => {
    definitions = getAllWords()

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
  {#if flashcard && flashcard.definitions}
    <h1>{flashcard.word}</h1>
    <br />
    {#each flashcard.definitions as { definition, example }}
      {definition}
      <br /><br />
      {#if example}
        <b>Ejemplo:</b>
        {example}
      {/if}
    {/each}

    <a href="/flashcards" on:click={setFlashCard}>Next</a>
  {/if}
</section>
