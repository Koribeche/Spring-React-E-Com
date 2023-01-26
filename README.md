# Spring-React-Ecom

This is an e-commerce web application built with ReactJS for the front-end and Spring Boot for the back-end. It uses Redux Toolkit for state management, Bootstrap for styling, and MySQL for the database. The application also integrates with AWS S3 for cloud storage, Stripe for online payments, and Spring Mail with Gmail for user email validation and order notifications.

## Features

- User registration and login
- Email validation for new users
- Password reset functionality
- Product browsing and adding to cart
- Order placement and tracking
- Admin panel for managing products and orders

## Technologies

- ReactJS
- Redux Toolkit
- Bootstrap
- Spring Boot
- Spring Security JWT
- AWS S3
- Stripe
- MySQL
- Spring Mail

## Getting started

1. Clone the repository: `git clone https://github.com/Koribeche/Spring-React-Ecom.git`
2. Frontend: Install the dependencies: `npm install` or `yarn install`
3. Start the development server: `npm start` or `yarn start`
4. Backend: Make sure to rename the application.properties.example file to application.properties
5. Make sure that you have the right credentials for the database and the S3 bucket in the application.properties file
6. Make sure you have the right credentials for stripe and gmail in the application.properties file

## Deployment

You can deploy this application on any platform that supports Spring Boot and ReactJS applications.

## Note

- The Admin panel credentials are :
  - email : admin@admin.com
  - password : admin
