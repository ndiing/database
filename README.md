## Classes

<dl>
<dt><a href="#Storage">Storage</a></dt>
<dd></dd>
<dt><a href="#CookieStore">CookieStore</a></dt>
<dd></dd>
<dt><a href="#Database">Database</a></dt>
<dd></dd>
</dl>

<a name="Storage"></a>

## Storage
**Kind**: global class  

* [Storage](#Storage)
    * [new Storage(init)](#new_Storage_new)
    * [.length](#Storage+length)
    * [.clear()](#Storage+clear)
    * [.getItem(name)](#Storage+getItem) ⇒ <code>Array</code>
    * [.key(index)](#Storage+key) ⇒ <code>Array</code>
    * [.removeItem(name)](#Storage+removeItem)
    * [.setItem(name, value)](#Storage+setItem)

<a name="new_Storage_new"></a>

### new Storage(init)

| Param | Type |
| --- | --- |
| init | <code>Object</code> | 

<a name="Storage+length"></a>

### storage.length
**Kind**: instance property of [<code>Storage</code>](#Storage)  
<a name="Storage+clear"></a>

### storage.clear()
Clear all data

**Kind**: instance method of [<code>Storage</code>](#Storage)  
<a name="Storage+getItem"></a>

### storage.getItem(name) ⇒ <code>Array</code>
Get item by name

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="Storage+key"></a>

### storage.key(index) ⇒ <code>Array</code>
Get name by index

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| index | <code>String</code> | 

<a name="Storage+removeItem"></a>

### storage.removeItem(name)
Remove item by name

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="Storage+setItem"></a>

### storage.setItem(name, value)
Set item

**Kind**: instance method of [<code>Storage</code>](#Storage)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> | 

<a name="CookieStore"></a>

## CookieStore
**Kind**: global class  

* [CookieStore](#CookieStore)
    * [new CookieStore(init)](#new_CookieStore_new)
    * [.cookie](#CookieStore+cookie)
    * [.cookie](#CookieStore+cookie)
    * [.delete(name)](#CookieStore+delete)
    * [.get(name)](#CookieStore+get) ⇒ <code>Array</code>
    * [.getAll(name)](#CookieStore+getAll) ⇒ <code>Array</code>
    * [.set(name, value)](#CookieStore+set)

<a name="new_CookieStore_new"></a>

### new CookieStore(init)
Initialize data


| Param | Type |
| --- | --- |
| init | <code>Object</code> | 

<a name="CookieStore+cookie"></a>

### cookieStore.cookie
Get cookie string

**Kind**: instance property of [<code>CookieStore</code>](#CookieStore)  
<a name="CookieStore+cookie"></a>

### cookieStore.cookie
Set/Parse cookie

**Kind**: instance property of [<code>CookieStore</code>](#CookieStore)  
<a name="CookieStore+delete"></a>

### cookieStore.delete(name)
Delete cookie by name

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="CookieStore+get"></a>

### cookieStore.get(name) ⇒ <code>Array</code>
Get cookie by name

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="CookieStore+getAll"></a>

### cookieStore.getAll(name) ⇒ <code>Array</code>
Get all cookie name

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="CookieStore+set"></a>

### cookieStore.set(name, value)
Set cookie

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> | 

<a name="Database"></a>

## Database
**Kind**: global class  

* [Database](#Database)
    * [new Database(file)](#new_Database_new)
    * _instance_
        * [.pools](#Database+pools)
        * [.get(target, name)](#Database+get) ⇒ <code>Array</code>
        * [.set(target, name, value)](#Database+set) ⇒ <code>Array</code>
        * [.deleteProperty(target, name)](#Database+deleteProperty) ⇒ <code>Array</code>
        * [.read(file, data)](#Database+read) ⇒ <code>Array</code>
        * [.write(file, data)](#Database+write)
    * _static_
        * [.get(origin, options)](#Database.get) ⇒ <code>Array</code>

<a name="new_Database_new"></a>

### new Database(file)

| Param | Type |
| --- | --- |
| file | <code>String</code> | 

<a name="Database+pools"></a>

### database.pools
Collection active running pool/database

**Kind**: instance property of [<code>Database</code>](#Database)  
<a name="Database+get"></a>

### database.get(target, name) ⇒ <code>Array</code>
**Kind**: instance method of [<code>Database</code>](#Database)  

| Param | Type |
| --- | --- |
| target | <code>String</code> | 
| name | <code>String</code> | 

<a name="Database+set"></a>

### database.set(target, name, value) ⇒ <code>Array</code>
**Kind**: instance method of [<code>Database</code>](#Database)  

| Param | Type |
| --- | --- |
| target | <code>String</code> | 
| name | <code>String</code> | 
| value | <code>String</code> | 

<a name="Database+deleteProperty"></a>

### database.deleteProperty(target, name) ⇒ <code>Array</code>
**Kind**: instance method of [<code>Database</code>](#Database)  

| Param | Type |
| --- | --- |
| target | <code>String</code> | 
| name | <code>String</code> | 

<a name="Database+read"></a>

### database.read(file, data) ⇒ <code>Array</code>
**Kind**: instance method of [<code>Database</code>](#Database)  

| Param | Type |
| --- | --- |
| file | <code>String</code> | 
| data | <code>String</code> | 

<a name="Database+write"></a>

### database.write(file, data)
**Kind**: instance method of [<code>Database</code>](#Database)  

| Param | Type |
| --- | --- |
| file | <code>String</code> | 
| data | <code>String</code> | 

<a name="Database.get"></a>

### Database.get(origin, options) ⇒ <code>Array</code>
**Kind**: static method of [<code>Database</code>](#Database)  

| Param | Type |
| --- | --- |
| origin | <code>String</code> | 
| options | <code>String</code> | 

