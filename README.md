# [database](https://ndiing.github.io/database/)

database

### Install

```
npm install @ndiinginc/database
```

### Usage

```js

// Create database pool
const pool = Database.get("https://google.com");

// Using localStorage
pool.localStorage.setItem("name", "value");
console.log(pool.localStorage.getItem("name")); // value

// Using cookieStore
pool.cookieStore.set("name", "value");
console.log(pool.cookieStore.set("name")); // value

// or
pool.cookie = 'name=value'
console.log(pool.cookie)

// Session storage never saved into file

// Using sessionStorage
pool.sessionStorage.setItem("name", "value");
console.log(pool.sessionStorage.getItem("name")); // value

// ...Restart

console.log(pool.localStorage.getItem("name")); // value
console.log(pool.sessionStorage.getItem("name")); // undefined

```
