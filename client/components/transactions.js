import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTransactionsThunk} from '../store'
import {Card} from 'react-bootstrap'

class Transactions extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getTransactions()
  }
  render() {
    const {trxHistory} = this.props
    console.log(this.props, 'hi')
    return (
      <div>
        <h2>Transactions</h2>
        <div className="transactions-container">
          <div className="row">
            <Card className="trx-card">
              <Card.Body>
                <Card.Title>(BUY) AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="trx-card">
              <Card.Body>
                <Card.Title>(BUY) AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="trx-card">
              <Card.Body>
                <Card.Title>(BUY) AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="trx-card">
              <Card.Body>
                <Card.Title>(BUY) AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
            <Card className="trx-card">
              <Card.Body>
                <Card.Title>(SELL) AAPL - 5 shares @ $300.01 </Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    trxHistory: state.trxHistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => {
      dispatch(getTransactionsThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
