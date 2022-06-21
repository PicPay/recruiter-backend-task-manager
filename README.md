# nestjs-api-mongoose

Simple example Api Rest with Nestjs 8.x and Mongoose for the NestJS community 😻.

## Installation

```bash
$ npm install
```

## Set environment

```
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

There is a `docker-compose.yml` file for starting MongoDB with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`

## Url Swagger for Api Documentation
```
http://127.0.0.1:3000/api/doc
```

## Getting with Curl Payments

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/Payments  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/Payments/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"firstName": "firstName #1", "lastName": "lastName #1", "email": "example@nest.it", "phone": "1234567890", "address": "street 1","description": "Lorem ipsum", "users": ":UserId"}' http://127.0.0.1:3000/api/Payments 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"firstName": "firstName #1", "lastName": "lastName #1", "email": "example@nest.it", "phone": "1234567890", "address": "street 1","description": "Lorem ipsum", "users": ":UserId"}' http://127.0.0.1:3000/api/Payments/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/Payments/:id 
```

## Getting with Curl Users

```bash
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users  
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/users/:id 
    $ curl -H 'content-type: application/json' -v -X POST -d '{"name":"Foo bar", "address": "street 1", "description": "lorem ipsum"}' http://127.0.0.1:3000/api/users 
    $ curl -H 'content-type: application/json' -v -X PUT -d '{"name":"Foo bar", "address": "street 1", "description": "lorem ipsum"}' http://127.0.0.1:3000/api/users/:id 
    $ curl -H 'content-type: application/json' -v -X DELETE http://127.0.0.1:3000/api/users/:id
```

## Getting Pagination using limit and offset

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/Payments?limit=10
```

```bash 
    $ curl -H 'content-type: application/json' -v -X GET http://127.0.0.1:3000/api/Payments?offset=10
```
