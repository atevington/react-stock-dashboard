import StateProvider from "react-basic-state"

const initialState = {quotes: [], isLoading: true}
const AppState = StateProvider(initialState)

export default AppState