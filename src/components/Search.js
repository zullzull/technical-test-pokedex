'use client'

import { useDispatch, useSelector } from "react-redux"
import { memoizeSearch, setSearch } from "../../store/features/main"
import { fetchPokemons, setLoading } from "../../store/features/pokemon"

export default function Search() {
   const dispatch = useDispatch()
   const search = useSelector(memoizeSearch)

   const handleInput = async (e) => {
      const params = {
         search: e.target.value,
         limit: 12,
         offset: 0
      }
      dispatch(setSearch(e.target.value))
      dispatch(fetchPokemons(params))
      
      // delay pencarian berikutnya n second
      const n = 0.5
      await new Promise((resolve, reject) =>
         setTimeout(() => resolve(), n * 1000)
      )
   }


   return (
      <input 
         onChange={handleInput}
         value={search}
         type="text"
         placeholder='Search'
         name="search"
         className='border-2 rounded-full w-full bg-gray-800 px-4 py-2 focus-visible:outline-0 capitalize'
      />
   )
}