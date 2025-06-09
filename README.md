# 💸 Financial Transactions API

API RESTful para controle de transações financeiras, construída com **Node.js**, **Fastify**, **Prisma** e seguindo os princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**.

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **TypeScript**
* **Fastify** – Framework web leve e performático
* **Prisma ORM** – Mapeamento objeto-relacional
* **PostgreSQL** – Banco de dados relacional (ou o que você usou)
* **JWT (JSON Web Tokens)** – Autenticação e autorização
* **Bcrypt** – Criptografia de senhas
* **Zod** – Validação de schemas
* **DDD** – Domain-Driven Design
* **Clean Architecture** – Separacão clara entre camadas
* **Jest** – Para testes automatizados

---

## 📁 Estrutura do Projeto

```
src/
├— controllers/
├— usecases/
├— entities/
├— repositories/
├— dtos/
├— shared/ (erros, utils, Either, logger, etc)
├— middlewares/
├— routes/
└— main.ts
```

---

## 📌 Funcionalidades

* ✅ Cadastro de usuário
* ✅ Login com JWT
* ✅ CRUD de transações financeiras
* ✅ Categorizacão de transações
* ✅ Filtro por categoria
* ✅ Extração (soma de entradas e saídas)
* ✅ Autenticação e autorização por usuário

---

## 🔐 Autenticação

Utilize o token JWT retornado no login para autenticar todas as requisições protegidas:

```http
Authorization: Bearer <token>
```

---

## 📦 Instalação

```bash
git clone https://github.com/EwertonHecsley/financial-api.git
cd financial-api
npm install
```

Crie um arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Rode as migrations e inicie o servidor:

```bash
npx prisma migrate dev
npm run dev
```

---

## 📩 Rotas da API

### 🧑 Usuário

| Método | Rota         | Descrição              | Autenticado |
| ------ | ------------ | ---------------------- | ----------- |
| POST   | /v1/login    | Autenticar usuário     | ❌           |

---

### 💸 Transações

| Método | Rota                    | Descrição                                 | Autenticado |
| ------ | ----------------------- | ----------------------------------------- | ----------- |
| POST   | /v1/transaction         | Criar nova transação                      | ✅           |
| GET    | /v1/transaction         | Listar todas as transações do usuário     | ✅           |
| GET    | /v1/transaction?filter= | Filtrar transações por categoria (query)  | ✅           |
| GET    | /v1/transaction/\:id    | Buscar uma transação específica           | ✅           |
| PUT    | /v1/transaction/\:id    | Atualizar transação                       | ✅           |
| DELETE | /v1/transaction/\:id    | Remover transação                         | ✅           |
| GET    | /v1/transaction/extract | Obter resumo de entradas e saídas (saldo) | ✅           |

---

## 📌 Exemplo de JSON para Transação

```json
{
  "description": "Salário",
  "value": 3000,
  "category_id": "uuid-da-categoria",
  "date": "2025-06-01T00:00:00.000Z",
  "type": "INCOME"
}
```

---

## 🧪 Testes (se houver)

```bash
npm run test
```

---

## 🧠 Conceitos Aplicados

* Separacão por camadas: `controller`, `usecase`, `repository`, `entity`
* Validação com Zod e middlewares do Fastify
* Inversão de dependências via injeção manual
* Tratamento de erros com `Either` (functor funcional)
* 
---

## 🛠️ Autor

Desenvolvido por **Ewerton Hecsley**
🌐 [LinkedIn](https://www.linkedin.com/in/ewerton-hecsley-8a613992/)
