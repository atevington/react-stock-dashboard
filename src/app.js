import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import getQuotes from "./get-quotes"
import StockTable from "./components/stock-table"
import AppState from "./app-state"

const StateContainer = AppState.container
const symbols = (process.env.SYMBOLS || "").split(",").map(symbol => symbol.toLowerCase())

const pollStockData = symbols => {
	let isFetching = false
	const delaySeconds = .5
	const refreshSeconds = 60
	const resetState = (quotes, isLoading) => () => ({quotes, isLoading})

	const refreshData = () => {
		if (!isFetching) {
			isFetching = true
			AppState.update(resetState([], true))

			getQuotes(symbols).then(
				quotes => {
					setTimeout(() => {
						isFetching = false
						AppState.update(resetState(quotes, false))
					}, delaySeconds * 1000)
				},
				() => {
					setTimeout(() => {
						isFetching = false
						AppState.update(resetState([], false))
					}, delaySeconds * 1000)
				}
			)
		}
	}

	refreshData()
	setInterval(() => refreshData(), refreshSeconds * 1000)
}

ReactDOM.render(
	<StateContainer>
		<StockTable/>
	</StateContainer>,
	document.getElementById("app")
)

pollStockData(symbols)