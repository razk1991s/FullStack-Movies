// scripts/makeHash.js
const bcrypt = require("bcrypt");

async function run() {
  const plain = "Raz12345!";
  const SALT_ROUNDS = 12;
  const hash = await bcrypt.hash(plain, SALT_ROUNDS);
  console.log("plain:", plain);
  console.log("bcrypt hash:", hash);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
