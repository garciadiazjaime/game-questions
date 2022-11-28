<script>
  import { onMount } from "svelte";

  import { search } from "../utils/dictionary";
  import { saveWord } from "../utils/mint-service-client";

  let definitions = "";
  let inputRef = null;
  let term = "";
  let lang = "es";
  let loading = false;

  onMount(() => {
    inputRef.focus();
  });

  function getDefinitions(data) {
    if (!Array.isArray(data) || !data.length) {
      return [];
    }

    return data.reduce((accu, item) => {
      if (!item.shortdef) {
        return accu
      }

      accu.push(...item.shortdef);

      return accu;
    }, []);
  }

  async function searchTerm() {
    loading = true;

    term = inputRef.value;
    definitions = [];

    const response = await search(term, lang);

    if (!response) {
      return;
    }

    const limitDefinitions = 10
    definitions = getDefinitions(response).slice(0, limitDefinitions);

    loading = false;
  }

  async function handleKeyDown(event) {
    if (event.keyCode === 13) {
      await searchTerm();
    }
  }

  async function saveHandler() {
    if (!Array.isArray(definitions) || !definitions.length) {
      return;
    }

    await saveWord(term, definitions, lang);
  }
</script>

<section>
  <div class="lang">
    <label>
      <input type="radio" bind:group={lang} value={"es"} />
      ES
    </label>
    <label>
      <input type="radio" bind:group={lang} value={"en"} />
      EN
    </label>
  </div>

  <input
    type="text"
    name="term"
    on:keydown={handleKeyDown}
    bind:this={inputRef}
  />

  <div class={loading ? "loader" : ""} />

  <div>
    {#if term}
      <h1>{term}</h1>
    {/if}
    {#if definitions}
      <ul>
        {#each definitions as definition}
          <li>
            {definition}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <a href="/" on:click={saveHandler}>Save</a>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  input[type="text"] {
    padding: 6px;
    font-size: 30px;
    margin-bottom: 12px;
  }

  h1 {
    text-transform: capitalize;
    margin: 0px;
  }

  div {
    font-size: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 12px 0;
    border-bottom: 1px solid #333;
  }

  .lang {
    font-size: 40px;
  }

  .lang input {
    width: 42px;
    height: 2em;
  }

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
