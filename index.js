const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/Front/index.html")
})

let nomes =[];
//CREATE
app.post("/cadastroNome", (req, res) => {
    const { nome } =  req.body;
    nomes.push(nome);
    console.log(nomes);
    res.sendFile(__dirname + "/Front/index.html")
})
//READ
app.get("/mostrarNomes", (req, res) => {
    console.log(nomes);
    res.send(nomes);
})

// UPDATE
app.put("/atualizarNome", (req, res) => {
    const { nomeParaAtualizar, novoNome } = req.body;
    const indice = nomes.findIndex(nome => nome === nomeParaAtualizar);

    if (indice !== -1) {
        nomes[indice] = novoNome;
        console.log(nomes);
        res.send({ message: 'Nome atualizado com sucesso' });
    } else {
        res.status(404).send({ error: 'Nome não encontrado' });
    }

});

// DELETE
app.delete("/excluirNome", (req, res) => {
    const { nomeParaExcluir } = req.body;
    const indice = nomes.findIndex(nome => nome === nomeParaExcluir);
    if (nomes[indice]) {
      nomes.splice(indice, 1);
      console.log(nomes);
      res.send({ message: 'Nome excluído com sucesso' });
    } else {
      res.status(404).send({ error: 'Nome não encontrado' });
    }
  
});
