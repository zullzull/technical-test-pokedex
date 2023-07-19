import { configureStore } from "@reduxjs/toolkit";
import { mainSlice } from "./features/main";
import { pokemonSlice } from "./features/pokemon";

export const store = configureStore({
   reducer: {
      [pokemonSlice.name]: pokemonSlice.reducer,
      [mainSlice.name]: mainSlice.reducer
   },
   middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})