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
        return accu;
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

    const limitDefinitions = 10;
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

  function clearHandler() {
    inputRef.value = "";
    definitions = [];
    inputRef.focus();
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

  <div class="control">
    <input
      type="text"
      name="term"
      on:keydown={handleKeyDown}
      bind:this={inputRef}
    />
    <div class="clear" on:click={clearHandler}>X</div>
  </div>

  <div class={loading ? "loader" : ""} />

  <div>
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
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  input[type="text"] {
    padding: 6px;
    font-size: 30px;
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .control {
    position: relative;
    margin-bottom: 12px;
    height: 52px;
  }

  .clear {
    position: absolute;
    top: 0;
    right: 0px;
    padding: 0px 16px;
    color: #999;
    height: 100%;
    box-sizing: border-box;
    font-size: 40px;
    display: flex;
    justify-items: center;
    align-items: center;
  }

  div {
    font-size: 24px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 12px 0;
    border-bottom: 1px solid #ccc;
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
