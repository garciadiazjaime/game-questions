<script>
  import { onMount } from 'svelte';

  import { getAllWords } from '../utils/mint-service-client'

  let definitions = []
  let flashcard = {}

  function setFlashCard() {
    const randomIndex = Math.floor(Math.random() * definitions.length);
    flashcard = definitions[randomIndex]
  }

  onMount(async () => {
    const response = await getAllWords()

    definitions = (response && response.data && response.data.words) || []

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
  {#if flashcard && flashcard.term}
    <h1>{flashcard.term}</h1>
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
