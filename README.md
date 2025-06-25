# 🏟️ Match Point API

## 🙍🏻‍♂️ Autor
Ricardo Didimo - TSI 2025/1

## 📘 Descrição do Projeto

A **Match Point API** é uma aplicação RESTful desenvolvida em **NestJS** com **Prisma ORM** e banco de dados **PostgreSQL**.  
Ela permite gerenciar usuários, quadras esportivas e agendamentos (alugueis), com autenticação baseada em **JWT**, controle de acesso por papéis (roles) e documentação interativa via **Swagger**.

---

## 🚀 API em Produção

🔗 [https://match-point-api.onrender.com/api](https://match-point-r8w0.onrender.com/api)

---

## 🧰 Instruções de Execução

### 📦 Instalação

```bash
git clone https://github.com/seu-usuario/match-point-api.git
cd match-point-api
npm install
```

---

### ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/matchpoint"
JWT_SECRET="sua_chave_secreta_aqui"
JWT_EXPIRES_IN="1h"
```

---

### 🛠️ Configuração do Banco de Dados

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

### ▶️ Execução Local

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000/api`.

---

## 🗃️ Diagrama Entidade-Relacionamento (ERD)

![ERD](./docs/erd.png)
---

## 📑 Documentação Swagger

Acesse a documentação em:

🔗 [http://localhost:3000/api](http://localhost:3000/api)

---

## ✅ Checklist de Funcionalidades

- [x] Autenticação com JWT
- [x] Criação e login de usuários
- [x] Hash de senha com bcrypt
- [x] Controle de acesso com roles
- [x] Guards e Interceptors
- [x] Versionamento da API
- [x] CRUD de quadras
- [x] CRUD de agendamentos
- [x] Middleware de logging
- [x] Validação com class-validator
- [x] Swagger com exemplos e segurança
- [x] Configuração com `.env` e `ConfigModule`
- [x] Prisma ORM e PostgreSQL