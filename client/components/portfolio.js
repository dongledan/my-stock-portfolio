import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Card} from 'react-bootstrap'
import {purchaseStockThunk, getPortThunk} from '../store'

import {keys} from '../../public/constants'

class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      stocks: [],
      ticker: '',
      shares: 0,
      stock: [],
      update: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getPortfolio()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.update) {
      this.props.getPortfolio()
      this.setState({update: false})
    }
  }

  handleInput(e) {
    let {value, name} = e.target
    if (name === 'ticker') value = value.toUpperCase()
    this.setState({[name]: value})
  }

  async handleChange(e) {
    this.setState({
      value: e.target.value
    })
    const {value} = this.state
    // multiple keys to limit running into max API calls
    const key = [
      '1NPRUSRW9SUDESWQ',
      'OTF3Q8BLOVNOFA0A',
      '8Q133ANRR1SAMC72',
      '5C7VFB9FRAI8BJ3A',
      'R0C510MH6QVXW6U6',
      'GXQSJYQV0HUC8K36',
      'PQEC9C7770HVOE2N',
      'RTWOC6TOAJZ0V4IK',
      'FSTBF9VCIJBINAW4',
      'V8IF0IE0PXKD2RCI'
    ]
    const rdmIdx = parseInt(Math.random() * 10)
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${
      key[rdmIdx]
    }`
    try {
      const {data} = await axios.get(url)
      this.setState({stocks: data.bestMatches})
    } catch (error) {
      console.log(error)
    }
  }

  async handleClick() {
    this.setState({update: true})
    const {shares, ticker, stock} = this.state
    if (ticker.length < 1 || shares <= 0) {
      alert('Please enter valid ticker and/or purchase 1 or more shares.')
      return
    } else {
      const rdmIdx = parseInt(Math.random() * 10)
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${
        keys[rdmIdx]
      }`
      const {data} = await axios.get(url)
      const price =
        parseFloat(data['Global Quote']['05. price']).toFixed(2) * 100
      if (price) {
        this.props.purchaseStock(this.props.user.id, price, ticker, shares)
        alert('Bought!')
      } else alert('Please enter valid ticker.')
    }
    this.props.getPortfolio()
  }

  render() {
    const {stocks, value, shares, ticker, price} = this.state
    const {user, portfolio} = this.props
    return (
      <div>
        <div className="content-container">
          <div className="left">
            <h2>Portfolio ( - )</h2>
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
                      <Card.Title>$ - </Card.Title>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h2>You did not purchase any stocks.</h2>
            )}
          </div>
          <div className="vert-line" />
          <div className="right">
            <h2>Cash - ${user.balance / 100}</h2>
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
            <h2>Search Ticker</h2>
            <div className="input-container">
              <input
                className="search-input"
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
                        onClick={this.handleClick}
                      >
                        <p>{stock['2. name']}</p>
                        <p>{stock['1. symbol']}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div />
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
