[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
![size-shield]
![commit-shield]

<br />
<p align="center">
  <h3 align="center">ReservaLab Project</h3>

  <p align="center">
    Web system to facilitate the teachers' work!
    <br />
    <a href="https://app.swaggerhub.com/apis/lorenzomart/ReservaLab/1.0.0"><strong>Explore the API Spec »</strong></a>
    <br />
    <br />
    <a href="https://github.com/lorenzowind/ReservaLab/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/lorenzowind/ReservaLab/issues/new">Request Feature</a>
  </p>
</p>

## Table of Contents
* [About the Project](#about-the-project)
* [How to install?](#how-to-install)
* [Built With](#built-with)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project
The ReservaLab project deals with an internal software solution from the [Fundação Matias Machline](https://www.fundacaomatiasmachline.org.br/), which aims to automate the process of allocating laboratories, in addition to allowing teachers, monitors and advisors to efficiently control the frequency management and programs installed on computers.

## How to install?
1. To run the backend, follow these steps:
- Navigate to the backend folder and install the dependencies:
```bash
// Navigate to the backend folder
$ cd backend

// Install application dependencies
$ yarn
```
- Install MySQL, MongoDB, and Adminer Docker images using docker-compose:
```bash
// Run the Docker images
$ docker-compose up -d
```
- Create a file called .env based on .env.example and enter your AWS credentials;
- Create a file called .ormconfig.json based on .ormconfig.example.json and insert the MySQL and MongoDB host and port according to the previously installed Docker images, in addition to exchanging the src recipient for dist and .ts for .js;
- Configure the credentials of the MySQL Docker image using the following commands:
```bash
// Enter the MySQL image bash
$ docker exec -it IMAGE_NAME bash
// Enter the MySQL image root
$ mysql -u root -p
// Change the password
$ ALTER USER root IDENTIFIED WITH mysql_native_password BY ‘ROOT_USER_PASSWORD’;
```
- Run the database migrations using the command:
```bash
// Run the migrations
$ node_modules/.bin/typeorm migration:run
```
- Add a no-restart configuration for each Docker image using the command:
```bash
// Change the configuration of the Docker images
$ docker update --restart=unless-stopped ID_DA_IMAGEM
```
- Start the server using the command:
```bash
// Start the server
$ yarn dev:server
```
2. To run the frontend, follow these steps:
- Navigate to the frontend folder and install the dependencies:
```bash
// Navigate to the frontend folder
$ cd frontend

// Install application dependencies
$ yarn
```
- Start the application using the command:
```bash
// Start the application
$ yarn start
```

## Built With
* Framework for platform frontend: [React.js](https://reactjs.org/)
* Backend Framework: [Node.js](https://nodejs.org)
* Database technology: [MySQL](https://www.mysql.com/) and [MongoDB](https://www.mongodb.com/)
* Backend data processing technology: [TypeORM](https://typeorm.io)
* Technology for testing implementation: [Jest](https://jestjs.io/)
* API documentation tool: [SwaggerHUB](https://swagger.io/tools/swaggerhub/)
* Prototyping tool: [Adobe XD](https://www.adobe.com/br/products/xd/features.html)

## Contact
Lorenzo Windmoller Martins - [LinkedIn](https://www.linkedin.com/in/lorenzo-windmoller-martins/) - lorenzomart01@gmail.com

## Acknowledgements
* [README Template by othneildrew](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

[contributors-shield]: https://img.shields.io/github/contributors/lorenzowind/ReservaLab?style=flat-square
[contributors-url]: https://github.com/lorenzowind/ReservaLab/graphs/contributors

[issues-shield]: https://img.shields.io/github/issues/lorenzowind/ReservaLab?style=flat-square
[issues-url]: https://github.com/lorenzowind/ReservaLab/issues

[size-shield]: https://img.shields.io/github/repo-size/lorenzowind/ReservaLab?style=flat-square

[commit-shield]: https://img.shields.io/github/last-commit/lorenzowind/ReservaLab?style=flat-square