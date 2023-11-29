// DONE? CHeck again


/*
  The idb package being required below provides some syntactic sugar around the methods needed to work with IndexedDB. Yes, the code you see below is actually a "prettier" version of what you would normally have to write. Be thankful. We've only been using the idb package since mid 2022. Before that students had to write this code with no helper methods. These students deserve a medal.
*/
import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const jateDB = "jate"

const initdb = async () =>
  openDB(jateDB, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(jateDB)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(jateDB, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  // First, create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps

  // TODO: Change YOUR_OPEN_DB_VAR to whatever variable name you wanT. Note that you'll then need to change any other occcurences of YOUR_OPEN_DB_VAR to the same variable name.
  const contentDB = await openDB(jateDB, 1);

  // TODO: Now create a variable for the transaction; again, this will be referenced below.
  const tx = contentDB.transaction(jateDB, 'readwrite');

  // TODO: Now create a variable for the store
  const store = tx.objectStore(jateDB);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  // You can duplicate the same lines of code from above, except that the transaction will be 'readonly'

  // TODO: Copy LINES 28, 31 and 34 above; the new line 31 code should be "readonly"
  const contentDB = await openDB(jateDB, 1);

  const tx = contentDB.transaction(jateDB, 'readonly');

  const store = tx.objectStore(jateDB);

  // Leave the rest as-is
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
