<script>
  import { onMount } from 'svelte';

  import { search } from '../utils/dictionary'
  import { saveWord } from '../utils/mint-service-client'

  let definitions = ''
  let inputRef = null;
  let term = ''
  let webSql = null
  let lang = 'es';

  onMount(() => {
    inputRef.focus()
	});

  function getDefinitions(data) {
    if (Array.isArray(data) && data.length) {
      const { meanings } = data[0]

      if (Array.isArray(meanings) && meanings.length) {
        const { definitions} = meanings[0]

        return definitions
      }
    }

    return []
  }

  async function searchTerm() {
    term = inputRef.value
    definitions = []

    if (term) {
      const response = await search(term, lang)

      definitions = getDefinitions(response).slice(0, 3)

      await saveWord(term, definitions, lang)
    }
  }

  async function handleKeyDown(event) {
    if (event.keyCode === 13) {
      await searchTerm()
    }
  }
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  input[type=text] {
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
</style>

<section>
  <div class="lang">
    <label>
      <input type=radio bind:group={lang} value={'es'}>
      ES
    </label>
    <label>
      <input type=radio bind:group={lang} value={'en'}>
        EN
    </label>
  </div>

  <input type="text" name="term" on:keydown={handleKeyDown} bind:this={inputRef} />

  <div>
    {#if term}
      <h1>{term}</h1>
    {/if}
    {#if definitions}
      <ul>
        {#each definitions as { definition, example }}
          <li>
            {definition}
            <br /><br />
            {#if example}
              <b>Ejemplo:</b>
              {example}
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</section>
