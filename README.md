## Date Submission
October 17th, 2023

## Installation Instructor

### Manual Installation

1. Install MongoDB locally
  - Go to [MongoDB Download Center](https://www.mongodb.com/download-center/community)
  - You can follow complete step documentation here [mongodb installation step](https://www.geeksforgeeks.org/how-to-install-mongodb-on-windows/)
  - create database mongoapp in your connection DB

2.  Clone this repository

```bash
# clone repository
$ git clone https://github.com/luthfi-satria/simplechat-be.git

# Go to directory
$ cd simplechat-be

# run npm install for download dependencies
$ npm install
  ```
3. Setup .env file  
  - edit mongoDB connection host then save

4. Run server locally

```bash
# start application in development mode
$ npm run start:dev
```


### Docker Installation
```bash
# clone repository
$ git clone https://github.com/luthfi-satria/simplechat-be.git

# Go to directory
$ cd simplechat-be

# run docker compose
$ docker-compose up --build
```

## Time Spent
Actually, i spent build this backend service and front end application for 14 hours because i don't have knowledge to build chat application, and in 14 hours i used for learning and coding

## Assumptions Made

On this service, there are several assumption i have been made

1. Only simple validation inside
2. No performance test or stressed test
3. room name and username are case sensitive
4. No deletion on chat documents after exiting chat room

## Compromises Made
1. Change localstorage usage with firebase for storing local data
2. better improve error handler from server
3. better add authorization header in every subscription calls
3. better add more validation input, such as whitespace

## If going to production
1. Make sure this apps was successfully tested on development, minimum test method:
  - Stressed test
  - Integration test
  - Unit Test

2. Make sure scalability are fulfilled
3. Adjust security in the cloud service


## Feedback on this technical meeting
1. If candidate not have experience build chat application, 
  is it fair to be compare with your experience build chat application speed?

2. Better give candidate generic test, which not take more time in technical meeting
