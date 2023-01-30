<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest Js Leadhub project](https://github.com/vinodm1609/solulab_assignment)
is a starter pack for seamlessly kick-starting your API development with the industry's best practices and recommendations.

## Table of Content

- [Getting Started](#setting-started)
- [Useful Commands](#useful-commands)
- [Goals](#goals)
- [Features](#features)
- [Learning Materials](#learning-materials)
- [Bugs](#bugs)
- [Contributors](#contributors)
- [License](#license)
- [Links](#links)
- [Branching Strategy](#branching-strategy)
- [Project Architecture](#project-architecture)

## Getting Started

```bash
git clone --depth 1 https://github.com/vinodm1609/solulab_assignment # clone this project
cd my-project
rm -r .git
cp .env.example .env
npm run dev
```

Make sure you enter the correct values in your `.env` file:

```
MONGO_URI=<your mongodb uri>
HOST=<host> # defaults to http://localhost:3002/
PORT=<port> # defaults to 3002


```

## Start with docker

If you can use docker cli, you can build docker image.

```bash
  docker build -t leadhub
  docker images # list up docker images
```

And then you can create and run docker container using builded image.

```bash
  docker run -d -p 3002:3002 leadhub
  docker ps # list up running container
```

## Configuration

1. Create a `.env` file
   - Rename the [.env.example](.env.example) file to `.env` to fix it.
2. Edit env config

   - Edit the file in the [config](src/config) folder.
   - `default`, `development`, `production`, `test`

## Install dependencies

```bash
# Install  all dependencies
npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# watch mode
$ nest start --watch


# production mode
$ npm run start:prod
```

## Docker run

```bash
# build docker image named nest-sample
$ docker build . -t leadhub

# list up docker images
$ docker images

# run docker container using image named nest-sample (host port 3002 is mapped container port 3002 and container run background process)
$ docker run -d -p 3002:3002 leadhub
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation

Documentation about this project is made swagger.

Start this api and connect http://localhost:3002/leadhub in your browser.

## Useful Commands

- `start:dev` - start application in development mode
- `start:debug` - start application in development and debug mode
- `format` - runs prettier to format whole code base (`.ts` and `.css`)
- `lint` - lints project using eslint,
- `start` - Run Nest application
- `build` - Build application
- `start:prod` - Start application in production

## Goals

Developers often want a good starting point when implementing a new API.
Common tasks such as authentication and user management are re-implemented on a regular
or use it as a inspiration to build any powerful API server using Nest Js.
basis.
With this starter kit, the developer directly bootstrap the development of their new API,
or use it as a inspiration to build any powerful API server using Nest Js.

## Features

- Powerful Nest API out of the box
- MongoDB and Mongoose Integration
- Optimized for speed and scalability
- Security integration out of the box
- Health-check Http Api integration
- Swagger integration in project
- Health check all http routes

## Stack

Please install I recommend the URL.

- [Nest Js 8+](https://www.nestjs.com)
- Typescript
- Node JS
- MongoDB and [Mongoose](https://mongoosejs.com/)
- Install Docker Desktop for Windows: [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)
- Install Docker Desktop for MAC: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

# Security

The project implements some of nodejs [security techniques](https://docs.nestjs.com/techniques/security) :

- [Helmet](https://github.com/helmetjs/helmet) : can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
- [Throttler Rate Limit](https://github.com/nestjs/throttler): to protect your applications from brute-force attacks
  - In the main.ts you can set a limit of requests in a time window (default is 10 requests in 60 minutes for all endpoints)

## Learning Materials

## Bugs

Please make sure you fill in the appropriate fields when submitting an issue. Our team will
try to resolve it as soon as possible.
[Bug](https://github.com/vinodm1609/solulab_assignment/blob/dev/.github/ISSUE_TEMPLATE/bug.md)

## Contributors

Want to start contributing to open source with the Nest Authentication and User Management Starter ?

Leave your mark and join the growing team of contributors!

Get started by checking out list of [open issues](https://github.com/vinodm1609/solulab_assignment/issues)
and reading [Contributor Guide](https://github.com/vinodm1609/solulab_assignment/blob/dev/CONTRIBUTING.md)

## ChangeLog

[Changelog](https://github.com/vinodm1609/solulab_assignment/blob/dev/CHANGELOG.MD)

## Branching Strategy

[Branching Strategy](https://github.com/vinodm1609/solulab_assignment/blob/dev/docs/branching%20strategy.md)

## Project Architecture

1. [Architecture and Packages](https://github.com/vinodm1609/solulab_assignment/blob/dev/docs/project-architecture/architecture%20and%20packages.md)

2. [Project Folder Structure](https://github.com/vinodm1609/solulab_assignment/blob/dev/docs/project-architecture/folder%20structure.md)

## Links

Github: [https://github.com/vinodm1609/solulab_assignment](https://github.com/vinodm1609/solulab_assignment)

## Stay in touch

- Author - [Vinod Mishra](https://www.linkedin.com/in/vinod-mishra-296a67bb/)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Feature Proposal

[Feature Proposal](https://github.com/vinodm1609/solulab_assignment/blob/dev/.github/ISSUE_TEMPLATE/feature.md)

## Questions and Help

[Questions and Help](https://github.com/vinodm1609/solulab_assignment/blob/dev/.github/ISSUE_TEMPLATE/question.md)

## License

Nest is [MIT licensed](LICENSE).
