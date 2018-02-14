import axios from "axios"

const getQuotes = stocks => (
	new Promise((resolve, reject) => {
		const chunkSize = 100
		const numChunks = Math.ceil(stocks.length / chunkSize)
		const chunkPromises = []
		const quotes = []

		for (let x = 0; x < numChunks; x++) {
			const chunkStocks = stocks.slice(x * chunkSize, (x + 1) * chunkSize)

			const url = (
				`https://api.iextrading.com/1.0/stock/market/batch` +
				`?symbols=${encodeURIComponent(chunkStocks.join(","))}` +
				`&types=quote&_=${encodeURIComponent((new Date()).getTime())}`
			)

			const chunkPromise = new Promise((chunkResolve, chunkReject) => {
				axios.get(url).then(response => {					
					Object.keys(response.data).map(symbol => {
						const quote = response.data[symbol].quote

						quote.latestPrice = quote.latestPrice || 0
						quote.change = quote.change || 0
						quote.changePercent = quote.changePercent || 0

						quotes.push(quote)
					})

					chunkResolve()
				}, chunkReject)
			})

			chunkPromises.push(chunkPromise)
		}

		Promise.all(chunkPromises).then(
			() => {
				quotes.sort((prev, next) => {
					if (prev.changePercent < next.changePercent) {
						return 1
					}

					if (prev.changePercent > next.changePercent) {
						return -1
					}

					return 0
				})

				resolve(quotes)
			},
			() => {
				reject()
			}
		)
	})
)

export default getQuotes