[![CircleCI](https://circleci.com/gh/ATLauncher/ATLauncher-NEXT/tree/initial-code.svg?style=svg)](https://circleci.com/gh/ATLauncher/ATLauncher-NEXT/tree/initial-code)

# ATLauncher NEXT
ATLauncher NEXT is the next iteration of ATLauncher.

## Brief overview
ATLauncher NEXT is a rewrite of ATLauncher. It's written in Javascript and uses Electron with ReactJS, Redux, Redux Sagas and Webpack.

## Based on
This is based on https://github.com/chentsulin/electron-react-boilerplate and used as a base to get up and running.

## Links
- [ATLauncher Website](https://www.atlauncher.com)
- [ATLauncher Discord](https://discordapp.com/invite/0eXDtXikrVAJffxY)
- [ATLauncher Forums](https://forums.atlauncher.com)
- [ATLauncher Facebook](http://www.facebook.com/ATLauncher)
- [ATLauncher Reddit](http://www.reddit.com/r/ATLauncher)
- [ATLauncher Twitter](http://twitter.com/ATLauncher)

## Development
To get started you must have [NodeJS](https://nodejs.org) installed (latest LTS version is recommended) and then simply clone this repository and run `npm install` to install all the dependencies.

### Structure
ATLauncher NEXT uses webpack to compile ES2015 syntax to something that can be read and used by Electron. There are a total of 5 webpack configuration files:

 - webpack.config.base.js - this is the base webpack config of which all others will use. All the configs in this file will act as defaults and used in all other configs
 - webpack.config.development.js - this is the development config used when developing ATLauncher NEXT
 - webpack.config.electron.js - this is the Electron config which is used to compile the **main.js** file which is used by Electron as the main file it runs on start
 - webpack.config.node.js - this is the NodeJS config for running the hot reloading server for when you're developing
 - webpack.config.production.js - this is the production config which is used to compile the main application in the **app/** directory into a bundle for use within the Electron app
 
In order to run the Electron application 2 things need to be compiled by webpack into bundles which are stored (and gitignored) in the **app/** directory:

 - app/main.js - this is the main javascript file which Electron runs. It's build with `npm run build-main` and is built from the **main.js** file
 - app/bundle.js - this is the main applications javascript file which is included with script tags in the **app/app.html** file which Electron main.js file will load in the window. It's built with
                   `npm run build-app` and is built using the **app/index.js** entrypoint

### Running development version
When you want to start development of ATLauncher-NEXT then you simply need to run `npm run dev` which will start the servers needed to get hot reloading working and then start up Electron.

As you edit the application files, the Electron window will hot reload with the changes you made.

### Testing
There are two types of tests that can be run:

 - Unit Tests are run using `npm run test` and will test all files in the app directory that end with `.spec.js` and are intended to test individual units of code such as components
 - End to End tests are run using `npm run test-e2e` and will spin up the application using ChromeDriver and Spectron which will run the application as if it was run by an actual end user and spawn
   windows and test that the application as a whole works as expected. These tests are defined in the `test/e2e.js` file.
   
All end to end tests should be written out in the test directory while all unit tests should be written next to each piece of code they're testing.

Please note that in order to run end to end tests, the application must be built using `npm run build` and do require access to a display server. For running end to end tests on server environments.

### Building
To build this project for distribution simply run `npm run dist` which will create the packages for all the different systems in the **dist/** directory.

## Contributing
If you wish to contribute to this repository in any way, take a look at [CONTRIBUTING.md](CONTRIBUTING.md).