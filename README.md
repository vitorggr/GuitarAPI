
## Conceitos Utilizados

- **Injeção de dependência (DI):** Técnica para desacoplar componentes do sistema. Controllers e services recebem repositórios via interfaces, e o container do tsyringe resolve a implementação concreta, facilitando testes, manutenção e troca de implementações.
- **Mongoose:** ODM (Object Data Modeling) para MongoDB em Node.js. Permite definir schemas, models e realizar operações no banco de dados de forma orientada a objetos.
- **Atlas:** Serviço de banco de dados MongoDB gerenciado na nuvem, fornecendo alta disponibilidade, backups e fácil escalabilidade.
- **dotenv:** Biblioteca para carregar variáveis de ambiente do arquivo `.env` para `process.env`, facilitando a configuração de dados sensíveis (ex: string de conexão).
- **Arquitetura em camadas:** O projeto segue a segmentação proposta em aula, separando apresentação, domínio, infraestrutura e aplicação, com inversão de controle e isolamento das operações de negócio.
- **Repositórios e DTOs:** A lógica de acesso e manipulação de dados está isolada em repositórios, com uso de interfaces e DTOs para validação e tipagem dos dados.
- **ODM e MongoDB:** Utilização do Mongoose como ODM para mapear documentos do domínio (guitarra, marca, usuário) e realizar operações de CRUD no MongoDB Atlas.

---

# GuitarAPI

API RESTful criada para fins acadêmicos e de demonstração para gerenciamento de guitarras e marcas, construída com TypeScript, Express, MongoDB (Mongoose), injeção de dependência e arquitetura em camadas.

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
- Persistência dos dados em MongoDB Atlas (banco de dados na nuvem)
- Validação dos DTOs com mensagens em português
- Rotas protegidas por autenticação JWT
- Documentação automática via Swagger
- Injeção de dependência com tsyringe
- Arquitetura em camadas, com inversão de controle e isolamento das operações de negócio
- Isolamento da lógica de acesso e manipulação de dados nos repositórios
- Utilização de interfaces do ODM para operações no banco

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

## Testes Automatizados

Os testes da aplicação estão localizados em `src/__tests__` e cobrem todos os fluxos principais da API, incluindo autenticação, marcas e guitarras. Eles foram desenvolvidos para serem robustos, idempotentes (podem ser executados várias vezes sem falhar por dados já existentes) e garantem que todas as operações de CRUD estejam funcionando corretamente.

### Estrutura dos testes

- **auth.test.ts**: Testa o fluxo de registro, autenticação, validação de token e rejeição de login inválido.
- **brand.test.ts**: Testa criação, listagem e atualização de marcas, sempre autenticado.
- **guitar.test.ts**: Testa criação, listagem, busca, atualização e remoção de guitarras, incluindo dependência de marca e autenticação.

### Como rodar os testes

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o arquivo `.env` com a string de conexão do MongoDB (incluindo o nome da database).
3. Execute:
   ```sh
   npm test
   ```
   ou
   ```sh
   npx jest --runInBand --detectOpenHandles
   ```

Os testes garantem que:
- O registro de usuário lida com duplicidade.
- O login retorna JWT válido.
- O token é aceito nas rotas protegidas.
- As operações de CRUD em marcas e guitarras funcionam e validam corretamente os dados.

Se tudo estiver correto, a saída esperada será algo como:
```
PASS  src/__tests__/guitar.test.ts
PASS  src/__tests__/brand.test.ts
PASS  src/__tests__/auth.test.ts
Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
```

---

## Estrutura dos Controllers

Os controllers estão localizados em [`src/api/controllers`](src/api/controllers ):

- **UserController.ts**: Gerencia registro, login e autorização de usuários, utilizando injeção de dependência para resolver o serviço de usuário.
- **BrandController.ts**: Gerencia operações de CRUD e ativação/desativação de marcas, sempre exigindo autenticação JWT.
- **GuitarController.ts**: Gerencia operações de CRUD de guitarras, exigindo autenticação e validação de dependência com marcas.

Todos os controllers seguem o padrão de arquitetura em camadas, utilizando services e repositórios injetados via tsyringe, garantindo isolamento da lógica de apresentação, negócio e acesso a dados.

---

## Arquitetura e Organização

- **Camada de apresentação:** Controllers isolam a lógica de interação HTTP.
- **Camada de domínio:** Services encapsulam regras de negócio e validações.
- **Camada de infraestrutura:** Repositórios implementam o acesso ao MongoDB via Mongoose, isolando a lógica de persistência.
- **Inversão de controle:** Todas as dependências são resolvidas via container do tsyringe, facilitando testes e manutenção.
- **DTOs e validação:** Dados de entrada são validados por DTOs, garantindo integridade e mensagens claras de erro.
- **Documentação:** A API é documentada via Swagger, disponível em `/api-docs`.

---
## Observações

- **Importante:** Certifique-se de que sua string de conexão do MongoDB (`MONGODB_URI`) inclui o nome da database, por exemplo:
  ```
  MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/guitarapi?retryWrites=true&w=majority
  ```
- **Porta:** O app escuta na porta definida por process.env.PORT, compatível com Render e outros serviços de cloud.

