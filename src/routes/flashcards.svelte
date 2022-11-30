<script>
  import { onMount } from "svelte";

  import { getWords } from "../support/lambda-service";

  let definitions = [];
  let flashcard = {};
  let showDefinition = false;

  function setFlashCard() {
    const randomIndex = Math.floor(Math.random() * definitions.length);
    const item = definitions[randomIndex];
    try {
      flashcard = {
        word: item.word.split('_')[0],
        meaning: JSON.parse(item.meaning),
      };
    } catch (error) {
      alert(error);
    }

    showDefinition = false;
  }

  onMount(async () => {
    const response = await getWords().then((resp) => resp.json());

    definitions = (Array.isArray(response.Items) && response.Items) || [];

    setFlashCard();
  });

  function handleClick() {
    showDefinition = !showDefinition;
  }
</script>

<section>
  {#if flashcard && flashcard.word}
    <div class="container" on:click={handleClick}>
      {#if !showDefinition}
        <h1>{flashcard.word}</h1>
      {:else}
        <div class="definition">
          {#each flashcard.meaning as meaning}
            {meaning}
            <br /><br />
          {/each}
        </div>
      {/if}
    </div>

    <div class="cta-wrapper">
      <a href="/flashcards" on:click={setFlashCard}>Next</a>
    </div>
  {/if}
</section>

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
