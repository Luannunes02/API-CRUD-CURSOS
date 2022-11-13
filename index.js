const { json } = require('express');
const express = require('express');

const server = express();

server.use(express.json())

// Query params =?nome=NodeJS
// Router Params = /curso/2
// Request Body = { nome: 'NodeJs , tipo: 'Backend'}

// CRUD - Create, Read, Update, Delete Information of the data(api)

const cursos = ['Node JS', 'JavaScript', 'React Native', 'TypeScript', 'Flutter'];

server.use((req,res, next)=>{
    console.log(`URL CHAMADA: ${req.url}`)

    return next()
})

function checkCurso(req,res,next) {
    if(!req.body.name) {
        return res.status(400).json({error: "O nome do curso é obrigatorio"})
    }

    return next()
}

function checkIndexCurso(req,res,next) {
    const curso = cursos[req.params.index]
    if(!curso) {
        return res.status(400).json({error: "O curso não existe"})
    }

    return next();
}

server.get('/cursos', checkIndexCurso,(req,res) => {
    return res.json(cursos);
});

// localhost:3000/cursos
server.get('/cursos/:index',(req,res)=>{
    //const nome = req.query.nome;  1
    //const id = req.params.id;    1
    const { index } = req.params;

    return res.json(cursos[index]);
    //return res.json({curso: `Aprendendo ${nome}`, id: `ID do curso ${id}`});   1
})

server.post('/cursos', checkCurso, (req,res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', checkCurso, checkIndexCurso,(req,res)=>{
    const { index } = req.params;
    const {name} = req.body;

    cursos[index] = name;

    return res.json(cursos);
})

server.delete('/cursos/:index', checkIndexCurso,(req,res)=>{
    const { index } = req.params

    cursos.splice(index,1);
    return res.json(cursos);
});

server.listen(3000)