# TaskManagement - README

Esta aplicação web está usando como tecnologia:
no frontend React, e no backend Laravel usando Swagger e OpenAPI.


## Instruções para o Backend

### 1. Navegue até a pasta do backend:

cd backend

### 2. Atualize as dependências do Composer:
composer update


### 3. Execute as migrações do banco de dados para criar as tabelas necessárias (com as seeders):
php artisan migrate --seed (caso já tenha subido alguma migração, pra não gerar conflito utlize php artisan migrate:fresh --seed)

### 4. Crie as keys (key principal e secret key do JWT)
php artisan key:generate && php artisan jwt:secret


## Testes no Laravel

### Para executar os testes, seguinte comando na pasta do backend:
php artisan test

## Instruções para o Frontend

### 1. Abra o terminal e navegue até a pasta do frontend:

cd frontend


### 2. Instale as dependências usando o npm:
npm install


### 3. Inicie o servidor de desenvolvimento:
npm start

### 4. Abra o navegador e acesse: http://localhost:3000



### OBSERVAÇÕES IMPORTANTES:
## Login para Testes

Utilize as seguintes credenciais para realizar testes de login:

| Email            | Senha       |
|------------------|-------------|
| admin@admin.com  | password    |

---
