# mongoDB
- mongoDB prevent duplicate entries by assign a unique __id__ to all document rows 
- provide CURD operations (Create, Update, Read, Delete)
- This is not follow schema like SQL database in which we have to put same type of data in same column and its a very great thing about it
- This is no SQL database
- Document Oriented Database
- Open-source, cross-platform and written in C++

### Document oriented database
- Stores data as a documents
- Data stored as BSON
- Tables = Collections and Rows = Documents

## Setup locally
1. download mongoDB community version ~ 216 MB and install 
2. make directory in __C:/>__ drive named data
3. inside data make another directory db
4. go to program file -> mongoDB -> server -> 4.4 -> bin
5. copy the above path and set it as environment variable
6. open a powershell admin and run command "mongod" => it will start taking query now
7. open a new powershell admin and run command "mongo" => here you can pass query

## Commands and searching/querying data
```mongoDB
>db               => (test database by dedault)
>use arpit        => (switched to database named arpit, if not present create new)
>show dbs         => (showing all database present)
>show collections => (showing all colection in database in which you currently are)
>db.text          => (make a text colection in arpit database)
```
- We have to insert minimum 1 document row to see our database in show database command.

```
>db.text.insert({})  => (insert a empty row in text collection present in arpit database)
```

## Inserting data in mongo db
```
>use arpitKart 
>db.items.insertOne({name: "Samsung 30s", price: 22000, rating: 4.5, qty: 233, sold: 98})    => (insert only one row)

>db.items.insertMany([{name: "Samsung 30s", price: 22000, rating: 4.5, qty: 233, sold: 98}, 
{name: "Moto 30s", price: 29000, rating: 3.5, qty: 133, sold: 598}, 
{name: "Realme 80s", price: 129000, rating: 2.5, qty: 633, sold: 98, isBig: true}])  => (insert many rows at a time)
```

## Searching for data in mongo db
```
>use arpitKart
>db.items.find()     => (print all data from items collection)

>db.items.find({rating: 3.5})  => (This query will return all the objects with rating equal to 3.5)
>db.items.find({rating: {$gte: 3.5}})  =>  gte -> greater than equalto
>db.items.find({rating: {$gt: 3.5}})   =>  gt  -> greater than
```

### And operator
```
>db.items.find({rating: {$gt: 3.5}, price:{$gt: 4000}})
>db.items.find({rating: {$lt: 3.5}, price:{$gt: 114000}})  => lt -> less than
```

### OR operator
```
>db.items.find({ 
    $or:[{rating: {$lt: 3.5}}, {price:{$gt: 114000}}] 
})
```

## Specific query 
```
>db.items.find({rating: {$gt: 3.5}}, {rating: 1})          => (only shows rating column)
>db.items.find({rating: {$gt: 3.5}}, {rating: 1, qty: 1})  => (shows rating and qty column)
```

## Deleting items from the Mongo Database
```
>db.items.deleteOne({price: 22000})  => (deleteOne will delete the matching document entry and will delete the first entry in case of multi document match)
>db.items.deleteMany({price: 129000})
```

## Updating data from the mongo Database
```
>db.anotherCollection.insertOne({a: 89})    => (make a new collection __anotherCollection__)
>db.items.updateOne({name: "Moto 30s"}, {$set: {price: 2}})  => (only update first one)
>db.items.updateMany({name: "Moto 30s"}, {$set: {price: 3, rating: 1}})  => (update all with name: "Moto 30s" and set price = 3 and rating = 1)
```

## Mongoose
- Mongoose is an object data modeling (ODM) library for mongoDB and Node.js
- Worked as a layer between Node.js and mongoDB 