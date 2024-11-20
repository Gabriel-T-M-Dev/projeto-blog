import express from 'express';
const app = express();
const port = 3000; // Porta que o servidor irá ouvir

// Imagens
const posts = [
    {
        id: 1,
        description: "Gatinho com olhar carente",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        description: "Gato curioso olhando para a câmera",
        imagem: "https://placekitten.com/400/200"
    },
    {
        id: 3,
        description: "Gatinho dormindo em uma caixa",
        imagem: "https://placekitten.com/200/300"
    },
    {
        id: 4,
        description: "Gatos brincando com um novelo de lã",
        imagem: "https://placekitten.com/500/300"
    },
    {
        id: 5,
        description: "Gato preto em um dia chuvoso",
        imagem: "https://placekitten.com/300/200"
    },
    {
        id: 6,
        description: "Gato marcando território",
        imagem: "https://placekitten.com/400/300"
    },
    {
        id: 7,
        description: "Gato comendo ração",
        imagem: "https://placekitten.com/200/200"
    }
];

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota GET para todos os posts
app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});


// Função e Rota GET para posts por ID
function buscarPostPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
};

app.get('/posts/:id', (req, res) => {
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});

// Função e Rota GET para posts por filtro
function buscarPostPorFiltro(filtro){
    return posts.filter((post) => {
        const descricaoNormalizada = 
        post.description && post.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const filtroNormalizado = 
        filtro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return descricaoNormalizada && descricaoNormalizada.includes(filtroNormalizado);

    });
};

app.get('/posts/search/:filtro', (req, res) => {
    const resultado = buscarPostPorFiltro(req.params.filtro);
    res.status(200).json(resultado);
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
