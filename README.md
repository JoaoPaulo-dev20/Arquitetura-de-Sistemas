#  Sistema em camadas - Clínica Odontológica

## 👤 Identificação dos Autores

**Aluno:** João Paulo de Albuquerque Alves  
**Disciplina:** Arquitetura de Sistemas  
**Professor:** Renato William  

---

## 📋 Descrição Geral do Sistema

O Sistema de Gerenciamento de Clínica Odontológica é uma aplicação web full-stack que permite o gerenciamento de pacientes, profissionais (dentistas) e agendamento de consultas. O sistema implementa uma **arquitetura em camadas** com backend em **Node.js + Express** e frontend em **React + Vite**, demonstrando na prática o padrão arquitetural estudado na disciplina.

A aplicação permite que pacientes agendem consultas respeitando a disponibilidade de horários, visualizem informações sobre serviços prestados e conheçam os profissionais da clínica.

---

## ✅ Requisitos Funcionais
RF01. **Gerenciamento de Pacientes**
   - Cadastrar novo paciente (nome, telefone)
   - Listar todos os pacientes
   - Buscar paciente por ID
   - Atualizar dados do paciente
   - Deletar paciente do sistema

RF02. **Gerenciamento de Consultas**
   - Agendar consulta (paciente, dentista, data/hora)
   - Listar todas as consultas
   - Cancelar consulta
   - Impedir agendamentos com horários duplicados

RF03. **Gerenciamento de Profissionais**
   - Listar dentistas disponíveis
   - Visualizar informações do dentista (nome, especialidade, telefone)
   - Buscar dentista por ID

RF04. **Interface do Usuário**
   - Navegação entre páginas (Home, Serviços, Profissionais, Sobre, Contato, Agendamento)
   - Formulário interativo de agendamento
   - Visualização de serviços prestados
   - Listagem de profissionais com botão para agendamento direto

---

## 🎯 Requisitos Não-Funcionais

RNF01. **Desempenho**
   - Resposta de requisições em até 500ms
   - Interface responsiva e sem lag

RNF02. **Usabilidade**
   - Interface intuitiva e amigável
   - Validação em tempo real dos formulários
   - Mensagens de erro claras

RNF03. **Confiabilidade**
   - Validação de dados em múltiplas camadas
   - Tratamento robusto de exceções
   - Prevenção de conflitos de agendamento

RNF04. **Escalabilidade**
   - Arquitetura preparada para migração para banco de dados
   - Fácil adição de novas funcionalidades

NF05. **Manutenibilidade**
   - Código bem organizado em camadas
   - Separação clara de responsabilidades
   - Fácil identificação e correção de bugs

---

## 🏗️ Arquitetura do Sistema

### Arquitetura em 4 Camadas (Backend)

O backend segue o padrão de arquitetura em 4 camadas:

```
┌─────────────────────────────────────┐
│   1. CAMADA DE ROTEAMENTO           │
│      (Routes)                       │
│   • Mapeia URLs HTTP para controllers
│   • Define endpoints REST           │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   2. CAMADA DE CONTROLE             │
│      (Controllers)                  │
│   • Processa requisições HTTP       │
│   • Retorna respostas HTTP          │
│   • Delega para Services            │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   3. CAMADA DE NEGÓCIO              │
│      (Services)                     │
│   • Implementa lógica de negócio    │
│   • Valida dados                    │
│   • Executa regras de validação     │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   4. CAMADA DE DADOS                │
│      (Repositories)                 │
│   • Acessa dados                    │
│   • Realiza operações CRUD          │
│   • Abstrai fonte de dados          │
└─────────────────────────────────────┘
```

### Arquitetura em 3 Camadas (Frontend)

```
┌─────────────────────────────────────┐
│   1. APRESENTAÇÃO                   │
│      (Pages & Components)           │
│   • Home, Services, Professionals   │
│   • Header, Footer, Forms           │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   2. INTEGRAÇÃO                     │
│      (API Services)                 │
│   • Cliente HTTP (fetch)            │
│   • Comunicação com backend         │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│   3. ESTADO                         │
│      (State Management)             │
│   • useState, useEffect             │
│   • Lógica de negócio frontend      │
└─────────────────────────────────────┘
```

---

## 💡 Justificativa da Adoção da Arquitetura em Camadas

A arquitetura em camadas foi escolhida por oferecer:

### 1. **Separação de Responsabilidades**
Cada camada possui responsabilidade única, facilitando manutenção e compreensão do código.

### 2. **Reutilização de Componentes**
Services e Repositories podem ser reutilizados em diferentes contextos sem duplicação.

### 3. **Testabilidade**
Cada camada pode ser testada isoladamente, sem dependência das demais.

### 4. **Escalabilidade**
Fácil adicionar novas funcionalidades sem alterar camadas existentes.

**Exemplo:** Para trocar de armazenamento em memória para banco de dados, basta alterar o Repository. Controllers e Services não precisam mudar!

### 5. **Manutenibilidade**
Alterações em uma camada não impactam outras, reduzindo risco de regressões.

### 6. **Padrão Conhecido**
Amplamente utilizado em aplicações empresariais, facilitando onboarding de novos desenvolvedores.

---

---

### 📦 Módulos Node.js (Dependências)

#### Backend - `package.json`

**Express** (`^4.18.2`)
```
O que faz: Framework web para criar servidores HTTP
Como funciona: 
  - Cria rotas para requisições GET, POST, PUT, DELETE
  - Gerencia middleware (software intermediário)
  - Retorna respostas JSON
Exemplo de uso no projeto:
  app.post('/pacientes', (req, res) => { ... })
```

**CORS** (`^2.8.5`)
```
O que faz: Middleware que permite requisições entre diferentes domínios
Como funciona:
  - Frontend (localhost:5173) consegue acessar Backend (localhost:3000)
  - Sem CORS: navegador bloqueia a requisição por segurança
Exemplo de uso no projeto:
  app.use(cors())  // Libera todas as requisições
```

---

#### Frontend - `package.json`

**React** (`^19.2.3`)
```
O que faz: Biblioteca para criar componentes reutilizáveis
Como funciona:
  - Cria componentes funcionais com hooks (useState, useEffect)
  - Atualiza interface automaticamente quando estado muda
  - Virtual DOM para otimizar renderização
Exemplo de uso no projeto:
  function Home() { return <h1>Bem-vindo</h1> }
```

**React-DOM** (`^19.2.3`)
```
O que faz: Liga React ao HTML real do navegador
Como funciona:
  - Renderiza componentes React no elemento #root do HTML
  - Gerencia atualizações da interface
Exemplo de uso no projeto:
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

**Vite** (`^7.3.1`) - devDependency
```
O que faz: Ferramenta de desenvolvimento e build
Como funciona:
  - Compila JSX → JavaScript
  - Compila CSS
  - Oferece Hot Module Replacement (HMR) - vê mudanças em tempo real
  - Cria arquivo otimizado para produção
Exemplo de uso no projeto:
  npm run dev    # Inicia servidor de desenvolvimento
  npm run build  # Cria versão para produção
```

**@vitejs/plugin-react** (`^5.1.2`) - devDependency
```
O que faz: Plugin que ensina o Vite como lidar com React
Como funciona:
  - Transforma JSX em JavaScript válido
  - Permite usar hooks sem importação
Exemplo de uso no projeto:
  import react from '@vitejs/plugin-react'
  export default { plugins: [react()] }
```

---

### 📊 Diagrama de Dependências:

```
BACKEND (Node.js)
├── express          → Cria servidor e rotas
└── cors             → Permite comunicação com frontend

FRONTEND (Node.js + Browser)
├── React            → Cria componentes interativos
├── React-DOM        → Renderiza React no HTML
└── Vite (dev)       → Compila e serve em desenvolvimento
    └── @vitejs/plugin-react (dev) → Suporte a JSX
```

---

## 🛠️ Tecnologias Utilizadas

### Backend - O que cada tecnologia faz:

**Node.js** (18+)
- O que é: Plataforma que permite executar JavaScript no servidor
- Por que usar: Desenvolvimento rápido, single-threaded, event-driven
- Função no projeto: Executa o código JavaScript do backend

**Express.js** (4.x)
- O que é: Framework web minimalista para Node.js
- Por que usar: Simplicidade, roteamento intuitivo, middleware fácil
- Função no projeto: Cria o servidor HTTP, gerencia rotas e requisições

**CORS** (Cross-Origin Resource Sharing)
- O que é: Middleware que permite requisições entre domínios diferentes
- Por que usar: O frontend (localhost:5173) precisa comunicar com backend (localhost:3000)
- Função no projeto: Libera comunicação entre frontend e backend

---

### Frontend - O que cada tecnologia faz:

**React** (19.2+)
- O que é: Biblioteca JavaScript para criar interfaces interativas
- Por que usar: Componentes reutilizáveis, state management, Virtual DOM
- Função no projeto: Cria a interface do usuário com componentes dinâmicos

**Vite** (7.3+)
- O que é: Ferramenta de build e desenvolvimento moderna
- Por que usar: Inicialização rápida, Hot Module Replacement (HMR), empacotamento otimizado
- Função no projeto: Compila React e CSS, serve a aplicação durante desenvolvimento

**CSS3**
- O que é: Linguagem para estilizar elementos HTML
- Por que usar: Design responsivo, flexbox, gradientes, animações
- Função no projeto: Estiliza a interface (cores, layouts, responsividade)

---

### Resumo Visual:

```
┌─────────────────────────────────────────┐
│        NAVEGADOR DO USUÁRIO             │
│  http://localhost:5173                  │
│  (React + Vite + CSS3)                  │
└────────────────┬────────────────────────┘
                 │ Requisição HTTP
                 ↓
┌─────────────────────────────────────────┐
│        SERVIDOR BACKEND                 │
│  http://localhost:3000                  │
│  (Node.js + Express + CORS)             │
└─────────────────────────────────────────┘
```

---

## 📁 Estrutura de Pastas

```
SIstema em Camadas - ARQ/
│
├── backend/
│   ├── app.js                        # Servidor Express
│   ├── package.json                  # Dependências
│   ├── package-lock.json             # Lock de versões
│   ├── node_modules/                 # Dependências instaladas
│   │
│   ├── config/                       # Pasta de configurações
│   │
│   ├── routers/
│   │   └── routes.js                 # Definição de rotas REST
│   │
│   ├── controllers/
│   │   └── index.js                  # PacientesController, ConsultasController, DentistasController
│   │
│   ├── services/
│   │   ├── consultasService.js       # Lógica de consultas
│   │   ├── pacientesService.js       # Lógica de pacientes
│   │   └── index.js                  # Exportação de Services
│   │
│   └── repositories/
│       └── index.js                  # PacientesRepository, ConsultasRepository, DentistasRepository
│
├── frontend/
│   ├── index.html                    # HTML principal (Vite)
│   ├── package.json                  # Dependências
│   ├── package-lock.json             # Lock de versões
│   ├── vite.config.js                # Configuração Vite
│   ├── node_modules/                 # Dependências instaladas
│   │
│   └── src/
│       ├── main.jsx                  # Inicialização React + ReactDOM
│       ├── App.jsx                   # Componente raiz com roteamento
│       ├── index.css                 # Estilos globais
│       │
│       ├── components/               # Componentes reutilizáveis
│       │   ├── Header.jsx            # Navegação principal
│       │   ├── Footer.jsx            # Rodapé
│       │   └── AppointmentForm.jsx   # Formulário de agendamento interativo
│       │
│       ├── pages/                    # Páginas da aplicação
│       │   ├── Home.jsx              # Página inicial
│       │   ├── Services.jsx          # Listagem de serviços com botões
│       │   ├── Professionals.jsx     # Listagem de dentistas com botões
│       │   ├── About.jsx             # Sobre a clínica
│       │   ├── Contact.jsx           # Contato
│       │   └── Appointment.jsx       # Página com formulário de agendamento
│       │
│       └── services/
│           └── api.js                # Cliente HTTP para backend (pacientes, consultas, dentistas)
│
├── README.md                         # Este arquivo
└── .gitignore                        # Arquivos ignorados pelo Git
```

---

## 🚀 Instruções para Execução do Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado em seu computador:

1. **Node.js** (versão 18 ou superior)
   - O que é: Plataforma que permite executar JavaScript fora do navegador
   - Onde baixar: https://nodejs.org/ (clique em "LTS" - versão estável)
   - Como verificar se está instalado:
     ```bash
     node --version
     npm --version
     ```
   - Se aparecer um número de versão, está instalado 

2. **Git** (opcional, mas recomendado)
   - Para clonar/baixar o projeto

3. **Um Editor de Código** (recomendado: VS Code)
   - Para editar o código se necessário

---

### Passo 1️⃣: Baixar/Clonar o Projeto

**Opção A - Baixar como ZIP:**
1. Clique no botão verde "Code" no repositório
2. Clique em "Download ZIP"
3. Descompacte a pasta em um local seguro (ex: Desktop ou Documentos)

**Opção B - Usando Git:**
```bash
git clone https://github.com/seu-usuario/sistema-clinica.git
cd SIstema\ em\ Camadas\ -\ ARQ
```

---

### Passo 2️⃣: Instalar Dependências do Backend

As dependências são como "pacotes" que o Node precisa para executar o código.

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências (isso cria a pasta node_modules)
npm install
```

**O que acontece:**
- O npm lê o arquivo `package.json`
- Baixa todos os pacotes listados (Express, CORS)
- Salva na pasta `node_modules/`
- Pode levar 1-2 minutos ⏳

**Resultado esperado:**
```
added X packages, and audited Y packages in Zm
```

---

### Passo 3️⃣: Instalar Dependências do Frontend

```bash
# Saia da pasta backend e entre na frontend
cd ../frontend

# Instale as dependências
npm install
```

**O que acontece:**
- Similar ao backend
- Baixa React, Vite e plugins
- Pode levar 2-3 minutos ⏳

---

### Passo 4️⃣: Iniciar os Dois Servidores

**IMPORTANTE:** Você precisa de **2 terminais abertos** simultaneamente!

#### Terminal 1 - Servidor Backend (API)

```bash
# Certifique-se que está na pasta backend
cd backend

# Inicie o servidor
npm start
```

**Resultado esperado:**
```
✅ API rodando em http://localhost:3000
```

**O que significa:**
- O backend está pronto para receber requisições
- Pacientes e consultas podem ser salvos
- NÃO feche este terminal! ⚠️

---

#### Terminal 2 - Servidor Frontend (Interface)

Abra um **novo terminal** (não feche o primeiro!)

```bash
# Certifique-se que está na pasta frontend
cd frontend

# Inicie o servidor de desenvolvimento
npm run dev
```

**Resultado esperado:**
```
  VITE v7.3.1  ready in X ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**O que significa:**
- A interface está pronta
- O React está rodando
- As mudanças no código aparecem em tempo real
- NÃO feche este terminal! ⚠️

---

### Passo 5️⃣: Acessar a Aplicação

1. Abra seu **navegador web** (Chrome, Firefox, Edge, etc)
2. Digite na barra de endereço: `http://localhost:5173`
3. Aperte Enter

**Você deve ver:**
- Logo "🦷 Clínica Odontológica"
- Menu de navegação (Home, Serviços, Profissionais, etc)
- Página inicial da clínica

---

### 📋 Checklist de Execução

Use este checklist para verificar se tudo está correto:

```
☐ Node.js instalado (verificado com node --version)
☐ Dependências do backend instaladas (npm install em /backend)
☐ Dependências do frontend instaladas (npm install em /frontend)
☐ Terminal 1 rodando: npm start (backend em localhost:3000)
☐ Terminal 2 rodando: npm run dev (frontend em localhost:5173)
☐ Navegador aberto em http://localhost:5173
☐ Interface carregada com sucesso ✅
```

---

### 🛠️ Troubleshooting (Solução de Problemas)

**Problema: "npm: command not found"**
- Solução: Node.js não está instalado. Baixe em https://nodejs.org/

**Problema: "Port 3000 already in use"**
- Significa: Algo já está usando a porta 3000
- Solução: Feche outros programas ou use outra porta

**Problema: "ENOENT: no such file or directory, open 'package.json'"**
- Significa: Você não está na pasta correta
- Solução: Certifique-se que está em `/backend` ou `/frontend`

**Problema: "Frontend não carrega (erro 404)"**
- Significa: Backend não está rodando
- Solução: Verifique se o Terminal 1 está com "npm start" rodando

**Problema: "Cannot find module 'express'"**
- Significa: npm install não foi executado
- Solução: Execute `npm install` na pasta do backend

---

### 💡 Dicas Importantes

1. **Mantenha os 2 terminais abertos** - Se fechar um, o servidor para
2. **Mudanças em tempo real** - Frontend atualiza sozinho ao salvar (graças ao Vite)
3. **Backend precisa ser reiniciado** - Se alterar código no backend, reinicie com Ctrl+C e npm start
4. **Limpar cache** - Se algo não aparecer, tente Ctrl+Shift+Delete no navegador (limpar cache)

---
