# WayFarer

[![Build Status](https://travis-ci.org/kola-1/WayFarer.svg?branch=develop)](https://travis-ci.org/kola-1/WayFarer)
[![Coverage Status](https://coveralls.io/repos/github/kola-1/WayFarer/badge.svg?branch=ch-improve-test-coverage-167335063)](https://coveralls.io/github/kola-1/WayFarer?branch=ch-improve-test-coverage-167335063)
[![Maintainability](https://api.codeclimate.com/v1/badges/42dcf35605b809b68a6f/maintainability)](https://codeclimate.com/github/kola-1/WayFarer/maintainability)

## Overview
WayFarer is a public bus transportation booking server.

## Table Of Contents
- [Getting Started](#Getting-Started)
- [Features](#Features)
- [Technologies](#Technologies)
- [Setup](#Setup)
- [Testing And Coverage](#Testing-And-Coverage)
- [Links](#Links)
- [Author](#Author)
- [License](#License)
- [Acknowledegments](#Acknowledegments)

### Getting Started
The following instruction will get you a copy of this project for development and testing purposes.

**...download repository from command line**
```
git clone https://github.com/kola-1/WayFarer.git
```
### Features
- User can sign up
- User/Admin can sign in
- Admin can create trips
- User/Admin can view all trips
- User/Admin can view trips by filtering
- User can book a trip
- User can view all his or her bookings
- Admin can view all bookings
- User can delete his or her booking
- Admin can cancel a trip
- Admin can add a bus

### Technologies
These are some of the softwares this project is created with:

- [Node.js](https://www.nodejs.org) - A JavaScript runtime for building back-end applications
- [Express](https://www.expressjs.com) - A minimalist web framework for Node.js
- [Mocha](https://www.mochajs.org/) - A JavaScript testing framework which runs on NodeJS
- [Chai](https://www.chaijs.com/) - A BDD / TDD assertion library for NodeJS that can be paired with javascript testing frameworks
- [Babel](https://www.babeljs.io/) -  A tool that is used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript
- [Nodemon](https://www.npmjs.com/package/nodemon) -  A utility that monitors changes in the source code and automatically restarts the server
- [Eslint](https://www.eslint.org/) - A linting utility for JavaScript

### Setup
To run this project on your development environment, install it locally from your command line using npm.



**...run the following command to install all dependencies**
```
npm install
```

- *remember to add the **environment variables** as required in the **.env.config file***

- *before running the server in development mode first set **NODE_ENV** to **development***

**...run the following command to start the application with nodemon**
```
npm run start-dev
```

- *you can access the server locally on **port 7000** i.e `localhost:7000`*

### Testing And Coverage
To run test and to get test coverage use the following command:

- *before running the test or test coverage first set **NODE_ENV** to **test***

**...run the following command for testing**
```
npm test
```

**...run the following command for test coverage**
```
npm run test-coverage
```

### Links
- [Documentation](https://wayfarer-1.herokuapp.com/api/v1/docs)
- [API URL](https://wayfarer-1.herokuapp.com/)

### Author
- Kola Akindoju
  
### License
- This project is licensed under the [MIT License](LICENSE)
  
### Acknowledegments
- Andela developer Fajodutimi - [API versioning](https://www.youtube.com/watch?v=QOe6VSe3U3w) 