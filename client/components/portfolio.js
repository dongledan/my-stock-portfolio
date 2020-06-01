import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Card} from 'react-bootstrap'
import {purchaseStockThunk, getPortThunk, me} from '../store'

import {keys, formatDate} from '../../public/constants'

const rdmIdx = Math.floor(Math.random() * keys.length)

class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      stocks: [],
      ticker: '',
      shares: 0,
      update: false,
      portfolioStocks: {},
      portfolioVal: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getPortfolio()
    this.props.getUser()
    let prev = {}
    let portfolioVal = 0
    this.props.portfolio.map(async (stock, i) => {
      const ticker = stock.ticker
      let url = ''
      const urlRdmIdx = Math.floor(Math.random() * url.length)
      if (urlRdmIdx === 0)
        url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${
          keys[rdmIdx]
        }`
      else if (urlRdmIdx === 1)
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${
          keys[rdmIdx]
        }`
      else
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${
          keys[rdmIdx]
        }`
      const date = formatDate()
      const {data} = await axios.get(url)
      const price =
        urlRdmIdx === 0
          ? parseFloat(data['Global Quote']['05. price']).toFixed(2) * 100
          : parseFloat(data['Time Series (Daily)'][date]['4. close']).toFixed(
              2
            ) * 100
      let dailyChange = 0
      if (urlRdmIdx !== 0)
        dailyChange =
          parseFloat(data['Time Series (Daily)'][date]['4. close']).toFixed(2) *
            100 -
          parseFloat(data['Time Series (Daily)'][date]['1. open']).toFixed(2) *
            100
      const change =
        urlRdmIdx === 0
          ? parseFloat(data['Global Quote']['09. change'])
          : dailyChange
      if (!price || !change) return
      // object of stock - price & percentChange (to determine if current price is higher/lower than opening)
      const stockInfo = {
        price,
        change
      }
      // adding value of stock to portfolio value
      portfolioVal += price * stock.shares
      if (!prev[ticker]) prev[ticker] = stockInfo
      this.setState({portfolioVal})
    })
    this.setState({portfolioStocks: prev})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.update) {
      this.props.getPortfolio()
      this.props.getUser()
      this.setState({update: false})
    }
  }

  handleInput(e) {
    let {value, name} = e.target
    if (name === 'ticker') value = value.toUpperCase()
    this.setState({[name]: value})
  }

  async handleChange(e) {
    const {value} = e.target
    this.setState({
      value: value.toUpperCase()
    })
    // multiple api keys to avoid hitting API call limit (5 per minute)
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${
      keys[rdmIdx]
    }`
    try {
      const {data} = await axios.get(url)
      this.setState({stocks: data.bestMatches})
    } catch (error) {
      console.log(error)
    }
  }

  async handleClick() {
    const {shares, ticker} = this.state
    if (ticker.length < 1 || shares <= 0) {
      alert('Please enter valid ticker and/or purchase 1 or more shares.')
      return
    } else {
      // multiple api keys to avoid hitting API call limit (5 per minute)
      const rdmIdx = Math.floor(Math.random() * 10)
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${
        keys[rdmIdx]
      }`
      const {data} = await axios.get(url)

      // data structure data {Global Quote {01. symbol, 02. open, 03. high, 04. low, 05. price, 06. volume, 07. latest trading day, 08. previous close, 09. change, 10. change percent}}
      const price = data['Global Quote']
        ? // ex. 100.00 vs 100.00175
          parseFloat(data['Global Quote']['05. price']).toFixed(2) * 100
        : false
      if (price) {
        this.props.purchaseStock(this.props.user.id, price, ticker, shares)
        alert('Bought!')
      } else
        alert('Please enter valid ticker or wait a minute (API calls reached).')
    }
    this.props.getUser()
    this.props.getPortfolio()
    this.setState({update: true})
  }

  async handlePrice(ticker) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${
      keys[rdmIdx]
    }`
    const {data} = await axios.get(url)

    const daily = data['Time Series (Daily)']['2020-05-29']
    const obj = {ticker: {open: daily['1. open'], close: daily['4. close']}}
    this.setState({stockInfo: obj})
  }

  handleValue(sym) {
    this.setState({ticker: sym})
  }

  handleColor(change) {
    if (change > 0) return '#1ac567'
    else if (change < 0) return '#ff333a'
    else return '#888'
  }

  handleSym(change) {
    if (change > 0) return '▴'
    else if (change < 0) return '▾'
    else return ''
  }

  render() {
    const {
      stocks,
      value,
      shares,
      ticker,
      portfolioStocks,
      portfolioVal
    } = this.state
    const {user, portfolio} = this.props
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>
          Total Value: ${(portfolioVal + user.balance) / 100}
        </h1>
        <div className="content-container">
          <div className="left">
            <h5>
              {user.name}'s Portfolio: ${portfolioVal
                ? portfolioVal / 100
                : '( - )'}
            </h5>
            {portfolio && portfolio.length > 0 ? (
              portfolio.map((stock, i) => (
                <Card className="stock" key={i}>
                  <Card.Body>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <Card.Title>{stock.ticker}</Card.Title>
                        <Card.Subtitle>{stock.shares} shares</Card.Subtitle>
                      </div>
                      <Card.Title>
                        <div
                          style={{
                            color: `${
                              portfolioStocks[stock.ticker]
                                ? this.handleColor(
                                    portfolioStocks[stock.ticker].change
                                  )
                                : '#888'
                            }`
                          }}
                        >
                          {`${
                            portfolioStocks[stock.ticker]
                              ? this.handleSym(
                                  portfolioStocks[stock.ticker].change
                                )
                              : ''
                          }`}{' '}
                          $
                          {portfolioStocks[stock.ticker]
                            ? portfolioStocks[stock.ticker].price / 100
                            : '-'}
                        </div>
                      </Card.Title>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h2>
                You did not purchase any stocks. Please check the transactions.
              </h2>
            )}
          </div>
          <div className="vert-line" />
          <div className="right">
            <h5>Buying Power: ${user.balance / 100}</h5>
            <div className="input-container">
              <input
                className="search-input"
                name="ticker"
                type="text"
                value={ticker}
                placeholder="TICKER"
                onChange={this.handleInput}
              />
              <input
                className="quantity"
                name="shares"
                type="number"
                value={shares === 0 ? '' : shares}
                placeholder="QTY"
                onChange={this.handleInput}
              />
              <button type="submit" onClick={this.handleClick}>
                Buy
              </button>
            </div>
          </div>
          <div className="vert-line" />
          <div className="right">
            <h5>Search Ticker</h5>
            <div className="input-container">
              <input
                className="search-input"
                type="text"
                placeholder="TICKER"
                value={value}
                onChange={this.handleChange}
              />
              {stocks && stocks.length > 0 ? (
                <div className="autocomplete">
                  <div className="autocomplete-items">
                    {stocks.map((stock, i) => (
                      <div
                        key={i}
                        className="stock-item"
                        onClick={this.handleValue}
                      >
                        <p className="stock-name">{stock['2. name']}</p>
                        <p className="stock-sym">{stock['1. symbol']}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
              )}
              {stocks && stocks.length > 0 ? (
                <p />
              ) : (
                <p className="warning">
                  If empty, please try again in a minute. API calls reached.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    transactions: state.transactions,
    portfolio: state.portfolios.defaultPort
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchaseStock: (userId, price, ticker, shares) => {
      dispatch(purchaseStockThunk(userId, price, ticker, shares))
    },
    getPortfolio: () => {
      dispatch(getPortThunk())
    },
    getUser: () => {
      dispatch(me())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
