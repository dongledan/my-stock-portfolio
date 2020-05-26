import axios from 'axios'

//ACTION TYPES
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const REMOVE_STOCK = 'REMOVE_STOCK'
const ADD_STOCK = 'ADD_STOCK'
const EMPTY_PORTFOLIO = 'EMPTY_PORTFOLIO'

//INITIAL STATE
const defaultPort = []

//ACTION CREATORS
export const getPort = portfolio => ({type: GET_PORTFOLIO, portfolio})
export const emptyPort = () => ({type: EMPTY_PORTFOLIO, portfolio: []})
export const removeStock = portfolio => ({type: REMOVE_STOCK, portfolio})
export const addStock = stock => ({type: ADD_STOCK, stock})

//THUNK CREATORS
export const getPortThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/portfolio/${id}/portfolio`)
    dispatch(getCart(data.stocks))
  } catch (error) {
    console.error(error)
  }
}

export const addStockThunk = (userId, stockId, price) => async dispatch => {
  try {
    const stock = await axios.put(`/api/portfolio`, {
      userId: userId,
      stockId: stockId,
      price: price
    })
    const {data} = await axios.get(`/api/stock/${stockId}`)
    dispatch(addItem(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeItemThunk = (userId, stockId) => async dispatch => {
  try {
    const portfolio = await axios.put('/api/portfolio/remove-stock', {
      userId,
      stockId
    })
    dispatch(removeItem(portfolio.data))
  } catch (error) {
    console.error(error)
  }
}

export const emptyCartThunk = id => async dispatch => {
  try {
    await axios.put(`/api/users/${id}/portfolio`)
    dispatch(emptyCart())
  } catch (error) {
    console.error(error)
  }
}
//REDUCER
export const portfolioReducer = (portfolio = defaultPort, action) => {
  switch (action.type) {
    case GET_PORTFOLIO:
      if (action.portfolio) {
        return action.portfolio
      } else {
        return portfolio
      }
    case REMOVE_STOCK:
      if (
        action.portfolio.length > 1 &&
        action.portfolio[0] &&
        action.portfolio[0].orderItem.quantity === 0
      ) {
        return []
      } else {
        return action.portfolio
      }
    case ADD_STOCK:
      return [...portfolio, action.stock]
    case EMPTY_PORTFOLIO:
      return action.portfolio
    default:
      return portfolio
  }
}
