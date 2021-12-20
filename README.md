# Capitall

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Backend API

1. go to folder capitallAPI 

2. install packages - flask and mysqldb 

3. Run `python api.py`

## DataBase setup

1. create a DB named 'switchme'

2. create table user with columns named : id(PK-int), name(text), email(text), password(text)

3. create another product with columns named : pro_id(PK-int), name(text), category(text), price(double), pic(text), seller_id(int), buyer_id(int), Status(int)(0-for sell, 1-sold)

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
