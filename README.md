
---

# GuitarAPI

> API RESTful criada para fins acadêmicos e de demonstração para gerenciamento de guitarras e marcas, construída com TypeScript, Express e persistência em arquivos JSON.

---

## 🌐 API Pública

A API está publicada gratuitamente no Render e pode ser acessada pelos links abaixo:

- **Base URL:** [`https://guitarapi-i15g.onrender.com/`](https://guitarapi-i15g.onrender.com/)
- **Swagger (Documentação interativa):** [`https://guitarapi-i15g.onrender.com/api-docs`](https://guitarapi-i15g.onrender.com/api-docs)

---

## Funcionalidades

- CRUD completo para marcas e guitarras
- PATCH para ativar/desativar marcas (`/brands/{id}/isActive`)
- Endpoint para validação de token JWT (`/auth/authorize`)
- JWT seguro: tokens são assinados com uma chave secreta forte (256 bits)
- Persistência dos dados em arquivos JSON (sem banco de dados externo)
- Validação dos DTOs com mensagens em português
- Rotas protegidas por autenticação JWT
- Documentação automática via Swagger
- Dados iniciais já inclusos para fins de demonstração

---

## Exemplos de Campos

- **Marcas:** nome, país, ano de fundação, ativo, data de cadastro
- **Guitarras:** modelo, marca, ano de fabricação, número de cordas, observações

---

## Endpoints de Autenticação

- `POST /auth/register`: cria um novo usuário (forneça username e password)
- `POST /auth/login`: retorna um token JWT para autenticação (forneça username e password de um usuário cadastrado)
- `POST /auth/authorize`: valida um token JWT e retorna o payload se válido

### Fluxo sugerido
1. Registre um usuário usando `POST /auth/register`.
2. Faça login com esse usuário em `POST /auth/login` para obter o token JWT.
3. Use o token JWT para acessar os demais endpoints protegidos.

---

## Primeiros Passos (Desenvolvimento Local)

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Rode em modo desenvolvimento:
   ```sh
   npm run dev
   ```
3. Acesse a documentação Swagger localmente em [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

---

## Como rodar os testes automatizados

### Pré-requisitos
- Certifique-se de ter instalado todas as dependências do projeto:
  ```sh
  npm install
  ```
- O arquivo users.json deve conter um usuário com:
  - username: `admin`
  - password: `admin`

### Executando os testes
Para rodar todos os testes automatizados, utilize:
```sh
npm test
```
ou
```sh
npx jest --runInBand --detectOpenHandles
```

Os testes cobrem:
- Registro e login de usuários
- Listagem de marcas (rota protegida)
- Listagem de guitarras (rota protegida)

Se tudo estiver correto, a saída esperada será:
```
PASS  src/__tests__/guitar.test.ts
PASS  src/__tests__/brand.test.ts
PASS  src/__tests__/auth.test.ts
Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
```

---

## Autenticação

Todas as rotas de negócio exigem um token JWT. Utilize o endpoint `/auth/login` para obter um token (usuário: `admin`, senha: `admin`).
