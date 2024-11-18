# Installation
## 1. Clone this repository

Clone this repository by run the following code:

```
$ git clone https://github.com/okidwijaya/rental-vehicle
```
## 2. Go to directory

```
$ cd <your directory>
```

## 3. Install dependency packages

Install dependency packages by run the following code inside project folder:

```
$ npm install
```

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MySql. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our sql models.
- `controller/` - This folder contains the schema definitions for unctions that separate out the code to route requests from the code that actually processes requests.
- `middleware/` - This folder contains the schema definitions for middleware .

## Documentation

[Documentation]()


## Features

- Auth
    - Sign in
    - Sign up
    - Forgot password (ON PROGRESS)
- Product
    - Add
    - Edit
    - Delete
    - Update
    - Search
    - pagination
 - Profile
    - Edit password  (ON PROGRESS)
    - Update profile  (ON PROGRESS)
 - Order
    - Create transaction
    - View transaction
    - Edit transaction (ON PROGRESS)
    -Delete history
  - Cart
    - Add Item
    - Update Quantity
    - Delete Item
    - Delete Items
  - Collection Items
    - View Collection

## API Reference Example

```http
  GET, POST /products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | :------------------------- |


```http
  GET, POST, PATCH, DELETE /products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | :-------------------------------- |

```http
  GET, POST, /Transactions/
```

| Parameter | value    | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | :------------------------- |

```http
  DELETE /cart/${id}
```

| Parameter | value    | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `number` | :------------------------- |


## ENVIRONMENT VARIABLE

# App name
APP_NAME = # default App Name


# Configuration DB

## Deploy

[Cpanel](https://cloudsand.my.id/)
