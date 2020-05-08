<script>
  import { onMount } from 'svelte';

  import { search } from '../utils/dictionary'

  let definitions = ''
  let inputRef = null;
  let term

  onMount(() => {
    inputRef.focus()
	});

  function getDefinitions(data) {
    if (Array.isArray(data) && data.length) {
      const { meanings } = data[0]

      if (Array.isArray(meanings) && meanings.length) {
        return meanings[0].definitions
      }
    }

    return []
  }

  async function handleClick() {
    term = inputRef.value
    definitions = []

    if (term) {
      const response = await search(term)

      definitions = getDefinitions(response).slice(0, 3)
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleClick()
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
</style>

<section>
  <input type="text" name="term" on:keydown={handleKeyDown} bind:this={inputRef} on:focusout={handleClick} />

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
