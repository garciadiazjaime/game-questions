const key = '@todo.draft'

function saveDraft(inputRef) {
  if (inputRef) {
    localStorage.setItem(key, inputRef.value);
  }
}

function setDraft(inputRef) {
  const draft = localStorage.getItem(key);

  if (draft) {
    inputRef.value = draft
  }
}

export {
  saveDraft,
  setDraft,
} 
  
