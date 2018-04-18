import React from "react"

const StockTable = props => {
	const quotes = props.quotes.map(quote =>
		<tr key={quote.symbol}>
			<td>
				<a href={`https://stocktwits.com/symbol/${quote.symbol.toUpperCase()}`} target="_blank">
					{quote.symbol} &#8599;
				</a>
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
			<tbody>
				{quotes}
			</tbody>
		</table>
	)
}

export default StockTable