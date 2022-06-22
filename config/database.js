import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'


const __dirname = dirname(fileURLToPath(import.meta.url));
let db;

export async function createConection(){
   const file = join(__dirname, '../data/example.json');
   const adapter = new JSONFile(file);
   db =  new Low(adapter);

   await db.read()

   db.data ||= {users:[]}

   await db.write()
}

export const getConnection = () => db;
