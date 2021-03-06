# Shoping Cart API
- __This is a descriptive RESTful API for E-commerce shopping application using Node, Express and MongoDB__

- __Version 1.0.0 *(major, minor, patch)*__


```npm install --save express```

- --save create a entry in package.json
- I will use express as a framwork for node.js to make building this API easier
- I will use postman for GET/POST and other type of request

- All API related stuff like the routes, models, data etc... goes in API folder

- ```npm install --save-dev nodemon``` this is developer dependencies and used only for development not for server side.

- Add ``` "script": "nodemon server.js" ``` in scripts in package.json and just use npm start to start your live server.

- Now install morgan ```npm install --save morgan```

- morgan is a login package for node.js

- Now install body-parser ```npm install --save body-parser```  use for parse the body of incoming package

- Upcoming requests are not formatted and easily readable by default in node.js so use body-parser it is not support files but does support url encoded bodies and  json data.

- Json Data has only strings 

## Handle CORS errors
- CORS : CORS stands for Cross-Origin Resource Sharing
- This look like: "No access control allow original header is present on the requested resource"
- Idea behind it : Security Concept
![alt text](https://github.com/arpitkekri/node-RESTfulAPI-shop/blob/master/mongoDB%20and%20mongoose/CORS%20errors.jpg)
- Traditional web app client and server has same url like localhost:3000
- But in RESTful API client and server typically has different urls like localhost:4000 and localhost:3000 or even the port no is different
- So request fail but we want to allow access because we serve data not application
- We can disable this mechanism by sending some headers from server to client which tell you can have access
- So ensure we send right headers back to handle CORS errors
- __IMP Point__ : This errors can avoided by testing tools like postman but not browser. 


## next

- npm install --save mongoose
- npm install --save multer
- https://github.com/expressjs/multer  bhut problem aayi fir ye pdha

- More about JWT: https://jwt.io/
- bcrypt Github Repo: https://github.com/kelektiv/node.bcrypt.js

- npm install bcrypt --save
- google email regex and go to stack overflow
- node-jsonwebtoken Github Repo: https://github.com/auth0/node-jsonwebtoken
- npm install jsonwebtoken

- https://jwt.io/



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
Licensed under the [MIT License](LICENSE).