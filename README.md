# Stock Portfolio

A fullstack web-based stock portfolio app for users starting off with $5000 to buy and track their stock investments in real time.

### Backend
* PostgreSQL & Express & Sequelize
### Frontend
* React & Bootstrap
### API
* [Alpha Vantage API](https://www.alphavantage.co/)

## Getting Started
1.  Clone the git onto your machine and run ```npm install``` in your terminal
2.  Then run ```npm run start-dev```
3.  If windows run ```npm run build-client-watch``` and ```npm run start-server``` separately

## Features
### Log in
- [x] Create new account with name, email, and password
- [x] Default user cash balance is $5000.00 USD
- [x] Email can only be used once
- [x] Authenticate user with email & password
### Stock Purchasing
- [x] User can only buy whole quantities of shares
- [x] User can only buy stock shares if enough buying power
- [x] User can only buy from valid stock ticker symbols
- [ ] User can sell stock
### Portfolio
- [x] User can view current price based on value of stock price & quantities owned
- [x] Each stock only appears once
- [x] Color changes dynamically based on current price vs opening price
- [ ] Click each stock to display more information (full company name, opening price, closing price, etc..)
### Transaction History
- [x] User can view all transactions

### Log in/Sign up

![Image of login screen](https://i.imgur.com/1fCsQgP.png)
![Image of signup screen](https://i.imgur.com/Zpfpso8.png)
### Portfolio Screen

![Image of search ticker functionality](https://i.imgur.com/BYtLIRt.png)
![Image of buying stock](https://i.imgur.com/zuNIUTd.png)
![Image of dynamic color change based on price](https://i.imgur.com/eHQN2vi.png)
### List of All Transactions

![Image of transaction history](https://i.imgur.com/AY6oqOS.png)

## Acknowledgments
* TODO
