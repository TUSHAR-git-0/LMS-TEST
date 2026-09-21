import mongoose from "mongoose";
const url = "mongodb+srv://spams001122_db_user:MVaKg2p0ZYhb749k@cluster0.men3tl6.mongodb.net/?appName=Cluster0";

const conn = await mongoose.createConnection(url).asPromise();
const admin = conn.db.admin();
const dbs = await admin.listDatabases();
console.log("DATABASES:", dbs.databases.map(d => d.name));
const names = dbs.databases.map(d => d.name);
for (const n of names) {
  if (["admin", "local", "config"].includes(n)) continue;
  const db = conn.useDb(n);
  const colls = await db.listCollections();
  for (const c of colls) {
    const count = await db.collection(c.name).countDocuments();
    console.log(`${n}.${c.name}: ${count}`);
  }
}
await conn.close();