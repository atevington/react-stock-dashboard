import React from "react"
import AppState from "../app-state"

const StockTable = props => {
	const quotes = props.quotes.map(quote =>
		<tr key={quote.symbol}>
			<td>
				<a href={`https://stocktwits.com/symbol/${quote.symbol.toUpperCase()}`} target="_blank">{quote.symbol} &#8599;</a>
			</td>
			<td>{quote.companyName}</td>
			<td>${quote.latestPrice.toFixed(2)}</td>
			<td style={{color: quote.change < 0 ? "red" : "green"}}>
				<span dangerouslySetInnerHTML={{__html: quote.change < 0 ? "&darr;" : "&uarr;"}} />{" "}
				${quote.change.toFixed(2)}{" "}
				({(quote.changePercent * 100).toFixed(2)}%)
			</td>
		</tr>
	)

	const loadingMessage = (
		<tr>
			<td colSpan="4" style={{textAlign: "center"}}>
				<img src="loading.gif" />
			</td>
		</tr>
	)

	return (
		<table cellSpacing="0" cellPadding="0">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
			</colgroup>
			<thead>
				<tr>
					<td>Symbol</td>
					<td>Company</td>
					<td>Price</td>
					<td>Change</td>
				</tr>
			</thead>
			<tbody className="ignore-stripe">
				{!props.isLoading ? quotes : loadingMessage}
			</tbody>
		</table>
	)
}

const wrapped = AppState.wrap(StockTable, {quotes: state => state.quotes, isLoading: state => state.isLoading})

export default wrapped