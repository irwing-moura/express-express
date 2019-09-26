const express = require("express");

const server = express();

server.use(express.json());

server.listen(3000);

const arrayProjetos = [];
let numRequest = [];

function checkIdExists(req, res, next) {
  const { id } = req.params;

  if (!arrayProjetos[id]) {
    return res.status(400).json({ error: "Este projeto não existe!" });
  }

  req.id = id;

  return next();
}

server.use((req, res, next) => {
  numRequest++;

  console.log(`${numRequest} Requisições feitas até agora`);

  return next();
});

server.post("/projects", (req, res) => {
  arrayProjetos.push(req.body);

  return res.json(arrayProjetos);
});

server.get("/projects", (req, res) => {
  return res.json(arrayProjetos);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { title } = req.body;

  arrayProjetos[req.id].title = title;
  // const project = arrayProjetos.find(p => p.id == id); OUTRO MODO DE PERCORRER O ARRAY E MUDAR O CAMPO

  return res.json(arrayProjetos);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  arrayProjetos.splice(req.id, 1);

  return res.json(arrayProjetos);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { title } = req.body;

  arrayProjetos[req.id].tasks.push(title);

  return res.json(arrayProjetos);
});
