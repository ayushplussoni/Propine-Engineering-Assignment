# Propine-Engineering-Assignment
Fully working and structured solution of the assignment problem in Node JS

Breakup of functional components of cryptoExchangeApp(Main Module):

#1: Importing values from CSV file and storing in linear data structure
  *Used Readstream module and CSV parser module to facilitate faster import of values from CSV files through chunks of data
  *Broke each CSV row into 4 synchronized arrays for processing data
#2: Receiving inputs from user via cmd and filtering the arguments to call suitable function
  *Input format:
  1.None (Eg: "")
  2.Date(Eg: 19-01-2022)
  3.Token(Eg: BTN)
  4.Date and Token (Eg:19-01-2022 BTN )

#3: 4-functions to perform suitable algorithm for corresponding argument-type:
  1:DateandTokenPortfolio
  2:DatePortfolio
  3.TokenPortfolio
  4.FullPortfolio
  
  Generalized Working of each-algorithm:
  #1:Depending upon the user input extract and process data from CSV file (Timestamp,Token,Transaction,Amount)
  #2:Update the values in suitable variables within the subroutine
  #3:Make an API call dynamically based on token(s) symbol and compute portfolio in USD
  #4:Return the real-time result to the user
  
  Dependencies of the project:
    "body-parser": "^1.19.1",
    "csv-parser": "^3.0.0",
    "node-fetch": "^3.1.1" ,
    "nodemon": "^2.0.15"

*Attached Screenshot of terminal showing results of succesful run of the application in the repository
    
    
  
