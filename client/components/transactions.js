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
    return (
      <div>
        <h2>Transactions</h2>
        <div className="transactions-container">
          <div className="row">
            {trxHistory && trxHistory.length > 0 ? (
              trxHistory.map((trx, i) => (
                <Card className="trx-card" key={i}>
                  <Card.Body>
                    <Card.Title>
                      ({trx.action}) {trx.ticker} - {trx.shares} shares @ ${
                        trx.price
                      }{' '}
                    </Card.Title>
                    <Card.Subtitle>{trx.purchaseDate}</Card.Subtitle>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <h2>You do not have any transactions.</h2>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    trxHistory: state.transactions.trxHistory
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
