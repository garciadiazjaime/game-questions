<script>
  import { onMount } from 'svelte';

  import { getWords } from '../utils/mint-service-client'

  let definitions = []
  let flashcard = {}
  let showDefinition = false

  function setFlashCard() {
    const randomIndex = Math.floor(Math.random() * definitions.length);
    flashcard = definitions[randomIndex]
    showDefinition = false
  }

  onMount(async () => {
    const response = await getWords()

    definitions = (response && response.data && response.data.words) || []

    setFlashCard()
  });

  function handleClick() {
    showDefinition = !showDefinition
  }
</script>

<style>
  h1 {
    text-transform: capitalize;
    margin: 0px;
    text-align: center;
    margin: 12px 0;
  }

  a {
    display: block;
    text-align: center;
    font-size: 30px;
    padding: 6px;
    border: 1px solid #ff3e00;
    text-decoration: none;
  }

  .flashcard {
    background-color: antiquewhite;
    border-radius: 6px;
    padding: 12px;
    min-height: 300px;
  }

  .flashcard:hover {
    cursor: pointer;
  }
</style>

<section>
  {#if flashcard && flashcard.term}
    <div class="flashcard" on:click={handleClick}>
      <h1>{flashcard.term}</h1>

      {#if showDefinition}
        {#each flashcard.definitions as { definition, example }}
          {definition}
          <br /><br />
          {#if example}
            <b>Ejemplo:</b>
            {example}
          {/if}
        {/each}
      {/if}
    </div>

    <br />
    <a href="/flashcards" on:click={setFlashCard}>Next</a>
  {/if}
</section>
