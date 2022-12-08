# TO RUN THIS PROJECT LOCALLY

1. Install the required packages
    a. brew install node
    b. npm install -g npm
    c. brew tap mongodb/brew
    d. brew install mongodb-community
    e. brew services start mongodb-community
2. Inside both the client and server directories, run the following:
    a. rm package-lock.json
    b. npm install
3. Inside the client directory, run the following
    a. npm start
4. Inside the server directory, run the following
    b. node server.js
5. Now a browser should pop up, allowing you to run the app locally