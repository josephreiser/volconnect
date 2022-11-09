# Preliminary Github Steps (if you don't have a personal access token set up)

1. In the top right dropdown of Github, click Settings

2. Click Developer Settings (at the bottom)

3. Click Personal access tokens

4. Choose classic 

5. Click Generate new token

6. Change expiration date to 90 days

7. Check off all the scopes

8. Click Generate Token

9. Save the token string it gives you somewhere good because you only see it once. Whenever you push to the github repo, you'll use it for authentication

10. Create a directory where you want to store this project with: mkdir nameofdirectoryyouremaking

11. cd into the directory you just made

12. git clone git@github.com:josephreiser/volconnect.git


# Preliminary Installation Steps

Installing Homebrew

1. Run the following in terminal: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

2. Run the three echo commands that the terminal outputs after running the command in step 1

    They should look similar to this:
    
        echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/josephreiser/.zprofile
        
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/josephreiser/.zprofile
        
        eval "$(/opt/homebrew/bin/brew shellenv)
        
Installing Node & npm

3. Run the following in terminal: brew install node

4. Run the following in terminal: npm install -g npm

Installing Mongodb

5. brew tap mongodb/brew


6. brew install mongodb-community


7. brew services start mongodb-community


8. cd into the client directory inside the mern directory inside the directory where you cloned the repo

9. rm package-lock.json

10. npm install

11. npm start

12. allow it to open your browser, and you should see the app


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
