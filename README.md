# PedidosYa assessment

## Requirements

### For production

As this app runs into a **Docker** container (tested with Docker v19.03.5, so this version is recommended), you'll need to install Docker first:

- Docker v19.03: https://docs.docker.com/install/

Also, as you'll need **docker-compose** to run it with the Redis container:

- Docker Compose v1.24.1: https://docs.docker.com/compose/install/

#### Run

**The following environvent variables are necessary:**

- CLIENT_BASE_URL: The external url of PedidosYa API.
- CLIENT_ID: Provided by PedidosYa in order to get an app token.
- CLIENT_SECRET: Provided by PedidosYa in order to get an app token.
- REDIS_BASE_URL: The base url for the redis connection
- REDIS_PORT: The port for the redis connection
- REACT_APP_MAPS_API_KEY: Google API key with permissions to be used by Google Maps.
- REACT_APP_CLIENT_BASE_URL: The url of the node server provided to react http client
- PORT: The expose port for the Node server
- DOCKER_COMPOSE_SERVER_PORTS: The ports of the node server which are binded in the docker-compose

You may use a `.env` named file like the following, at the root of your working tree, to provide the variables to the app:

**The following values will NOT work in a real environment*
```dotenv

CLIENT_BASE_URL=http://anURL/
CLIENT_ID=test
CLIENT_SECRET=test
REDIS_BASE_URL=redis
REACT_APP_MAPS_API_KEY=a_google_maps_API_key
REACT_APP_CLIENT_BASE_URL=http://localhost:3003/api
PORT=3003
DOCKER_COMPOSE_SERVER_PORTS=3003:3003
```

**The above configuration exposes the API to `http://localhost:3001/` and the frontend to `http://localhost:80/`*

Then, you only have to run the following command to build and run both Nginx (for React), Node.js and Redis containers:
```
$ docker-compose up --build
```

### For development

**Node.js**: The project runs with the Node.js v10.15.3, so the use of previous versions is not recommended.
This version is also present within the `.nvmrc` file in case you have **nvm** installed.

You need also a **Redis** server running on your machine. This project was tested with Redis v5.0.7:

- For download and install: https://redis.io/download
- To run it on your machine `$ redis-server`

Once you have Node and Redis installed, execute:

```
$ npm i
```


To run server tests:

```
$ npm run test:server
```

To run client tests:

```
$ npm test
```

To run the server locally in develoment mode:

```
$ npm run dev
```
**It runs by default at http://localhost:3001*

To run the frontend locally in develoment mode:

```
$ npm start
```

**It runs by default at http://localhost:3000*


## Using the api

#### Authentication

It's necessary to set to every request (except for login) an `Authorization` header, which will be provided by the login endpoint.

#### Endpoints and methods

The followings are the HTTP methods and endpoints of the API:

- `POST /api/login`

  Creates a session

  - body:
  ```typescript
    {
        "userName": string,
        "password": string
    }
  ```
  *all fields mandatory
  
  **Returns** a key which must be used as a value for the Authorization header for all the next requests.

- `GET /api/myAccount`

  Mandatory header: Authorization

  Response example: 
  
  ```typescript
  {
      "id": 3797223,
      "lastName": "Automation",
      "name": "Test",
      "country": {
          "id": 1
      }
  }
  ```

- `GET /api/restaurants`

  Mandatory header: Authorization
  
    - Request query params:
        - **point (mandatory)**: The coordinates of the search
        - offset: The offset of the search (=0 by default)
        - max: the maximum quantity of results (=20 by default)
        - country: the country number (Uruguay=1 by default)
        - onlyOpen: if =true, fetches only the open restaurants (=false by default)
        - sortBy: Admits BEST_RANKING (descendant order)
            
    - Example request: `GET /api/restaurants?point=-34.902224168739686,-56.16103165226303&offset=0&max=20&country=1&sortBy=BEST_RANKING&onlyOpen=true`
    
    - Example response:
    

  ```typescript
    [
        {
            "id":65456,
            "logo":"el-arabito-de-montevideo.jpg",
            "deliveryTimeMaxMinutes":"45",
            "link":"el-arabito-de-montevideo",
            "name":"El Arabito De Montevideo",
            "rating":"50",
            "coordinates":"-34.886,-56.1659",
            "opened":1,
            "topCategories":""
        },
            ...
    ]
  ```
  
- `GET /api/statistics`

  Mandatory header: Authorization    

    It returns the logged in accounts and the coordinates for the last restaurants searches which live in the cache:

```typescript
{
    "loggedInAccounts": [
        {
            "id": 3797223,
            "lastName": "Automation",
            "name": "Test",
            "country": {
                "id": 1
            }
        }
    ],
    "lastRestaurantSearches": [
        "-34.572922204670526,-58.41330174093933",
        "0,0",
        "-34.5889425384323,-58.411735330874635",
        "-34.58864941029268,-58.42949155455322",
        "-34.5800704,-58.42206720000001",
        "-34.5791699390085,-58.43523148184509",
        "-34.579342744357405,-58.40565208082886"
    ]
}
```

- `PUT /api/config/ttl/restaurants`

Mandatory header: Authorization

Modifies the time that a restaurant search result is living in the cache.

Request body example:

```typescript
{
    "ttl": 15 // in seconds
}
```

Return body example:

```typescript
{
    "ttl": 15 // in seconds
}
```
