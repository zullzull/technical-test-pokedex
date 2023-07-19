"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../../models/pokemon";
import { memoizeSearch } from "../../store/features/main";
import { memoizeLimit, memoizeOffset, memoizePokemons, memoizeTypePokemon, setLoading, setOffset, setPokemon } from "../../store/features/pokemon";
import { setLimit } from "../../store/features/pokemon";
import PokemonItem from "./Pokemon"

export default function Pokemons({pokemons: initPokemons, limit: initLimit, offset: initOffset}) {
   const pokemons = useSelector(memoizePokemons)
   const search = useSelector(memoizeSearch)
   const limit = useSelector(memoizeLimit)
   const type = useSelector(memoizeTypePokemon)
   const offset = useSelector(memoizeOffset)
   const dispatch = useDispatch()
   const [hasMore, setHasMore] = useState(true)

   useEffect(()=>{
      dispatch(setPokemon(initPokemons))
      dispatch(setLimit(initLimit))
      dispatch(setOffset(initOffset))
   },[])

   const getMorePost = async () => {
      dispatch(setLoading(true))
      if (hasMore) { 
         let req = {
				search: search,
            type: type,
				limit: limit + 12,
            offset: offset + 12,
			}
         const { items, success} = await Pokemon.fetch(req)
         if (success) {
            if (items.length > 0) {
               dispatch(setLimit(req.limit))
               dispatch(setPokemon([
                  ...pokemons,
                  ...items
               ]))
   
               dispatch(setLoading(false))
            }else {
               setHasMore(false)
            }
         }
      }
   }
   return (
      <InfiniteScroll
         dataLength={pokemons.length}
         className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2"
         loader={<LoadedPokemon />}
         endMessage={<EndPokemon />}
         hasMore={hasMore}
         next={getMorePost}
      >
         {
            pokemons.length > 0 &&
            pokemons?.map((item, i) => {
               return <PokemonItem key={i} item={item} />
            })
         }
      </InfiniteScroll>
   )
}

const LoadedPokemon = () => {
	return (
		<div className="col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center py-8">
			loading
		</div>
	)
}

const EndPokemon = () => {
	return (
		<div className="col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center py-8">
			<p className="text-muted small mt-2">Semua pokemon telah ditampilkan.</p>
		</div>
	)
}