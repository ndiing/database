const fs = require("fs");
const path = require("path");

/**
 * 
 */
class Storage {

    /**
    */
    get length() {
        return Object.getOwnPropertyNames(this).length;
    }

    /**
     * 
     * @param {*} init 
     */
    constructor(init = {}) {
        for (const name in init) {
            this.setItem(name, init[name]);
        }
    }

    /**
     * 
     */
    clear() {
        for (const name of Object.getOwnPropertyNames(this)) {
            this.removeItem(name);
        }
    }

    /**
     * 
     * @param {*} name 
     * @returns {Any} 
     */
    getItem(name) {
        return this[name];
    }
    
    /**
     * 
     * @param {*} index 
     * @returns {Any} 
     */
    key(index) {
        return Object.getOwnPropertyNames(this)[index];
    }

    /**
     * 
     * @param {*} name 
     */
    removeItem(name) {
        delete this[name];
    }

    /**
     * 
     * @param {*} name 
     * @param {*} value 
     */
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

/**
 * 
 */
class CookieStore {

    /**
     * 
    */
    get cookie() {
        let array = [];

        for (const name of Object.getOwnPropertyNames(this)) {
            array.push([name, this[name].value].join("="));
        }
        return array.join("; ");
    }

    /**
     * 
    */
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

            if (cookie.value) {
                this.set(cookie);
            } else {
                this.delete(cookie);
            }
        }
    }

    /**
     * 
     * @param {*} init 
     */
    constructor(init = {}) {
        for (const name in init) {
            // this.set(name,init[name])
            this.set(init[name]);
        }
    }

    /**
     * 
     * @param {*} name 
     */
    delete(name) {
        let object = cookie(name);
        delete this[object.name];
    }

    /**
     * 
     * @param {*} name 
     * @returns {Any}
     */
    get(name) {
        let object = cookie(name);
        return this[object.name];
    }

    /**
     * 
     * @param {*} name 
     * @returns {Any}
     */
    getAll(name) {
        let object = cookie(name);
        return this[object.name];
    }

    /**
     * 
     * @param {*} name 
     * @param {*} value 
     */
    set(name, value) {
        let object = cookie(name, value);
        this[object.name] = object;
    }
}

/**
 * 
 */
class Database {
    /**
     * 
    */
    static pools = [];

    /**
     * 
     * @param {*} origin 
     * @param {*} options 
     * @returns {Any}
     */
    static get(origin = "", options = {}) {
        const { userDataDir = "./data", profileDirectory = "default" } = options;
        origin = origin.replace(/[^\w\(\)\_\-\,\.]/g, "-");
        const file = `${userDataDir}/${origin}/${profileDirectory}.json`;
        if (!this.pools[file]) {
            const database = new Database(file);
            const sessionStorage = new Storage();
            this.pools[file] = {
                get localStorage() {
                    return database.localStorage;
                },
                get sessionStorage() {
                    return sessionStorage;
                },
                get cookieStore() {
                    return database.cookieStore;
                },
                get cookie() {
                    return database.cookieStore.cookie;
                },
                set cookie(value) {
                    database.cookieStore.cookie = value;
                },
            };
        }
        return this.pools[file];
    }

    /**
     * 
     * @param {*} file 
     * @returns {Any}
     */
    constructor(file = "") {
        this.file = file;
        this.data = this.read(this.file, {});
        this.data={
            // watch
            localStorage: new Storage(this.data?.localStorage ?? {}),
            cookieStore: new CookieStore(this.data?.cookieStore ?? {}),
        }
        return new Proxy(
            this.data,
            this
        );
    }

    /**
     * 
     * @param {*} target 
     * @param {*} name 
     * @returns {Any}
     */
    get(target, name) {
        if (typeof target[name] == "object" && target[name] !== null && !Array.isArray(target[name])) return new Proxy(target[name], this);
        return target[name];
    }

    /**
     * 
     * @param {*} target 
     * @param {*} name 
     * @param {*} value 
     * @returns {Any}
     */
    set(target, name, value) {
        const oldValue = target[name];

        if (oldValue == value) {
            return true;
        }
        Reflect.set(target, name, value);
        this.write(this.file, this.data);
        return true;
    }

    /**
     * 
     * @param {*} target 
     * @param {*} name 
     * @returns {Any}
     */
    deleteProperty(target, name) {
        const oldValue = target[name];

        if (oldValue == undefined) {
            return true;
        }
        Reflect.deleteProperty(target, name);
        this.write(this.file, this.data);
        return true;
    }

    /**
     * 
     * @param {*} file 
     * @param {*} data 
     * @returns {Any}
     */
    read(file = "", data = {}) {
        try {
            data = JSON.parse(fs.readFileSync(file));
        } catch (error) {
            this.write(file, data);
        }
        return data;
    }

    /**
     * 
     * @param {*} file 
     * @param {*} data 
     */
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
