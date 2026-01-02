# 📽️ Fififlix API Rest

API RESTful para gerenciamento de filmes (+ diretores), para estudos, construída com Node.js, Express e MongoDB. Implementa paginação, ordenação dinâmica e filtros avançados de busca.

### 🚀 Tecnologias
- Node.js - Runtime JavaScript
- Express - Framework web
- MongoDB - Banco de dados NoSQL
- Mongoose - ODM para MongoDB
- dotenv - Gerenciamento de variáveis de ambiente
- ESLint - Linter para padronização de código

### Pré-requisitos
- Node.js (versão 20 ou superior)
- MongoDB (local ou Atlas)
- npm

### 🔧 Instalação

1. Clone o repositório:
```
git clone <url-do-repositorio>
cd backend-express-and-mongodb
```
2. Instale as dependências:
```
npm install
```
3.Configure as variáveis de ambiente:
```
# Crie um arquivo .env na raiz do projeto
DB_CONNECTION_STRING=mongodb+srv://usuario:senha@cluster0.qzdivxj.mongodb.net/seu-banco
# ou para MongoDB Atlas:
# DB_CONNECTION_STRING=mongodb+srv://usuario:senha@cluster.mongodb.net/seu-banco
```
4.Inicie o servidor:
```
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 🎯 Funcionalidades - Características Principais
- CRUD completo para filmes e diretores
- Paginação automática com limite configurável (máx: 100 itens)
- Ordenação dinâmica por qualquer campo
- Filtros avançados para busca de filmes
- Validação de dados com Mongoose
- Tratamento de erros centralizado
- Respostas padronizadas JSON

#### 🎬 Endpoints - Movies
Listar todos os filmes

```
GET /movies
```

Query Parameters:

- limit - Número de resultados por página (padrão: 10, máx: 100)
- page - Número da página (padrão: 1)
- ordered - Ordenação no formato campo:direção (ex: title:1)

Exemplos:

```
# Listar primeiros 10 filmes
GET /movies

# Paginação
GET /movies?limit=20&page=2

# Ordenar por título (A-Z)
GET /movies?ordered=title:1

# Ordenar por avaliação (melhor primeiro)
GET /movies?ordered=rating:-1

# Combinar paginação e ordenação
GET /movies?ordered=title:1&limit=5&page=1
```

Buscar filmes com filtros

```
GET /movies/query
```

Query Parameters:
- title - Busca por título (case-insensitive)
- genre - Busca por gênero
- nationality - Busca por nacionalidade
- director - Busca por nome do diretor
- minYear - Ano mínimo de lançamento
- maxYear - Ano máximo de lançamento
- ordered - Ordenação
- limit - Paginação
- page - Paginação

Exemplos:
```
# Buscar por título
GET /movies/query?title=godfather

# Buscar por diretor
GET /movies/query?director=Coppola

# Buscar filmes dos anos 90
GET /movies/query?minYear=1990&maxYear=1999

# Combinar múltiplos filtros
GET /movies/query?genre=drama&nationality=EUA&minYear=1970&maxYear=1980&ordered=rating:-1
```

Buscar filme por ID
```
GET /movies/:id
```

Criar novo filme
```
POST /movies
Content-Type: application/json

{
  "title": "O Poderoso Chefão",
  "coverImage": "https://exemplo.com/imagem.jpg",
  "genre": "Drama",
  "writer": "Francis Ford Coppola, Mario Puzo",
  "mainActors": "Marlon Brando, Al Pacino",
  "nationality": "EUA",
  "releaseDate": "1972-03-24",
  "rating": 5,
  "comment": "Obra-prima do cinema",
  "director": "690a953844be0785d4178774"
}
```

Atualizar filme
```
PUT /movies/:id
Content-Type: application/json

{
  "rating": 5,
  "comment": "Atualizado"
}
```

Deletar filme
```
DELETE /movies/:id
```

#### 🎭 Endpoints - Directors

Listar todos os diretores
```
GET /director
```

Query Parameters:

- limit - Paginação
- page - Paginação
- ordered - Ordenação (ex: name:1, birthDate:-1)

Exemplos:
```
# Listar diretores
GET /director

# Ordenar por nome (A-Z)
GET /director?ordered=name:1

# Ordenar por data de nascimento (mais recente)
GET /director?ordered=birthDate:-1
```

Buscar diretor por ID
```
GET /director/:id
```

Criar novo diretor
```
POST /director
Content-Type: application/json

{
  "name": "Francis Ford Coppola",
  "birthDate": "1939-04-07",
  "nationality": "EUA"
}
```

Atualizar diretor
```
PUT /director/:id
Content-Type: application/json

{
  "name": "Francis Ford Coppola"
}
```

Deletar diretor
```
DELETE /director/:id
```

#### 📊 Estrutura de Resposta

Todas as respostas seguem o padrão:
```
{
  "success": true,
  "status": 200,
  "message": "Descrição da operação",
  "data": [...],
  "errors": null
}
```

#### 🎨 Ordenação Dinâmica
A ordenação usa o formato campo:direção:

- 1 ou qualquer número positivo = Ordem crescente (A-Z, 0-9)
- -1 ou qualquer número negativo = Ordem decrescente (Z-A, 9-0)

#### 🔍 Exemplos de Uso Completos
Cenário 1: Top 10 filmes mais bem avaliados
```
GET /movies?ordered=rating:-1&limit=10
```

Cenário 2: Dramas americanos dos anos 70, ordenados por título
```
GET /movies/query?genre=drama&nationality=EUA&minYear=1970&maxYear=1979&ordered=title:1
```

Cenário 3: Filmes de um diretor específico
```
GET /movies/query?director=Scorsese&ordered=releaseDate:-1
```

Cenário 4: Paginação de diretores
```
# Página 1
GET /director?limit=10&page=1&ordered=name:1

# Página 2
GET /director?limit=10&page=2&ordered=name:1
```

### ⚙️ Configurações Avançadas
Limites de Paginação
- Padrão: 10 itens por página
- Mínimo: 1 item
- Máximo: 100 itens
Ordenação Padrão
Se não especificado, a ordenação padrão é `_id:-1` (mais recentes primeiro)

### 🤝 Contribuindo
Fork o projeto
Crie uma branch para sua feature (git checkout -b feat/nova-feature)
Commit suas mudanças (git commit -m 'feat: adiciona nova feature')
Push para a branch (git push origin feat/nova-feature)
Abra um Pull Request

Padrão de Commits
Seguimos o [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- feat: - Nova funcionalidade
- fix: - Correção de bug
- docs: - Documentação
- refactor: - Refatoração de código
- test: - Testes
- chore: - Tarefas de manutenção

#### 📄 Licença
Este projeto está sob a licença ISC.

#### 👤 Autor
Desenvolvido como projeto de estudos de Node.js, Express e MongoDB.

⭐ Se este projeto foi útil, considere dar uma estrela!
