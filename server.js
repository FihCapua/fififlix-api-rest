import http from 'http';

const PORT = 3000

const routes = {
    "/": "Curso de Node.js",
    "/livros": "Entrei na rota livros",
    "/autores": "Entrei na rota autores"
}

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type" : "text/plain" });
    response.end(routes[request.url])
})

server.listen(PORT, () => {
    console.log('Servidor escutando!')
})