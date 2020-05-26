import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const PURCHASE_STOCK = 'PURCHASE_STOCK'

/**
 * INITIAL STATE
 */
const trxState = {
  trxHistory: []
}

/**
 * ACTION CREATORS
 */
const getTransactions = trxHistory => ({type: GET_TRANSACTIONS, trxHistory})
const purchaseStock = stock => ({type: PURCHASE_STOCK, stock})

/**
 * THUNK CREATORS
 */

// get current transactions
export const getTransactionsThunk = () => {
  return async dispatch => {
    try {
      const pastTrx = await axios.get('/api/transactions/history')
      dispatch(getTransactions(pastTrx.data))
    } catch (error) {
      console.error(error)
    }
  }
}

// buying stock
export const purchaseStockThunk = (userId, price, ticker, shares) => {
  return async dispatch => {
    try {
      const purchaseInfo = {
        id: userId,
        purchaseDate: Date(Date.now()),
        price,
        ticker,
        shares,
        action: 'BUY'
      }
      const order = await axios.post('/api/transactions', purchaseInfo)
      dispatch(purchaseStock(order.data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = trxState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {...state, trxHistory: action.trxHistory}
    case PURCHASE_STOCK:
      return {...state, trxHistory: [...state.trxHistory, action.stock]}
    default:
      return state
  }
}
