# Propine-Engineering-Assignment
Fully working and structured solution of the assignment problem in Node JS

Instructions to run:
#1. Install Node JS modules and all the dependies listed below in the root folder of the main module :
    "body-parser": "^1.19.1"
    "csv-parser": "^3.0.0"
    "node-fetch": "^3.1.1"
    "nodemon": "^2.0.15"
#2. In terminal window run "node cryptoExchangeApplication.js" + additional arguments(if any)

Breakup of functional components of cryptoExchangeApp(Main Module):

#1: Importing values from CSV file and storing in linear data structure
  *Used Readstream module and CSV parser module to facilitate faster import of values from CSV files through chunks of data
  *Broke each CSV row into 4 synchronized arrays for processing data
#2: Receiving inputs from user via cmd and filtering the arguments to call suitable function
  *Input format:
  1.None (Eg: node cryptoExchangeApplication.js)
  2.Date(Eg: node cryptoExchangeApplication.js 19-01-2022)
  3.Token(Eg:node cryptoExchangeApplication.js BTN)
  4.Date and Token (Eg:node cryptoExchangeApplication.js 19-01-2022 BTN )

#3: 4-functions to perform suitable algorithm for corresponding argument-type:
  1:DateandTokenPortfolio:Given a date and a token, return the portfolio value of that token in USD on that date
  2:DatePortfolio:Given a date, return the portfolio value per token in USD on that date
  3.TokenPortfolio: Given a token, return the latest portfolio value for that token in USD
  4.FullPortfolio: Given no parameters, return the latest portfolio value per token in USD
  
  Generalized Working of each-algorithm:
  #1:Depending upon the user input extract and process data from CSV file (Timestamp,Token,Transaction,Amount)
  #2:Update the values in suitable variables within the subroutine
  #3:Make an API call dynamically based on token(s) symbol and compute portfolio in USD
  #4:Return the real-time result to the user
  

*Attached Screenshot of terminal showing results of succesful run of the application in the repository
    
    
  
