
# AlphaTribe Stock Discussion Platform

Welcome to AlphaTribe, a stock discussion platform where users can share and discuss stock market insights, trends, and analysis

## Features
This project is built using the MERN stack (MongoDB, Express, Node.js) and provides a feature-rich environment for users to create posts, comment, and like discussions related to stock markets.

Following features are incorporated:

*User Authentication: Users can register and log in using JWT-based authentication.

*Posts and Discussions: Users can create posts related to stock discussions, comment on posts, and like or unlike posts.

*Search and Filter: Users can search for specific stock-related posts or filter by tags.

*Pagination: Paginates as per queries i.e page no. and limit

## Installation
Download the code from the repository, unzip it and open the project in VSCode.
To run this project, you will need to add the following environment variables to your .env file(make .env file in your main folder)

`MONGO_URI=mongodb+srv://username:password@cluster0.ikrvq.mongodb.net/AlphaTribe `

`JWT_SECRET=yoursecretkey`

`PORT=5000`

Note: You need to add your own mongodb URl in .env

You can keep JWT_SECRET as any key of your choice

Now navigate to main directory and run following command to install dependencies
```bash
  npm install 
```
Start the back-end by hitting
```bash
  npm start
```  
## Documentation
Postman documentation is attached here with all the endpoints that were supposed to run

[Documentation](https://documenter.getpostman.com/view/37292852/2sAXjSzogn)

