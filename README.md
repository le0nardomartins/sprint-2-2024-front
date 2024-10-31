# CareView Frontend

Este documento contém a documentação do frontend do projeto **CareView**, uma solução para monitoramento de sensores em máquinas hospitalares na área neonatal. Este projeto foi desenvolvido usando **React**, **React Navigation**, **Chart.js**, e **Socket.IO** para fornecer uma interface interativa que se conecta com a API do CareView.

## Índice

- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes Principais](#componentes-principais)
- [Configuração e Execução](#configuração-e-execução)
- [Estilos](#estilos)
- [Licença](#licença)

## Tecnologias

- React
- React Navigation
- Socket.IO para comunicação em tempo real
- Chart.js para visualização dos dados dos sensores
- CSS para estilização dos componentes

## Instalação

Clone o repositório e instale as dependências.

```bash
# Clone o repositório
git clone https://github.com/le0nardomartins/careview-frontend.git

# Navegue até a pasta do projeto
cd careview-frontend

# Instale as dependências
npm install
```

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte maneira:

```
careview-frontend/
  ├── pages/
  │   ├── Graph.js        # Tela de visualização dos gráficos
  │   ├── Login.js        # Tela de login
  │   └── Register.js     # Tela de registro
  ├── style/
  │   ├── GraphScreen.css # Estilo para a tela de gráficos
  │   ├── LoginScreen.css # Estilo para a tela de login
  │   └── RegisterScreen.css # Estilo para a tela de registro
  ├── App.js              # Arquivo principal com a configuração do navegador de páginas
  └── package.json        # Configurações e dependências do projeto
```

## Componentes Principais

### 1. **GraphScreen**

- **Descrição**: Mostra gráficos dos dados dos sensores, utilizando **Chart.js** e recebendo atualizações em tempo real via **Socket.IO**.
- **Recursos**:
  - Permite alternar entre diferentes períodos de tempo para análise dos dados.
  - Suporte a diferentes tipos de gráfico, como linha e barra.
- **Código Principal**:
  - Importa dados dos sensores via API REST e atualiza os gráficos usando **Socket.IO**.
  - Possui opções para selecionar o tipo de gráfico e intervalo de tempo.

### 2. **LoginScreen**

- **Descrição**: Tela de login que permite ao usuário acessar o sistema autenticado.
- **Recursos**:
  - Recebe `username` e `password` para autenticação.
  - Redireciona para a **GraphScreen** após um login bem-sucedido.
- **Código Principal**:
  - Utiliza **fetch** para fazer requisições à API para autenticação.
  - Armazena o token JWT em `localStorage` após o login bem-sucedido.

### 3. **RegisterScreen**

- **Descrição**: Tela de registro de novos usuários.
- **Recursos**:
  - Permite ao usuário cadastrar um novo `username` e `password`.
  - Redireciona para a **LoginScreen** após o registro bem-sucedido.
- **Código Principal**:
  - Utiliza **fetch** para enviar as informações de registro para a API.

### 4. **App.js**

- **Descrição**: Gerencia a navegação entre as telas de login, registro e gráficos.
- **Recursos**:
  - Utiliza **React Navigation** para navegar entre as páginas.
  - Define a tela inicial como **LoginScreen**.

## Configuração e Execução

Antes de iniciar o projeto, é necessário garantir que o servidor backend (API) esteja em execução.

Para iniciar o servidor frontend:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

### Dependências Principais

- **React Navigation**: Gerencia a navegação entre telas, permitindo transição entre **Login**, **Register**, e **Graph**.
- **Socket.IO**: Utilizado para comunicação em tempo real com o servidor, atualizando os dados dos sensores conforme são recebidos.
- **Chart.js**: Biblioteca para criação dos gráficos utilizados na visualização dos dados.

## Estilos

Os estilos para cada página estão localizados na pasta `/style`. Cada arquivo CSS é responsável por definir a aparência e layout dos respectivos componentes, garantindo uma interface limpa e responsiva.

- **GraphScreen.css**: Define o layout para visualização dos gráficos, incluindo containers dos gráficos e seletores de opções.
- **LoginScreen.css**: Contém o estilo da tela de login, como formulários de input e mensagens de erro.
- **RegisterScreen.css**: Define a aparência da tela de registro, garantindo consistência com a tela de login.