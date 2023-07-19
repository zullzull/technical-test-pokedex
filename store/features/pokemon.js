import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { memoize } from "proxy-memoize"
import Pokemon from "../../models/pokemon"
const initialState = {
   pokemons: [],
	typePokemon: '',
   limit: 12,
   offset: 0,
	loading: false
}

export const pokemonSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {
		setPokemon: (state, action) => {
			state.pokemons = action.payload
		},
		setTypePokemon: (state, action) => {
         state.typePokemon = action.payload
      },
      setLimit: (state, action) => {
         state.limit = action.payload
      },
      setOffset: (state, action) => {
         state.offset = action.payload
      },
      setLoading: (state, action) => {
         state.loading = action.payload
      }
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPokemons.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchPokemons.fulfilled, (state, action) => {
			const { items, success} = action.payload
			state.loading = false
			state.pokemons = items
		})
	},
})

export const memoizeTypePokemon = memoize((state)=>state.pokemon.typePokemon)
export const memoizeLimit = memoize((state)=>state.pokemon.limit)
export const memoizePokemons = memoize((state)=>state.pokemon.pokemons)
export const memoizeLoading = memoize((state)=>state.pokemon.loading)
export const memoizeOffset= memoize((state)=>state.pokemon.offset)
export const { setPokemon, setTypePokemon, setLimit, setLoading, setOffset } = pokemonSlice.actions
export default pokemonSlice.reducer

export const fetchPokemons = createAsyncThunk(
	"fetchPokemons",
	async (params) => {
		const response = await Pokemon.fetch(params)
  		return response
	}
)