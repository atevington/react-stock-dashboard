import actionTypes from "../action-types"

const initialState = {
	quotes: []
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_QUOTES:
			return {...state, quotes: action.quotes}
		default:
			return state
	}
}

export default rootReducer