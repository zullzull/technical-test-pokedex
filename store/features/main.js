import { createSlice } from "@reduxjs/toolkit"
import { memoize } from "proxy-memoize"

const initialState = {
   search: '',
}

export const mainSlice = createSlice({
	name: "main",
	initialState,
	reducers: {
		setSearch: (state, action) => {
			state.search = action.payload
		}
	},
})

export const memoizeSearch = memoize((state)=>state.main.search)
export const { setSearch } = mainSlice.actions
export default mainSlice.reducer