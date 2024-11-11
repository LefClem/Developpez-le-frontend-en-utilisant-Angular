Olympic App

Hello and welcome on the Olympic App, an application that displays some informations about olympic games.

This project use Angular, Typescript, scss and ngx-charts.

OlympicGamesStarter

This project was generated with Angular CLI version 14.1.3.

The first thing to do is run npm install to install all the dependencies and packages.

Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Application Functional Description


Two pages are available in this application.

Dashboard Page
The first "dashboard" page displays the number of medals per country for the various Olympic Games listed. The first block below the title "Medals per country" shows the number of Olympic Games listed. The second block below the title "Medals per country" displays the number of countries participating in these Games.

There is a pie chart showing the distribution of medals by country with a medals logo, with a legend indicating the color representing each country.
You can navigate to the detail page of a specific country by clicking on the country in the pie chart or in the legend.

Detail Page
The detail page has all the informations for the chosen country. We gather the informations with the id of the selected country.
The informations displayed on the page are:
- number of entries
- total number of medals
- total number of athletes

There is a line chart on this page that displays the number of medals by year.
