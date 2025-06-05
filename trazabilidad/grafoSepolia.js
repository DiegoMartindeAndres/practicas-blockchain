// grafoSepolia.js
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const API_KEY = "TU_API_KEY_AQUI"; // ← Sustituye por tu API key de Etherscan
const BASE_URL = "https://api-sepolia.etherscan.io/api";
const START_ADDRESS = "0xC383d4920a1eC3D415216C5f014de6CCf86e546c"; // Dirección de origen. Wallet de prueba de Diego

const DEPTH_LIMIT = 5; // Profundidad máxima de exploración
const DELAY_MS = 300; // Tiempo de espera entre peticiones en ms

let txCountEdges = new Map();    // "from,to" → número de transacciones
let valueEdges = new Map();      // "from,to" → suma de ETH transferido
let visited = new Set();

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function weiToEther(wei) {
  return parseFloat(wei) / 1e18;
}

async function getTransactions(address) {
  const url = `${BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${API_KEY}`;
  await delay(DELAY_MS);
  const res = await axios.get(url);
  return res.data.result || [];
}

async function explore(address, depth) {
  if (depth > DEPTH_LIMIT || visited.has(address)) return;
  visited.add(address);

  const txs = await getTransactions(address);
  for (const tx of txs) {
    const from = tx.from.toLowerCase();
    const to = tx.to?.toLowerCase();
    if (!to || to === "0x") continue;

    const key = `${from},${to}`;

    const valueEth = weiToEther(tx.value);

    // Conteo de transacciones
    txCountEdges.set(key, (txCountEdges.get(key) || 0) + 1);

    // Acumulación de valor
    valueEdges.set(key, (valueEdges.get(key) || 0) + valueEth);

    await explore(to, depth + 1);
  }
}

function saveCSV(map, filename, label) {
  const fs = require("fs");
  const path = require("path");

  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const rows = ["source,target," + label];
  for (const [edge, val] of map.entries()) {
    rows.push(`${edge},${val}`);
  }

  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, rows.join("\n"));
}

(async () => {
  console.log("Explorando transacciones en Sepolia...");
  await explore(START_ADDRESS.toLowerCase(), 0);

  saveCSV(txCountEdges, "grafo_numero_transacciones.csv", "weight");
  saveCSV(valueEdges, "grafo_valor_transacciones.csv", "weight");

  console.log("CSV generados:");
  console.log(" - grafo_numero_transacciones.csv");
  console.log(" - grafo_valor_transacciones.csv");
})();