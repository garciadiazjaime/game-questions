<script>
  import { onMount } from 'svelte';

  import { getWords } from '../support/mint-service-client'

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
  .container {
    background-color: antiquewhite;
    border-radius: 6px;
    padding: 12px;
    height: 100%;
    margin-bottom: 20px;
    display: flex;
    align-content: center;
    min-height: 360px;
  }

  .container:hover {
    cursor: pointer;
  }

  h1 {
    text-transform: capitalize;
    margin: auto 0;
    text-align: center;
    flex: 1;
  }

  .cta-wrapper {
    position: fixed;
    width: calc(100% - 24px);
    bottom: 12px;
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
    <div class="container" on:click={handleClick}>
      {#if !showDefinition }
        <h1>{flashcard.term}</h1>
      {:else }
        <div class="definition">
          {#each flashcard.definitions as { definition, example }}
            {definition}
            <br /><br />
            {#if example}
              <b>Ejemplo:</b>
              {example}
            {/if}
          {/each}
        </div>
      {/if}
    </div>

    <div class="cta-wrapper">
      <a href="/flashcards" on:click={setFlashCard}>Next</a>
    </div>
  {/if}
</section>
