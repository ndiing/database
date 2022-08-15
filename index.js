const fs = require("fs");
const path = require("path");

class Storage {
    get length() {
        return Object.getOwnPropertyNames(this).length;
    }

    constructor(init = {}) {
        for (const name in init) {
            this.setItem(name, init[name]);
        }
    }

    clear() {
        for (const name of Object.getOwnPropertyNames(this)) {
            this.removeItem(name);
        }
    }

    getItem(name) {
        return this[name];
    }

    key(index) {
        return Object.getOwnPropertyNames(this)[index];
    }

    removeItem(name) {
        delete this[name];
    }

    setItem(name, value) {
        this[name] = value;
    }
}

function cookie(name, value) {
    let object = name;

    if (typeof name == "string") {
        object = { name, value };
    }
    // object.name
    // object.value
    // object.expires
    // object.domain
    // object.path
    // object.sameSite
    return object;
}

class CookieStore {
    get cookie() {
        let array = [];

        for (const name of Object.getOwnPropertyNames(this)) {
            array.push([name, this[name].value].join("="));
        }
        return array.join("; ");
    }

    set cookie(value) {
        const regexp = /(Expires|Max-Age|Domain|Path|Secure|HttpOnly|SameSite)/i;

        if (typeof value == "string") {
            if (regexp.test(value)) {
                value = [value];
            } else {
                value = value.split("; ");
            }
        }
        // value=array

        for (let i = 0; i < value.length; i++) {
            let array = value[i].split("; ");
            let cookie = {};

            for (let j = 0; j < array.length; j++) {
                const [name, value] = array[j].split("=");

                if (regexp.test(name)) {
                } else {
                    cookie.name = name;
                    cookie.value = value;
                }
            }

            if (cookie.name) {
                this.set(cookie);
            } else {
                this.delete(cookie);
            }
        }
    }

    constructor(init = {}) {
        for (const name in init) {
            // this.set(name,init[name])
            this.set(init[name]);
        }
    }

    delete(name) {
        let object = cookie(name);
        delete this[object.name];
    }

    get(name) {
        let object = cookie(name);
        return this[object.name];
    }

    getAll(name) {
        let object = cookie(name);
        return this[object.name];
    }

    set(name, value) {
        let object = cookie(name, value);
        this[object.name] = object;
    }
}

class Database {
    static pools = [];

    static get(origin = "", options = {}) {
        const { userDataDir = "./data", profileDirectory = "default" } = options;
        origin = origin.replace(/[^\w\(\)\_\-\,\.]/g, "-");
        const file = `${userDataDir}/${origin}/${profileDirectory}.json`;
        if (!this.pools[file]) {
            this.pools[file] = new Database(file);
        }
        return this.pools[file];
    }

    constructor(file = "") {
        this.file = file;
        this.data = this.read(this.file, {});
        return new Proxy(this.data, this);
    }

    get(target, name) {
        if (typeof target[name] == "object" && target[name] !== null && !Array.isArray(target[name])) return new Proxy(target[name], this);
        return target[name];
    }

    set(target, name, value) {
        const oldValue = target[name];

        if (oldValue == value) {
            return true;
        }
        Reflect.set(target, name, value);
        this.write(this.file, this.data);
        return true;
    }

    deleteProperty(target, name) {
        const oldValue = target[name];

        if (oldValue == undefined) {
            return true;
        }
        Reflect.deleteProperty(target, name);
        this.write(this.file, this.data);
        return true;
    }

    read(file = "", data = {}) {
        try {
            data = JSON.parse(fs.readFileSync(file));
        } catch (error) {
            this.write(file, data);
        }
        return data;
    }

    write(file = "", data = {}) {
        const dir = path.dirname(file);
        try {
            fs.readdirSync(dir);
        } catch (error) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(file, JSON.stringify(data));
    }
}

Database.Storage = Storage;
Database.CookieStore = CookieStore;

module.exports = Database;

// @ndiinginc/database