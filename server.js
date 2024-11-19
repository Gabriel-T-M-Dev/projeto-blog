import express from 'express';
const app = express();
const port = 3000; // Porta que o servidor irá ouvir

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota básica para a raiz do seu servidor
app.get('/', (req, res) => {
    res.send('Olá, mundo! Seu servidor Node.js está funcionando!');
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});