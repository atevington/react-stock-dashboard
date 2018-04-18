import "babel-polyfill"

import React from "react"
import ReactDOM from "react-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"

import getQuotes from "./get-quotes"
import actionTypes from "./action-types"
import rootReducer from "./reducers"
import StockTable from "./containers/stock-table"

const refreshSeconds = parseInt(process.env.REFRESH_SECONDS || "30", 10)
const symbols = (process.env.SYMBOLS || "").split(",").map(symbol => symbol.toLowerCase())
const store = createStore(rootReducer)

const refreshData = symbols => (
	new Promise((resolve, reject) => {
		const onDone = quotes => {
			store.dispatch({type: actionTypes.SET_QUOTES, quotes: quotes || []})
			resolve()
		}

		getQuotes(symbols).then(onDone, onDone)
	})
)

const init = (symbols, refreshSeconds) => {
	refreshData(symbols).then(() => {
		let isFetching = false

		setInterval(() => {
			const onDone = () => isFetching = false

			if (!isFetching) {
				isFetching = true
				refreshData(symbols).then(onDone, onDone)
			}
		}, refreshSeconds * 1000)

		ReactDOM.render(
			<Provider store={store}>
				<StockTable />
			</Provider>,
			document.getElementById("app")
		)
	})
}

init(symbols, refreshSeconds)