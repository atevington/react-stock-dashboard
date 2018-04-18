import {connect} from "react-redux"
import StockTable from "../components/stock-table"

const mapStateToProps = state => ({
	quotes: state.quotes
})

export default connect(mapStateToProps)(StockTable)