const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Archivos CSV a procesar
const files = [
  "grafo_numero_transacciones.csv",
  "grafo_valor_transacciones.csv"
];

// Reemplazos (clave original en minúsculas)
const replacements = {
  "0xc383d4920a1ec3d415216c5f014de6ccf86e546c": "Diego",
  "0xc0794fd43b99337cf5b513c656c854f6c3ce166a": "Marco Publio",
  "0x101c69781796B447A2F8ebEF5Be451218a467Fd2": "Antonio Jesús",
  "0xA8101E39B81Cc29C3C4248cA8ffe9dF00355a620": "Ángel",
  "0xacc1EEe09805e1A8484DC66C47aA5F432a392322": "Miguel O.",
  "0xc1aF07a6158a887da9949Fc4dA9547690089f282": "José Miguel",
  "0x1681e50d41b1D64C7f25049929dF4Db8B9380314": "Marcos C.",
  "0x54bF5342A7d879D68CE81d800aD4C0B264Ca6ea5": "Leandro",
  "0xca124e7029b80ada937ca69209cb4ee1fdb1ad64": "Rubén",
  "0x32b09C67c44E38698d5a2176fa157Ad35dE810Ed": "Fernando",
  "0x8D526eEB7D216Da7aBb7Cb59970Df497849c0D55": "Iván",
  "0x101c69781796b447a2f8ebef5be451218a467fd2" : "Desconocido1",
  "0x8d526eeb7d216da7abb7cb59970df497849c0d55" : "Desconocido2",
  "0x58b970320b048866d032fc944735b0168b0e4eec" : "Desconocido3",
  "0xd1b77e11933da3b059ddf6e57f7839d6b988d246"  : "Desconocido4",
  "0xc1af07a6158a887da9949fc4da9547690089f282": "Desconocido5",
  "0x54bf5342a7d879d68ce81d800ad4c0b264ca6ea5": "Desconocido6",
  "0xcbfb60f6a39e9e5e79f48555de777b9aab19c99a": "Desconocido7",
  "0x32b09c67c44e38698d5a2176fa157ad35de810ed": "Desconocido8",
  "0x32b09c67c44e38698d5a2176fa157ad35de810ed": "Desconocido9",
  "0xa8101e39b81cc29c3c4248ca8ffe9df00355a620": "Desconocido10",
  "0xacc1eee09805e1a8484dc66c47aa5f432a392322": "Desconocido11",
  "0xafeda61db9e162293b2ef2c2bc5a800b37bb5e4a": "Grifo1",
  "0xc0f3833b7e7216eecd9f6bc2c7927a7aa36ab58b": "Grifo2",
  "0x9484449f2be7cd6e01ef55bc5438c733e0759e0f": "Grifo3",
  "0x993a0f3653887078215914badcf039263293add9": "Grifo4",
  "0x159ca92b12f67e5676d82c238f4906692618a555": "Grifo5",
  "0xe560ca09958bdb05b776676351114811ad101e47": "Grifo6",
  "0x15095ec8fb1fc9c664b3223459dff43158ace7ad": "Grifo7",
  "0x42645ce4dd0b766de53ee483cbf54bcea670f9b2": "Grifo8",
  "0xa8101e39b81cc29c3c4248ca8ffe9df00355a620": "Grifo9",
  "0x95a13f457c76d10a40d7e8497ed4f40c53f4d04b": "Grifo10",
  "0xcbf16fed20967280a8b53299dc7dd6bd857d7e9c": "Grifo11"
};

// Lista de valores que harán que se elimine una fila si aparecen (también en minúsculas)
const podar = [];

/*
const podar = [
  "0x00000000001594c61dd8a6804da9ab58ed2483ce",
  "0xc5cb3bebd4f4dcfe3437eb65189f63222ee51782",
  "0x022d0f5d6edbe1a01888f54edd5f8f901be33810",
  "0x02a34508f3da5029febdf602fb068848ffa12cf6",
  "0x9aa14631e3cf1690bccec693346db458c1ae10f2",
  "0xf192e0d79fc75134d6d291f6968d3a8de0c6f734",
  "0x9a0c272bd8bb40edb2689bf48b395f8ecb561d55",
  "0xaf08cce37c874d494ff36defe7769668a315c337",
  "0xfc79c562d667321d01664547f136adef1d9f6e66",
  "0xdc105f659a66fc453eb3dfe74e994c06f51865e3",
  "0x1681e50d41b1d64c7f25049929df4db8b9380314",
  "0x52f1984cd3e46e1214db222d3ff63712e7aceedd",
  "0x25215760c103d2c8a78b19439cbb076d8b0b2076",
  "0x3e155905bb2f4ed1c991699140290850a4241775",
  "0xc64c6fab31ca0abb1035ebae2d29ed19859c71e3",
  "0x6344b0bdcab28467c1d3fe599c8001b9009506db",
  "0x6cc9397c3b38739dacbfaa68ead5f5d77ba5f455",
  "0x1da4fae8c45974b262259342b1416d101b30a209",
  "0xd69a613e20664ae8646722d1a5fb425e5390b5bf",
  "0xf39ca26c93a6b20bceab3233cb0af5d9cd466f1a",
  "0xacc1eee09805e1a8484dc66c47aa5f432a392322",
  "0xf1da76dc1d7724d900107def9dbbb9132c4ebec5",
  "0xeea5792ae7c067af85fcb4536fad376a0ecc676d"
  
];
*/

const dataDir = path.join(__dirname, "data");

async function processFile(fileName) {
  const inputPath = path.join(dataDir, fileName);
  const tempPath = path.join(dataDir, `tmp_${fileName}`);

  const reader = readline.createInterface({
    input: fs.createReadStream(inputPath),
    crlfDelay: Infinity
  });

  const writer = fs.createWriteStream(tempPath);

  for await (const line of reader) {
    const cells = line.split(",");

    // ¿Contiene algún valor a eliminar?
    const contieneValorProhibido = cells.some(cell =>
      podar.includes(cell.trim().toLowerCase())
    );

    if (contieneValorProhibido) {
      // Saltamos esta línea
      continue;
    }

    // Aplicamos reemplazos si procede
    const nuevaLinea = cells
      .map(cell => {
        const key = cell.trim().toLowerCase();
        return replacements.hasOwnProperty(key) ? replacements[key] : cell;
      })
      .join(",");

    writer.write(nuevaLinea + "\n");
  }

  writer.end();
  writer.on("finish", () => {
    fs.renameSync(tempPath, inputPath);
    console.log(`✅ Procesado: ${fileName}`);
  });
}

(async () => {
  for (const file of files) {
    await processFile(file);
  }
})();