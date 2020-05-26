import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Card} from 'react-bootstrap'
import {purchaseStockThunk} from '../store'

class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      stocks: [],
      ticker: '',
      shares: 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
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
    const price = 200
    const {shares, ticker} = this.state
    await this.props.purchaseStock(this.props.user.id, price, ticker, shares)
  }

  render() {
    const {stocks, value, shares, ticker} = this.state
    return (
      <div>
        <div className="content-container">
          <div className="left">
            <h2>Portfolio ($3003.01)</h2>
            <Card className="stock">
              <Card.Body>
                <Card.Title>AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="stock">
              <Card.Body>
                <Card.Title>AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="stock">
              <Card.Body>
                <Card.Title>AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="stock">
              <Card.Body>
                <Card.Title>AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="vert-line" />
          <div className="right">
            <h2>Cash - $5000</h2>
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
    transactions: state.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchaseStock: (userId, price, ticker, shares) => {
      dispatch(purchaseStockThunk(userId, price, ticker, shares))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
