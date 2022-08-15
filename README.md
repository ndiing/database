# database

database

### Install

```
npm install @ndiinginc/database
```

### Usage

```js
const Database = require("@ndiinginc/database");

// Get data from pool
const pool = Database.get("https://google.com");

// Create on localStorage
pool.localStorage.setItem("name", "value");

// Create on cookieStore
pool.cookieStore.set({ name: "name", value: "value" });

// Create cookie, this part usage in @ndiinginc/fetch
pool.cookie = "name=value";
pool.cookie = ["name=value", "name=value"];

// ./data/https---google.com/default.json
// {"localStorage":{"name":"value"},"cookieStore":{"name":{"name":"name","value":"value"}}}
```
