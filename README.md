# Atividade Avaliativa — Docker (Arquitetura de Sistemas)
**Curso:** Análise e Desenvolvimento de Sistemas — IFCE (Campus Boa Viagem)  
**Disciplina:** Arquitetura de Sistemas  
**Professor:** Renato William  
**Aluno:** João Paulo de Albuquerque Alves  

---

## 1. Visão Geral do Projeto

Este repositório contém uma aplicação **full stack** organizada em **arquitetura em camadas**, composta por:

- **Backend (API):** Node.js + Express, com separação em rotas, controllers, services e repositories.
- **Frontend (Web):** React + Vite + CSS3, com páginas e componentes que consomem a API.

O objetivo desta atividade é **containerizar** o projeto com Docker e permitir que ele seja executado de forma padronizada em qualquer ambiente, utilizando apenas Docker e Docker Compose, além de documentar todo o processo no README.

### Tecnologias Utilizadas
**Frontend**
- **React**: biblioteca para construir interfaces com componentes reutilizáveis.
- **Vite**: ferramenta moderna de build e desenvolvimento.
- **CSS3**: estilização e responsividade.

**Backend**
- **Node.js**: runtime para execução do JavaScript no servidor.
- **Express**: framework HTTP para rotas e middleware.
- **CORS**: habilita comunicação entre frontend e backend.

**Containerização**
- **Docker** e **Docker Compose**
- **Nginx** (para servir o frontend em produção dentro do container)

---

## 2. Explicação do Dockerfile

> Esta atividade exige Dockerfile configurando imagem base, diretório de trabalho, cópia de arquivos, instalação de dependências e comando de inicialização. :contentReference[oaicite:2]{index=2}

### 2.1 Dockerfile do Backend (`backend/Dockerfile`)

- **FROM**: define a imagem base.  
  Usamos `node:20-alpine` por ser leve e adequada para aplicações Node.
- **WORKDIR**: define o diretório padrão dentro do container (`/app`).
- **COPY**: copia os arquivos para o container (primeiro `package*.json` para aproveitar cache).
- **RUN**: executa comandos durante o build (ex.: `npm install` para instalar dependências).
- **EXPOSE**: documenta a porta da aplicação (porta 3000 da API).
- **CMD**: define como a aplicação inicia (ex.: `npm run dev`).

**Como o ambiente foi configurado no container:**  
O container instala dependências com npm e executa a API expondo a porta 3000. A API deve escutar em `0.0.0.0` para ficar acessível fora do container.

### 2.2 Dockerfile do Frontend (`frontend/Dockerfile`)

O frontend foi containerizado com **multi-stage build**:

- **Stage 1 (build)**: usa Node para instalar dependências e gerar a pasta `dist` via `npm run build`.
- **Stage 2 (runtime)**: usa `nginx:alpine` para servir os arquivos estáticos gerados.

**Por que usar multi-stage?**  
Reduz o tamanho final da imagem e remove dependências de build do runtime, deixando a execução mais leve.

---

## 3. Explicação do Docker Compose 

> Como o projeto possui mais de um serviço (backend + frontend), foi utilizado Docker Compose conforme solicitado. :contentReference[oaicite:3]{index=3}

O arquivo `docker-compose.yml` define:

- **Serviço `backend`**: build a partir de `./backend`, expõe `3000:3000`.
- **Serviço `frontend`**: build a partir de `./frontend`, expõe `5173:80` (Nginx interno roda na porta 80).
- **depends_on**: o frontend depende do backend (sobe depois).

### Comunicação entre containers
Em Docker Compose, os serviços ficam na mesma rede. O backend pode ser acessado pelo nome do serviço (`backend`) a partir de outros containers.

### Portas
- **Backend:** `http://localhost:3000`
- **Frontend:** `http://localhost:5173`

---

## 4. Funcionamento da Aplicação no Docker

### Como a aplicação inicia dentro do container
- **Backend:** inicia pelo `CMD` do Dockerfile (ex.: `npm run dev`), expondo a API na porta 3000.
- **Frontend:** o Nginx inicia automaticamente e serve os arquivos da pasta `dist`.

### Como o usuário acessa o sistema
- Acesso ao frontend via navegador: `http://localhost:5173`
- Acesso ao backend via API: `http://localhost:3000`

### Diferença entre execução local e via Docker
- **Local:** é necessário instalar Node/npm e rodar frontend e backend em terminais separados.
- **Docker:** toda a configuração já vem empacotada nas imagens; basta subir com Docker Compose.

> Essas seções (funcionamento, acesso e diferenças) fazem parte da documentação obrigatória. :contentReference[oaicite:4]{index=4}

---

### 5.1 Clonar o repositório
```bash
git clone https://github.com/JoaoPaulo-dev20/Arquitetura-de-Sistemas.git
cd Arquitetura-de-Sistemas
