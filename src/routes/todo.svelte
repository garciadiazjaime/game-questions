<script>
  import { onMount, onDestroy } from 'svelte';

  import { saveTodos, getTodos, deleteTodo, updateTodo, deleteTodos } from '../support/mint-service-client'
  import { saveDraft, setDraft } from "../support/draft"

  let selectedId = null
  let inputRef = null;
  let list = []

  onMount(async () => {
    await updateTodoList()
    setDraft(inputRef)
	});

  onDestroy(() => {
    saveDraft(inputRef)
	});

  async function addTodos(data) {
    if (selectedId) {
      await handleChange(selectedId, null, data)
      selectedId = null
    } else {
      const items = data.split('\n').reduce((accu, item, position) => {
        const todo = item.trim()
        if (todo && todo.length) {
          accu.push({
            todo,
            position
          })
        }

        return accu
      }, [])

      if (!items.length) {
        return
      }
      
      await saveTodos(items)

      await updateTodoList()

      inputRef.value = ''
    }
  }

  async function updateTodoList() {
    const response = await getTodos()

    list = (response && response.data && response.data.todo) || []
  }

  async function handleKeyDown(event) {
    if (event.keyCode === 13) {
      await addTodos(event.target.value)
    }
  }

  async function handleAddClick(event) {
    await addTodos(inputRef.value)
  }

  async function handleClickClean() {
    if (confirm('are you sure?')) {
      inputRef.value = ''

      await deleteTodos()

      list = []
    }
  }

  async function handleClickReset() {
    inputRef.value = ''
    list.forEach(item => (inputRef.value += `${item.todo}\n`))
    list = []

    await deleteTodos()
  }

  async function handleChange(id) {
    const item = list.find(item => item._id === id)

    await updateTodo(item)

    list = list.sort((a, b) => a.state - b.state)
  }

  async function removeTodo(id) {
    selectedId = null

    await deleteTodo(id)

    await updateTodoList()
  }

  async function handleClick(id) {
    if (selectedId) {
      handleChange(selectedId)
      selectedId = null
    } else {
      selectedId = id
    }
  }
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
  }

  textarea, input[type=text] {
    padding: 4px;
    font-size: 30px;
  }

  textarea.container {
    padding: 4px;
    font-size: 20px;
    min-height: 200px;
  }

  input[type=checkbox] {
    height: 40px;
    width: 40px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
  }

  span {
    display: inline-block;
    padding-left: 12px;
    text-transform: capitalize;
    font-size: 30px;
    border-bottom: 1px solid #EEE;
    width: 100%;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: red;
    opacity: .7;
    font-size: 10px;
    padding: 6px 12px;
    border: 1px solid;
  }

  div {
    display: inline-block;
    padding: 6px;
    border: 1px solid #ff3e00;
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
    margin: 12px 0 0;
  }
  div:hover {
    cursor: pointer;
  }

  .invert {
    border: 1px solid #CCC;
    opacity: 0.8;
  }
  .clean {
    border: 1px solid #CCC;
    opacity: 0.5;
  }
</style>


<section>
  <textarea name="todo" bind:this={inputRef} class="container"></textarea>
  <div on:click={handleAddClick}>Add</div>
  {#if list.length }
    <ul>
    {#each list as { _id, todo, state }}
      <li>
        {#if _id === selectedId }
          <input type="text" bind:value={todo} on:keydown={handleKeyDown} />
        {:else }
          <input type="checkbox" bind:checked={state} on:change={() => handleChange(_id)}>
          <span on:click={() => handleClick(_id)}>{todo}</span>
          <a href="/todo" on:click={() => removeTodo(_id)}>X</a>
        {/if}
      </li>
    {/each}
    </ul>

    <div on:click={handleClickReset} class="invert">Reset</div>
    <div on:click={handleClickClean} class="clean">Clean</div>
  {/if}
</section>
