import React from 'react'
import {Card} from 'react-bootstrap'

export default function Transactions() {
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
