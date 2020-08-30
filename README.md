# RenderFindReplace

## To run this project:
1. Ensure that you have a fairly recent version on NodeJS installed on your machine, if you don't install the appropriate one for your system here:
`https://nodejs.org/en/download/`
2. Have the Angular cli installed, if you don't install it globally by running:
`npm install -g @angular/cli` on your terminal
3. Navigate to a folder on your machine and clone this repo if you haven't already: `git@github.com:shaunzo/renderFindReplace.git` with your terminal
4. Using your terminal navigate to the project folder: `cd ./renderFindReplace`
5. Install all dependencies for the client application: `npm install` ( you may need to add sudo if on mac on linux if you get a user permission error `sudo npm install` )
6. from the root folder, navigate into the server folder and install its dependencies:
`cd ./server && npm install`
7. While in the /server folder, spin up our Node server which serves the JSON file `npm start`
8. Spin up the Angular app from project root folder `cd ../ng serve --o` or if you are already on teh project root directory just `ng serve --o`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0-rc.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
