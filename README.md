📦 Projeto de Inventário Inteligente.
Sistema de gestão de inventário com autenticação JWT, Dashboard dinâmica e controle de estoque em tempo real.

🚀 Tecnologias
Este projeto utiliza a stack WRP:

Ambiente de Desenvolvimento:

SO: Windows 10

Servidor Local: Laragon / XAMPP (Apache)

Stack: PHP 8.x + React 18

Frontend: React.js, Tailwind CSS, Axios, Recharts, Lucide Icons.

Backend: PHP (Arquitetura MVC simplificada), JWT para autenticação.

Banco de Dados: MySQL/MariaDB.

🛠️ Instalação e Configuração
1. Backend (PHP)
Certifique-se de usar um servidor como Laragon, XAMPP ou Apache.

Clone o repositório dentro da pasta www ou htdocs.

Importe o arquivo database.sql (se houver) para o seu MySQL.

No arquivo api/config/database.php, ajuste as credenciais do banco:

PHP
$host = 'localhost';
$db   = 'inventory_db';
$user = 'root';
$pass = '';

2. Frontend (React)
Navegue até a pasta do frontend: cd frontend.

Instale as dependências:

Bash
npm install
Verifique o arquivo src/services/api.js e confirme se a baseURL aponta para o seu servidor local:

JavaScript
baseURL: 'http://localhost/inventory-app/api/'
Inicie a aplicação:

Bash
npm run dev
🔑 Funcionalidades Principais
Autenticação Segura: Login protegido com JWT (JSON Web Token).

CRUD de Produtos: Cadastro, edição e exclusão de itens com categorias.

Dashboard Inteligente: Gráficos dinâmicos que se atualizam automaticamente em cada operação.

Histórico: Registro de movimentações do inventário.

📁 Estrutura de Pastas
Plaintext
├── api/                  # Backend PHP
│   ├── controllers/      # Lógica de negócio
│   ├── models/           # Interação com Banco de Dados
│   ├── utils/            # JWT Handler e Helpers
│   └── index.php         # Roteamento principal
├── src/                  # Frontend React
│   ├── components/       # Componentes visuais
│   ├── contexts/         # AuthContext e estados globais
│   ├── services/         # Configuração do Axios (api.js)
│   └── pages/            # Login e Dashboard
📝 Notas de Versão
V1.0: Lançamento inicial com CRUD e Auth.

V1.1: Implementação de gráficos com Recharts e correção de CORS.

🤝 Contribuição
Faça um Fork do projeto.

Crie uma Branch (git checkout -b feature/nova-feature).

Dê um Commit (git commit -m 'Add nova-feature').

Dê um Push (git push origin feature/nova-feature).

Abra um Pull Request.
