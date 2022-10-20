import { openDB } from 'idb';
import 'regenerator-runtime/runtime'

export const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Updating Data...');

  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ content: content });

  const result = await request;
  console.log('Data updated', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Retrieving Data...');

  const jateDB = await openDB('jate', 1);

  const tx = jateDB.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result[result.length - 1].content;
}

initdb();
