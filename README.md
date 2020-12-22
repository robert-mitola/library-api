# library-api
nodeJs library API

## Installation
* If not already, install NPM and NodeJS.
* Download this repo.
* From the project root, run `npm install`;
* From the project root, run `node app.js` to start the server;

## Testing Examples
*See the library.json files for the full catalog of books.*

### GET requests
* To get all requests, navigate to `http://localhost:3000/request` in a browser;
* To get a single request, navigate to `http://localhost:3000/request/101` in a browser;

### POST request
From a Unix based terminal, run:
`curl --header "Content-Type: application/json" --request POST --data '{"email":"test@gmail.com","title":"Harry Potter"}' http://localhost:3000/request`

### DELETE request
From a Unix based terminal, run:
`curl --header "Content-Type: application/json" --request DELETE --data '{"email":"test@gmail.com","title":"Harry Potter"}' http://localhost:3000/request/101`
