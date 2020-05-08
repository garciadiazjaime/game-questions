function WebSql() {
  const db = openDatabase('mint', '1.0', 'mint DB', 2 * 1024 * 1024);

  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS WORD (word unique, definition)');
  })

  return {
    saveWord(word, definition) {
      if (word && Array.isArray(definition) && definition.length) {
        db.transaction(tx => {
          const query = `INSERT INTO WORD (word, definition) VALUES ("${word}", '${JSON.stringify(definition.slice(0, 3))}')`

          tx.executeSql(query);
        })
      }
    }
  }
}

export default WebSql
