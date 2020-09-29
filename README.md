## 🌐 Sobre

O projeto **ReservaLab** trata de uma solução de software interno da **Fundação Matias Machline**, que pretende automatizar o processo de alocação de laboratórios, além de permitir professores, monitores e orientadores a controlarem de forma eficiente a gestão de frequência e programas instalados nos computadores.

---

## 💻 Tecnologia utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

---

## 📁 Como baixar o projeto

Caso seja utilizado o MySQL local para substituir o docker, é necessário a criação de um banco de dados chamado **ReservaLab**.

```bash

    # Clonar o repositório
    $ git clone https://github.com/lorenzowind/ReservaLab

    # Entrar no diretório do backend
    $ cd backend

    # Instalar as dependências
    $ yarn

    # Iniciar as imagens do docker caso não opte por utilizar o MySQL local
    $ docker-compose up -d

    # Rodar as migrations
    $ yarn typeorm migration:run

    # Iniciar o backend
    $ yarn dev:server
    
    # Entrar no diretório do frontend
    $ cd frontend

    # Instalar as dependências
    $ yarn

    # Iniciar o frontend
    $ yarn start

```

---