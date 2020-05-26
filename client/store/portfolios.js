import axios from 'axios'

//ACTION TYPES
const GET_PORTFOLIO = 'GET_PORTFOLIO'

//INITIAL STATE
const portState = {
  defaultPort: []
}

//ACTION CREATORS
export const getPort = portfolio => ({type: GET_PORTFOLIO, portfolio})

//THUNK CREATORS
export const getPortThunk = () => {
  return async dispatch => {
    try {
      const port = await axios.get('/api/portfolios')
      dispatch(getPort(port.data))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER
export default function(state = portState, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, defaultPort: action.portfolio}
    default:
      return state
  }
}
