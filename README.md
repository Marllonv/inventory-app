# 📦 Projeto de Inventário Inteligente

> Sistema robusto de gestão de inventário com autenticação JWT, Dashboard dinâmica e controle de estoque em tempo real.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🚀 Sobre a Stack WRP
Este projeto foi desenvolvido em ambiente **Windows**, utilizando a integração entre uma API modular em PHP e uma interface reativa em React.

**Ambiente de Desenvolvimento:**
* **Servidor Local:** Laragon / XAMPP (Apache)
* **Backend:** PHP 8.x (Arquitetura MVC simplificada)
* **Frontend:** React 18, Recharts (Gráficos), Lucide Icons (Ícones).

---

## 🔑 Funcionalidades Principais

* **Autenticação Segura:** Sistema de login com proteção via **JWT (JSON Web Token)**.
* **Gestão de Produtos:** CRUD completo (Criação, Leitura, Atualização e Exclusão) com suporte a categorias.
* **Dashboard Dinâmica:** Visualização de dados através de gráficos que reagem instantaneamente a mudanças no estoque.
* **Histórico de Atividade:** Log de movimentações para auditoria de inventário.

---

## 🛠️ Instalação e Configuração

### 1. Backend (PHP)
1. Certifique-se de que o seu servidor (Laragon/XAMPP) está ativo.
2. Clone o repositório na pasta raiz do servidor (`www` ou `htdocs`).
3. Importe o banco de dados:
   - Localize o arquivo `database.sql` e importe-o via phpMyAdmin ou terminal.
4. Configure a conexão em `api/config/database.php`:

```php
$host = 'localhost';
$db   = 'inventory_db';
$user = 'root';
$pass = ''; // Sua senha do banco
```
---

### 2. Frontend (React)

1. Acesse o diretório frontend:

```Bash
cd frontend
```

2. Instale as dependências:

```Bash
npm install
```
Configure o arquivo src/services/api.js:
```Js
baseURL: 'http://localhost/inventory-app/api/'
```
Execute o projeto:
```Bash
npm run dev
```

---

### 3. 📁 Estrutura do Projeto

```
├── api/                  # API RESTful em PHP
│   ├── controllers/      # Processamento de rotas e lógica
│   ├── models/           # Classes de entidade e banco de dados
│   ├── utils/            # JWT Handler e Helpers de segurança
│   └── index.php         # Roteador principal
├── src/                  # Interface em React.js
│   ├── components/       # Componentes reutilizáveis
│   ├── contexts/         # Gerenciamento de estado (Auth)
│   ├── services/         # Integração com a API (Axios)
│   └── pages/            # Telas: Login e Dashboard
```

---

### 🤝 Contribuição

Contribuições são o que fazem a comunidade open source um lugar incrível para aprender, inspirar e criar.

Faça um Fork do projeto

Crie uma Branch para sua Feature (git checkout -b feature/Feature)

Adicione suas mudanças (git add .)

Crie um Commit (git commit -m 'Adicionando uma Incrivel Feature')

Envie para o GitHub (git push origin feature/IncrivelFeature)

Abra um Pull Request

---

# Desenvolvido com ☕ e foco em produtividade.